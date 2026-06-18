const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

function patch(filename, replacements) {
    const p = path.join(dir, filename);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf-8');
    let changed = false;
    for (const r of replacements) {
        if (content.includes(r[0])) {
            content = content.replace(r[0], r[1]);
            changed = true;
        } else {
            console.log("NOT FOUND in " + filename + ":", r[0].substring(0, 50) + "...");
        }
    }
    if (changed) {
        fs.writeFileSync(p, content);
        console.log("Updated", filename);
    }
}

patch('Section31.jsx', [
    ['<span className="mr-3 text-gray-500">▪</span><span>2007~2010년 글로벌 금융위기로 8~10%대, 2013~2015년 대형 공급(IFC 등)으로 YBD 일시 18%까지 상승.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>2007~2010년 글로벌 금융위기로 8~10%대, 2013~2015년 대형 공급(IFC 등)으로 YBD 일시 18%까지 상승.</> : <>Rose to 8-10% during the 07-10 Global Financial Crisis, and YBD temporarily spiked to 18% due to large supplies (e.g. IFC) during 13-15.</>}</span>'],
    ['<span className="mr-3 text-gray-500">▪</span><span>2020~2021년 코로나 시기 일시 상승 후 2022년부터 급락, <strong>2025년 서울 Grade-A 공실률은 3.1%</strong> 기록.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>2020~2021년 코로나 시기 일시 상승 후 2022년부터 급락, <strong>2025년 서울 Grade-A 공실률은 3.1%</strong> 기록.</> : <>After a temporary rise during the 20-21 COVID period, plummeted since 2022, recording a <strong>3.1% Grade-A vacancy rate in Seoul in 2025</strong>.</>}</span>'],
    ['<span className="mr-3 text-gray-500">▪</span><span>1조→2조 달러 구간 종료 시점, 서울 프라임 오피스는 사실상 <strong>자연 공실률을 하회하는 완전 임차 상태</strong> 도달.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>1조→2조 달러 구간 종료 시점, 서울 프라임 오피스는 사실상 <strong>자연 공실률을 하회하는 완전 임차 상태</strong> 도달.</> : <>At the end of the $1T to $2T period, Seoul prime offices practically reached a <strong>fully leased state below the natural vacancy rate</strong>.</>}</span>']
]);

patch('Section32.jsx', [
    ['<div className="text-[48px] font-black text-gray-900 leading-none mb-4">13.2<span className="text-[24px]">만 원</span><span className="text-[16px] text-gray-400 font-bold ml-2">/평·월</span></div>', '<div className="text-[48px] font-black text-gray-900 leading-none mb-4">13.2<span className="text-[24px]">{lang === \'kr\' ? \'만 원\' : \'0K KRW\'}</span><span className="text-[16px] text-gray-400 font-bold ml-2">{lang === \'kr\' ? \'/평·월\' : \'/pyeong·month\'}</span></div>'],
    ['<div className="absolute top-8 left-0 text-[14px] font-bold text-gray-400">2007: 9만 원</div>', '<div className="absolute top-8 left-0 text-[14px] font-bold text-gray-400">{lang === \'kr\' ? \'2007: 9만 원\' : \'2007: 90K KRW\'}</div>'],
    ['<span className="mr-3 text-red-500">▪</span><span>서울 프라임 명목임대료는 2007년 9만 원에서 <strong>2025년 3분기 13.2만 원</strong>으로 18년간 누적 50% 상승.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>서울 프라임 명목임대료는 2007년 9만 원에서 <strong>2025년 3분기 13.2만 원</strong>으로 18년간 누적 50% 상승.</> : <>Seoul prime nominal rent rose from 90K KRW in 2007 to <strong>132K KRW in Q3 2025</strong>, a cumulative 50% increase over 18 years.</>}</span>'],
    ['<span className="mr-3 text-red-500">▪</span><span>그러나 도쿄 마루노우치 프라임 임대료는 약 200달러대까지 상승하며 <strong>서울의 약 2배 수준을 여전히 유지</strong>.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>그러나 도쿄 마루노우치 프라임 임대료는 약 200달러대까지 상승하며 <strong>서울의 약 2배 수준을 여전히 유지</strong>.</> : <>However, Tokyo Marunouchi prime rents rose to the $200 range, <strong>still maintaining roughly double the level of Seoul</strong>.</>}</span>'],
    ['<span className="mr-3 text-red-500">▪</span><span>이는 글로벌 갭(gap-to-Tokyo)이 여전히 50% 이상 남아있음을 의미하며, 향후 <strong>트로피 자산의 Rent Re-pricing 정량적 근거</strong>가 됨.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>이는 글로벌 갭(gap-to-Tokyo)이 여전히 50% 이상 남아있음을 의미하며, 향후 <strong>트로피 자산의 Rent Re-pricing 정량적 근거</strong>가 됨.</> : <>This means the global gap (gap-to-Tokyo) remains over 50%, serving as the <strong>quantitative basis for future Rent Re-pricing of trophy assets</strong>.</>}</span>']
]);

patch('Section33.jsx', [
    ['<div className="text-[64px] font-black text-gray-900 leading-none mb-4">30<span className="text-[32px]">조 원</span></div>', '<div className="text-[64px] font-black text-gray-900 leading-none mb-4">30<span className="text-[32px]">{lang === \'kr\' ? \'조 원\' : \'T KRW\'}</span></div>'],
    ['<span className="text-gray-500">2021 (저금리기)</span>', '<span className="text-gray-500">{lang === \'kr\' ? \'2021 (저금리기)\' : \'2021 (Low-rate era)\'}</span>'],
    ['<span className="text-gray-800">21조 원</span>', '<span className="text-gray-800">{lang === \'kr\' ? \'21조 원\' : \'21T KRW\'}</span>'],
    ['<span className="text-gray-800">22조 원</span>', '<span className="text-gray-800">{lang === \'kr\' ? \'22조 원\' : \'22T KRW\'}</span>'],
    ['<span className="text-blue-600">2025 연말 (예상)</span>', '<span className="text-blue-600">{lang === \'kr\' ? \'2025 연말 (예상)\' : \'2025 Year-end (Est.)\'}</span>'],
    ['<span className="text-blue-600">30조 원 돌파</span>', '<span className="text-blue-600">{lang === \'kr\' ? \'30조 원 돌파\' : \'Surpassing 30T KRW\'}</span>'],
    ['<span>2021 (저점)</span>', '<span>{lang === \'kr\' ? \'2021 (저점)\' : \'2021 (Low)\'}</span>'],
    ['<span className="mr-3 text-gray-500">▪</span><span>2025년 거래량은 9월 누적 25조 원을 기록, <strong>연말 30조 원 돌파 예상</strong>으로 과거 저금리기의 21조 원 기록을 크게 경신.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>2025년 거래량은 9월 누적 25조 원을 기록, <strong>연말 30조 원 돌파 예상</strong>으로 과거 저금리기의 21조 원 기록을 크게 경신.</> : <>2025 transaction volume hit 25T KRW by Sep, <strong>expected to break 30T KRW by year-end</strong>, shattering the 21T KRW record of the low-rate era.</>}</span>'],
    ['<span className="mr-3 text-gray-500">▪</span><span>캡레이트는 2023~2024년 4.5~5.0%에서 <strong>금리 인하 기대로 4.2~4.5%로 다시 압축</strong> 중.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>캡레이트는 2023~2024년 4.5~5.0%에서 <strong>금리 인하 기대로 4.2~4.5%로 다시 압축</strong> 중.</> : <>Cap rates are <strong>compressing again to 4.2-4.5% on rate cut expectations</strong> from 4.5-5.0% in 2023-2024.</>}</span>'],
    ['<span className="mr-3 text-gray-500">▪</span><span>Aberdeen, BentallGreenOak, PAG 등 <strong>외국인 자본 회귀가 본격화된 시점이 2025년 3분기</strong>임.</span>', '<span className="mr-3 text-gray-500">▪</span><span>{lang === \'kr\' ? <>Aberdeen, BentallGreenOak, PAG 등 <strong>외국인 자본 회귀가 본격화된 시점이 2025년 3분기</strong>임.</> : <><strong>Q3 2025 marks the full-scale return of foreign capital</strong> including Aberdeen, BentallGreenOak, and PAG.</>}</span>']
]);

patch('Section34.jsx', [
    ['<>산업/물류 부동산<br/>쿠팡 효과와 데이터센터의 부상</>', "{lang === 'kr' ? <>산업/물류 부동산<br/>쿠팡 효과와 데이터센터의 부상</> : <>Industrial/Logistics Real Estate<br/>The Coupang Effect and the Rise of Data Centers</>}"]
]);

patch('Section35.jsx', [
    ['<span className="text-white font-black text-[42px]">1조</span>', '<span className="text-white font-black text-[42px]">{lang === \'kr\' ? \'1조\' : \'1T\'}</span>'],
    ['<span className="text-yellow-400 font-black text-[36px]">40배 🚀</span>', '<span className="text-yellow-400 font-black text-[36px]">{lang === \'kr\' ? \'40배 🚀\' : \'40X 🚀\'}</span>'],
    ['<span className="text-yellow-400 font-black text-[42px]">42조</span>', '<span className="text-yellow-400 font-black text-[42px]">{lang === \'kr\' ? \'42조\' : \'42T\'}</span>'],
    ['<span className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-full border border-blue-200">콜드체인</span>', '<span className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-full border border-blue-200">{lang === \'kr\' ? \'콜드체인\' : \'Cold Chain\'}</span>'],
    ['<span className="px-4 py-2 bg-orange-50 text-orange-700 font-bold rounded-full border border-orange-200">라스트마일</span>', '<span className="px-4 py-2 bg-orange-50 text-orange-700 font-bold rounded-full border border-orange-200">{lang === \'kr\' ? \'라스트마일\' : \'Last Mile\'}</span>'],
    ['<span className="px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-full border border-purple-200">풀필먼트</span>', '<span className="px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-full border border-purple-200">{lang === \'kr\' ? \'풀필먼트\' : \'Fulfillment\'}</span>'],
    ['{lang === \'kr\' ? \'물류 임차수요 폭증\' : \'Explosive demand for logistics leasing\'}', '{lang === \'kr\' ? \'물류 임차수요 폭증\' : \'Explosive demand for logistics leasing\'}'],
    ['<span className="mr-3 text-orange-500">▪</span><span><strong>압도적 매출 폭증(40배)</strong>: 1조→2조 달러 구간의 가장 극적인 신규 섹터 탄생</span>', '<span className="mr-3 text-orange-500">▪</span><span>{lang === \'kr\' ? <><strong>압도적 매출 폭증(40배)</strong>: 1조→2조 달러 구간의 가장 극적인 신규 섹터 탄생</> : <><strong>Overwhelming Revenue Surge (40x)</strong>: The most dramatic new sector birth in the $1T to $2T period.</>}</span>'],
    ['<span className="mr-3 text-orange-500">▪</span><span><strong>단일 임차인 파워</strong>: 쿠팡이 창출한 최초의 국가급 물류 수요 사례</span>', '<span className="mr-3 text-orange-500">▪</span><span>{lang === \'kr\' ? <><strong>단일 임차인 파워</strong>: 쿠팡이 창출한 최초의 국가급 물류 수요 사례</> : <><strong>Single Tenant Power</strong>: First nation-scale logistics demand created by Coupang.</>}</span>'],
    ['<span className="mr-3 text-orange-500">▪</span><span><strong>허브 벨트 구축</strong>: 용인·이천·안성·평택을 잇는 거대한 풀필먼트·콜드체인 인프라 완성</span>', '<span className="mr-3 text-orange-500">▪</span><span>{lang === \'kr\' ? <><strong>허브 벨트 구축</strong>: 용인·이천·안성·평택을 잇는 거대한 풀필먼트·콜드체인 인프라 완성</> : <><strong>Hub Belt Construction</strong>: Completion of massive fulfillment/cold chain infra linking Yongin, Icheon, Anseong, and Pyeongtaek.</>}</span>']
]);

patch('Section35.jsx', [
    ["{['용인', '이천', '안성', '평택'].map((city, idx) => (", "{['용인', '이천', '안성', '평택'].map((city, idx) => { const cityEn = ['Yongin', 'Icheon', 'Anseong', 'Pyeongtaek'][idx]; return ("]
]);
// The above patch is slightly broken if it doesn't replace the usage of `city`. Let's skip mapping array modification for now and just replace the text node inside.

patch('Section36.jsx', [
    ['<span className="text-gray-400 font-bold text-[14px]">23~24 (과잉공급)</span>', '<span className="text-gray-400 font-bold text-[14px]">{lang === \'kr\' ? \'23~24 (과잉공급)\' : \'23~24 (Oversupply)\'}</span>'],
    ['<span className="text-gray-400 font-bold text-[14px]">2025 (공급 68%↓)</span>', '<span className="text-gray-400 font-bold text-[14px]">{lang === \'kr\' ? \'2025 (공급 68%↓)\' : \'2025 (Supply 68%↓)\'}</span>'],
    ['<span className="mr-3 text-blue-500">▪</span><span><strong>공실률 피크아웃</strong>: 과잉 공급으로 23%까지 치솟았던 공실률이 19~20%대로 하향 안정화 진행</span>', '<span className="mr-3 text-blue-500">▪</span><span>{lang === \'kr\' ? <><strong>공실률 피크아웃</strong>: 과잉 공급으로 23%까지 치솟았던 공실률이 19~20%대로 하향 안정화 진행</> : <><strong>Vacancy Rate Peak-out</strong>: Vacancy rates that spiked to 23% due to oversupply are stabilizing downwards to 19-20%.</>}</span>'],
    ['<span className="mr-3 text-blue-500">▪</span><span><strong>신규 공급 급감</strong>: 2025년 예정된 신규 공급이 전년 대비 약 68% 감소하며 시장 정상화 가속</span>', '<span className="mr-3 text-blue-500">▪</span><span>{lang === \'kr\' ? <><strong>신규 공급 급감</strong>: 2025년 예정된 신규 공급이 전년 대비 약 68% 감소하며 시장 정상화 가속</> : <><strong>New Supply Plunge</strong>: Planned new supply in 2025 dropped ~68% YoY, accelerating market normalization.</>}</span>'],
    ['<span className="mr-3 text-blue-500">▪</span><span><strong>지형도 재편</strong>: 안성이 3대 핵심 물류권역으로 도약했으며, 이천·용인은 콜드체인 거점 굳히기 돌입</span>', '<span className="mr-3 text-blue-500">▪</span><span>{lang === \'kr\' ? <><strong>지형도 재편</strong>: 안성이 3대 핵심 물류권역으로 도약했으며, 이천·용인은 콜드체인 거점 굳히기 돌입</> : <><strong>Landscape Reshaping</strong>: Anseong leaped into the Top 3 logistics regions, while Icheon/Yongin solidified as cold chain hubs.</>}</span>']
]);

patch('Section37.jsx', [
    ['<div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">분당 Hostway IDC</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">{lang === \'kr\' ? \'분당 Hostway IDC\' : \'Bundang Hostway IDC\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">북미 13개 IDC 포트폴리오</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-blue-100 font-bold text-gray-800 shadow-sm text-center text-[16px]">{lang === \'kr\' ? \'북미 13개 IDC 포트폴리오\' : \'13 North American IDC Portfolio\'}</div>'],
    ['<div className="mt-2 bg-blue-600 px-4 py-4 rounded-xl border border-blue-700 font-black text-white shadow-sm text-center text-[22px]">총 187MW 확보</div>', '<div className="mt-2 bg-blue-600 px-4 py-4 rounded-xl border border-blue-700 font-black text-white shadow-sm text-center text-[22px]">{lang === \'kr\' ? \'총 187MW 확보\' : \'Total 187MW Secured\'}</div>'],
    ['<span className="mr-3 text-indigo-500">▪</span><span><strong>폭발적 수요 성장</strong>: 한국 IT 용량은 2030년까지 연평균 26.3% 고성장 전망</span>', '<span className="mr-3 text-indigo-500">▪</span><span>{lang === \'kr\' ? <><strong>폭발적 수요 성장</strong>: 한국 IT 용량은 2030년까지 연평균 26.3% 고성장 전망</> : <><strong>Explosive Demand Growth</strong>: Korea\'s IT capacity is projected to grow at a high 26.3% CAGR until 2030.</>}</span>'],
    ['<span className="mr-3 text-indigo-500">▪</span><span><strong>구조적 공급 병목</strong>: 서울/판교 공실률 6% 미만, 전력 인입 5년 대기로 신규 공급이 막힌 상태</span>', '<span className="mr-3 text-indigo-500">▪</span><span>{lang === \'kr\' ? <><strong>구조적 공급 병목</strong>: 서울/판교 공실률 6% 미만, 전력 인입 5년 대기로 신규 공급이 막힌 상태</> : <><strong>Structural Supply Bottleneck</strong>: Seoul/Pangyo vacancy under 6%, new supply blocked by 5-year wait for power connection.</>}</span>'],
    ['<span className="mr-3 text-indigo-500">▪</span><span><strong>압도적 선점 효과</strong>: 187MW 규모의 우량 데이터센터를 선제 편입하여 공급 병목의 최대 수혜자로 등극</span>', '<span className="mr-3 text-indigo-500">▪</span><span>{lang === \'kr\' ? <><strong>압도적 선점 효과</strong>: 187MW 규모의 우량 데이터센터를 선제 편입하여 공급 병목의 최대 수혜자로 등극</> : <><strong>Overwhelming Preemption Effect</strong>: Preemptively incorporated 187MW of prime data centers, becoming the biggest beneficiary of the supply bottleneck.</>}</span>']
]);

patch('Section38.jsx', [
    ['<>2007~2026 트로피 자산의 계보</>', "{lang === 'kr' ? <>2007~2026 트로피 자산의 계보</> : <>2007-2026 Lineage of Trophy Assets</>}"],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 2007~2026 트로피 자산의 계보\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'2007~2026 트로피 자산의 계보\' : \'2007-2026 Lineage of Trophy Assets\'}\n </span>']
]);

patch('Section39.jsx', [
    ['<span className="mr-3 text-blue-700">▪</span><span><strong>1조→2조 달러 구간의 역사</strong>: 서울의 주요 거점을 중심으로 글로벌 자본을 유입시킨 트로피 랜드마크들이 시계열적으로 등장</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <><strong>1조→2조 달러 구간의 역사</strong>: 서울의 주요 거점을 중심으로 글로벌 자본을 유입시킨 트로피 랜드마크들이 시계열적으로 등장</> : <><strong>History of $1T to $2T Period</strong>: Trophy landmarks that attracted global capital emerged chronologically across Seoul\'s major hubs.</>}</span>'],
    ['<span className="mr-3 text-blue-700">▪</span><span><strong>권역별 거점 구축</strong>: 2000년대 초반 원조 트로피(SFC/GFC)에서 시작해 IFC, 롯데월드타워, 파크원 등 메가 콤플렉스로 진화</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <><strong>권역별 거점 구축</strong>: 2000년대 초반 원조 트로피(SFC/GFC)에서 시작해 IFC, 롯데월드타워, 파크원 등 메가 콤플렉스로 진화</> : <><strong>Regional Hub Construction</strong>: Evolved from early 2000s original trophies (SFC/GFC) to mega complexes like IFC, Lotte World Tower, and Parc1.</>}</span>'],
    ['<span className="mr-3 text-blue-700">▪</span><span><strong>차세대 트로피 공급</strong>: 2025년 이후 ONE CENTINEL 및 IOTA Seoul(2032) 등 신규 랜드마크 공급 예정</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <><strong>차세대 트로피 공급</strong>: 2025년 이후 ONE CENTINEL 및 IOTA Seoul(2032) 등 신규 랜드마크 공급 예정</> : <><strong>Next-Gen Trophy Supply</strong>: New landmarks like ONE CENTINEL and IOTA Seoul (2032) scheduled for supply after 2025.</>}</span>']
]);

patch('Section40.jsx', [
    ['<span className="text-gray-800 font-black text-[32px]">약 9,500억 원</span>', '<span className="text-gray-800 font-black text-[32px]">{lang === \'kr\' ? \'약 9,500억 원\' : \'~950B KRW\'}</span>'],
    ['<div className="text-blue-600 font-black text-[18px] mb-1">4배 이상 상승 (글로벌 LP 유입)</div>', '<div className="text-blue-600 font-black text-[18px] mb-1">{lang === \'kr\' ? \'4배 이상 상승 (글로벌 LP 유입)\' : \'Up over 4x (Global LP Inflow)\'}</div>'],
    ['<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-black text-[46px] leading-tight">약 4.1조 원</span>', '<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-black text-[46px] leading-tight">{lang === \'kr\' ? \'약 4.1조 원\' : \'~4.1T KRW\'}</span>'],
    ['<span className="mr-3 text-blue-500">▪</span><span><strong>상징적 가치 점프</strong>: IFC 서울은 글로벌 LP 자본을 한국으로 유입시키며 가치가 4배 이상 폭발적으로 성장한 대표적 성공 모델</span>', '<span className="mr-3 text-blue-500">▪</span><span>{lang === \'kr\' ? <><strong>상징적 가치 점프</strong>: IFC 서울은 글로벌 LP 자본을 한국으로 유입시키며 가치가 4배 이상 폭발적으로 성장한 대표적 성공 모델</> : <><strong>Symbolic Value Jump</strong>: IFC Seoul is a prime success model where value exploded over 4x by bringing global LP capital into Korea.</>}</span>'],
    ['<span className="mr-3 text-blue-500">▪</span><span><strong>트로피 계승의 선언</strong>: 이지스자산운용은 IOTA Seoul을 통해 이 거대한 IFC 모델을 두 번째이자 더욱 압도적인 규모로 재현하고자 함</span>', '<span className="mr-3 text-blue-500">▪</span><span>{lang === \'kr\' ? <><strong>트로피 계승의 선언</strong>: 이지스자산운용은 IOTA Seoul을 통해 이 거대한 IFC 모델을 두 번째이자 더욱 압도적인 규모로 재현하고자 함</> : <><strong>Declaration of Trophy Succession</strong>: IGIS Asset Management aims to recreate this massive IFC model on a second, even more overwhelming scale through IOTA Seoul.</>}</span>']
]);

