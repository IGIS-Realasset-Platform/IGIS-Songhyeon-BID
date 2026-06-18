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

patch('Section1.jsx', [
    ['<span>3조 달러 시대</span>', "{lang === 'kr' ? <span>3조 달러 시대</span> : <span>The $3 Trillion Era</span>}"],
    ['<span className="mt-[10px]">이지스의 글로벌 도약과 IOTA 프로젝트 마스터플랜</span>', "{lang === 'kr' ? <span className=\"mt-[10px]\">이지스의 글로벌 도약과 IOTA 프로젝트 마스터플랜</span> : <span className=\"mt-[10px]\">IGIS's Global Leap and IOTA Project Master Plan</span>}"]
]);

patch('Section11.jsx', [
    ['<>1조에서 2조 달러로 2배 성장,<br/>대한민국의 20년 도약</>', "{lang === 'kr' ? <>1조에서 2조 달러로 2배 성장,<br/>대한민국의 20년 도약</> : <>Doubling from $1T to $2T,<br/>Korea's 20-Year Leap</>}"],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>2007년 1조 달러를 처음 돌파한 이후, <strong>약 20년 만에 2조 달러 고지 달성</strong>이 가시화됨.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>2007년 1조 달러를 처음 돌파한 이후, <strong>약 20년 만에 2조 달러 고지 달성</strong>이 가시화됨.</> : <>After surpassing $1T in 2007, <strong>reaching the $2T mark in about 20 years</strong> is now visible.</>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>글로벌 경제의 변동성 속에서도 국가 경제 규모가 <strong>2배로 성장하는 거대한 사이클</strong>을 완성함.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>글로벌 경제의 변동성 속에서도 국가 경제 규모가 <strong>2배로 성장하는 거대한 사이클</strong>을 완성함.</> : <>Completed a <strong>massive cycle of doubling the national economy</strong> despite global economic volatility.</>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>단순한 양적 성장을 넘어, 산업 구조의 다변화와 글로벌 경쟁력 강화를 동반한 질적 도약의 시기였음.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? \'단순한 양적 성장을 넘어, 산업 구조의 다변화와 글로벌 경쟁력 강화를 동반한 질적 도약의 시기였음.\' : \'Beyond quantitative growth, a period of qualitative leap accompanied by industrial diversification and global competitiveness enhancement.\'}</span>']
]);

patch('Section12.jsx', [
    ['<>중후장대와 신성장 산업의 결합,<br/>그리고 심화된 단일 종목 종속성</>', "{lang === 'kr' ? <>중후장대와 신성장 산업의 결합,<br/>그리고 심화된 단일 종목 종속성</> : <>Convergence of Heavy and New Growth Industries,<br/>and Deepened Dependency on a Single Sector</>}"],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>1조 → 2조 달러 20년 구간의 본질은 <strong>"수출 제조업 슈퍼 사이클 + 신규 엔진 장착"</strong>임</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>1조 → 2조 달러 20년 구간의 본질은 <strong>"수출 제조업 슈퍼 사이클 + 신규 엔진 장착"</strong>임</> : <>The essence of the 20-year $1T to $2T period is <strong>"Export Manufacturing Super Cycle + New Engines"</strong></>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>5대 중후장대</strong>(반도체·자동차·조선 등)와 <strong>5대 신성장</strong>(콘텐츠·바이오 등)의 10대 산업 듀얼 엔진으로 확장됨</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <><strong>5대 중후장대</strong>(반도체·자동차·조선 등)와 <strong>5대 신성장</strong>(콘텐츠·바이오 등)의 10대 산업 듀얼 엔진으로 확장됨</> : <>Expanded into a 10-industry dual engine of <strong>5 Heavy Industries</strong> (Semiconductors, Auto, Shipbuilding) and <strong>5 New Growth Industries</strong> (Content, Bio, etc.)</>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>단일 동력원에 의존하지 않아 높은 <strong>회복탄력성(Resilience)</strong>을 입증함</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>단일 동력원에 의존하지 않아 높은 <strong>회복탄력성(Resilience)</strong>을 입증함</> : <>Proven high <strong>Resilience</strong> by not relying on a single power source</>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>반대로 <strong>반도체 단일 종목에 대한 의존도 심화</strong>라는 거시적 양면성도 함께 가짐</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>반대로 <strong>반도체 단일 종목에 대한 의존도 심화</strong>라는 거시적 양면성도 함께 가짐</> : <>Conversely, accompanied by the macroeconomic duality of <strong>deepened dependency on a single semiconductor sector</strong></>}</span>']
]);

patch('Section13.jsx', [
    ['<>산업별 모멘텀<br/>한국 1조→2조 달러를 만든 10대 엔진</>', "{lang === 'kr' ? <>산업별 모멘텀<br/>한국 1조→2조 달러를 만든 10대 엔진</> : <>Industry Momentum<br/>10 Engines that Drove Korea from $1T to $2T</>}"]
]);

patch('Section14.jsx', [
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>가장 결정적 엔진임. <strong>삼성전자 매출은 2007년 약 100조 원에서 2025년 약 333조 원</strong>으로 3배 이상 확대.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>가장 결정적 엔진임. <strong>삼성전자 매출은 2007년 약 100조 원에서 2025년 약 333조 원</strong>으로 3배 이상 확대.</> : <>The most crucial engine. <strong>Samsung Electronics revenue expanded over 3x from ~$100T KRW in 2007 to ~$333T KRW in 2025.</strong></>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span><strong>SK하이닉스는 2025년 사상 처음 분기 영업이익 10조 원</strong>을 돌파하며 AI 슈퍼사이클의 가장 큰 수혜자가 됨.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <><strong>SK하이닉스는 2025년 사상 처음 분기 영업이익 10조 원</strong>을 돌파하며 AI 슈퍼사이클의 가장 큰 수혜자가 됨.</> : <><strong>SK Hynix surpassed 10T KRW in quarterly operating profit for the first time in 2025</strong>, becoming the biggest beneficiary of the AI super cycle.</>}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>Bloomberg는 2024년 삼성전자 단독으로 한국 GDP 성장의 약 절반을 설명한다고 분석함.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? \'Bloomberg는 2024년 삼성전자 단독으로 한국 GDP 성장의 약 절반을 설명한다고 분석함.\' : \'Bloomberg analyzed that Samsung Electronics alone accounted for about half of Korea\\\'s GDP growth in 2024.\'}</span>'],
    ['<span className="mr-3 text-[#1e3a8a]">▪</span><span>삼성그룹 매출의 GDP 비중이 <strong>2007년 15%에서 2022년 22.4%</strong>까지 상승하여 단일 그룹 매크로 종속성이 오히려 심화됨.</span>', '<span className="mr-3 text-[#1e3a8a]">▪</span><span>{lang === \'kr\' ? <>삼성그룹 매출의 GDP 비중이 <strong>2007년 15%에서 2022년 22.4%</strong>까지 상승하여 단일 그룹 매크로 종속성이 오히려 심화됨.</> : <>Samsung Group revenue to GDP ratio rose from <strong>15% in 2007 to 22.4% in 2022</strong>, deepening macroeconomic dependency on a single group.</>}</span>']
]);

// Run the patches
