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

patch('Section21.jsx', [
    ['<span className="mr-3 text-emerald-600">▪</span><span>2차전지(LG엔솔·삼성SDI·SK온)는 <strong>2020년 국내 IPO 붐</strong>을 만든 핵심 엔진임.</span>', '<span className="mr-3 text-emerald-600">▪</span><span>{lang === \'kr\' ? <>2차전지(LG엔솔·삼성SDI·SK온)는 <strong>2020년 국내 IPO 붐</strong>을 만든 핵심 엔진임.</> : <>Secondary batteries (LG Energy Solution, Samsung SDI, SK On) were the core engines driving the <strong>2020 domestic IPO boom</strong>.</>}</span>'],
    ['<span className="mr-3 text-emerald-600">▪</span><span>K-배터리 3사는 합계 <strong>글로벌 EV 배터리 점유율 20% 내외</strong>를 안정적으로 확보함.</span>', '<span className="mr-3 text-emerald-600">▪</span><span>{lang === \'kr\' ? <>K-배터리 3사는 합계 <strong>글로벌 EV 배터리 점유율 20% 내외</strong>를 안정적으로 확보함.</> : <>The Big 3 K-Battery makers stably secure a combined <strong>~20% global EV battery market share</strong>.</>}</span>'],
    ['<span className="mr-3 text-emerald-600">▪</span><span>다만 2024~2026년 사이 중국과 미국의 정책 변동 및 전기차 수요 둔화로 인해 <strong>사이클 조정기(숨고르기)</strong>에 진입함.</span>', '<span className="mr-3 text-emerald-600">▪</span><span>{lang === \'kr\' ? <>다만 2024~2026년 사이 중국과 미국의 정책 변동 및 전기차 수요 둔화로 인해 <strong>사이클 조정기(숨고르기)</strong>에 진입함.</> : <>However, entered a <strong>cycle adjustment phase (breather)</strong> due to US-China policy shifts and EV demand slowdown between 2024-2026.</>}</span>']
]);

patch('Section22.jsx', [
    ['<span className="mr-3 text-indigo-600">▪</span><span>네이버, 카카오, 쿠팡 등 <strong>IT 플랫폼 빅테크</strong>들은 각각 시총 30조 원 이상을 기록하며 거대 기업으로 성장함.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <>네이버, 카카오, 쿠팡 등 <strong>IT 플랫폼 빅테크</strong>들은 각각 시총 30조 원 이상을 기록하며 거대 기업으로 성장함.</> : <><strong>IT Platform Big Techs</strong> like Naver, Kakao, and Coupang grew into giant corporations, each exceeding 30T KRW in market cap.</>}</span>'],
    ['<span className="mr-3 text-indigo-600">▪</span><span>네이버의 일본 LINE 야후 통합, 쿠팡의 로켓배송 전국화 등이 <strong>물류 지형을 근본적으로 재편</strong>함.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <>네이버의 일본 LINE 야후 통합, 쿠팡의 로켓배송 전국화 등이 <strong>물류 지형을 근본적으로 재편</strong>함.</> : <>Naver\'s integration with LINE Yahoo in Japan and Coupang\'s nationwide Rocket Delivery <strong>fundamentally reshaped the logistics landscape</strong>.</>}</span>'],
    ['<span className="mr-3 text-indigo-600">▪</span><span>플랫폼이 촉발한 이커머스 혁명은 국내 <strong>물류 부동산 수요 폭발의 가장 큰 단일 변수</strong>로 작용함.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <>플랫폼이 촉발한 이커머스 혁명은 국내 <strong>물류 부동산 수요 폭발의 가장 큰 단일 변수</strong>로 작용함.</> : <>The e-commerce revolution triggered by platforms acted as the <strong>largest single variable for the explosion in domestic logistics real estate demand</strong>.</>}</span>']
]);

patch('Section23.jsx', [
    ['<span className="mr-3 text-[#65a30d]">▪</span><span>지정학적 위기 고조로 <strong>폴란드·UAE·호주·중동</strong> 등에서 글로벌 방산 수출이 폭발함.</span>', '<span className="mr-3 text-[#65a30d]">▪</span><span>{lang === \'kr\' ? <>지정학적 위기 고조로 <strong>폴란드·UAE·호주·중동</strong> 등에서 글로벌 방산 수출이 폭발함.</> : <>Heightened geopolitical crises triggered explosive global defense exports to <strong>Poland, UAE, Australia, and the Middle East</strong>.</>}</span>'],
    ['<span className="mr-3 text-[#65a30d]">▪</span><span>2022년 한국 방산 수출은 <strong>173억 달러(약 23조 원)로 사상 최고치</strong>를 기록함.</span>', '<span className="mr-3 text-[#65a30d]">▪</span><span>{lang === \'kr\' ? <>2022년 한국 방산 수출은 <strong>173억 달러(약 23조 원)로 사상 최고치</strong>를 기록함.</> : <>Korea\'s defense exports recorded an <strong>all-time high of $17.3B (~23T KRW)</strong> in 2022.</>}</span>'],
    ['<span className="mr-3 text-[#65a30d]">▪</span><span>한화, LIG넥스원, KAI, 현대로템의 <strong>K2 전차·K9 자주포·FA-50·천궁</strong>이 수출을 견인하는 핵심 라인업임.</span>', '<span className="mr-3 text-[#65a30d]">▪</span><span>{lang === \'kr\' ? <>한화, LIG넥스원, KAI, 현대로템의 <strong>K2 전차·K9 자주포·FA-50·천궁</strong>이 수출을 견인하는 핵심 라인업임.</> : <><strong>K2 Tanks, K9 Howitzers, FA-50s, and Cheongung</strong> from Hanwha, LIG Nex1, KAI, and Hyundai Rotem are the core lineups driving exports.</>}</span>'],
    ['<span className="mr-3 text-[#65a30d]">▪</span><span>1조 ➔ 2조 달러 구간 후반부에 급부상한 명실상부한 <strong>대한민국 산업의 신데렐라 섹터</strong>임.</span>', '<span className="mr-3 text-[#65a30d]">▪</span><span>{lang === \'kr\' ? <>1조 ➔ 2조 달러 구간 후반부에 급부상한 명실상부한 <strong>대한민국 산업의 신데렐라 섹터</strong>임.</> : <>The undisputed <strong>Cinderella sector of Korean industry</strong> that rapidly emerged in the latter half of the $1T to $2T period.</>}</span>']
]);

patch('Section24.jsx', [
    ['<>자본시장 구조의 변화<br/>KOSPI 2,000에서 5,000으로</>', "{lang === 'kr' ? <>자본시장 구조의 변화<br/>KOSPI 2,000에서 5,000으로</> : <>Structural Changes in Capital Markets<br/>KOSPI from 2,000 to 5,000</>}"],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 자본시장 구조의 변화\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'자본시장 구조의 변화\' : \'Structural Changes in Capital Markets\'}\n </span>']
]);

patch('Section25.jsx', [
    ['<span className="mr-3 text-amber-600">▪</span><span>금융위기 이후 <strong>2017~2020년 장기 박스피(1,800~2,400)</strong>에 갇히며 \'코리아 디스카운트\'가 고착화됨.</span>', '<span className="mr-3 text-amber-600">▪</span><span>{lang === \'kr\' ? <>금융위기 이후 <strong>2017~2020년 장기 박스피(1,800~2,400)</strong>에 갇히며 \'코리아 디스카운트\'가 고착화됨.</> : <>Entrenched \'Korea Discount\' trapped in a <strong>long-term Boxpi (1,800-2,400) from 2017-2020</strong> after the financial crisis.</>}</span>'],
    ['<span className="mr-3 text-amber-600">▪</span><span>2021년 3,000선 돌파 후 다시 박스권에 머물렀으나, <strong>2025년 하반기 약 75.6% 폭등</strong>하며 글로벌 지수 상승률 1위 기록.</span>', '<span className="mr-3 text-amber-600">▪</span><span>{lang === \'kr\' ? <>2021년 3,000선 돌파 후 다시 박스권에 머물렀으나, <strong>2025년 하반기 약 75.6% 폭등</strong>하며 글로벌 지수 상승률 1위 기록.</> : <>After breaking 3,000 in 2021, returned to a box range, but <strong>surged ~75.6% in 2H 2025</strong>, ranking 1st in global index growth.</>}</span>'],
    ['<span className="mr-3 text-amber-600">▪</span><span>랠리가 지속되며 <strong>2026년 1월 22일, 역사상 최초로 KOSPI 5,000선</strong>을 돌파하는 기념비적 성과 달성.</span>', '<span className="mr-3 text-amber-600">▪</span><span>{lang === \'kr\' ? <>랠리가 지속되며 <strong>2026년 1월 22일, 역사상 최초로 KOSPI 5,000선</strong>을 돌파하는 기념비적 성과 달성.</> : <>As the rally continued, achieved a monumental milestone of <strong>breaking KOSPI 5,000 for the first time in history on Jan 22, 2026</strong>.</>}</span>']
]);

patch('Section26.jsx', [
    ['<span className="mr-3 text-blue-700">▪</span><span><strong>JP모건, 맥쿼리 등 글로벌 IB</strong>, 메모리 슈퍼사이클을 근거로 2026년 KOSPI 목표를 <strong>최고 6,000선(Full Bull)</strong>으로 상향 제시.</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <><strong>JP모건, 맥쿼리 등 글로벌 IB</strong>, 메모리 슈퍼사이클을 근거로 2026년 KOSPI 목표를 <strong>최고 6,000선(Full Bull)</strong>으로 상향 제시.</> : <><strong>Global IBs like JP Morgan and Macquarie</strong> raised 2026 KOSPI targets up to <strong>6,000 (Full Bull)</strong> citing the memory super cycle.</>}</span>'],
    ['<span className="mr-3 text-blue-700">▪</span><span>NH투자·HMC증권 등 국내 주요 증권사 역시 <strong>5,500선을 목표치</strong>로 상향 조정하며 강세장에 힘을 실음.</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <>NH투자·HMC증권 등 국내 주요 증권사 역시 <strong>5,500선을 목표치</strong>로 상향 조정하며 강세장에 힘을 실음.</> : <>Major domestic securities firms like NH Investment and HMC Securities also raised targets to <strong>5,500</strong>, supporting the bull market.</>}</span>'],
    ['<span className="mr-3 text-blue-700">▪</span><span>현 정부의 <strong>\'임기 내 KOSPI 5,000\' 공약이 폭발적 랠리로 조기 달성</strong>되며 자본시장의 새로운 국면 진입.</span>', '<span className="mr-3 text-blue-700">▪</span><span>{lang === \'kr\' ? <>현 정부의 <strong>\'임기 내 KOSPI 5,000\' 공약이 폭발적 랠리로 조기 달성</strong>되며 자본시장의 새로운 국면 진입.</> : <>The current government\'s pledge of <strong>\'KOSPI 5,000 within term\' was achieved early through an explosive rally</strong>, entering a new phase for capital markets.</>}</span>']
]);

patch('Section27.jsx', [
    ['<span className="mr-3 text-purple-700">▪</span><span>핵심 상승 동력은 <strong>HBM 부족 현상 지속, 외국인 자금 회귀, 강력한 밸류업 정책 및 자본시장법 개정</strong>.</span>', '<span className="mr-3 text-purple-700">▪</span><span>{lang === \'kr\' ? <>핵심 상승 동력은 <strong>HBM 부족 현상 지속, 외국인 자금 회귀, 강력한 밸류업 정책 및 자본시장법 개정</strong>.</> : <>Core drivers include <strong>persistent HBM shortage, return of foreign capital, strong Value-up policies, and Capital Markets Act revisions</strong>.</>}</span>'],
    ['<span className="mr-3 text-purple-700">▪</span><span>무엇보다 KOSPI가 <strong>글로벌 AI 밸류체인의 핵심 수혜 시장</strong>이라는 외국인 투자자의 확고한 인식이 결정적 작용.</span>', '<span className="mr-3 text-purple-700">▪</span><span>{lang === \'kr\' ? <>무엇보다 KOSPI가 <strong>글로벌 AI 밸류체인의 핵심 수혜 시장</strong>이라는 외국인 투자자의 확고한 인식이 결정적 작용.</> : <>Above all, foreign investors\' firm perception that KOSPI is the <strong>core beneficiary market of the global AI value chain</strong> played a decisive role.</>}</span>'],
    ['<span className="mr-3 text-purple-700">▪</span><span>PER 13.2배로 상승했으나 아시아 평균 대비 여전히 저평가 상태. <strong>향후 5년 내 "코리아 디스카운트"의 완전한 해소 전망</strong>.</span>', '<span className="mr-3 text-purple-700">▪</span><span>{lang === \'kr\' ? <>PER 13.2배로 상승했으나 아시아 평균 대비 여전히 저평가 상태. <strong>향후 5년 내 "코리아 디스카운트"의 완전한 해소 전망</strong>.</> : <>PER rose to 13.2x but remains undervalued compared to Asian averages. <strong>Expect complete resolution of the "Korea Discount" within 5 years</strong>.</>}</span>']
]);

patch('Section28.jsx', [
    ['<>서울 오피스 시장 진화<br/>CBD·GBD·YBD 3축에서 +MBD·BBD 5축으로</>', "{lang === 'kr' ? <>서울 오피스 시장 진화<br/>CBD·GBD·YBD 3축에서 +MBD·BBD 5축으로</> : <>Seoul Office Market Evolution<br/>From 3-Axis (CBD/GBD/YBD) to 5-Axis (+MBD/BBD)</>}"],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 서울 오피스 시장 진화\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'서울 오피스 시장 진화\' : \'Seoul Office Market Evolution\'}\n </span>']
]);

patch('Section29.jsx', [
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">종로타워 / 그랑서울 (2014)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'종로타워 / 그랑서울 (2014)\' : \'Jongno Tower / Gran Seoul (2014)\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">D타워 (2017) / 센트로폴리스 (2018)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'D타워 (2017) / 센트로폴리스 (2018)\' : \'D Tower (2017) / Centropolis (2018)\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">파르나스타워 (2016)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'파르나스타워 (2016)\' : \'Parnas Tower (2016)\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">캐피탈타워 (1998)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'캐피탈타워 (1998)\' : \'Capital Tower (1998)\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">IFC 서울 (2012)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'IFC 서울 (2012)\' : \'IFC Seoul (2012)\'}</div>'],
    ['<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">파크원 Parc1 (2020)</div>', '<div className="bg-white px-4 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 shadow-sm">{lang === \'kr\' ? \'파크원 Parc1 (2020)\' : \'Parc1 (2020)\'}</div>'],
    ['<span className="mr-3 text-blue-600">▪</span><span>2007년 서울 오피스 시장은 <strong>CBD(광화문·시청·종로)</strong> 중심이었으며, SFC부터 센트로폴리스까지 핵심 랜드마크가 골격을 형성.</span>', '<span className="mr-3 text-blue-600">▪</span><span>{lang === \'kr\' ? <>2007년 서울 오피스 시장은 <strong>CBD(광화문·시청·종로)</strong> 중심이었으며, SFC부터 센트로폴리스까지 핵심 랜드마크가 골격을 형성.</> : <>In 2007, Seoul\'s office market was centered around <strong>CBD (Gwanghwamun/City Hall/Jongno)</strong>, with core landmarks from SFC to Centropolis forming the framework.</>}</span>'],
    ['<span className="mr-3 text-blue-600">▪</span><span><strong>GBD(강남)</strong>는 GFC와 파르나스타워 등 테헤란로 중심, <strong>YBD(여의도)</strong>는 IFC와 파크원으로 거대한 변곡점을 맞이함.</span>', '<span className="mr-3 text-blue-600">▪</span><span>{lang === \'kr\' ? <><strong>GBD(강남)</strong>는 GFC와 파르나스타워 등 테헤란로 중심, <strong>YBD(여의도)</strong>는 IFC와 파크원으로 거대한 변곡점을 맞이함.</> : <><strong>GBD (Gangnam)</strong> centered around Teheran-ro with GFC and Parnas Tower, while <strong>YBD (Yeouido)</strong> reached massive inflection points with IFC and Parc1.</>}</span>']
]);

patch('Section30.jsx', [
    ['<span className="font-bold text-[18px] text-gray-800">LG사이언스파크</span>', '<span className="font-bold text-[18px] text-gray-800">{lang === \'kr\' ? \'LG사이언스파크\' : \'LG Science Park\'}</span>'],
    ['<span className="font-bold text-[18px] text-gray-800">코오롱 One&Only타워</span>', '<span className="font-bold text-[18px] text-gray-800">{lang === \'kr\' ? \'코오롱 One&Only타워\' : \'Kolon One&Only Tower\'}</span>'],
    ['<span className="font-bold text-[18px] text-gray-800">판교테크노밸리</span>', '<span className="font-bold text-[18px] text-gray-800">{lang === \'kr\' ? \'판교테크노밸리\' : \'Pangyo Techno Valley\'}</span>'],
    ['<span className="font-bold text-[18px] text-gray-800">알파돔시티 / K-스퀘어</span>', '<span className="font-bold text-[18px] text-gray-800">{lang === \'kr\' ? \'알파돔시티 / K-스퀘어\' : \'Alpha Dome City / K-Square\'}</span>'],
    ['<span className="mr-3 text-indigo-600">▪</span><span>2010년대 중반 이후 <strong>MBD(마곡)</strong>가 LG사이언스파크 등 거대 R&D 자본을 흡수하며 융복합 클러스터로 형성됨.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <>2010년대 중반 이후 <strong>MBD(마곡)</strong>가 LG사이언스파크 등 거대 R&D 자본을 흡수하며 융복합 클러스터로 형성됨.</> : <>Since the mid-2010s, <strong>MBD (Magok)</strong> formed into a convergence cluster by absorbing massive R&D capital like LG Science Park.</>}</span>'],
    ['<span className="mr-3 text-indigo-600">▪</span><span><strong>BBD(분당·판교)</strong>는 IT·테크 기업의 폭발적 성장과 함께 알파돔시티 등으로 대규모 확장.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <><strong>BBD(분당·판교)</strong>는 IT·테크 기업의 폭발적 성장과 함께 알파돔시티 등으로 대규모 확장.</> : <><strong>BBD (Bundang/Pangyo)</strong> underwent massive expansion through Alpha Dome City along with the explosive growth of IT/Tech companies.</>}</span>'],
    ['<span className="mr-3 text-indigo-600">▪</span><span>결과적으로 1조→2조 달러 구간 동안 서울 오피스 시장은 전통 3대 권역에서 <strong>5대 권역으로 다극화</strong>되며 질적 성장을 이룸.</span>', '<span className="mr-3 text-indigo-600">▪</span><span>{lang === \'kr\' ? <>결과적으로 1조→2조 달러 구간 동안 서울 오피스 시장은 전통 3대 권역에서 <strong>5대 권역으로 다극화</strong>되며 질적 성장을 이룸.</> : <>Consequently, during the $1T to $2T period, Seoul\'s office market achieved qualitative growth by <strong>multipolarizing from 3 traditional axes to 5 axes</strong>.</>}</span>']
]);

