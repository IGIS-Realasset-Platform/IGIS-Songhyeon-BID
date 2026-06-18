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

patch('Section8.jsx', [
    ['<>한국 GDP 1조 → 2조 달러 시대<br/>역사적 분석</>', "{lang === 'kr' ? <>한국 GDP 1조 → 2조 달러 시대<br/>역사적 분석</> : <>Korea GDP $1T → $2T Era<br/>Historical Analysis</>}"]
]);

patch('Section9.jsx', [
    ['<>1조 달러에서 2조 달러로<br/>거시 좌표의 이동</>', "{lang === 'kr' ? <>1조 달러에서 2조 달러로<br/>거시 좌표의 이동</> : <>From $1T to $2T<br/>Shift in Macro Coordinates</>}"]
]);

patch('Section78.jsx', [
    ["? 'PER 13배 디스카운트 해소 및 2040년 KOSPI 9,000~11,000 도달. 코리아 프리미엄 진입을 위한 안정적 Base 성장 모델'", "? (lang === 'kr' ? 'PER 13배 디스카운트 해소 및 2040년 KOSPI 9,000~11,000 도달. 코리아 프리미엄 진입을 위한 안정적 Base 성장 모델' : 'Resolution of PER 13x discount and reaching KOSPI 9,000-11,000 by 2040. Stable Base growth model for entering Korea Premium.')"]
]);

patch('Section79.jsx', [
    ["? '삼성전자 2천 조 원 시대 도래와 함께 1만 5천~1만 8천 선까지 폭주, 전체 시장 시총이 GDP 대비 200%에 달하는 폭발적 딥 마켓(Deep Market) 구축 전망'", "? (lang === 'kr' ? '삼성전자 2천 조 원 시대 도래와 함께 1만 5천~1만 8천 선까지 폭주, 전체 시장 시총이 GDP 대비 200%에 달하는 폭발적 딥 마켓(Deep Market) 구축 전망' : 'Surge to 15,000-18,000 with the advent of the 2,000T KRW Samsung Electronics era, building an explosive Deep Market where total market cap reaches 200% of GDP.')"]
]);

patch('Section80.jsx', [
    ["? '인구 충격과 지정학의 덫에 빠질 경우 KOSPI가 4천~6천 대 긴 박스권에 체류하며 밸류에이션 붕괴와 지독한 디플레 압력을 받을 리스크 경고'", "? (lang === 'kr' ? '인구 충격과 지정학의 덫에 빠질 경우 KOSPI가 4천~6천 대 긴 박스권에 체류하며 밸류에이션 붕괴와 지독한 디플레 압력을 받을 리스크 경고' : 'Warning of risks where KOSPI stays in a long 4,000-6,000 box range, suffering valuation collapse and severe deflationary pressure if caught in demographic shocks and geopolitical traps.')"]
]);

patch('Section81.jsx', [
    ['<span className="text-[#fcd34d]">주가 상승</span> = 코리아 프리미엄 = <span className="text-[#fcd34d]">캡레이트 하락</span>', '{lang === \'kr\' ? <><span className="text-[#fcd34d]">주가 상승</span> = 코리아 프리미엄 = <span className="text-[#fcd34d]">캡레이트 하락</span></> : <><span className="text-[#fcd34d]">Stock Rise</span> = Korea Premium = <span className="text-[#fcd34d]">Cap Rate Drop</span></>}']
]);

patch('Section83.jsx', [
    ["? '싱가포르보다 낮고 홍콩 센트럴 대비 3분의 1 수준의 서울 프라임 임대료'", "? (lang === 'kr' ? '싱가포르보다 낮고 홍콩 센트럴 대비 3분의 1 수준의 서울 프라임 임대료' : 'Seoul prime rents lower than Singapore and at 1/3 the level of Hong Kong Central.')"]
]);

patch('Section84.jsx', [
    ['<div className="text-gray-500 font-bold text-[18px] mb-2">2026 (현재)</div>', '<div className="text-gray-500 font-bold text-[18px] mb-2">{lang === \'kr\' ? \'2026 (현재)\' : \'2026 (Current)\'}</div>'],
    ['<div className="text-[#1d1d1f] font-black text-[36px] leading-none mb-1">USD 80<span className="text-[20px] text-gray-500">대</span></div>', '<div className="text-[#1d1d1f] font-black text-[36px] leading-none mb-1">USD 80<span className="text-[20px] text-gray-500">{lang === \'kr\' ? \'대\' : \'s\'}</span></div>'],
    ['<div className="text-blue-200 font-bold text-[20px] mb-2">2040 (Tokyo Marunouchi 수준)</div>', '<div className="text-blue-200 font-bold text-[20px] mb-2">{lang === \'kr\' ? \'2040 (Tokyo Marunouchi 수준)\' : \'2040 (Tokyo Marunouchi level)\'}</div>'],
    ['? <>현재의 터무니없는 저평가가 역으로 IOTA를 글로벌 LP에게<br/>"향후 15년간 가격이 2배로 수렴 가능하다고 세일즈할 수 있는 단일 최강 Thesis"</>', '? (lang === \'kr\' ? <>현재의 터무니없는 저평가가 역으로 IOTA를 글로벌 LP에게<br/>"향후 15년간 가격이 2배로 수렴 가능하다고 세일즈할 수 있는 단일 최강 Thesis"</> : <>Current absurd undervaluation paradoxically provides the single strongest thesis to sell IOTA to global LPs:<br/>"Prices can converge to double over the next 15 years."</>)']
]);

patch('Section87.jsx', [
    ["? '국내 부동산 펀드·리츠 1위를 넘어 글로벌 무대에서의 객관적 위치 인식'", "? (lang === 'kr' ? '국내 부동산 펀드·리츠 1위를 넘어 글로벌 무대에서의 객관적 위치 인식' : 'Recognizing our objective position on the global stage, beyond being #1 in domestic real estate funds/REITs.')"]
]);

patch('Section88.jsx', [
    ["? '단순한 규모 확장을 넘어 질적 체질 개선을 동반한 블랙스톤 압축 진화 모델'", "? (lang === 'kr' ? '단순한 규모 확장을 넘어 질적 체질 개선을 동반한 블랙스톤 압축 진화 모델' : 'A Blackstone compressed evolution model accompanied by qualitative improvement beyond simple scale expansion.')"]
]);

patch('Section89.jsx', [
    ["? '단순 자산 매입·매각 모델을 넘어선 아시아 최고 수준의 부동산 가치 창출 플랫폼'", "? (lang === 'kr' ? '단순 자산 매입·매각 모델을 넘어선 아시아 최고 수준의 부동산 가치 창출 플랫폼' : 'Asia\\'s top-tier real estate value creation platform beyond simple asset buy/sell models.')"]
]);

patch('Section91.jsx', [
    ["? '이지스밸류플러스리츠 內 분당 Hostway IDC + 북미 13개 DC 포트폴리오(187MW)'", "? (lang === 'kr' ? '이지스밸류플러스리츠 內 분당 Hostway IDC + 북미 13개 DC 포트폴리오(187MW)' : 'Bundang Hostway IDC + 13 North American DC Portfolios (187MW) within IGIS Value Plus REIT.')"],
    ["? '향후 5년 내 독립 상장 DC REIT 분사 (2028~2030년)'", "? (lang === 'kr' ? '향후 5년 내 독립 상장 DC REIT 분사 (2028~2030년)' : 'Spin-off of an independently listed DC REIT within 5 years (2028-2030).')"],
    ["? '미국 Digital Realty(시총 약 USD 500억), Equinix(약 USD 800억) 수준의 globalish DC REIT 빌드업'", "? (lang === 'kr' ? '미국 Digital Realty(시총 약 USD 500억), Equinix(약 USD 800억) 수준의 globalish DC REIT 빌드업' : 'Building a globalish DC REIT on par with US Digital Realty (~$50B) and Equinix (~$80B).')"],
    ['? <>북미 13개 포트폴리오를 넘어, 국내 신규 전력 인입 권리와 빅테크 임대 확약을 바탕으로<br/>에퀴닉스에 버금갈 독자 상장형 DC REIT 플랫폼의 분사 로드맵을 띄운다.</>', '? (lang === \'kr\' ? <>북미 13개 포트폴리오를 넘어, 국내 신규 전력 인입 권리와 빅테크 임대 확약을 바탕으로<br/>에퀴닉스에 버금갈 독자 상장형 DC REIT 플랫폼의 분사 로드맵을 띄운다.</> : <>Beyond the 13 NA portfolios, launching a spin-off roadmap for an independently listed DC REIT platform rivaling Equinix,<br/>based on domestic new power connection rights and Big Tech lease commitments.</>)']
]);

patch('Section92.jsx', [
    ["? '침투율 0.6% → 5% 갭의 구조적 미충족 수요가 향후 15년을 지배'", "? (lang === 'kr' ? '침투율 0.6% → 5% 갭의 구조적 미충족 수요가 향후 15년을 지배' : 'Structural unmet demand from the 0.6% → 5% penetration rate gap will dominate the next 15 years.')"],
    ["? '물류(쿠팡 효과) → 시니어 케어(주거) 효과로 대체'", "? (lang === 'kr' ? '물류(쿠팡 효과) → 시니어 케어(주거) 효과로 대체' : 'Replacing Logistics (Coupang Effect) → Senior Care (Housing) Effect.')"],
    ["? '1조→2조 달러 구간의 성장 동력이었던 물류가, 2조→3조 달러 구간에서는 시니어 하우징으로 완벽히 전환됨'", "? (lang === 'kr' ? '1조→2조 달러 구간의 성장 동력이었던 물류가, 2조→3조 달러 구간에서는 시니어 하우징으로 완벽히 전환됨' : 'Logistics, the growth engine of the $1T-$2T period, completely transitions to senior housing in the $2T-$3T period.')"],
    ['? <>KB골든라이프 모델을 시작으로, 글로벌 메리어트 운영과 연기금 퇴직자 D2C 마케팅을 결합해<br/>외인 자본(Invesco 등)을 압도할 1위 시니어 하우징 플랫폼을 구축한다.</>', '? (lang === \'kr\' ? <>KB골든라이프 모델을 시작으로, 글로벌 메리어트 운영과 연기금 퇴직자 D2C 마케팅을 결합해<br/>외인 자본(Invesco 등)을 압도할 1위 시니어 하우징 플랫폼을 구축한다.</> : <>Starting with the KB Golden Life model, building the #1 senior housing platform to overwhelm foreign capital (e.g. Invesco)<br/>by combining global Marriott operations and D2C marketing to pension fund retirees.</>)']
]);

patch('Section93.jsx', [
    ['? <>IOTA라는 앵커 메가 프로젝트를 지렛대 삼아 마곡, 여의도 개발로 무한 연쇄 확장할<br/>글로벌 LP 전용 특화 패키지 \'이지스 트로피 시리즈\'를 상품화 한다.</>', '? (lang === \'kr\' ? <>IOTA라는 앵커 메가 프로젝트를 지렛대 삼아 마곡, 여의도 개발로 무한 연쇄 확장할<br/>글로벌 LP 전용 특화 패키지 \'이지스 트로피 시리즈\'를 상품화 한다.</> : <>Commercializing the \'IGIS Trophy Series\', a specialized package exclusive to global LPs, for infinite chain expansion into Magok and Yeouido developments,<br/>leveraging the anchor mega-project IOTA.</>)']
]);

patch('Section95.jsx', [
    ['? <>하드웨어(테크 레디)와 소프트웨어(AaaS)를 결합하여,<br/>부동산을 기업에게 \'서비스\'로서 제공하는 진정한 공간 운영 OS 플랫폼</>', '? (lang === \'kr\' ? <>하드웨어(테크 레디)와 소프트웨어(AaaS)를 결합하여,<br/>부동산을 기업에게 \'서비스\'로서 제공하는 진정한 공간 운영 OS 플랫폼</> : <>A true spatial operations OS platform providing real estate as a \'service\' to enterprises<br/>by combining hardware (Tech-Ready) and software (AaaS).</>)']
]);

patch('Section96.jsx', [
    ['1. Capital (거대 자본력)', '1. {lang === \'kr\' ? \'Capital (거대 자본력)\' : \'Capital (Massive Capital Power)\'}'],
    ['2. Real Estate Ownership (실물 자산 보유)', '2. {lang === \'kr\' ? \'Real Estate Ownership (실물 자산 보유)\' : \'Real Estate Ownership\'}'],
    ['3. Operating Layer (공간 운영 OS)', '3. {lang === \'kr\' ? \'Operating Layer (공간 운영 OS)\' : \'Operating Layer (Spatial Operations OS)\'}'],
    ['? <>글로벌 비교 시 모리빌딩의 운영 모델에 가장 근접.<br/>압도적 자본력과 실물 자산, 그리고 섬세한 운영 역량을<br/>완벽하게 결합한 성공 사례</>', '? (lang === \'kr\' ? <>글로벌 비교 시 모리빌딩의 운영 모델에 가장 근접.<br/>압도적 자본력과 실물 자산, 그리고 섬세한 운영 역량을<br/>완벽하게 결합한 성공 사례</> : <>Closest to Mori Building\'s operating model in global comparison.<br/>A successful case perfectly combining overwhelming capital, physical assets, and delicate operational capabilities.</>)'],
    ["? '임차 · 주거 · 문화 · F&B를 하나로 묶어 통합 운영하는 Mori의 모델을 IOTA에 직접 적용'", "? (lang === 'kr' ? '임차 · 주거 · 문화 · F&B를 하나로 묶어 통합 운영하는 Mori의 모델을 IOTA에 직접 적용' : 'Directly applying Mori\\'s model of integrating leasing, residential, culture, and F&B into unified operations to IOTA.')"],
    ['? <>자본력(Capital)과 소유권(Ownership), 그리고 운영(Operating) 역량을 모두 갖춘 이지스가<br/>WeWork의 실패를 넘어서는 기관용(Institutional) 공간 운영 플랫폼 실현 가능</>', '? (lang === \'kr\' ? <>자본력(Capital)과 소유권(Ownership), 그리고 운영(Operating) 역량을 모두 갖춘 이지스가<br/>WeWork의 실패를 넘어서는 기관용(Institutional) 공간 운영 플랫폼 실현 가능</> : <>IGIS, equipped with Capital, Ownership, and Operating capabilities, can realize an Institutional spatial operations platform transcending WeWork\'s failure.</>)']
]);

patch('Section98.jsx', [
    ['? <>현재 국내 LP 비중이 압도적인 구조에서 탈피,<br/>향후 5년 내 코밍글드 펀드 조성을 기점으로 양방향 플랫폼 도약</>', '? (lang === \'kr\' ? <>현재 국내 LP 비중이 압도적인 구조에서 탈피,<br/>향후 5년 내 코밍글드 펀드 조성을 기점으로 양방향 플랫폼 도약</> : <>Breaking away from the current structure overwhelmingly weighted towards domestic LPs,<br/>leaping into a two-way platform starting with commingled fund creation within 5 years.</>)']
]);

patch('Section99.jsx', [
    ['<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">GIC, Temasek (싱가포르)</h3>', '<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === \'kr\' ? \'GIC, Temasek (싱가포르)\' : \'GIC, Temasek (Singapore)\'}</h3>'],
    ['<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">CPPIB (캐나다 연금)</h3>', '<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === \'kr\' ? \'CPPIB (캐나다 연금)\' : \'CPPIB (Canada Pension)\'}</h3>'],
    ['<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">ADIA, Mubadala, QIA (중동)</h3>', '<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === \'kr\' ? \'ADIA, Mubadala, QIA (중동)\' : \'ADIA, Mubadala, QIA (Middle East)\'}</h3>'],
    ['<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">NBIM (노르웨이)</h3>', '<h3 className="text-[#1e3a8a] font-extrabold text-[22px]">{lang === \'kr\' ? \'NBIM (노르웨이)\' : \'NBIM (Norway)\'}</h3>'],
    ['<h3 className="text-[#1e3a8a] font-extrabold text-[20px] md:text-[22px]">Mitsubishi, Mitsui, Sumitomo (일본)</h3>', '<h3 className="text-[#1e3a8a] font-extrabold text-[20px] md:text-[22px]">{lang === \'kr\' ? \'Mitsubishi, Mitsui, Sumitomo (일본)\' : \'Mitsubishi, Mitsui, Sumitomo (Japan)\'}</h3>'],
    ['? <>각 글로벌 LP의 고유한 투자 특성과 전략적 니즈에 맞춘 정교한 타겟팅으로<br/>압도적인 국제적 자본 유치 가속화</>', '? (lang === \'kr\' ? <>각 글로벌 LP의 고유한 투자 특성과 전략적 니즈에 맞춘 정교한 타겟팅으로<br/>압도적인 국제적 자본 유치 가속화</> : <>Accelerating overwhelming international capital attraction<br/>through sophisticated targeting tailored to the unique investment characteristics and strategic needs of each global LP.</>)']
]);
