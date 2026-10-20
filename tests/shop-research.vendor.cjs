/* Run: node tests_domain.cjs. No packages, network or browser required. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const sourceDir=path.join(__dirname,'../public/shop-research/r8');
// Load in this realm so the source's assert.deepStrictEqual tests remain valid.
const domainModule={exports:{}};
new Function('module',fs.readFileSync(path.join(sourceDir,'domain.js'),'utf8'))(domainModule);
const D=domainModule.exports;
const seed={entities:[{id:'a',name:'가게',categories:['공예품'],sourceTags:['legacy'],legacyRefs:[{raw:{text:'원문'}}],sites:[{id:'sa',address:'서울 종로구 인사동길 1',lat:37.57,lon:126.98,coordinateStatus:'source_point',originalAddress:'원문 주소'}],research:[{id:'old',reason:'예전 의견',actor:{id:'old-author',name:'기존 작성자'},createdAt:'2026-01-01T00:00:00Z'}]},{id:'b',name:'나무',categories:['목가구'],sites:[],research:[]}]};
const event=(id,type,entityId,payload,actor='u1',revision=1)=>({id,type,entityId,payload,actor:{id:actor,name:actor},createdAt:'2026-10-19T00:00:00Z',revision});
const tests=[];
function test(name,fn){tests.push({name,fn});}
test('row save preserves source history and merges one site while appending stamped opinion',()=>{
  const before=JSON.stringify(seed);
  const next=D.replay(seed,[event('e1','sheet.row.save','a',{fields:{categories:[],assignee:''},site:{id:'sa',address:'새 주소'},research:{reason:'새 의견'}})]);
  const entity=next.entities[0];
  assert.equal(JSON.stringify(seed),before);
  assert.deepEqual(entity.legacyRefs,seed.entities[0].legacyRefs);
  assert.deepEqual(entity.categories,[]);
  assert.equal(entity.sites[0].originalAddress,'원문 주소');
  assert.equal(entity.sites[0].lat,null);
  assert.equal(entity.sites[0].coordinateStatus,'unresolved');
  assert.equal(entity.research.length,2);
  assert.equal(entity.research[0].reason,'예전 의견');
  assert.equal(entity.research[1].actor.id,'u1');
  assert.equal(D.getLatestResearch(entity).reason,'새 의견');
});
test('duplicate event replay is idempotent and unnumbered legacy events are retained',()=>{
  const one=event('e1','research.add','a',{note:'의견'});
  const next=D.replay(seed,[one,one,{type:'assignment.set',entityId:'a',payload:{assignee:'갑'}},{type:'assignment.set',entityId:'b',payload:{assignee:'을'}}]);
  assert.equal(next.entities[0].research.length,2);
  assert.equal(next.entities[0].assignee,'갑');assert.equal(next.entities[1].assignee,'을');
});
test('explicitly clearing a sheet opinion appends a blank snapshot without deleting history',()=>{
  const model=D.replay(seed,[]);
  assert.doesNotThrow(()=>D.validateMutation(model,'sheet.row.save','a',{research:{reason:''}},{id:'u1'}));
  assert.throws(()=>D.validateMutation(model,'research.add','a',{reason:''},{id:'u1'}),/의견이나 근거/);
  D.applyEvent(model,event('blank','sheet.row.save','a',{research:{reason:''}}));
  assert.equal(model.entities[0].research.length,2);
  assert.equal(D.getLatestResearch(model.entities[0]).reason,'');
  assert.equal(model.entities[0].research[0].reason,'예전 의견');
});
test('top10 revisions belong to each actor; another actor does not cause CAS conflict',()=>{
  const model=D.replay(seed,[event('b1','top10.set','team-top10',{items:[{entityId:'a',note:'이유'}]},'u1',4),event('b2','top10.set','team-top10',{items:[{entityId:'b',note:''}]},'u2',9)]);
  assert.doesNotThrow(()=>D.validateMutation(model,'top10.set','team-top10',{items:[],expectedRevision:4},{id:'u1'}));
  assert.throws(()=>D.validateMutation(model,'top10.set','team-top10',{items:[],expectedRevision:9},{id:'u1'}),/다른 화면/);
  assert.throws(()=>D.validateMutation(model,'top10.set','team-top10',{items:[{entityId:'a'},{entityId:'a'}]},{id:'u1'}),/두 번/);
  assert.throws(()=>D.validateMutation(model,'top10.set','team-top10',{items:[{entityId:'missing'}]},{id:'u1'}),/없는 상점/);
  assert.equal(model.ballots.length,2);
});
test('team aggregate exposes counts and uses competition ranks for genuine ties',()=>{
  const results=D.aggregateTop10([{actor:{id:'x'},items:[{entityId:'a'},{entityId:'b'}]},{actor:{id:'y'},items:[{entityId:'b'},{entityId:'a'}]}],seed.entities);
  assert.equal(results.participantCount,2);assert.equal(results.selectionCount,4);
  assert.deepEqual(results.rows.map(row=>row.rank),[1,1]);
  assert.deepEqual(results.rows.map(row=>row.averageRank),[1.5,1.5]);
});
test('only the active entity creator with write permission can delete, never a name or last editor match',()=>{
  const created={...seed.entities[0],createdBy:{id:'owner',name:'같은 이름'},updatedBy:{id:'editor'}};
  const model={entities:[created],ballots:[]};
  for(const role of ['editor','reviewer','admin','local'])assert.equal(D.canDeleteEntity(created,{id:'owner',role}),true);
  for(const actor of [{id:'owner',role:'viewer'},{id:'editor',role:'editor'},{id:'outsider',name:'같은 이름',role:'admin'}]){
    assert.equal(D.canDeleteEntity(created,actor),false);
    assert.throws(()=>D.validateMutation(model,'entity.delete','a',{},actor),/직접 등록/);
  }
  assert.equal(D.canDeleteEntity(seed.entities[0],{id:'old-author',role:'admin'}),false);
  assert.throws(()=>D.validateMutation(model,'entity.delete','a',{createdBy:{id:'owner'}},{id:'owner',role:'editor'}),/별도 입력값/);
  assert.doesNotThrow(()=>D.validateMutation(model,'entity.delete','a',{}, {id:'owner',role:'editor'}));
});
test('soft deletion preserves source and opinions while filtering stale recommendations and later mutations',()=>{
  const owned={entities:[{...seed.entities[0],createdBy:{id:'owner',role:'editor'}}]};
  const ballot=event('vote','top10.set','team-top10',{items:[{entityId:'a'}]},'u1',1);
  const deleted=event('delete','entity.delete','a',{},'owner',2);
  const model=D.replay(owned,[ballot,deleted,deleted,event('late','entity.patch','a',{name:'되살릴 이름'},'u1',3)]);
  assert.equal(model.entities.length,1);assert.equal(model.entities[0].name,'가게');
  assert.equal(model.entities[0].deletedAt,deleted.createdAt);assert.equal(model.entities[0].deletedBy.id,'owner');
  assert.deepEqual(model.entities[0].legacyRefs,owned.entities[0].legacyRefs);assert.deepEqual(model.entities[0].research,owned.entities[0].research);
  assert.equal(model.ballots[0].items.length,1);assert.equal(D.activeBallots(model.ballots,model.entities)[0].items.length,0);
  assert.deepEqual(D.aggregateTop10(model.ballots,model.entities),{rows:[],participantCount:0,selectionCount:0});
  assert.deepEqual(D.aggregateTop10(model.ballots,[]),{rows:[],participantCount:0,selectionCount:0});
  assert.throws(()=>D.validateMutation(model,'top10.set','team-top10',{items:[{entityId:'a'}]},{id:'u1'}),/없는 상점/);
  assert.throws(()=>D.validateMutation(model,'sheet.row.save','a',{fields:{name:'다시'}},{id:'owner'}),/삭제된 기록/);
  assert.throws(()=>D.validateMutation(model,'entity.create','a',{id:'a',name:'재사용'},{id:'owner'}),/이미 등록/);
});
function runtime({initial={},protocol='file:',adapter=null,config={},fetch:fetcher,fixture=seed}={}){
  const memory=new Map(Object.entries(initial));let calls=0;
  const context=vm.createContext({console,URL,Blob,Date,JSON,Math,Set,Map,Promise,Error,Number,String,Object,Array,Intl,AbortController,setTimeout,clearTimeout,setInterval,clearInterval,fetch:fetcher,location:{protocol},localStorage:{getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)},addEventListener(){},removeEventListener(){}});
  vm.runInContext(fs.readFileSync(path.join(sourceDir,'domain.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(sourceDir,'core.js'),'utf8'),context);
  return {core:context.ResearchCore.create({seed:structuredClone(fixture),config,adapter}),memory,context};
}
test('stars are unlimited distinct-user selections; removing one user leaves the other user intact',()=>{
  const fixture={entities:Array.from({length:14},(_,index)=>({id:'e'+index,name:'상점 '+index}))};
  const events=fixture.entities.map((entity,index)=>event('star-'+index,'star.set',entity.id,{active:true},'u1',index+1));
  events.push(event('second-user','star.set','e0',{active:true},'u2',15),event('again','star.set','e0',{active:true},'u1',16));
  let model=D.replay(fixture,events);
  assert.equal(D.getStars(model).length,15);assert.equal(D.getStars(model).filter(value=>value.entityId==='e0').length,2);
  events.push(event('remove-own','star.set','e0',{active:false},'u1',17));model=D.replay(fixture,events);
  assert.equal(D.getStars(model).length,14);assert.deepEqual(D.getStars(model).filter(value=>value.entityId==='e0').map(value=>value.actor.id),['u2']);
  assert.equal(model.starStates.length,15);assert.equal(model.starStates.find(value=>value.entityId==='e0'&&value.actor.id==='u1').active,false);
});
test('legacy actual ballots seed stars without rank, explicit star intent wins and no demo seed migrates',()=>{
  const legacy=event('old-ballot','top10.set','team-top10',{items:[{entityId:'a',note:'원본 의견'},{entityId:'b'}]},'u1',1);
  const model=D.replay({...seed,ballots:[{actor:{id:'demo'},items:[{entityId:'a'}]}]},[legacy]);
  assert.deepEqual(D.getStars(model).map(value=>value.entityId),['a','b']);
  D.applyEvent(model,event('unstar','star.set','a',{active:false},'u1',2));
  D.applyEvent(model,event('other-user','star.set','a',{active:true},'u2',3));
  assert.equal(D.getStars(model).some(value=>value.actor.id==='u1'&&value.entityId==='a'),false);
  assert.equal(D.getStars(model).some(value=>value.actor.id==='u2'&&value.entityId==='a'),true);
  assert.equal(model.ballots[0].items[0].note,'원본 의견');
  D.applyEvent(model,event('select-again','star.set','a',{active:true},'u1',4));
  assert.equal(D.getStars(model).filter(value=>value.entityId==='a').length,2);
  assert.equal(D.getStars(model).some(value=>value.actor.id==='demo'),false);
});
test('star mutation requires write permission, exact boolean payload and an active existing entity',()=>{
  const model=D.replay(seed,[]);
  assert.doesNotThrow(()=>D.validateMutation(model,'star.set','a',{active:true},{id:'u1',role:'reviewer'}));
  for(const payload of [{active:1},{active:'true'},{active:true,actor:{id:'other'}},{},{active:false,note:'rank'}])assert.throws(()=>D.validateMutation(model,'star.set','a',payload,{id:'u1',role:'editor'}),/선택값/);
  assert.throws(()=>D.validateMutation(model,'star.set','a',{active:true},{id:'u1',role:'viewer'}),/조회 권한/);
  assert.throws(()=>D.validateMutation(model,'star.set','missing',{active:true},{id:'u1',role:'editor'}),/찾을 수/);
  D.applyEvent(model,event('delete','entity.delete','a',{}));
  assert.throws(()=>D.validateMutation(model,'star.set','a',{active:true},{id:'u1',role:'editor'}),/삭제된 기록/);
  assert.equal(D.getStars(model,[{entityId:'a',actor:{id:'local'}}]).length,0);
});
test('local stars import private bookmarks only locally and explicit unstar survives reopening',async()=>{
  const initial={'songhyeon-research-v1:bookmarks':JSON.stringify(['a']),'songhyeon-research-v1:local-id':JSON.stringify('keeper')};
  const {core,memory}=runtime({initial});assert.equal(core.isStarred('a'),true);
  const info=[];core.subscribe((state,change)=>{if(change.event)info.push(change);});
  const removed=await core.toggleStar('a',{clientEventId:'remove-old-bookmark'});
  assert.equal(removed.ok,true);assert.equal(core.isStarred('a'),false);assert.equal(core.getState().stars.length,0);
  assert.equal(info.at(-1).starsChanged,true);assert.equal(info.at(-1).entitiesChanged,false);
  const reopened=runtime({initial:Object.fromEntries(memory)}).core;assert.equal(reopened.isStarred('a'),false);
  assert.equal((await reopened.setStar('b',true)).ok,true);assert.equal(reopened.countStars('b'),1);
  assert.equal((await reopened.setStar('b',true)).ok,true);assert.equal(reopened.countStars('b'),1);
  assert.equal((await reopened.setStar('b',false)).ok,true);assert.equal(reopened.countStars('b'),0);
});
test('local favorite API can select more than ten rows',async()=>{
  const fixture={entities:Array.from({length:12},(_,index)=>({id:'s'+index,name:'상점 '+index}))};
  const {core}=runtime({fixture});
  for(const entity of fixture.entities)assert.equal((await core.setStar(entity.id,true)).ok,true);
  assert.equal(core.getState().stars.length,12);
});
test('shared stars use verified actor, preserve old selections and never upload private bookmarks',async()=>{
  const events=[event('legacy','top10.set','team-top10',{items:[{entityId:'b'}]},'u2',1)];
  let session={id:'u1',name:'팀원1',role:'editor'},writes=0;
  const adapter={getState:async()=>({events:structuredClone(events),revision:events.length,session}),saveEvent:async body=>{writes++;const saved={...event('star'+writes,body.type,body.entityId,body.payload,session.id,events.length+1),actor:structuredClone(session)};events.push(saved);return {event:saved,revision:events.length};}};
  const {core,memory}=runtime({adapter,initial:{'songhyeon-research-v1:bookmarks':JSON.stringify(['a'])}});
  await core.refresh();assert.equal(core.isStarred('a'),false);assert.equal(writes,0);assert.equal(core.getState().stars[0].actor.id,'u2');
  assert.equal((await core.setStar('b',true)).ok,true);assert.equal(core.countStars('b'),2);
  assert.equal((await core.setStar('b',true)).ok,true);assert.equal(core.countStars('b'),2);
  assert.equal((await core.setStar('b',false)).ok,true);assert.equal(core.countStars('b'),1);assert.equal(core.getState().stars[0].actor.id,'u2');
  session={id:'u1',name:'팀원1',role:'viewer'};await core.refresh();assert.equal((await core.setStar('a',true)).ok,false);assert.equal(writes,3);
  assert.equal(memory.has('songhyeon-research-v1:events'),false);
});
test('soft-deleted rows disappear from stars while the event log and earlier selections remain',async()=>{
  const {core}=runtime();
  assert.equal((await core.mutate('entity.create','star-owned',{id:'star-owned',name:'임시 등록'})).ok,true);
  assert.equal((await core.setStar('star-owned',true)).ok,true);assert.equal(core.countStars('star-owned'),1);
  assert.equal((await core.deleteEntity('star-owned')).ok,true);assert.equal(core.countStars('star-owned'),0);assert.equal(core.isStarred('star-owned'),false);
  const audit=core.exportJSON({download:false});assert.equal(audit.starStates[0].active,true);assert.equal(audit.events.some(event=>event.type==='star.set'),true);
});
test('core deletion hides all active surfaces and survives reopen without purging append history',async()=>{
  const {core,memory}=runtime();
  assert.equal(core.canDeleteEntity('a'),false);
  assert.equal((await core.deleteEntity('a')).ok,false);
  const created=await core.mutate('entity.create','mine',{id:'mine',name:'내 등록',legacyRefs:[{raw:'원본 보존'}],research:[{note:'내 첫 의견'}],sites:[{id:'mine-site',address:'서울 종로구 인사동길 99',lat:37.57,lon:126.98}]},{clientEventId:'create-mine'});
  assert.equal(created.ok,true);assert.equal(core.canDeleteEntity('mine'),true);
  assert.equal(core.toggleBookmark('mine'),true);
  assert.equal((await core.mutate('top10.set','team-top10',{items:[{entityId:'mine'},{entityId:'a'}]},{clientEventId:'vote-mine'})).ok,true);
  const notifications=[];core.subscribe((state,info)=>{if(info.event)notifications.push(info);});
  const result=await core.deleteEntity('mine',{clientEventId:'delete-mine'});
  assert.equal(result.ok,true);assert.equal(core.getEntity('mine'),null);assert.equal(core.isEntityDeleted('mine'),true);assert.equal(core.isEntityDeleted('not-saved'),false);
  assert.equal(core.canDeleteEntity('mine'),false);assert.equal(core.isBookmarked('mine'),false);assert.equal(core.getState().bookmarks.includes('mine'),false);
  assert.equal(core.getState().entities.some(entity=>entity.id==='mine'),false);
  assert.deepEqual(JSON.parse(JSON.stringify(core.getState().ballots[0].items)),[{entityId:'a'}]);
  assert.equal((await core.geocode('인사동길 99')).results.length,0);
  assert.equal(notifications.at(-1).ballotsChanged,true);
  const retry=await core.deleteEntity('mine',{clientEventId:'delete-mine'});assert.equal(retry.ok,true);assert.equal(retry.event.id,result.event.id);
  const audit=core.exportJSON({download:false});assert.equal(audit.events.length,3);assert.equal(audit.entities.find(entity=>entity.id==='mine').research.length,1);assert.equal(audit.ballots[0].items.length,2);
  const resumed=runtime({initial:Object.fromEntries(memory)}).core;
  assert.equal(resumed.getEntity('mine'),null);assert.equal(resumed.isEntityDeleted('mine'),true);assert.equal(resumed.getState().ballots[0].revision,2);
});
test('shared deletion follows the verified session role and creator instead of last updater',async()=>{
  let session={id:'owner',name:'같은 이름',role:'editor'};
  const owned=event('create-owner','entity.create','owned',{id:'owned',name:'직접 등록'},'owner',1);
  const update=event('other-edit','entity.patch','owned',{name:'다른 사람 수정'},'other',2);
  const adapter={getState:async()=>({events:[owned,update],revision:2,session}),saveEvent:async body=>({event:{...event('delete-owner',body.type,body.entityId,body.payload,session.id,3),actor:session},revision:3})};
  const {core}=runtime({adapter});await core.refresh();assert.equal(core.canDeleteEntity('owned'),true);
  session={id:'other',name:'같은 이름',role:'admin'};await core.refresh();assert.equal(core.canDeleteEntity('owned'),false);assert.equal((await core.deleteEntity('owned')).ok,false);
  session={id:'owner',name:'같은 이름',role:'viewer'};await core.refresh();assert.equal(core.canDeleteEntity('owned'),false);assert.equal((await core.deleteEntity('owned')).ok,false);
  session={id:'owner',name:'같은 이름',role:'editor'};await core.refresh();assert.equal((await core.deleteEntity('owned')).ok,true);assert.equal(core.getEntity('owned'),null);
});
test('v1 private bookmarks, author id and appended history survive local v2 edits',async()=>{
  const initial={'songhyeon-research-v1:events':JSON.stringify([event('v1','research.add','a',{note:'v1 내용'},'local-keeper')]),'songhyeon-research-v1:bookmarks':JSON.stringify(['a']),'songhyeon-research-v1:local-id':JSON.stringify('keeper'),'songhyeon-research-v1:actor':JSON.stringify('내 이름')};
  const {core,memory}=runtime({initial});
  assert.equal(core.getState().actor.id,'local-keeper');assert.equal(core.isBookmarked('a'),true);
  const payload={fields:{name:'수정한 가게'},research:{note:'v2 내용'}};
  const results=await Promise.all([core.mutate('sheet.row.save','a',payload,{clientEventId:'same'}),core.mutate('sheet.row.save','a',payload,{clientEventId:'same'})]);
  assert.equal(results.every(result=>result.ok),true);
  assert.equal(core.getEntity('a').research.length,3);
  assert.equal(JSON.parse(memory.get('songhyeon-research-v1:events')).length,2);
  const reopened=runtime({initial:Object.fromEntries(memory)}).core;
  assert.equal(reopened.getEntity('a').name,'수정한 가게');assert.equal(reopened.isBookmarked('a'),true);
  assert.equal(reopened.getEntity('a').research[1].note,'v1 내용');
  assert.equal(reopened.getEntity('a').research[2].note,'v2 내용');
});
test('shared failure never writes to local storage, and retry keeps its idempotency id',async()=>{
  let failures=true,accepted=null;const ids=[];
  const adapter={getState:async()=>({events:[],revision:0,session:{id:'server-user',name:'팀원'}}),saveEvent:async body=>{ids.push(body.clientEventId);if(!accepted)accepted=event('ack',body.type,body.entityId,body.payload,'server-user',1);if(failures){failures=false;throw new Error('응답 손실');}return {event:accepted,revision:1};}};
  const {core,memory}=runtime({adapter});await core.refresh();
  const result=await core.mutate('sheet.row.save','a',{fields:{assignee:'팀원'}});
  assert.equal(result.ok,false);assert.equal(core.getState().mode,'error');
  assert.equal(memory.has('songhyeon-research-v1:events'),false);
  await core.refresh();const retry=await core.mutate('sheet.row.save','a',{fields:{assignee:'팀원'}});
  assert.equal(retry.ok,true);assert.equal(ids[0],ids[1]);
  assert.equal(core.getEntity('a').assignee,'팀원');assert.equal(core.getState().actor.id,'server-user');
});
test('late GET response cannot erase a newer POST acknowledgement',async()=>{
  let resolveGet;let count=0;
  const adapter={getState:()=>++count===1?Promise.resolve({events:[],revision:0,session:{id:'u1',name:'팀원'}}):new Promise(resolve=>{resolveGet=resolve;}),saveEvent:async body=>({event:event('new',body.type,body.entityId,body.payload,'u1',2),revision:2})};
  const {core}=runtime({adapter});await core.refresh();
  const pendingGet=core.refresh();
  await core.mutate('sheet.row.save','a',{fields:{name:'저장된 이름'}});
  resolveGet({events:[],revision:0,session:{id:'u1',name:'팀원'}});await pendingGet;
  assert.equal(core.getEntity('a').name,'저장된 이름');assert.equal(core.getState().revision,2);
});
test('lost top10 acknowledgement can retry with the same id after refresh replays its ballot',async()=>{
  let saved=null,calls=0;
  const adapter={getState:async()=>({events:saved?[saved]:[],revision:saved?1:0,session:{id:'u1',name:'팀원'}}),saveEvent:async body=>{calls++;if(!saved)saved=event('top-ack',body.type,body.entityId,body.payload,'u1',1);if(calls===1)throw new Error('응답 손실');return {event:saved,revision:1};}};
  const {core}=runtime({adapter});await core.refresh();
  const payload={items:[{entityId:'a',note:'추천'}],expectedRevision:0};
  assert.equal((await core.mutate('top10.set','team-top10',payload,{clientEventId:'stable'})).ok,false);
  await core.refresh();assert.equal(core.getState().ballots[0].revision,1);
  assert.equal((await core.mutate('top10.set','team-top10',payload,{clientEventId:'stable'})).ok,true);
  assert.equal(calls,2);assert.equal(core.getState().ballots.length,1);
});
test('private geocoder omits historical map-disabled locations and preserves unknown address',async()=>{
  const {core}=runtime();
  const known=await core.geocode('인사동길');assert.equal(known.results[0].coordinateStatus,'source_point');
  const unknown=await core.geocode('없는 주소');assert.equal(unknown.results.length,0);
  assert.equal(core.getEntity('a').sites[0].lat,37.57);
});
test('official selection history has distinct source and recognition labels',()=>{
  const entity={sourceTags:['oraegage','baeknyeon'],recognitions:[{program:'오래가게'},{program:'백년가게'},{program:'오래가게'},{program:'알 수 없는 제도'}]};
  assert.deepEqual(D.getSourceNames(entity),['서울 오래가게 선정','백년가게 선정']);
  assert.deepEqual(D.getRecognitionNames(entity),['서울 오래가게','백년가게']);
  assert.deepEqual(D.getRecognitionNames({}),[]);
  const {core}=runtime();assert.deepEqual(JSON.parse(JSON.stringify(core.getRecognitionNames(entity))),['서울 오래가게','백년가게']);
});
test('generic maker and institution types use the same kind labels as original Korean records',()=>{
  for(const entityType of ['maker','craftsperson','studio','작가·공방','작가·디자인 스튜디오'])assert.equal(D.getKind({entityType}),'제작자·공방');
  for(const entityType of ['museum','organization','public_institution','complex','association','expert','차문화 기획·해설 전문가'])assert.equal(D.getKind({entityType}),'전문가·기관');
  assert.equal(D.getKind({entityType:'shop'}),'상점');assert.equal(D.getKind({entityType:'brand'}),'브랜드');
});
test('explicit research areas take precedence while unsupported area values fall back to address',()=>{
  const site={id:'area',address:'서울 종로구 삼일대로 428'};
  for(const researchArea of ['인사동·송현','북촌·삼청','서촌'])assert.equal(D.getRegion({researchArea,sites:[site]}),researchArea);
  assert.equal(D.getRegion({researchArea:'미지정 지역',sites:[site]}),'서울 기타');
  assert.equal(D.getRegion({researchArea:'서촌',sites:[]}),'서촌');
});
test('specific food business categories are classified as food rather than other',()=>{
  for(const value of ['분식','떡집','제과','김밥','수제비','참기름','견과','설렁탕','해장국'])assert.equal(D.getCategory({categories:[value]}),'식음');
  assert.equal(D.getCategory({categories:['분야 미확인']}),'기타');
  assert.equal(D.getCategory({categories:['소반·목공']}),'목공·소반');
});
test('HTTP string error codes are preserved for top10 conflict handling',async()=>{
  const fetcher=async url=>url.endsWith('/state')?{ok:true,status:200,json:async()=>({events:[],revision:0,session:{id:'u1',name:'팀원'}})}:{ok:false,status:409,json:async()=>({error:'top10_conflict',message:'다른 창에서 변경했습니다.'})};
  const {core}=runtime({protocol:'https:',config:{apiBase:'/api/insadong-research'},fetch:fetcher});
  await core.refresh();const result=await core.mutate('top10.set','team-top10',{items:[],expectedRevision:0});
  assert.equal(result.ok,false);assert.equal(result.error.code,'top10_conflict');assert.equal(result.error.status,409);assert.equal(core.getState().mode,'shared');
});
test('full seed replay is structurally identical before any edit and retains original base records',()=>{
  const actual=JSON.parse(fs.readFileSync(path.join(__dirname,'../references/shop-research/seed.json'),'utf8'));
  assert.ok(actual.entities.length>=349);
  assert.ok(actual.entities.some(entity=>entity.id==='entity-6855d5eb77600a'));
  assert.deepEqual(D.replay(actual,[]).entities,actual.entities);
});
(async()=>{let failed=0;for(const {name,fn} of tests){try{await fn();console.log('PASS '+name);}catch(error){failed++;console.error('FAIL '+name);console.error(error);}}console.log(`${tests.length-failed}/${tests.length} passed`);process.exitCode=failed?1:0;})();
