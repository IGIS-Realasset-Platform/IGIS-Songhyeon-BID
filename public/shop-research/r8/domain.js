/* Pure research data rules. Existing seed records are preserved, never reclassified in place. */
(function (root) {
  'use strict';
  const clone = value => value == null ? value : JSON.parse(JSON.stringify(value));
  const arr = value => Array.isArray(value) ? value : [];
  const str = value => value == null ? '' : typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '';
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);
  const norm = value => str(value).normalize('NFKC').toLowerCase().replace(/[\s·.,()\[\]_-]+/g, '');
  const sourceNames = Object.freeze({legacy:'기존 인사동 상점 목록', priority:'기존 컨택 후보 9곳', kcdf:'KCDF 잡지 수록', additional:'추가 제안 업체', sns:'SNS 인기 매장 시트', team:'팀원 등록', import:'가져온 기록', oraegage:'서울 오래가게 선정', baeknyeon:'백년가게 선정'});
  const categoryNames = ['도자·다구','목공·소반','금속·주얼리','섬유·보자기','한지·필방','고미술','미술·화랑','식음','문화공간','생활용품','공예','기타'];
  const regionNames = ['인사동·송현','북촌·삼청','서촌','서울 기타','서울 외','주소 미등록'];
  const kindNames = ['상점','브랜드','제작자·공방','전문가·기관'];
  const isCoords = (lat, lon) => typeof lat === 'number' && typeof lon === 'number' && Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  const timestamp = value => { const n = Date.parse(value || ''); return Number.isFinite(n) ? n : 0; };
  const isActiveEntity = entity => !!entity && !entity.deletedAt;
  const canDeleteEntity = (entity, actor) => isActiveEntity(entity) && !!actor?.id && ['local','editor','reviewer','admin'].includes(actor.role) && entity.createdBy?.id === actor.id;
  function activeBallots(ballots, entities) {
    const ids = new Set(arr(entities).filter(isActiveEntity).map(entity => entity.id));
    return arr(ballots).map(ballot => ({...clone(ballot),items:arr(ballot.items).filter(item => ids.has(item.entityId)).map(clone)}));
  }
  function getStars(model, initial=[]) {
    const entries=new Map(), ids=new Set(arr(model?.entities).filter(isActiveEntity).map(entity=>entity.id));
    const key=(actorId,entityId)=>JSON.stringify([actorId,entityId]);
    function put(value){if(value.actor?.id&&ids.has(value.entityId))entries.set(key(value.actor.id,value.entityId),{entityId:value.entityId,actor:clone(value.actor),createdAt:value.createdAt||null});}
    arr(initial).forEach(put);
    // Historical actual ballots are a starting selection, never a new upload.
    arr(model?.ballots).forEach(ballot=>arr(ballot.items).forEach(item=>put({entityId:item.entityId,actor:ballot.actor,createdAt:ballot.updatedAt})));
    arr(model?.starStates).forEach(value=>{if(value.active)put(value);else entries.delete(key(value.actor?.id,value.entityId));});
    return [...entries.values()];
  }
  function getSourceNames(entity) { return [...new Set(arr(entity?.sourceTags).map(key => sourceNames[key] || key))]; }
  function getRecognitionNames(entity) {
    const values=[];
    for(const record of arr(entity?.recognitions)){
      const program=typeof record==='string'?record:record?.program;
      if(program==='오래가게'||program==='서울 오래가게')values.push('서울 오래가게');
      else if(program==='백년가게')values.push('백년가게');
    }
    return [...new Set(values)];
  }
  function getCategory(entity) {
    const value = arr(entity?.categories).join(' ');
    if (/도자|그릇|식기|다구|다기|청자/.test(value)) return '도자·다구';
    if (/목공|소반|가구|목기|대나무|죽공|완초/.test(value)) return '목공·소반';
    if (/금속|유기|놋|주얼|은공/.test(value)) return '금속·주얼리';
    if (/보자기|섬유|자수|매듭|직조|의류|직물|삼베/.test(value)) return '섬유·보자기';
    if (/한지|지업|필방|문방|종이|서화|제본/.test(value)) return '한지·필방';
    if (/골동|고미술|앤티크/.test(value)) return '고미술';
    if (/화랑|갤러리|미술|예술|표구|gallery/i.test(value)) return '미술·화랑';
    if (/cafe|음식|카페|식당|F&B|식음|디저트|찻집|레스토랑|식품|음료|베이커리|한식|와인|다이닝|사찰|분식|떡집|제과|김밥|수제비|참기름|견과|설렁탕|해장국|^차·/i.test(value)) return '식음';
    if (/문화|공간|기관|박물관|전시|복합|museum/i.test(value)) return '문화공간';
    if (/공예|장인|공방|칠기|나전|옻/.test(value)) return '공예';
    if (/향|뷰티|생활|라이프|기념품|잡화|패션|heritage shop/i.test(value)) return '생활용품';
    return '기타';
  }
  function getRegion(entity) {
    if(regionNames.includes(entity?.researchArea))return entity.researchArea;
    const sites = arr(entity?.sites).filter(site => site.mapVisible !== false);
    const site = sites.find(item => str(item.address).trim()) || {};
    const value = [site.address, site.name].map(str).join(' ');
    if (!str(site.address).trim()) return '주소 미등록';
    if (/부산|대구|대전|울산|광주광역|전주|남원|강릉|제주|경기도|경기 |경남|경북|충북|충남|전남|전북|강원|용인|이천|파주|진주|통영/.test(value)) return '서울 외';
    if (/자하문|효자|서촌|통의|통인동|옥인|누상|누하|필운|사직|경복궁역/.test(value)) return '서촌';
    if (/계동|가회|북촌|원서|삼청|안국|창덕궁|윤보선|북촌로/.test(value)) return '북촌·삼청';
    if (/인사동|관훈|견지|공평|낙원|우정국|송현|수송|율곡로|종로구 인사/.test(value)) return '인사동·송현';
    if (/서울/.test(value)) return '서울 기타';
    return '서울 외';
  }
  function getKind(entity) {
    const value = str(entity?.entityType);
    if (/^(brand|company)$|브랜드/.test(value)) return '브랜드';
    if (/^(maker|craftsperson|studio)$|작가|공방|제작자/.test(value)) return '제작자·공방';
    if (/^(expert|museum|organization|public_institution|complex|association)$|전문가|기관|협회/.test(value)) return '전문가·기관';
    return '상점';
  }
  function orderedResearch(entity) {
    return arr(entity?.research).map((value, index) => ({value, index})).sort((a,b) => timestamp(b.value.createdAt || b.value.checkedAt || b.value.date) - timestamp(a.value.createdAt || a.value.checkedAt || a.value.date) || b.index - a.index).map(item => item.value);
  }
  function readLatest(entity, field, fallback = '') {
    const record = orderedResearch(entity).find(item => own(item, field));
    return record ? record[field] : own(entity, field) ? entity[field] : fallback;
  }
  function getLatestResearch(entity) {
    const records = orderedResearch(entity);
    const latest = records[0] || {};
    const evidence = arr(entity?.evidence).find(item => typeof item === 'object' && item?.url);
    return {...clone(latest), reason:readLatest(entity,'reason',''), popularityReason:readLatest(entity,'popularityReason',''), note:readLatest(entity,'note',''), priceSummary:readLatest(entity,'priceSummary',''), evidenceUrl:readLatest(entity,'evidenceUrl',evidence?.url || ''), actor:clone(latest.actor || (latest.author ? {name:latest.author} : null)), createdAt:latest.createdAt || latest.checkedAt || latest.date || null};
  }
  function upsertSite(entity, site) {
    entity.sites = arr(entity.sites);
    const index = entity.sites.findIndex(item => item.id === site.id);
    if (index < 0) entity.sites.push(clone(site));
    else {
      const previous=entity.sites[index];
      const next={...previous,...clone(site)};
      if(own(site,'address')&&site.address!==previous.address&&!own(site,'lat')&&!own(site,'lon')){next.lat=null;next.lon=null;next.coordinateStatus='unresolved';}
      entity.sites[index]=next;
    }
  }
  function stampedResearch(record, event, suffix) {
    return {...clone(record), id:record.id || event.id + (suffix || ''), actor:clone(event.actor || record.actor || {name:'작성자 미기록'}), createdAt:event.createdAt || record.createdAt || null};
  }
  function addResearch(entity, research, event, suffix) {
    entity.research = arr(entity.research);
    const record = stampedResearch(research,event,suffix);
    if (!entity.research.some(item => item.id && item.id === record.id)) entity.research.push(record);
  }
  function applyEvent(model, event) {
    if (!event || !event.type) return model;
    const payload = event.payload || {};
    if (event.type === 'star.set') {
      if (!event.actor?.id || typeof payload.active!=='boolean') return model;
      model.starStates=arr(model.starStates);
      const value={entityId:event.entityId,actor:clone(event.actor),active:payload.active,createdAt:event.createdAt||null,revision:Number.isInteger(event.revision)?event.revision:0};
      const index=model.starStates.findIndex(item=>item.actor.id===event.actor.id&&item.entityId===event.entityId);
      if(index<0)model.starStates.push(value);else model.starStates[index]=value;
      return model;
    }
    if (event.type === 'top10.set') {
      if (!event.actor?.id) return model;
      const ballot = {actor:clone(event.actor),items:clone(arr(payload.items)),updatedAt:event.createdAt || null,revision:Number.isInteger(event.revision)?event.revision:0};
      const index = model.ballots.findIndex(item => item.actor.id === event.actor.id);
      if (index < 0) model.ballots.push(ballot); else model.ballots[index] = ballot;
      return model;
    }
    if (event.type === 'entity.create') {
      const raw = payload.entity || payload;
      const id = raw.id || event.entityId;
      if (!id || !raw.name || model.entities.some(entity => entity.id === id)) return model;
      const entity = {aliases:[],categories:[],purposes:[],sourceTags:['team'],sites:[],evidence:[],research:[],legacyRefs:[],...clone(raw),id,createdAt:event.createdAt,createdBy:clone(event.actor)};
      entity.research = arr(raw.research).map((record,index) => stampedResearch(record,event,':research:' + index));
      model.entities.push(entity);
      return model;
    }
    const entity = model.entities.find(item => item.id === event.entityId);
    if (!entity) return model;
    if (!isActiveEntity(entity)) return model;
    switch (event.type) {
      case 'entity.delete':entity.deletedAt=event.createdAt;entity.deletedBy=clone(event.actor);break;
      case 'sheet.row.save': {
        for (const key of ['name','entityType','categories','assignee','contacts']) if (own(payload.fields,key)) entity[key] = clone(payload.fields[key]);
        if (payload.site) upsertSite(entity,payload.site);
        if (payload.research) addResearch(entity,payload.research,event,':research');
        break;
      }
      case 'entity.patch': {
        for (const key of ['name','aliases','entityType','categories','purposes','working','candidate','reason','popularityReason','productSummary','priceSummary','contacts']) if (own(payload,key)) entity[key] = clone(payload[key]);
        break;
      }
      case 'research.add':addResearch(entity,payload,event);break;
      case 'priority.set':entity.priority=!!payload.value;entity.working=entity.working||!!payload.value;break;
      case 'disposition.set':entity.disposition=payload.value;break;
      case 'researchStatus.set':entity.researchStatus=payload.value;break;
      case 'assignment.set':entity.assignee=payload.assignee||'';break;
      case 'site.upsert':upsertSite(entity,payload.site||payload);break;
      default:return model;
    }
    entity.updatedAt=event.createdAt || entity.updatedAt;
    entity.updatedBy=clone(event.actor || entity.updatedBy);
    return model;
  }
  function replay(seed, events) {
    const model={entities:clone(arr(seed?.entities)),ballots:[],starStates:[]};
    const seen=new Set();
    arr(events).forEach((raw,index) => {
      const key=raw.id || (raw.clientEventId ? (raw.actor?.id || '') + ':' + raw.clientEventId : null);
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      applyEvent(model,{...raw,revision:Number.isInteger(raw.revision)?raw.revision:index+1});
    });
    return model;
  }
  function fail(code,message) { const error=new Error(message); error.code=code; throw error; }
  function validateMutation(model,type,entityId,payload,actor) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) fail('invalid_payload','입력 내용을 확인해 주세요.');
    const entity=model.entities.find(item => item.id === entityId);
    if (type === 'top10.set') {
      if(entityId!=='team-top10')fail('invalid_target','추천 목록의 저장 위치가 올바르지 않습니다.');
      if(!Array.isArray(payload.items)||payload.items.length>10)fail('invalid_top10','추천은 최대 10곳까지 고를 수 있습니다.');
      const ids=new Set();
      payload.items.forEach(item => {
        if (!item || !model.entities.some(value => value.id===item.entityId && isActiveEntity(value))) fail('unknown_entity','목록에 없는 상점을 추천할 수 없습니다.');
        if(ids.has(item.entityId))fail('duplicate_top10','같은 곳을 두 번 고를 수 없습니다.');
        ids.add(item.entityId);
        if(item.note!=null && (typeof item.note!=='string'||item.note.length>4000))fail('invalid_note','추천 이유는 4,000자까지 입력할 수 있습니다.');
      });
      const ballot=model.ballots.find(value => value.actor.id===actor.id);
      if(own(payload,'expectedRevision') && (!Number.isInteger(payload.expectedRevision)||payload.expectedRevision!==(ballot?.revision||0)))fail('ballot_conflict','다른 화면에서 내 TOP 10이 바뀌었습니다. 최신 목록을 확인해 주세요.');
      return;
    }
    if(type==='entity.create') {
      const raw=payload.entity||payload;
      if(!str(raw.name).trim())fail('missing_name','이름을 입력해 주세요.');
      if(model.entities.some(value=>value.id===(raw.id||entityId)))fail('duplicate_entity','이미 등록된 기록입니다.');
      if(arr(raw.research).length>1)fail('invalid_history','최초 의견은 한 개로 저장해 주세요.');
      arr(raw.research).forEach(validateResearch);
      if(raw.sites)raw.sites.forEach(validateSite);
      return;
    }
    if(!entity)fail('unknown_entity','해당 기록을 찾을 수 없습니다.');
    if(!isActiveEntity(entity))fail('entity_deleted','삭제된 기록은 수정할 수 없습니다.');
    if(type==='star.set') {
      if(Object.keys(payload).length!==1 || typeof payload.active!=='boolean')fail('invalid_star','별표 선택값을 확인해 주세요.');
      if(!actor?.id||!['local','editor','reviewer','admin'].includes(actor.role))fail('read_only','이 계정에는 조회 권한만 있습니다.');
      return;
    }
    if(type==='entity.delete') {
      if(Object.keys(payload).length)fail('invalid_delete','삭제 요청에는 별도 입력값이 필요하지 않습니다.');
      if(!canDeleteEntity(entity,actor))fail('delete_forbidden','직접 등록한 기록만 삭제할 수 있습니다.');
      return;
    }
    if(type==='sheet.row.save') {
      if(!payload.site&&!payload.research&&!Object.keys(payload.fields||{}).length)fail('empty_change','변경할 내용을 입력해 주세요.');
      if(own(payload.fields,'name')&&!str(payload.fields.name).trim())fail('missing_name','이름을 입력해 주세요.');
      if(payload.site)validateSite(payload.site);
      if(payload.research)validateResearch(payload.research,true);
      if(own(payload.fields,'contacts')){const contacts=payload.fields.contacts;if(!contacts||typeof contacts!=='object'||Array.isArray(contacts))fail('invalid_contacts','홈페이지·SNS 입력을 확인해 주세요.');for(const item of arr(contacts.links)){if(!item||!str(item.url))fail('invalid_url','홈페이지·SNS 주소를 확인해 주세요.');try{if(!/^https?:$/.test(new URL(item.url).protocol))throw new Error();}catch{fail('invalid_url','홈페이지·SNS 주소를 확인해 주세요.');}}}
    }
    if(type==='site.upsert')validateSite(payload.site||payload);
    if(type==='research.add')validateResearch(payload);
  }
  function validateResearch(record,allowExplicitEmpty=false) {
    if(!record||typeof record!=='object'||Array.isArray(record))fail('invalid_research','조사 의견을 확인해 주세요.');
    const keys=['reason','popularityReason','note','priceSummary','evidenceUrl','activities'];
    if(!keys.some(key=>Array.isArray(record[key])?record[key].length:str(record[key]).trim())&&!(allowExplicitEmpty&&keys.some(key=>own(record,key))))fail('empty_research','조사 의견이나 근거를 입력해 주세요.');
    for(const key of ['reason','popularityReason','note','priceSummary'])if(own(record,key)&&(typeof record[key]!=='string'||record[key].length>12000))fail('invalid_research','조사 의견은 항목당 12,000자까지 입력할 수 있습니다.');
    if(record.evidenceUrl){try{if(!/^https?:$/.test(new URL(record.evidenceUrl).protocol))throw new Error();}catch{fail('invalid_url','근거 링크는 http 또는 https 주소를 입력해 주세요.');}}
  }
  function validateSite(site) {
    if(!site || !site.id)fail('invalid_site','지점 ID를 확인해 주세요.');
    if(site.lat==null&&site.lon==null)return;
    if(!isCoords(site.lat,site.lon))fail('invalid_coordinates','위도·경도를 함께 확인해 주세요.');
  }
  function aggregateTop10(ballots,entities=[]) {
    const entries=new Map(); let selectionCount=0;
    const visibleBallots=arguments.length>1?activeBallots(ballots,entities):arr(ballots);
    visibleBallots.forEach(ballot => arr(ballot.items).forEach((item,index) => {
      const row=entries.get(item.entityId)||{entityId:item.entityId,count:0,rankSum:0,recommendations:[]};
      row.count++;row.rankSum+=index+1;selectionCount++;
      row.recommendations.push({actor:clone(ballot.actor),rank:index+1,note:item.note||''});entries.set(item.entityId,row);
    }));
    const names=new Map(arr(entities).map(entity=>[entity.id,entity.name]));
    const ranked=[...entries.values()].map(row=>({...row,averageRank:row.rankSum/row.count})).sort((a,b)=>b.count-a.count||a.averageRank-b.averageRank||(names.get(a.entityId)||a.entityId).localeCompare(names.get(b.entityId)||b.entityId,'ko'));
    let prior=null;ranked.forEach((row,index)=>{row.rank=prior&&row.count===prior.count&&row.rankSum*prior.count===prior.rankSum*row.count?prior.rank:index+1;prior=row;});
    return {rows:ranked,participantCount:visibleBallots.filter(ballot=>arr(ballot.items).length).length,selectionCount};
  }
  const domain={clone,arr,str,norm,isCoords,isActiveEntity,canDeleteEntity,activeBallots,getStars,sourceNames,categoryNames,regionNames,kindNames,getSourceNames,getRecognitionNames,getCategory,getRegion,getKind,orderedResearch,readLatest,getLatestResearch,replay,applyEvent,validateMutation,aggregateTop10};
  root.ResearchDomain=domain;
  if(typeof module==='object'&&module.exports)module.exports=domain;
})(typeof window!=='undefined'?window:globalThis);
