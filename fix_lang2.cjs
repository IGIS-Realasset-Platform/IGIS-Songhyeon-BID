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

patch('Section15.jsx', [
    ['<span className="mr-3 text-[#047857]">▪</span><span>2007년 글로벌 판매 약 400만 대에서 <strong>2024년 약 723만 대</strong>로 도요타·폭스바겐에 이은 <strong>글로벌 3위 그룹</strong>으로 확립.</span>', '<span className="mr-3 text-[#047857]">▪</span><span>{lang === \'kr\' ? <>2007년 글로벌 판매 약 400만 대에서 <strong>2024년 약 723만 대</strong>로 도요타·폭스바겐에 이은 <strong>글로벌 3위 그룹</strong>으로 확립.</> : <>Established as the <strong>global 3rd largest group</strong> following Toyota and Volkswagen, from ~4M units in 2007 to <strong>~7.23M units in 2024</strong>.</>}</span>'],
    ['<span className="mr-3 text-[#047857]">▪</span><span>전기차 전환에서 아이오닉·EV9 라인업으로 테슬라·BYD 다음 그룹에 안정적으로 안착함.</span>', '<span className="mr-3 text-[#047857]">▪</span><span>{lang === \'kr\' ? \'전기차 전환에서 아이오닉·EV9 라인업으로 테슬라·BYD 다음 그룹에 안정적으로 안착함.\' : \'Stably positioned in the group following Tesla and BYD with IONIQ and EV9 lineups in the EV transition.\'}</span>'],
    ['<span className="mr-3 text-[#047857]">▪</span><span>보스턴 다이내믹스 인수(2021) 및 슈퍼널(UAM) 설립으로 모빌리티의 경계를 허묾.</span>', '<span className="mr-3 text-[#047857]">▪</span><span>{lang === \'kr\' ? \'보스턴 다이내믹스 인수(2021) 및 슈퍼널(UAM) 설립으로 모빌리티의 경계를 허묾.\' : \'Breaking mobility boundaries by acquiring Boston Dynamics (2021) and establishing Supernal (UAM).\'}</span>'],
    ['<span className="mr-3 text-[#047857]">▪</span><span>NVIDIA 협력 AI 데이터센터 건립을 통해 <strong>자동차 ➔ 로봇 ➔ AI 인프라</strong>까지 비즈니스 영역을 전면 확장 중.</span>', '<span className="mr-3 text-[#047857]">▪</span><span>{lang === \'kr\' ? <>NVIDIA 협력 AI 데이터센터 건립을 통해 <strong>자동차 ➔ 로봇 ➔ AI 인프라</strong>까지 비즈니스 영역을 전면 확장 중.</> : <>Fully expanding business scope from <strong>Automobiles ➔ Robotics ➔ AI Infrastructure</strong> through NVIDIA-partnered AI data centers.</>}</span>']
]);

patch('Section16.jsx', [
    ['<span className="mr-3 text-[#ea580c]">▪</span><span>HD현대중공업·삼성중공업·한화오션의 <strong>압도적 빅3 체제</strong>.</span>', '<span className="mr-3 text-[#ea580c]">▪</span><span>{lang === \'kr\' ? <>HD현대중공업·삼성중공업·한화오션의 <strong>압도적 빅3 체제</strong>.</> : <><strong>Overwhelming Big 3 system</strong> of HD Hyundai Heavy Industries, Samsung Heavy Industries, and Hanwha Ocean.</>}</span>'],
    ['<span className="mr-3 text-[#ea580c]">▪</span><span>2025년 한국 조선 수출은 <strong>전년 대비 24.9% 증가</strong>하며, 반도체(+22.2%)와 함께 두 자릿수 성장을 기록한 유일한 업종임.</span>', '<span className="mr-3 text-[#ea580c]">▪</span><span>{lang === \'kr\' ? <>2025년 한국 조선 수출은 <strong>전년 대비 24.9% 증가</strong>하며, 반도체(+22.2%)와 함께 두 자릿수 성장을 기록한 유일한 업종임.</> : <>Korea\\\'s shipbuilding exports in 2025 <strong>increased 24.9% YoY</strong>, the only sector along with semiconductors (+22.2%) to record double-digit growth.</>}</span>'],
    ['<span className="mr-3 text-[#ea580c]">▪</span><span>LNG 운반선·암모니아 운반선·해양플랜트 등 고부가가치 선박에서 <strong>글로벌 점유율 60% 이상</strong>을 차지함.</span>', '<span className="mr-3 text-[#ea580c]">▪</span><span>{lang === \'kr\' ? <>LNG 운반선·암모니아 운반선·해양플랜트 등 고부가가치 선박에서 <strong>글로벌 점유율 60% 이상</strong>을 차지함.</> : <>Occupies <strong>over 60% global market share</strong> in high value-added vessels like LNG/Ammonia carriers and offshore plants.</>}</span>'],
    ['<span className="mr-3 text-[#ea580c]">▪</span><span>미·중 패권 경쟁이 촉발한 <strong>MASGA(Make American Shipbuilding Great Again)</strong> 흐름의 직접적 수혜 산업.</span>', '<span className="mr-3 text-[#ea580c]">▪</span><span>{lang === \'kr\' ? <>미·중 패권 경쟁이 촉발한 <strong>MASGA(Make American Shipbuilding Great Again)</strong> 흐름의 직접적 수혜 산업.</> : <>Direct beneficiary of the <strong>MASGA (Make American Shipbuilding Great Again)</strong> trend triggered by US-China hegemony competition.</>}</span>']
]);

patch('Section17.jsx', [
    ['<span className="mr-3 text-red-500">▪</span><span>2007년에는 <strong>SK이노베이션·GS칼텍스·에쓰오일·현대오일뱅크 4강</strong>이 명확히 시장을 주도함.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>2007년에는 <strong>SK이노베이션·GS칼텍스·에쓰오일·현대오일뱅크 4강</strong>이 명확히 시장을 주도함.</> : <>In 2007, the <strong>Big 4 (SK Innovation, GS Caltex, S-Oil, Hyundai Oilbank)</strong> clearly dominated the market.</>}</span>'],
    ['<span className="mr-3 text-red-500">▪</span><span>그러나 2020년대 중반 들어 <strong>중국의 자급률 상승</strong>으로 인해 구조적 다운사이클에 진입함.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>그러나 2020년대 중반 들어 <strong>중국의 자급률 상승</strong>으로 인해 구조적 다운사이클에 진입함.</> : <>However, entered a structural downcycle in the mid-2020s due to <strong>China\'s rising self-sufficiency</strong>.</>}</span>'],
    ['<span className="mr-3 text-red-500">▪</span><span>결과적으로 1조 ➔ 2조 달러 구간 후반부에 <strong>상대적 둔화 섹터</strong>로 분류해야 하는 상황임.</span>', '<span className="mr-3 text-red-500">▪</span><span>{lang === \'kr\' ? <>결과적으로 1조 ➔ 2조 달러 구간 후반부에 <strong>상대적 둔화 섹터</strong>로 분류해야 하는 상황임.</> : <>Consequently, classified as a <strong>relatively slowing sector</strong> in the latter half of the $1T to $2T period.</>}</span>']
]);

patch('Section18.jsx', [
    ['<span className="mr-3 text-[#7c3aed]">▪</span><span>철강(POSCO)은 1조 달러 시대 초입 <strong>한국 경제의 상징</strong>이었으나, 중국의 과잉 공급으로 마진 압박에 직면함.</span>', '<span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === \'kr\' ? <>철강(POSCO)은 1조 달러 시대 초입 <strong>한국 경제의 상징</strong>이었으나, 중국의 과잉 공급으로 마진 압박에 직면함.</> : <>Steel (POSCO) was a <strong>symbol of the Korean economy</strong> in the early $1T era, but faced margin pressure from China\'s oversupply.</>}</span>'],
    ['<span className="mr-3 text-[#7c3aed]">▪</span><span>이러한 위기를 타개하기 위해 <strong>2차전지 소재(양극재·리튬 등) 밸류체인</strong>으로 과감한 피벗팅(Pivoting)을 단행함.</span>', '<span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === \'kr\' ? <>이러한 위기를 타개하기 위해 <strong>2차전지 소재(양극재·리튬 등) 밸류체인</strong>으로 과감한 피벗팅(Pivoting)을 단행함.</> : <>To overcome this, executed a bold pivot to the <strong>secondary battery material (cathode, lithium, etc.) value chain</strong>.</>}</span>'],
    ['<span className="mr-3 text-[#7c3aed]">▪</span><span>POSCO홀딩스의 진화는 1조 ➔ 2조 달러 구간에서 일어난 가장 <strong>대표적인 산업 전환 케이스</strong>임.</span>', '<span className="mr-3 text-[#7c3aed]">▪</span><span>{lang === \'kr\' ? <>POSCO홀딩스의 진화는 1조 ➔ 2조 달러 구간에서 일어난 가장 <strong>대표적인 산업 전환 케이스</strong>임.</> : <>The evolution of POSCO Holdings is the most <strong>representative industrial transition case</strong> in the $1T to $2T period.</>}</span>']
]);

patch('Section19.jsx', [
    ['<span className="text-[28px] font-black text-[#d946ef] mb-1">4대 엔터</span>', '<span className="text-[28px] font-black text-[#d946ef] mb-1">{lang === \'kr\' ? \'4대 엔터\' : \'Big 4 Enter\'}</span>'],
    ['<span className="text-[16px] text-gray-600 font-bold">기생충 · 오징어 게임</span>', '<span className="text-[16px] text-gray-600 font-bold">{lang === \'kr\' ? \'기생충 · 오징어 게임\' : \'Parasite · Squid Game\'}</span>'],
    ['<span className="text-[28px] font-black text-[#e11d48] mb-1">Netflix 투자</span>', '<span className="text-[28px] font-black text-[#e11d48] mb-1">{lang === \'kr\' ? \'Netflix 투자\' : \'Netflix Investment\'}</span>'],
    ['<span className="mr-3 text-[#d946ef]">▪</span><span>K-콘텐츠는 1조 ➔ 2조 달러 구간의 숨겨진 진주. HYBE 등 <strong>4대 엔터와 CJ ENM</strong>이 글로벌 흥행을 주도함.</span>', '<span className="mr-3 text-[#d946ef]">▪</span><span>{lang === \'kr\' ? <>K-콘텐츠는 1조 ➔ 2조 달러 구간의 숨겨진 진주. HYBE 등 <strong>4대 엔터와 CJ ENM</strong>이 글로벌 흥행을 주도함.</> : <>K-Content is the hidden gem of the $1T to $2T period. <strong>Big 4 agencies (e.g. HYBE) and CJ ENM</strong> lead global hits.</>}</span>'],
    ['<span className="mr-3 text-[#d946ef]">▪</span><span>넷플릭스의 한국 콘텐츠 누적 투자(2016~2025)가 <strong>25억 달러 이상</strong>을 기록하며 산업 파이를 키움.</span>', '<span className="mr-3 text-[#d946ef]">▪</span><span>{lang === \'kr\' ? <>넷플릭스의 한국 콘텐츠 누적 투자(2016~2025)가 <strong>25억 달러 이상</strong>을 기록하며 산업 파이를 키움.</> : <>Netflix\'s cumulative investment in Korean content (2016-2025) recorded <strong>over $2.5B</strong>, growing the industry pie.</>}</span>'],
    ['<span className="mr-3 text-[#d946ef]">▪</span><span>명목 GDP 기여도는 1~2%대지만, 국가 브랜드 <strong>코리아 프리미엄(Korea Premium)</strong>의 핵심 동력으로 작용함.</span>', '<span className="mr-3 text-[#d946ef]">▪</span><span>{lang === \'kr\' ? <>명목 GDP 기여도는 1~2%대지만, 국가 브랜드 <strong>코리아 프리미엄(Korea Premium)</strong>의 핵심 동력으로 작용함.</> : <>Nominal GDP contribution is ~1-2%, but acts as the core driver of the national brand <strong>Korea Premium</strong>.</>}</span>'],
    ['<span className="mr-3 text-[#d946ef]">▪</span><span>과거 1980년대 일본 버블기 소니·세가가 구축한 <strong>J-Brand 프리미엄</strong>과 유사한 거대한 무형 자산임.</span>', '<span className="mr-3 text-[#d946ef]">▪</span><span>{lang === \'kr\' ? <>과거 1980년대 일본 버블기 소니·세가가 구축한 <strong>J-Brand 프리미엄</strong>과 유사한 거대한 무형 자산임.</> : <>A massive intangible asset similar to the <strong>J-Brand Premium</strong> built by Sony/Sega in the 1980s Japan bubble era.</>}</span>']
]);

patch('Section20.jsx', [
    ['<span className="mr-3 text-[#0ea5e9]">▪</span><span>바이오/제약 산업은 1조 달러 시대 초입(2007년 경)에는 <strong>글로벌 존재감이 거의 없었던 새로운 산업</strong>임.</span>', '<span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === \'kr\' ? <>바이오/제약 산업은 1조 달러 시대 초입(2007년 경)에는 <strong>글로벌 존재감이 거의 없었던 새로운 산업</strong>임.</> : <>Bio/Pharma was a <strong>new industry with almost no global presence</strong> in the early $1T era (around 2007).</>}</span>'],
    ['<span className="mr-3 text-[#0ea5e9]">▪</span><span>현재 삼성바이오로직스는 <strong>CDMO(위탁개발생산) 분야 글로벌 1위</strong>(매출 4조 원+, 시총 50조 원+)로 등극함.</span>', '<span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === \'kr\' ? <>현재 삼성바이오로직스는 <strong>CDMO(위탁개발생산) 분야 글로벌 1위</strong>(매출 4조 원+, 시총 50조 원+)로 등극함.</> : <>Samsung Biologics is now <strong>Global #1 in CDMO</strong> (Revenue 4T KRW+, Market Cap 50T KRW+).</>}</span>'],
    ['<span className="mr-3 text-[#0ea5e9]">▪</span><span>셀트리온의 바이오시밀러 글로벌 진출 등과 맞물려 <strong>K-바이오 클러스터</strong>가 한국 경제의 신성장 동력으로 안착함.</span>', '<span className="mr-3 text-[#0ea5e9]">▪</span><span>{lang === \'kr\' ? <>셀트리온의 바이오시밀러 글로벌 진출 등과 맞물려 <strong>K-바이오 클러스터</strong>가 한국 경제의 신성장 동력으로 안착함.</> : <>Coupled with Celltrion\'s global biosimilar expansion, the <strong>K-Bio Cluster</strong> settled as Korea\'s new growth engine.</>}</span>']
]);
