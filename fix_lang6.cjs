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

patch('Section100.jsx', [
    ['? <>글로벌 최상위 IB 네트워크를 십분 활용하여,<br/>IOTA 프로젝트를 국제적 자본 유치의 핵심 동력으로 격상</>', '? (lang === \'kr\' ? <>글로벌 최상위 IB 네트워크를 십분 활용하여,<br/>IOTA 프로젝트를 국제적 자본 유치의 핵심 동력으로 격상</> : <>Fully leveraging top-tier global IB networks,<br/>elevating the IOTA project to the core driver of international capital attraction.</>)']
]);

patch('Section103.jsx', [
    ['? <>이지스 73조 원 AUM 전체에 적용 시<br/>캐시플로우 보호 및 막대한 비용 절감 기대</>', '? (lang === \'kr\' ? <>이지스 73조 원 AUM 전체에 적용 시<br/>캐시플로우 보호 및 막대한 비용 절감 기대</> : <>When applied across IGIS\'s entire 73T KRW AUM,<br/>expected to protect cash flows and massively reduce costs.</>)']
]);

patch('Section107.jsx', [
    ['Cross-over 전략', '{lang === \'kr\' ? \'Cross-over 전략\' : \'Cross-over Strategy\'}'],
    ['<div className="font-black text-[#1e3a8a] text-[22px]">자산군 통합 운영 (Integration)</div>', '<div className="font-black text-[#1e3a8a] text-[22px]">{lang === \'kr\' ? \'자산군 통합 운영 (Integration)\' : \'Asset Class Integration\'}</div>'],
    ['<div className="font-bold text-gray-700 text-[16px] mt-2">부동산, 인프라, PE를 하나로 결합하여<br/>융복합 시너지 및 초과 수익(Alpha) 창출</div>', '<div className="font-bold text-gray-700 text-[16px] mt-2">{lang === \'kr\' ? <>부동산, 인프라, PE를 하나로 결합하여<br/>융복합 시너지 및 초과 수익(Alpha) 창출</> : <>Combining Real Estate, Infra, and PE into one<br/>to create convergence synergy and Alpha.</>}</div>']
]);

patch('Section108.jsx', [
    ['SWF 파트너십 & 보험사 자본', '{lang === \'kr\' ? \'SWF 파트너십 & 보험사 자본\' : \'SWF Partnership & Insurer Capital\'}'],
    ['<div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-2">국부펀드 (SWF)</div>', '<div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-2">{lang === \'kr\' ? \'국부펀드 (SWF)\' : \'Sovereign Wealth Funds (SWF)\'}</div>'],
    ['<div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-1">글로벌 & 국내 보험사</div>', '<div className="text-[#1e3a8a] font-black text-[22px] md:text-[26px] mb-1">{lang === \'kr\' ? \'글로벌 & 국내 보험사\' : \'Global & Domestic Insurers\'}</div>']
]);

patch('Section109.jsx', [
    ['패밀리오피스 & 연기금 파트너십', '{lang === \'kr\' ? \'패밀리오피스 & 연기금 파트너십\' : \'Family Office & Pension Fund Partnerships\'}'],
    ['<span>NPS (국민연금)</span>', '<span>{lang === \'kr\' ? \'NPS (국민연금)\' : \'NPS (National Pension Service)\'}</span>'],
    ['<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">교직원공제회</div>', '<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === \'kr\' ? \'교직원공제회\' : \'KTCU\'}</div>'],
    ['<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">행정공제회</div>', '<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === \'kr\' ? \'행정공제회\' : \'POBA\'}</div>'],
    ['<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">우정사업본부</div>', '<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === \'kr\' ? \'우정사업본부\' : \'Korea Post\'}</div>'],
    ['<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">새마을금고</div>', '<div className="bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-center text-[17px]">{lang === \'kr\' ? \'새마을금고\' : \'KFCC\'}</div>']
]);

patch('Section111.jsx', [
    ['지배구조 전환 (Ownership Transition)', '{lang === \'kr\' ? \'지배구조 전환 (Ownership Transition)\' : \'Ownership Transition\'}']
]);

patch('Section112.jsx', [
    ['핵심 리스크 및 대응 (Retention & Dual-Management)', '{lang === \'kr\' ? \'핵심 리스크 및 대응 (Retention & Dual-Management)\' : \'Core Risks & Responses (Retention & Dual-Management)\'}']
]);

patch('Section113.jsx', [
    ['인수자 선정의 정치적 변수 (Political & Security Risks)', '{lang === \'kr\' ? \'인수자 선정의 정치적 변수 (Political & Security Risks)\' : \'Political Variables in Buyer Selection (Political & Security Risks)\'}']
]);

patch('Section116.jsx', [
    ["'IOTA 서울의 본질: 서울이 글로벌 도시 위계상 한 단계 도약하는 분기점이자 Transit-Oriented Vertical City의 한국판 적용' :", "(lang === 'kr' ? 'IOTA 서울의 본질: 서울이 글로벌 도시 위계상 한 단계 도약하는 분기점이자 Transit-Oriented Vertical City의 한국판 적용' : 'The Essence of IOTA Seoul: A turning point for Seoul to leap forward in the global city hierarchy and the Korean application of a Transit-Oriented Vertical City') :"]
]);

patch('Section117.jsx', [
    ['<li>▪ 1호선 · 4호선 · 공항철도</li>', '<li>▪ {lang === \'kr\' ? \'1호선 · 4호선 · 공항철도\' : \'Line 1, 4, AREX\'}</li>'],
    ['<li>▪ GTX-A (2024 개통)</li>', '<li>▪ {lang === \'kr\' ? \'GTX-A (2024 개통)\' : \'GTX-A (Opened 2024)\'}</li>'],
    ['<li>▪ GTX-B (2030 개통 예정)</li>', '<li>▪ {lang === \'kr\' ? \'GTX-B (2030 개통 예정)\' : \'GTX-B (Expected 2030)\'}</li>'],
    ['<li>▪ 남산 (자연 녹지)</li>', '<li>▪ {lang === \'kr\' ? \'남산 (자연 녹지)\' : \'Namsan (Nature/Greenery)\'}</li>'],
    ['<li>▪ 도심 (전통적 CBD)</li>', '<li>▪ {lang === \'kr\' ? \'도심 (전통적 CBD)\' : \'Downtown (Traditional CBD)\'}</li>'],
    ['<li>▪ 용산국제업무지구 (예정)</li>', '<li>▪ {lang === \'kr\' ? \'용산국제업무지구 (예정)\' : \'Yongsan IBD (Planned)\'}</li>'],
    ['<li>▪ 마포 · 여의도 접근성</li>', '<li>▪ {lang === \'kr\' ? \'마포 · 여의도 접근성\' : \'Mapo/Yeouido Accessibility\'}</li>'],
    ['인천국제공항과 공항철도로 직결되어<br/>', '{lang === \'kr\' ? \'인천국제공항과 공항철도로 직결되어\' : \'Directly connected to Incheon Int\\\'l Airport via AREX,\'}<br/>'],
    ['서울 진입 시 가장 먼저 마주하는 관문<br/>', '{lang === \'kr\' ? \'서울 진입 시 가장 먼저 마주하는 관문\' : \'the first gateway upon entering Seoul\'}<br/>'],
    ['(약 30분 소요)', '{lang === \'kr\' ? \'(약 30분 소요)\' : \'(approx. 30 mins)\'}']
]);

patch('Section118.jsx', [
    ["'단순 부동산 개발이 아닌 도시 형성(city-making) 행위. 롯데월드타워 + 아자부다이힐스 + 허드슨야드의 결합 모델' :", "(lang === 'kr' ? '단순 부동산 개발이 아닌 도시 형성(city-making) 행위. 롯데월드타워 + 아자부다이힐스 + 허드슨야드의 결합 모델' : 'Not simple real estate development, but an act of city-making. A combined model of Lotte World Tower + Azabudai Hills + Hudson Yards') :"]
]);

patch('Section120.jsx', [
    ['<li>▪ <strong className="text-gray-800">시공:</strong> 현대건설</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'시공:\' : \'Builder:\'}</strong> {lang === \'kr\' ? \'현대건설\' : \'Hyundai E&C\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">사업규모:</strong> 총 사업비 약 6조 원</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'사업규모:\' : \'Project Scale:\'}</strong> {lang === \'kr\' ? \'총 사업비 약 6조 원\' : \'Total cost approx. 6T KRW\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">조달현황:</strong> 1차 본PF 2.2조 원 완료 (2025.5) <br/><span className="ml-4 text-gray-500">→ 2차 본PF 4.5조 원 예정 (2027.5)</span></li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'조달현황:\' : \'Funding Status:\'}</strong> {lang === \'kr\' ? \'1차 본PF 2.2조 원 완료 (2025.5)\' : \'1st Main PF 2.2T KRW completed (May 2025)\'} <br/><span className="ml-4 text-gray-500">→ {lang === \'kr\' ? \'2차 본PF 4.5조 원 예정 (2027.5)\' : \'2nd Main PF 4.5T KRW expected (May 2027)\'}</span></li>'],
    ['<li>▪ <strong className="text-gray-800">용도:</strong> 리츠칼튼 호텔 + 오피스</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'용도:\' : \'Usage:\'}</strong> {lang === \'kr\' ? \'리츠칼튼 호텔 + 오피스\' : \'Ritz-Carlton Hotel + Office\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">준공목표:</strong> 2031년 3월</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'준공목표:\' : \'Target Completion:\'}</strong> {lang === \'kr\' ? \'2031년 3월\' : \'March 2031\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">시공:</strong> 삼성물산</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'시공:\' : \'Builder:\'}</strong> {lang === \'kr\' ? \'삼성물산\' : \'Samsung C&T\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">사업규모:</strong> 총 사업비 약 2조 1,963억 원</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'사업규모:\' : \'Project Scale:\'}</strong> {lang === \'kr\' ? \'총 사업비 약 2조 1,963억 원\' : \'Total cost approx. 2.19T KRW\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">인센티브:</strong> 용적률 1,100% 확보</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'인센티브:\' : \'Incentive:\'}</strong> {lang === \'kr\' ? \'용적률 1,100% 확보\' : \'Secured 1,100% FAR\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">규모:</strong> 지하 9층 ~ 지상 34층</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'규모:\' : \'Scale:\'}</strong> {lang === \'kr\' ? \'지하 9층 ~ 지상 34층\' : \'B9 to 34F\'}</li>'],
    ['<li>▪ <strong className="text-gray-800">운용:</strong> 이지스일반사모부동산투자신탁421호</li>', '<li>▪ <strong className="text-gray-800">{lang === \'kr\' ? \'운용:\' : \'Management:\'}</strong> {lang === \'kr\' ? \'이지스일반사모부동산투자신탁421호\' : \'IGIS General Private Real Estate Investment Trust No. 421\'}</li>'],
    ["'한국 부동산 개발 역사상 최대 규모인 약 8조 원 규모의 거대한 통합 PF 프로젝트' :", "(lang === 'kr' ? '한국 부동산 개발 역사상 최대 규모인 약 8조 원 규모의 거대한 통합 PF 프로젝트' : 'A massive integrated PF project worth approx. 8T KRW, the largest in the history of Korean real estate development') :"]
]);

patch('Section122.jsx', [
    ["'2026년 4월 현 시점, YD816 PFV 약 1조원 규모 리파이낸싱 완료' :", "(lang === 'kr' ? '2026년 4월 현 시점, YD816 PFV 약 1조원 규모 리파이낸싱 완료' : 'As of April 2026, YD816 PFV completed approx. 1T KRW refinancing') :"]
]);

patch('Section123.jsx', [
    ["'[2026.12 클로징 타겟] 성공 시 이지스의 글로벌 LP 확장 최강 레퍼런스, 실패 시 Brand Impairment 위험' :", "(lang === 'kr' ? '[2026.12 클로징 타겟] 성공 시 이지스의 글로벌 LP 확장 최강 레퍼런스, 실패 시 Brand Impairment 위험' : '[Dec 2026 Closing Target] If successful, IGIS\\'s strongest reference for global LP expansion; if failed, risk of Brand Impairment') :"]
]);

patch('Section125.jsx', [
    ["'단순한 딜(Deal)을 넘어선 글로벌 스탠다드 운용사(GP) 도약의 지렛대' :", "(lang === 'kr' ? '단순한 딜(Deal)을 넘어선 글로벌 스탠다드 운용사(GP) 도약의 지렛대' : 'A lever to leap forward as a global standard General Partner (GP) beyond a simple Deal') :"]
]);

patch('Section126.jsx', [
    ['<>Asset as a Service 모델 적용. AI, 로봇, IoT가 통합된 독자적 빌딩 OS 구축.<br/>글로벌 스탠다드 대비 확고한 초격차 운영 경쟁력 확보.</>', "{lang === 'kr' ? <>Asset as a Service 모델 적용. AI, 로봇, IoT가 통합된 독자적 빌딩 OS 구축.<br/>글로벌 스탠다드 대비 확고한 초격차 운영 경쟁력 확보.</> : <>Applied Asset as a Service model. Built proprietary Building OS integrating AI, Robotics, and IoT.<br/>Secured firm super-gap operational competitiveness against global standards.</>}"],
    ['<>[PFV + 부동산펀드 + 리츠 + LP]가 완벽하게 결합된 통합 자본 구조 구축 및 브랜드화.<br/>향후 YIBD, 잠실 등 신규 트로피 에셋의 템플릿으로 확장.</>', "{lang === 'kr' ? <>[PFV + 부동산펀드 + 리츠 + LP]가 완벽하게 결합된 통합 자본 구조 구축 및 브랜드화.<br/>향후 YIBD, 잠실 등 신규 트로피 에셋의 템플릿으로 확장.</> : <>Branding and establishing an integrated capital structure perfectly combining [PFV + RE Fund + REIT + LP].<br/>Expanding as a template for new trophy assets like YIBD and Jamsil in the future.</>}"],
    ['<div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">상장 및 유동화</div>', '<div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">{lang === \'kr\' ? \'상장 및 유동화\' : \'Listing & Liquidation\'}</div>'],
    ['<div className="bg-[#0f172a] px-4 py-2 rounded font-bold text-[16px]">안정화 보유</div>', '<div className="bg-[#0f172a] px-4 py-2 rounded font-bold text-[16px]">{lang === \'kr\' ? \'안정화 보유\' : \'Stabilized Holding\'}</div>'],
    ['<div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">개발 및 시공</div>', '<div className="bg-[#1e3a8a] px-4 py-2 rounded font-bold text-[16px]">{lang === \'kr\' ? \'개발 및 시공\' : \'Development & Construction\'}</div>'],
    ['<div className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold text-[16px]">기초 자본</div>', '<div className="bg-gray-300 text-gray-800 px-4 py-2 rounded font-bold text-[16px]">{lang === \'kr\' ? \'기초 자본\' : \'Base Capital\'}</div>']
]);

patch('Section128.jsx', [
    ["'매크로 불확실성에 대응하는 철저한 금리/원가 통제 및 펀딩 구조 다각화' :", "(lang === 'kr' ? '매크로 불확실성에 대응하는 철저한 금리/원가 통제 및 펀딩 구조 다각화' : 'Thorough interest rate/cost control and funding structure diversification responding to macro uncertainties') :"]
]);

patch('Section129.jsx', [
    ["'정권·정책 변화에 유연하게 대응하고, 글로벌 앵커 테넌트로 자산 가치 극대화' :", "(lang === 'kr' ? '정권·정책 변화에 유연하게 대응하고, 글로벌 앵커 테넌트로 자산 가치 극대화' : 'Flexibly responding to regime/policy changes and maximizing asset value with global anchor tenants') :"]
]);

patch('Section130.jsx', [
    ["'글로벌 자본 유치와 안정적 거버넌스 확립을 통한 IPR 클로징 완성' :", "(lang === 'kr' ? '글로벌 자본 유치와 안정적 거버넌스 확립을 통한 IPR 클로징 완성' : 'Completing IPR closing through global capital attraction and establishment of stable governance') :"]
]);

patch('Section132.jsx', [
    ['<span className="text-sm text-blue-200 font-bold mt-[-25px] absolute text-center w-full">NOI<br/>~3K억</span>', '<span className="text-sm text-blue-200 font-bold mt-[-25px] absolute text-center w-full">NOI<br/>{lang === \'kr\' ? \'~3K억\' : \'~300B\'}</span>'],
    ['<span className="text-sm text-white font-bold mt-[-25px] absolute text-center w-full whitespace-nowrap">Bull Scenario<br/>~4.5K억</span>', '<span className="text-sm text-white font-bold mt-[-25px] absolute text-center w-full whitespace-nowrap">Bull Scenario<br/>{lang === \'kr\' ? \'~4.5K억\' : \'~450B\'}</span>'],
    ["'압도적 입지와 규모가 만들어내는 견고한 Cash Flow 및 Value Add 잠재력' :", "(lang === 'kr' ? '압도적 입지와 규모가 만들어내는 견고한 Cash Flow 및 Value Add 잠재력' : 'Solid Cash Flow and Value-Add potential created by overwhelming location and scale') :"]
]);

patch('Section133.jsx', [
    ["'단일 최대 리츠 상장 가능성과 글로벌 자본의 초우량 엑시트 옵션 확보' :", "(lang === 'kr' ? '단일 최대 리츠 상장 가능성과 글로벌 자본의 초우량 엑시트 옵션 확보' : 'Possibility of listing the single largest REIT and securing prime exit options for global capital') :"]
]);
