const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replaceInFile = (filename, replacements) => {
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf-8');
    let changed = false;
    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            content = content.replace(search, replace);
            changed = true;
        } else {
            console.log(`Not found in ${filename}: ${search}`);
        }
    }
    if (changed) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filename}`);
    }
};

replaceInFile('Section1.jsx', [
    ['<span>3조 달러 시대</span>', "{lang === 'kr' ? <span>3조 달러 시대</span> : <span>The $3 Trillion Era</span>}"],
    ['<span className="mt-[10px]">이지스의 글로벌 도약과 IOTA 프로젝트 마스터플랜</span>', "{lang === 'kr' ? <span className=\"mt-[10px]\">이지스의 글로벌 도약과 IOTA 프로젝트 마스터플랜</span> : <span className=\"mt-[10px]\">IGIS's Global Leap and IOTA Project Master Plan</span>}"]
]);

replaceInFile('Section3.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 3조 달러 시대, 이지스자산운용의 전략적 좌표\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'3조 달러 시대, 이지스자산운용의 전략적 좌표\' : \'The $3 Trillion Era, IGIS Asset Management\\\'s Strategic Coordinates\'}\n </span>']
]);

replaceInFile('Section4.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 글로벌 운용사로의 도약 분기점\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'글로벌 운용사로의 도약 분기점\' : \'Inflection Point for Global AM Leap\'}\n </span>']
]);

replaceInFile('Section5.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n IOTA 서울 프로젝트의 문명사적 의미\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'IOTA 서울 프로젝트의 문명사적 의미\' : \'Civilizational Significance of IOTA Seoul Project\'}\n </span>'],
    ['<span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">1조 달러 시대의 상징</span>', '<span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">{lang === \'kr\' ? \'1조 달러 시대의 상징\' : \'Symbol of the $1T Era\'}</span>'],
    ['<h3 className="text-[36px] font-extrabold text-white">IFC 서울</h3>', '<h3 className="text-[36px] font-extrabold text-white">{lang === \'kr\' ? \'IFC 서울\' : \'IFC Seoul\'}</h3>'],
    ['<span className="text-[20px] font-bold text-[#bfdbfe] mb-[2px] uppercase">3조 달러 시대를 정의할 절대 좌표</span>', '<span className="text-[20px] font-bold text-[#bfdbfe] mb-[2px] uppercase">{lang === \'kr\' ? \'3조 달러 시대를 정의할 절대 좌표\' : \'Absolute Coordinates Defining the $3T Era\'}</span>'],
    ['<h3 className="text-[36px] font-extrabold text-white">IOTA 서울</h3>', '<h3 className="text-[36px] font-extrabold text-white">{lang === \'kr\' ? \'IOTA 서울\' : \'IOTA Seoul\'}</h3>']
]);

replaceInFile('Section5B.jsx', [
    ['<span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">\n IOTA 서울 프로젝트(IPR)의 다층적 분석을 위한 CEO 레벨 전략 구성\n </span>', '<span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] tracking-[-0.02em] mb-[12px]">\n {lang === \'kr\' ? \'IOTA 서울 프로젝트(IPR)의 다층적 분석을 위한 CEO 레벨 전략 구성\' : \'CEO-Level Strategy for Multi-layered Analysis of IPR\'}\n </span>'],
    ['<h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-y-0">\n 4단계 전략 프레임워크\n </h2>', '<h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[612ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-y-0">\n {lang === \'kr\' ? \'4단계 전략 프레임워크\' : \'4-Part Strategic Framework\'}\n </h2>'],
    ['<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">1부</div>', '<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === \'kr\' ? \'1부\' : \'Part 1\'}</div>'],
    ['한국 1조 → 2조 달러 산업·자본·부동산 역사', '{lang === \'kr\' ? \'한국 1조 → 2조 달러 산업·자본·부동산 역사\' : \'Korea $1T → $2T Industry·Capital·Real Estate History\'}'],
    ['<p className="text-[20px] text-[#555] leading-snug">거시적 관점에서의 과거 양적 팽창기 분석 및 부동산 시장의 구조적 변화 추적</p>', '<p className="text-[20px] text-[#555] leading-snug">{lang === \'kr\' ? \'거시적 관점에서의 과거 양적 팽창기 분석 및 부동산 시장의 구조적 변화 추적\' : \'Macro analysis of past quantitative expansion & structural changes in real estate\'}</p>'],
    ['<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">2부</div>', '<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === \'kr\' ? \'2부\' : \'Part 2\'}</div>'],
    ['2조 → 3조 달러 시나리오 분석 <span className="text-[#888] font-bold text-[24px]">(Base / Bull / Bear)</span>', '{lang === \'kr\' ? \'2조 → 3조 달러 시나리오 분석\' : \'$2T → $3T Scenario Analysis\'} <span className="text-[#888] font-bold text-[24px]">(Base / Bull / Bear)</span>'],
    ['<p className="text-[20px] text-[#555] leading-snug">미래 패권 경쟁 및 거시 경제 변수(금리, 성장률)를 기반으로 한 방향성 도출</p>', '<p className="text-[20px] text-[#555] leading-snug">{lang === \'kr\' ? \'미래 패권 경쟁 및 거시 경제 변수(금리, 성장률)를 기반으로 한 방향성 도출\' : \'Deriving direction based on future hegemony competition & macro variables\'}</p>'],
    ['<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">3부</div>', '<div className="text-[40px] font-black text-[#888] w-20 shrink-0 font-serif leading-none mt-1">{lang === \'kr\' ? \'3부\' : \'Part 3\'}</div>'],
    ['이지스 전략 포지셔닝', '{lang === \'kr\' ? \'이지스 전략 포지셔닝\' : \'IGIS Strategic Positioning\'}'],
    ['<p className="text-[20px] text-[#555] leading-snug">시나리오에 대응하는 이지스자산운용의 전사적 리스크 관리 및 밸류애드 전략 타겟</p>', '<p className="text-[20px] text-[#555] leading-snug">{lang === \'kr\' ? \'시나리오에 대응하는 이지스자산운용의 전사적 리스크 관리 및 밸류애드 전략 타겟\' : \'Enterprise risk management & value-add strategy targets corresponding to scenarios\'}</p>'],
    ['<div className="text-[40px] font-black text-[#555] w-20 shrink-0 font-serif leading-none mt-1">4부</div>', '<div className="text-[40px] font-black text-[#555] w-20 shrink-0 font-serif leading-none mt-1">{lang === \'kr\' ? \'4부\' : \'Part 4\'}</div>'],
    ['IOTA 서울의 역할과 실행 변수', '{lang === \'kr\' ? \'IOTA 서울의 역할과 실행 변수\' : \'Role & Execution Variables of IOTA Seoul\'}'],
    ['<p className="text-[20px] text-[#aaa] leading-snug">단일 최대 PF 프로젝트가 글로벌 운용사 도약에 미치는 상징성과 세부 실행 프레임워크</p>', '<p className="text-[20px] text-[#aaa] leading-snug">{lang === \'kr\' ? \'단일 최대 PF 프로젝트가 글로벌 운용사 도약에 미치는 상징성과 세부 실행 프레임워크\' : \'Significance of the largest PF project for global AM leap & execution framework\'}</p>'],
    ['<strong className="text-[#333]">[문체 일러두기]</strong> 본 분석은 객관성 유지를 위해 <strong>\'음슴체\'</strong>를 적용하며, 직접 호명에 한해 <strong>\'존댓말\'</strong>을 제한적으로 사용함.', '{lang === \'kr\' ? <><strong className="text-[#333]">[문체 일러두기]</strong> 본 분석은 객관성 유지를 위해 <strong>\'음슴체\'</strong>를 적용하며, 직접 호명에 한해 <strong>\'존댓말\'</strong>을 제한적으로 사용함.</> : <><strong className="text-[#333]">[Note on Style]</strong> The Korean version uses noun-ending objective style for clarity.</>}']
]);

replaceInFile('Section6.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 이지스 2030 마스터플랜의 4대 핵심 축\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'이지스 2030 마스터플랜의 4대 핵심 축\' : \'4 Core Pillars of IGIS 2030 Master Plan\'}\n </span>']
]);
replaceInFile('Section7.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 시대의 리듬과 이지스의 결단\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'시대의 리듬과 이지스의 결단\' : \'Rhythm of the Era & IGIS\\\'s Decision\'}\n </span>'],
    ['<span className="text-[20px] font-bold text-[#777] mb-[2px] uppercase">도쿄의 심장 재창조</span>', '<span className="text-[20px] font-bold text-[#777] mb-[2px] uppercase">{lang === \'kr\' ? \'도쿄의 심장 재창조\' : \'Recreating the Heart of Tokyo\'}</span>'],
    ['<h3 className="text-[30px] md:text-[34px] font-extrabold text-[#1d1d1f]">모리 빌딩 (Mori Building)</h3>', '<h3 className="text-[30px] md:text-[34px] font-extrabold text-[#1d1d1f]">{lang === \'kr\' ? \'모리 빌딩 (Mori Building)\' : \'Mori Building\'}</h3>'],
    ['<p className="mt-[6px] text-[20px] text-[#555] font-bold">수직 도시 (Vertical City) 모델</p>', '<p className="mt-[6px] text-[20px] text-[#555] font-bold">{lang === \'kr\' ? \'수직 도시 (Vertical City) 모델\' : \'Vertical City Model\'}</p>'],
    ['<span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">서울 YSBD의 재창조</span>', '<span className="text-[20px] font-bold text-[#aaa] mb-[2px] uppercase">{lang === \'kr\' ? \'서울 YSBD의 재창조\' : \'Recreating Seoul YSBD\'}</span>'],
    ['<h3 className="text-[30px] md:text-[34px] font-extrabold text-white">이지스자산운용 (IGIS)</h3>', '<h3 className="text-[30px] md:text-[34px] font-extrabold text-white">{lang === \'kr\' ? \'이지스자산운용 (IGIS)\' : \'IGIS Asset Management\'}</h3>'],
    ['<p className="mt-[6px] text-[20px] text-[#ccc] font-bold">마스터 디벨로퍼 (Master Developer)</p>', '<p className="mt-[6px] text-[20px] text-[#ccc] font-bold">{lang === \'kr\' ? \'마스터 디벨로퍼 (Master Developer)\' : \'Master Developer\'}</p>']
]);

// Section 10
replaceInFile('Section10.jsx', [
    ['<li>• 명목 GDP: <span className="font-bold text-black">1.12조 달러</span></li>', '<li>• {lang === \'kr\' ? \'명목 GDP\' : \'Nominal GDP\'}: <span className="font-bold text-black">{lang === \'kr\' ? \'1.12조 달러\' : \'$1.12T\'}</span></li>'],
    ['<li>• 1인당 GDP: <span className="font-bold text-black">2.4만 달러</span></li>', '<li>• {lang === \'kr\' ? \'1인당 GDP\' : \'GDP per capita\'}: <span className="font-bold text-black">{lang === \'kr\' ? \'2.4만 달러\' : \'$24K\'}</span></li>'],
    ['<li>• KOSPI: <span className="font-bold text-black">최초 2,000선 돌파</span></li>', '<li>• KOSPI: <span className="font-bold text-black">{lang === \'kr\' ? \'최초 2,000선 돌파\' : \'Surpassed 2,000 pts\'}</span></li>'],
    ['<li>• OECD 평균 소득의 <span className="font-bold text-black">70% 달성</span></li>', '<li>• {lang === \'kr\' ? <>OECD 평균 소득의 <span className="font-bold text-black">70% 달성</span></> : <>Reached <span className="font-bold text-black">70%</span> of OECD average income</>}</li>'],
    ['<p className="text-[15px] font-bold text-[#be185d]">GDP 1조 달러 아래로 후퇴<br/>(약 0.94조 달러)</p>', '<p className="text-[15px] font-bold text-[#be185d]">{lang === \'kr\' ? <>GDP 1조 달러 아래로 후퇴<br/>(약 0.94조 달러)</> : <>GDP fell below $1T<br/>(approx. $0.94T)</>}</p>'],
    ['<p className="text-[16px] font-bold text-[#0369a1] mb-2">안정적인 1조 달러 경제 정착</p>', '<p className="text-[16px] font-bold text-[#0369a1] mb-2">{lang === \'kr\' ? \'안정적인 1조 달러 경제 정착\' : \'Stable $1T Economy Settled\'}</p>'],
    ['<p className="text-[14px] font-medium text-gray-700">명목 GDP: <span className="font-bold text-black">약 1.14조 달러</span></p>', '<p className="text-[14px] font-medium text-gray-700">{lang === \'kr\' ? \'명목 GDP\' : \'Nominal GDP\'}: <span className="font-bold text-black">{lang === \'kr\' ? \'약 1.14조 달러\' : \'approx. $1.14T\'}</span></p>']
]);
