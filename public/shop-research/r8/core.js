/* Transport, event replay and personal preferences. No UI rendering lives here. */
(function(root){
  'use strict';
  const D=root.ResearchDomain;
  if(!D)throw new Error('domain.js를 core.js보다 먼저 불러와 주세요.');
  const uid=()=>root.crypto?.randomUUID?.()||'r-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,11);
  const STORAGE='songhyeon-research-v1:';
  function create({seed,config={},adapter=null}={}){
    if(!seed||!Array.isArray(seed.entities))throw new Error('상점 기초자료가 없습니다.');
    const apiBase=D.str(config.apiBase).replace(/\/$/,'');
    const isFile=(root.location?.protocol||'file:')==='file:';
    const hasAdapter=!!adapter&&typeof adapter.getState==='function'&&typeof adapter.saveEvent==='function';
    if(adapter&&!hasAdapter)throw new Error('플랫폼 연결에 getState와 saveEvent 함수가 필요합니다.');
    const useShared=config.mode!=='local'&&(hasAdapter||(!isFile&&!!apiBase));
    if(config.mode==='shared'&&!useShared)throw new Error('팀 공동 저장에 사용할 플랫폼 연결 또는 API 주소가 없습니다.');
    const listeners=new Set(),attempts=new Map(),inflight=new Map(),knownRequests=new Map();
    let destroyed=false,started=false,timer=null,refreshPromise=null,pending=0;
    let mode=useShared?'connecting':'local',serverMode=null,revision=0,session=null,connectionError='';
    let localEvents=read('events',[]),serverEvents=[],lastSync=null;
    if(!Array.isArray(localEvents))localEvents=[];
    let localId=read('local-id',null);if(!localId){localId=uid();write('local-id',localId);}
    let localName=D.str(read('actor','')).trim()||'로그인 미연결';
    let bookmarks=new Set(D.arr(read('bookmarks',[])));
    let model=D.replay(seed,mode==='local'?localEvents:[]);
    if(mode==='local')revision=maxRevision(localEvents);
    function read(key,fallback){try{const value=JSON.parse(root.localStorage?.getItem(STORAGE+key)||'null');return value==null?fallback:value;}catch{return fallback;}}
    function write(key,value){try{if(!root.localStorage)return false;root.localStorage.setItem(STORAGE+key,JSON.stringify(value));return true;}catch{return false;}}
    function actor(){return mode==='local'?{id:'local-'+localId,name:localName,role:'local'}:session?{id:session.id,name:session.name||'팀원',role:session.role||'member'}:{id:'',name:'연결 확인 중',role:'viewer'};}
    function activeEntities(){return model.entities.filter(D.isActiveEntity);}
    function getEntity(id){return model.entities.find(entity=>entity.id===id&&D.isActiveEntity(entity))||null;}
    function isEntityDeleted(id){return model.entities.some(entity=>entity.id===id&&!D.isActiveEntity(entity));}
    function canDeleteEntity(id){return (mode==='local'||mode==='shared')&&D.canDeleteEntity(getEntity(id),actor());}
    function deleteEntity(id,options={}){return mutate('entity.delete',id,{},options);}
    function currentStars(){return D.getStars(model,mode==='local'?[...bookmarks].map(entityId=>({entityId,actor:actor(),createdAt:null})):[]);}
    function isStarred(id){return currentStars().some(value=>value.entityId===id&&value.actor.id===actor().id);}
    function countStars(id){return currentStars().filter(value=>value.entityId===id).length;}
    function setStar(id,active,options={}){return mutate('star.set',id,{active},options);}
    function toggleStar(id,options={}){return setStar(id,!isStarred(id),options);}
    function getState(){const entities=activeEntities();return {entities,mode,serverMode,revision,session:session?{id:session.id,name:session.name,role:session.role}:null,actor:actor(),stars:currentStars(),ballots:D.activeBallots(model.ballots,entities),bookmarks:[...bookmarks].filter(id=>!!getEntity(id)),connectionError,pending,lastSync};}
    function notify(kind,extra={}){if(destroyed)return;const state=getState();const info={kind,entitiesChanged:false,ballotsChanged:false,starsChanged:false,pending,...extra};for(const fn of [...listeners]){try{fn(state,info);}catch(error){if(config.debug)root.console?.warn('상점 조사 화면 갱신 오류',error);}}}
    function subscribe(fn){if(typeof fn!=='function')return ()=>{};listeners.add(fn);fn(getState(),{kind:'initial',entitiesChanged:true,ballotsChanged:true,starsChanged:true,pending});return ()=>listeners.delete(fn);}
    function maxRevision(events){return events.reduce((max,event,index)=>Math.max(max,Number.isInteger(event.revision)?event.revision:index+1),0);}
    function eventIdentity(event){return event.id||(event.clientEventId?(event.actor?.id||'')+':'+event.clientEventId:null);}
    function mergeEvents(current,incoming){const map=new Map();let index=0;for(const event of [...current,...incoming])map.set(eventIdentity(event)||'legacy-'+index++,event);return [...map.values()].sort((a,b)=>(a.revision||0)-(b.revision||0));}
    function rebuild(){model=D.replay(seed,mode==='local'?localEvents:serverEvents);}
    function httpError(status,data){const error=new Error(D.str(data?.error?.message||data?.message)||(status===409?'다른 화면의 변경 내용을 확인한 뒤 다시 저장해 주세요.':'팀 저장에 연결하지 못했습니다. ('+status+')'));error.status=status;error.code=D.str(data?.error?.code)||(typeof data?.error==='string'?data.error:'')||'request_failed';return error;}
    async function request(path,options={}){
      const controller=typeof AbortController!=='undefined'?new AbortController():null;
      const timeout=controller?setTimeout(()=>controller.abort(),Math.max(3000,Number(config.requestTimeoutMs)||15000)):null;
      try{
        const response=await root.fetch(apiBase+path,{credentials:'same-origin',cache:'no-store',...options,...(controller?{signal:controller.signal}:{})});
        let data;try{data=await response.json();}catch{throw httpError(response.status,{message:'서버 응답을 읽지 못했습니다. 연결 주소를 확인해 주세요.'});}
        if(!response.ok)throw httpError(response.status,data);
        return data;
      }catch(error){if(error.name==='AbortError'){const next=new Error('팀 저장 응답이 지연되고 있습니다. 입력 내용은 유지됩니다.');next.code='timeout';throw next;}throw error;}
      finally{if(timeout)clearTimeout(timeout);}
    }
    async function refresh(){
      if(!useShared||destroyed)return getState();
      if(refreshPromise)return refreshPromise;
      refreshPromise=(async()=>{
        try{
          const data=hasAdapter?await adapter.getState():await request('/state');
          if(!data||!Array.isArray(data.events)||!data.session?.id)throw new Error('팀 계정과 저장 응답을 확인하지 못했습니다.');
          if(config.seedHash&&data.seedHash&&config.seedHash!==data.seedHash){const error=new Error('화면과 서버의 기초자료 버전이 다릅니다. 최신 파일로 연결해 주세요.');error.code='seed_mismatch';throw error;}
          if(destroyed)return getState();
          const oldMode=mode,oldServerMode=serverMode,oldRevision=revision,oldCount=serverEvents.length,oldActor=session?.id;
          session={...data.session};
          serverMode=typeof data.mode==='string'?data.mode:null;
          // A slower GET must not erase a newer POST acknowledgement.
          serverEvents=mergeEvents(serverEvents,data.events);
          revision=Math.max(revision,Number(data.revision)||0,maxRevision(serverEvents));
          mode='shared';connectionError='';lastSync=new Date().toISOString();
          const changed=oldMode!=='shared'||oldRevision!==revision||oldCount!==serverEvents.length;
          if(changed)rebuild();
          if(changed||oldActor!==session.id)notify('sync',{entitiesChanged:changed,ballotsChanged:changed,starsChanged:changed||oldActor!==session.id});
          else if(oldMode!=='shared'||oldServerMode!==serverMode)notify('connection');
          return getState();
        }catch(error){
          if(!destroyed){mode='error';connectionError=error.message||'팀 저장에 연결하지 못했습니다. 입력 내용은 유지됩니다.';notify('connection',{error:{code:error.code||'connection_failed',message:connectionError}});}
          return getState();
        }finally{refreshPromise=null;}
      })();
      return refreshPromise;
    }
    function failure(code,message,status){return {ok:false,error:{code,message,...(status?{status}:{})}};}
    async function mutate(type,entityId,payload,options={}){
      if(destroyed)return failure('destroyed','화면이 종료되었습니다. 다시 열어 주세요.');
      if(mode==='connecting')return failure('connecting','팀 계정과 저장 연결을 확인하고 있습니다. 잠시 후 저장해 주세요.');
      if(mode==='error')return failure('connection_failed',connectionError||'팀 저장 연결을 복구한 뒤 다시 저장해 주세요.');
      const content=D.clone(payload||{});
      const knownRequest=options.clientEventId?knownRequests.get(options.clientEventId):null;
      if(knownRequest && JSON.stringify([type,entityId,payload||{}])!==knownRequest.intent)return failure('idempotency_conflict','같은 저장 ID로 다른 내용을 보낼 수 없습니다. 새 변경으로 저장해 주세요.');
      if(knownRequest)Object.assign(content,D.clone(knownRequest.content));
      if(type==='top10.set'&&!Object.prototype.hasOwnProperty.call(content,'expectedRevision'))content.expectedRevision=model.ballots.find(ballot=>ballot.actor.id===actor().id)?.revision||0;
      const requestKey=JSON.stringify([actor().id,type,entityId,content]);
      const clientEventId=options.clientEventId||attempts.get(requestKey)||uid();
      const repeatedLocal=mode==='local'?localEvents.find(value=>value.clientEventId===clientEventId&&value.actor?.id===actor().id):null;
      if(repeatedLocal){
        if(JSON.stringify([repeatedLocal.type,repeatedLocal.entityId,repeatedLocal.payload])!==JSON.stringify([type,entityId,content]))return failure('idempotency_conflict','같은 저장 ID로 다른 내용을 보낼 수 없습니다.');
        return {ok:true,event:D.clone(repeatedLocal),revision};
      }
      // An acknowledged-but-lost request may now be present in state. The server
      // must get the unchanged retry before checking create/CAS preconditions.
      const retry=!!knownRequest||attempts.has(requestKey);
      if(!retry){try{D.validateMutation(model,type,entityId,content,actor());}catch(error){return failure(error.code||'invalid_payload',error.message);}}
      if(inflight.has(clientEventId))return inflight.get(clientEventId);
      attempts.set(requestKey,clientEventId);
      knownRequests.set(clientEventId,{intent:JSON.stringify([type,entityId,payload||{}]),content:D.clone(content)});
      const promise=Promise.resolve().then(async()=>{
        pending++;notify('mutation',{pending});
        try{
          let event;
          if(mode==='local'){
            // Keep v1 local events and preferences. They are never uploaded implicitly.
            const stored=read('events',localEvents);if(Array.isArray(stored))localEvents=mergeEvents(localEvents,stored);
            const repeated=localEvents.find(value=>value.clientEventId===clientEventId&&value.actor?.id===actor().id);
            if(repeated)event=repeated;
            else{
              const current=D.replay(seed,localEvents);D.validateMutation(current,type,entityId,content,actor());
              const nextRevision=maxRevision(localEvents)+1;
              event={id:uid(),clientEventId,type,entityId,payload:content,actor:actor(),createdAt:new Date().toISOString(),revision:nextRevision};
              const next=[...localEvents,event];
              if(!write('events',next))throw new Error('이 브라우저에 저장할 수 없습니다. 입력 내용을 복사하거나 저장 공간을 확인해 주세요.');
              localEvents=next;
            }
            revision=maxRevision(localEvents);
          }else{
            const body={type,entityId,payload:content,clientEventId};
            const result=hasAdapter?await adapter.saveEvent(body):await request('/events',{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-Token':session?.csrfToken||''},body:JSON.stringify(body)});
            if(!result?.event?.id)throw new Error('서버의 저장 확인을 받지 못했습니다. 입력 내용은 유지됩니다.');
            event=result.event;serverEvents=mergeEvents(serverEvents,[event]);revision=Math.max(revision,Number(result.revision)||0,Number(event.revision)||0);lastSync=new Date().toISOString();
          }
          rebuild();attempts.delete(requestKey);connectionError='';
          notify('mutation',{event,entitiesChanged:type!=='top10.set'&&type!=='star.set',ballotsChanged:type==='top10.set'||type==='entity.delete',starsChanged:type==='star.set'||type==='top10.set'||type==='entity.delete'});
          return {ok:true,event:D.clone(event),revision};
        }catch(error){
          const status=error.status||0;
          if(useShared&&(!status||status===401||status===403||status>=500)){mode='error';connectionError=error.message||'팀 저장에 연결하지 못했습니다. 입력 내용은 유지됩니다.';notify('connection');}
          return failure(error.code||'save_failed',error.message||'저장하지 못했습니다. 입력 내용은 유지됩니다.',status);
        }finally{pending--;inflight.delete(clientEventId);notify('mutation',{pending});}
      });
      inflight.set(clientEventId,promise);
      return promise;
    }
    function toggleBookmark(id){if(!getEntity(id))return false;const next=new Set(bookmarks);if(next.has(id))next.delete(id);else next.add(id);if(!write('bookmarks',[...next]))return false;bookmarks=next;notify('bookmark',{starsChanged:mode==='local'});return next.has(id);}
    function bookmarkMany(ids,value=true){const next=new Set(bookmarks);for(const id of ids)if(getEntity(id)){if(value)next.add(id);else next.delete(id);}if(!write('bookmarks',[...next]))return false;bookmarks=next;notify('bookmark',{starsChanged:mode==='local'});return true;}
    function setLocalName(name){if(mode!=='local')return false;const value=D.str(name).trim().slice(0,100);if(!value||!write('actor',value))return false;localName=value;notify('actor');return true;}
    function cachedAddresses(query){
      const addressNorm=value=>D.norm(value).replace(/서울특별시|서울시/g,'서울');const q=addressNorm(query);if(q.length<2)return [];
      const values=[];
      for(const entity of activeEntities())for(const site of D.arr(entity.sites)){
        if(site.mapVisible===false||!D.str(site.address).trim()||!D.isCoords(site.lat,site.lon))continue;
        if(!addressNorm([entity.name,...D.arr(entity.aliases),site.name,site.address].join(' ')).includes(q))continue;
        values.push({address:site.address,name:site.name||entity.name,lat:site.lat,lon:site.lon,provider:'기존 조사자료',coordinateStatus:site.coordinateStatus||'source_point',coordinateSource:site.coordinateSource||site.sourceUrl||(typeof site.source==='string'?site.source:null),sourceUrl:site.coordinateSource||site.sourceUrl||(typeof site.source==='string'?site.source:null),checkedAt:site.checkedAt||null,siteId:site.id,entityId:entity.id});
      }
      return values;
    }
    async function geocode(query){
      const value=D.str(query).trim();if(value.length<2)return {results:[],message:'주소 또는 상점 이름을 두 글자 이상 입력해 주세요.'};
      const cached=cachedAddresses(value);
      if(mode!=='shared')return {results:cached};
      try{
        const response=hasAdapter?(typeof adapter.geocode==='function'?await adapter.geocode(value):{results:[],message:'연결된 플랫폼에 주소검색 기능이 없습니다.'}):await request('/geocode?q='+encodeURIComponent(value));
        const seen=new Set();
        const results=[...D.arr(response?.results).filter(item=>D.str(item.address).trim()&&D.isCoords(item.lat,item.lon)).map(item=>({...item,coordinateStatus:item.coordinateStatus||'address_matched',coordinateSource:item.coordinateSource||item.sourceUrl||null})),...cached].filter(item=>{const key=D.norm(item.address)+':'+item.lat+':'+item.lon;if(seen.has(key))return false;seen.add(key);return true;});
        return {results,message:response?.message||(results.length?'지도 위치를 적용할 주소를 선택해 주세요.':'주소검색 결과가 없습니다. 주소만 먼저 저장할 수 있습니다.')};
      }catch(error){return {results:cached,message:cached.length?'주소검색에 연결하지 못했습니다. 기존 조사자료의 주소는 선택할 수 있습니다.':'주소검색에 연결하지 못했습니다. 주소는 그대로 두고 위치 미확인으로 저장할 수 있습니다.'};}
    }
    function download(name,content,type){if(typeof root.document==='undefined'||!root.URL?.createObjectURL)return;const url=root.URL.createObjectURL(new Blob([content],{type}));const a=root.document.createElement('a');a.href=url;a.download=name;root.document.body.append(a);a.click();a.remove();setTimeout(()=>root.URL.revokeObjectURL(url),2000);}
    function exportJSON(options={}){
      const body={schemaVersion:2,exportedAt:new Date().toISOString(),mode,revision,meta:D.clone(seed.meta),entities:D.clone(model.entities),stars:D.clone(currentStars()),starStates:D.clone(model.starStates),ballots:D.clone(model.ballots),events:D.clone(mode==='local'?localEvents:serverEvents),references:D.clone(seed.references),sourceArchive:D.clone(seed.sourceArchive),personal:{bookmarks:[...bookmarks],legacyVisit:D.clone(read('visit',[]))}};
      if(options.download!==false)download('인사동_상점조사_전체_'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(body,null,2),'application/json;charset=utf-8');
      return body;
    }
    function exportCSV(selected=activeEntities()){
      if(!Array.isArray(selected))selected=activeEntities();
      const rows=[['이름','구분','분야','지역','자료 출처','지점','주소','층수·상세','위도','경도','위치 확인','추천 이유','인기 이유','추가 의견','가격대','근거 링크','담당자','작성자','작성일','조사기록 수']];
      for(const entity of selected){const research=D.getLatestResearch(entity);for(const site of D.arr(entity.sites).length?entity.sites:[{}])rows.push([entity.name,D.getKind(entity),D.arr(entity.categories).join(' / '),D.getRegion(entity),D.getSourceNames(entity).join(' / '),site.name,site.address,site.detail,site.lat,site.lon,site.coordinateStatus,research.reason,research.popularityReason,research.note,research.priceSummary,research.evidenceUrl,entity.assignee,research.actor?.name,research.createdAt,D.arr(entity.research).length]);}
      const csv='\uFEFF'+rows.map(row=>row.map(value=>{let cell=D.str(value);if(/^(?:\s*[=+\-@]|[\t\r])/.test(cell))cell="'"+cell;return '"'+cell.replace(/"/g,'""')+'"';}).join(',')).join('\r\n');
      download('인사동_상점조사_목록_'+new Date().toISOString().slice(0,10)+'.csv',csv,'text/csv;charset=utf-8');return csv;
    }
    function storageChanged(event){if(destroyed||!event.key?.startsWith(STORAGE))return;if(event.key===STORAGE+'bookmarks'){bookmarks=new Set(D.arr(read('bookmarks',[])));notify('bookmark',{starsChanged:mode==='local'});}else if(mode==='local'&&event.key===STORAGE+'events'){const values=read('events',[]);if(Array.isArray(values)){localEvents=values;revision=maxRevision(values);rebuild();notify('sync',{entitiesChanged:true,ballotsChanged:true,starsChanged:true});}}else if(mode==='local'&&event.key===STORAGE+'actor'){localName=D.str(read('actor','')).trim()||'로그인 미연결';notify('actor',{starsChanged:true});}}
    function start(){if(started||destroyed)return;started=true;root.addEventListener?.('storage',storageChanged);notify('initial',{entitiesChanged:true,ballotsChanged:true,starsChanged:true});if(useShared){refresh();timer=setInterval(refresh,Math.max(3000,Number(config.pollMs)||8000));}return api;}
    function destroy(){destroyed=true;if(timer)clearInterval(timer);root.removeEventListener?.('storage',storageChanged);listeners.clear();}
    const api={getState,subscribe,mutate,refresh,start,destroy,setStar,toggleStar,isStarred,countStars,toggleBookmark,bookmarkMany,isBookmarked:id=>!!getEntity(id)&&bookmarks.has(id),setLocalName,geocode,exportJSON,exportCSV,getEntity,isEntityDeleted,canDeleteEntity,deleteEntity,getLatestResearch:D.getLatestResearch,getSourceNames:D.getSourceNames,getRecognitionNames:D.getRecognitionNames,getCategory:D.getCategory,getRegion:D.getRegion,getKind:D.getKind,readLatest:D.readLatest,domain:D};
    return api;
  }
  root.ResearchCore={create,domain:D};
  if(typeof module==='object'&&module.exports)module.exports=root.ResearchCore;
})(typeof window!=='undefined'?window:globalThis);
