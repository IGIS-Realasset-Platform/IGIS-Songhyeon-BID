// Isolated Postgres-compatible test; PGlite is a temporary test dependency, not a
// frontend/runtime dependency. Usage: node .../test-db.mjs /absolute/path/to/pglite/dist/index.js
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { PGlite } = await import(pathToFileURL(process.argv[2]));
const db = new PGlite();
process.on('uncaughtException', error => {
  console.error(error.message, error.where || '');
  db.close().finally(() => process.exit(1));
});
const uid1 = '11111111-1111-4111-8111-111111111111';
const uid2 = '22222222-2222-4222-8222-222222222222';
const outsider = '33333333-3333-4333-8333-333333333333';
const hash = '57dea8e8e5a177e9d6a2e572f5b0d43ce545b6e3638e50e70e78f5fb4cdf4177';
await db.exec(`
  create role anon; create role authenticated;
  create schema auth;
  create function auth.uid() returns uuid language sql as
    $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  create table public.songhyeon_members(auth_id uuid, staff_name text, is_active boolean);
  insert into public.songhyeon_members values ('${uid1}','검증1',true),('${uid2}','검증2',true);
`);
await db.exec(await fs.readFile(new URL('../../supabase/migrations/202610200001_songhyeon_shop_research.sql', import.meta.url), 'utf8'));
const seed = JSON.parse(await fs.readFile(new URL('../../references/shop-research/seed.json', import.meta.url)));
await db.query('insert into songhyeon_shop_research_seed(id,seed_hash,document) values(1,$1,$2)', [hash, seed]);
await db.exec(await fs.readFile(new URL('../../supabase/songhyeon_bid/import_shop_research.sql', import.meta.url), 'utf8'));
const counts = (await db.query('select count(*)::int as n from songhyeon_shop_research_entities')).rows[0];
assert.equal(counts.n, 373);
async function actor(id) {
  await db.exec('reset role');
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
  await db.exec('set role authenticated');
}
async function save(type, entityId, payload, clientEventId) {
  const request = { type, entityId, payload, clientEventId };
  return (await db.query('select public.songhyeon_shop_research_save($1,$2) as data', [request, hash])).rows[0].data;
}
await actor(uid1);
const initial = (await db.query('select public.songhyeon_shop_research_state(true) as data')).rows[0].data;
assert.deepEqual(initial.seed, seed);
assert.equal(initial.session.id, uid1);
await assert.rejects(db.query('select * from public.songhyeon_shop_research_seed'), /permission denied/);
const eid = seed.entities[0].id;
await assert.rejects(save('entity.delete', eid, {}, 'delete-seed'), /본인이/);
const row = { id: 'new-test', name: '검증 상점', categories: ['공예'], entityType: 'shop',
  contacts: { links: [{ label: '홈페이지', url: 'https://example.org' }] },
  sites: [{ id: 'site-test', address: '서울 종로구', lat: null, lon: null }], research: [{ reason: '조사' }], sourceTags: ['team'] };
const created = await save('entity.create', row.id, row, 'create-1');
const retry = await save('entity.create', row.id, row, 'create-1');
assert.equal(created.event.id, retry.event.id);
assert.equal(created.event.payload.research[0].actor.id, uid1);
await assert.rejects(save('entity.create', row.id, { ...row, name: '다름' }, 'create-1'), /다른 내용/);
await assert.rejects(save('sheet.row.save', row.id, { fields: { createdBy: { id: uid2 } } }, 'forge'), /허용되지/);
await assert.rejects(save('sheet.row.save', row.id, { research: { actor: { id: uid2 } } }, 'forge-research'), /허용되지/);
await assert.rejects(save('sheet.row.save', row.id, { site: { id: 'site-test', lat: 999, lon: 126 } }, 'coords'), /범위/);
await assert.rejects(save('sheet.row.save', row.id, { fields: { contacts: { website: 'javascript:alert(1)' } } }, 'url'), /링크/);
await save('sheet.row.save', row.id, { fields: { name: '수정' }, research: { reason: '' } }, 'edit-1');
await save('star.set', row.id, { active: true }, 'star1');
await actor(uid2);
await save('star.set', row.id, { active: true }, 'star2');
await assert.rejects(save('entity.delete', row.id, {}, 'delete-other'), /본인이/);
await assert.rejects(save('entity.create', 'collision', { ...row, id: 'collision' }, 'collision'), /duplicate key/);
const shared = (await db.query('select public.songhyeon_shop_research_state(false) as data')).rows[0].data;
assert.equal(shared.events.filter(e => e.type === 'star.set').length, 2);
assert.equal(shared.seed, undefined);
await actor(uid1);
await save('star.set', row.id, { active: false }, 'unstar1');
await save('entity.delete', row.id, {}, 'delete-own');
await assert.rejects(save('star.set', row.id, { active: true }, 'deleted-star'), /삭제/);
await actor(outsider);
await assert.rejects(db.query('select public.songhyeon_shop_research_state(true)'), /활성 송현/);
await assert.rejects(save('star.set', eid, { active: true }, 'outsider'), /활성 송현/);
await db.exec('reset role; set role anon');
await assert.rejects(db.query('select public.songhyeon_shop_research_state(true)'), /permission denied/);
await db.exec('reset role');
assert.equal((await db.query('select count(*)::int as n from songhyeon_shop_research_events')).rows[0].n, 6);
await db.close();
console.log('PASS: original seed, auth/RLS, two users, retry idempotency, creator-only soft deletion, metadata/URL/coordinate guards');
