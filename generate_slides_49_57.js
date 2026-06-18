const fs = require('fs');
const path = require('path');

const generateSlideCode = (name, theme, title, boxTitle, bullets) => `import React, { useState, useEffect } from 'react';

export default function ${name}({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 700);
        const t3 = setTimeout(() => setStep(3), 1100);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* Theme */}
                <div className={\`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] \${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[16px]">
                        ${theme}
                    </span>
                </div>

                {/* Main Title */}
                <h2 className={\`text-[36px] md:text-[50px] lg:text-[56px] font-extrabold leading-[calc(1.3em-4px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    ${title}
                </h2>

                {/* Content Box */}
                <div className={\`flex flex-col w-full max-w-[1100px] mt-[48px] bg-white border-[6px] border-[#1d1d1f] p-8 md:p-12 text-left transition-all duration-[1000ms] ease-out \${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}\`}>
                    <h3 className="text-[26px] md:text-[30px] font-extrabold text-[#1e3a8a] mb-6 pb-4 border-b-2 border-gray-100">
                        ${boxTitle}
                    </h3>
                    <ul className="text-[20px] md:text-[24px] text-gray-800 leading-[1.6] font-bold space-y-4 break-keep">
                        ${bullets.map(b => \`<li className="flex items-start"><span className="mr-3 text-[#1e3a8a] mt-1">▪</span><span>\${b}</span></li>\`).join('\n                        ')}
                    </ul>
                </div>
                
            </div>
        </section>
    );
}
`;

const slideData = [
  {
    name: 'Section49',
    theme: '[미래 핵심 산업 1] HBM과 반도체 슈퍼사이클의 지속',
    title: '어떠한 시나리오에서도 한국 매크로를<br/>좌우할 단일 최대 변수',
    boxTitle: '2.1 AI 반도체 / HBM',
    bullets: [
      'Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지',
      'Bull 시 SK하이닉스·삼성전자 합산 영업이익 2026년 200조 원 → 2030년 300~350조 원 도달',
      'Bear 시 마이크론·CXMT 추격으로 점유율 50%대로 하락',
      '그러나 모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존'
    ]
  },
  {
    name: 'Section50',
    theme: '[미래 핵심 산업 2] 7,350억 달러 국가 이니셔티브, AI 인프라',
    title: '데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결',
    boxTitle: '2.2 AI 데이터센터',
    bullets: [
      'Base 케이스에서 2030년 한국 IT 용량 6.3GW (현재의 3배), Bull 케이스에서는 10GW+ 도달 가능',
      'Stock Farm Road의 전남 3GW 단일 데이터센터, SK-AWS 울산 캠퍼스 확장 옵션, MS-KT 파트너십 등',
      '삼성 단독으로 2030년까지 AI 인프라에 2,300억 달러 투자 발표',
      '정부 총 7,350억 달러 규모 sovereign AI 이니셔티브 진행 (단일 산업으로 GDP 10% 기여 목표)'
    ]
  },
  {
    name: 'Section51',
    theme: '[미래 핵심 산업 3] 휴머노이드 상용화의 티핑 포인트',
    title: '공간의 표준을 재정의할 2030년대<br/>100조 원 규모 로봇 산업의 폭발',
    boxTitle: '2.3 로봇 / 휴머노이드',
    bullets: [
      '현대차그룹(보스턴 다이내믹스), 삼성전자(레인보우 로보틱스), 두산로보틱스 등 주도',
      'Base 시 2030년 산업 규모 50조 원, Bull 시 100조 원+ 가능',
      '휴머노이드는 2030~2035년 사이가 commercial inflection point'
    ]
  },
  {
    name: 'Section52',
    theme: '[미래 핵심 산업 4] K-바이오 클러스터의 절대적 팽창',
    title: '매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요',
    boxTitle: '2.4 바이오 융합 / 장수의학 / 세포·유전자치료',
    bullets: [
      '삼성바이오로직스 매출 2024년 4.6조 원 → 2030년 10조 원+ 컨센서스',
      '셀트리온의 짐펜트라 미국 출시 등 K-바이오 글로벌 확장 가속',
      '세포·유전자 치료 CDMO에서 글로벌 두 자릿수 점유율 잠재력'
    ]
  },
  {
    name: 'Section53',
    theme: '[미래 핵심 산업 5] 글로벌 방산/우주 1조 달러 시장 정벌',
    title: '2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프',
    boxTitle: '2.5 방산·우주',
    bullets: [
      'Bull 시 2030년 방산 수출 500억 달러(현재의 3배) 도달 가능',
      'KAI 발사체·한화 누리호 후속·KARI 차세대 위성 등 우주 산업 진출',
      'K-Defense는 1조 달러대 글로벌 시장의 신데렐라'
    ]
  },
  {
    name: 'Section54',
    theme: '[미래 핵심 산업 6] 무형자산 제국으로 진화하는 K-콘텐츠',
    title: '음악을 넘어 게임, 패션, 영상으로<br/>확장될 새로운 문화 자본의 영토',
    boxTitle: '2.6 K-콘텐츠',
    bullets: [
      '글로벌 OTT 시장의 한국 콘텐츠 점유율 지속 상승',
      'HYBE, SM, CJ ENM의 글로벌 라이브·IP·게임 확장',
      '1조→2조 달러 구간의 K-pop이 2조→3조 달러 구간에서는 K-Game·K-Film·K-Animation·K-Fashion으로 다변화'
    ]
  },
  {
    name: 'Section55',
    theme: '[미래 핵심 산업 7] 딥테크 인프라의 거대한 옵션 가치',
    title: '양자 컴퓨팅, 수소, 우주 산업이 담보하는<br/>국가 경제의 미래 방어막',
    boxTitle: '2.7 양자 / 수소 / 우주',
    bullets: [
      '신산업이지만 Base 케이스에서 GDP 기여는 2030년까지 1% 미만',
      'Bull 케이스에서도 2035년 시점 핵심 엔진은 아님',
      '다만 미래 국가 안보 및 경제의 방어막으로서 "옵션 가치" 보유'
    ]
  },
  {
    name: 'Section56',
    theme: '[미래 핵심 산업 8] 168조 원 실버 시장의 거대한 개막',
    title: '글로벌 펀드와 융합하여 침투율 0.6%의<br/>블루오션을 선점할 시니어 케어',
    boxTitle: '2.8 시니어 케어 경제',
    bullets: [
      '2025년 기준 한국 시니어 하우징 침투율 0.6% (미국 11%, 호주 6% 대비 극도로 저개발)',
      '시니어 하우징 시장 규모 2020년 72조 원 → 2030년 168조 원 전망',
      '이지스, KB골든라이프케어 등 실버타운 출시 및 글로벌 펀드(Warburg Pincus·Invesco)의 한국 시니어 시장 진입 본격화'
    ]
  }
];

// Intro slide Section48
const section48Code = `import React, { useState, useEffect } from 'react';

export default function Section48({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        return () => clearTimeout(t1);
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <h2 className={\`text-[48px] md:text-[64px] lg:text-[72px] font-extrabold leading-[calc(1.3em-4px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] \${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    핵심 산업 모멘텀 시나리오별 전망
                </h2>
                <div className={\`w-24 h-2 bg-[#1e3a8a] mt-12 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 \${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}\`}></div>
            </div>
        </section>
    );
}
`;

fs.writeFileSync(path.join(__dirname, 'src/components/Section48.jsx'), section48Code);

slideData.forEach(data => {
  fs.writeFileSync(
    path.join(__dirname, \`src/components/\${data.name}.jsx\`), 
    generateSlideCode(data.name, data.theme, data.title, data.boxTitle, data.bullets)
  );
});

console.log("Successfully generated Section48 through Section56");
