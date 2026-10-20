import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SHOP_RESEARCH_SEED_HASH } from '../../src/lib/shop-research/supabaseAdapter.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const bytes = await fs.readFile(path.join(root, 'references/shop-research/seed.json'));
const hash = createHash('sha256').update(bytes).digest('hex');
const seed = JSON.parse(bytes);
if (hash !== SHOP_RESEARCH_SEED_HASH || seed.entities.length !== 373) throw new Error('Source version mismatch');
const entities = new Set(), sites = new Set();
for (const entity of seed.entities) {
  if (!entity.id || entities.has(entity.id)) throw new Error('Duplicate entity ID');
  entities.add(entity.id);
  for (const site of entity.sites || []) {
    if (!site.id || sites.has(site.id)) throw new Error('Duplicate site ID');
    sites.add(site.id);
  }
}
const folder = path.join(root, '.local/shop-research');
await fs.mkdir(folder, { recursive: true });
// The dashboard CSV importer stalls on a single multi-MB JSON cell.
// Keep data private and prepare resumable administrator-only SQL chunks instead.
const sourceText = JSON.stringify(seed);
await fs.writeFile(path.join(folder, 'seed-transfer.txt'), sourceText);
const chunkFolder = path.join(folder, 'chunks');
await fs.mkdir(chunkFolder, { recursive: true });
const setup = `begin;
create table if not exists public.songhyeon_shop_research_import_chunks (
  part integer primary key, content text not null
);
alter table public.songhyeon_shop_research_import_chunks enable row level security;
revoke all on public.songhyeon_shop_research_import_chunks from public, anon, authenticated;
commit;
`;
await fs.writeFile(path.join(chunkFolder, '000-setup.sql'), setup);
let parts = 0;
for (let offset = 0; offset < sourceText.length; offset += 100000) {
  const content = sourceText.slice(offset, offset + 100000).replaceAll("'", "''");
  await fs.writeFile(path.join(chunkFolder, `${String(parts + 1).padStart(3, '0')}-part.sql`),
    `insert into public.songhyeon_shop_research_import_chunks(part,content) values (${parts},'${content}') on conflict(part) do update set content=excluded.content;\n`);
  parts++;
}
const digest = createHash('md5').update(sourceText).digest('hex');
await fs.writeFile(path.join(chunkFolder, '999-finalize.sql'), `begin;
do $$ declare source_text text; begin
  select string_agg(content,'' order by part) into source_text from public.songhyeon_shop_research_import_chunks;
  if md5(source_text) is distinct from '${digest}' then raise exception 'Source mismatch'; end if;
  insert into public.songhyeon_shop_research_seed(id,seed_hash,document)
    values(1,'${hash}',source_text::jsonb) on conflict(id) do nothing;
  if (select document from public.songhyeon_shop_research_seed where id=1) is distinct from source_text::jsonb
    then raise exception 'Existing source mismatch'; end if;
end $$;
commit;
`);
// Plain-text local handoff for the administrator's existing SQL Editor session.
await fs.copyFile(path.join(root, 'supabase/migrations/202610200001_songhyeon_shop_research.sql'), path.join(folder, 'db-setup.txt'));
await fs.copyFile(path.join(root, 'supabase/songhyeon_bid/import_shop_research.sql'), path.join(folder, 'db-import.txt'));
console.log(`Prepared ${parts} private SQL chunks: ${entities.size} entities, ${sites.size} sites; SHA256 ${hash}`);
