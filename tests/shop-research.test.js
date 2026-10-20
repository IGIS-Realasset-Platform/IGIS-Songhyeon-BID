import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createShopResearchAdapter, SHOP_RESEARCH_SEED_HASH } from '../src/lib/shop-research/supabaseAdapter.js';

const state = { seedHash: SHOP_RESEARCH_SEED_HASH, session: { id: 'u1', name: '멤버', role: 'reviewer' }, events: [], revision: 0 };
function client(respond, id = 'u1') {
  return {
    auth: { getSession: async () => ({ data: { session: { user: { id } } } }) },
    rpc: (name, args) => {
      const query = Promise.resolve().then(() => respond(name, args));
      query.abortSignal = () => query;
      return query;
    },
  };
}
test('original 373 records, source archives and 298 sites are preserved without public seed', () => {
  const raw = fs.readFileSync(new URL('../references/shop-research/seed.json', import.meta.url));
  assert.equal(createHash('sha256').update(raw).digest('hex'), SHOP_RESEARCH_SEED_HASH);
  const seed = JSON.parse(raw);
  assert.equal(seed.entities.length, 373);
  assert.equal(seed.entities.reduce((n, e) => n + e.sites.length, 0), 298);
  assert.ok(seed.sourceArchive);
  assert.ok(seed.references.fair && seed.references.organization && seed.references.publications);
  assert.equal(fs.existsSync(new URL('../public/shop-research/r8/seed.json', import.meta.url)), false);
});
test('bootstrap loads private seed once; first refresh reuses verified state', async () => {
  const calls = [];
  const adapter = createShopResearchAdapter(client((name, args) => {
    calls.push([name, args]);
    return { data: { ...state, ...(args.include_seed ? { seed: { entities: [{ id: 's' }] } } : {}) } };
  }), 'u1');
  const boot = await adapter.bootstrap();
  assert.equal(boot.seed.entities[0].id, 's');
  assert.equal((await adapter.getState()).session.id, 'u1');
  assert.equal(calls.length, 1);
  await adapter.getState();
  assert.equal(calls.length, 2);
  assert.equal(calls[1][1].include_seed, false);
});
test('account change and seed version mismatch fail closed', async () => {
  const wrongAccount = createShopResearchAdapter(client(() => assert.fail('no request'), 'u2'), 'u1');
  await assert.rejects(wrongAccount.bootstrap(), /계정이 변경/);
  const wrongVersion = createShopResearchAdapter(client(() => ({ data: { ...state, seedHash: 'other' } })), 'u1');
  await assert.rejects(wrongVersion.bootstrap(), /버전/);
});
test('missing database and denied requests show actionable errors; no local-success fallback', async () => {
  for (const code of ['PGRST202', '42P01', '42501']) {
    const adapter = createShopResearchAdapter(client(() => ({ error: { code } })), 'u1');
    await assert.rejects(adapter.bootstrap(), code === '42501' ? /활성 멤버/ : /DB/);
  }
});
test('write preserves retry ID, passes seed hash, accepts only server-stamped current actor', async () => {
  const request = { type: 'star.set', entityId: 's', payload: { active: true }, clientEventId: 'retry-1' };
  const adapter = createShopResearchAdapter(client((name, args) => {
    assert.equal(name, 'songhyeon_shop_research_save');
    assert.deepEqual(args, { request, expected_seed_hash: SHOP_RESEARCH_SEED_HASH });
    return { data: { event: { ...request, id: 'server-id', actor: { id: 'u1' } }, revision: 1 } };
  }), 'u1');
  assert.equal((await adapter.saveEvent(request)).event.id, 'server-id');
  const invalid = createShopResearchAdapter(client(() => ({ data: { event: { id: 'bad', actor: { id: 'u2' } } } })), 'u1');
  await assert.rejects(invalid.saveEvent(request), /저장 확인/);
});
test('cancelled route cannot start RPC; unknown coordinates remain unresolved', async () => {
  const abort = new AbortController();
  abort.abort();
  const adapter = createShopResearchAdapter(client(() => assert.fail('no request')), 'u1', { signal: abort.signal });
  await assert.rejects(adapter.bootstrap(), { name: 'AbortError' });
  assert.deepEqual((await adapter.geocode('unknown')).results, []);
});
