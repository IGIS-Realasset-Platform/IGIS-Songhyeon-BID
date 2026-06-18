import os
import json

def generate_slide_code(name, theme, title, base, bull, bear, bullets):
    bullets_html = "\n                        ".join([f'<li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>{b}</span></li>' for b in bullets])
    return f"""import React, {{ useState, useEffect }} from 'react';

export default function {name}({{ isActive }}) {{
    const [step, setStep] = useState(0);

    useEffect(() => {{
        if (!isActive) {{ setStep(0); return; }}
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 900);
        const t3 = setTimeout(() => setStep(3), 1200);
        const t4 = setTimeout(() => setStep(4), 1500);
        const t5 = setTimeout(() => setStep(5), 2000);
        return () => {{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); }};
    }}, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {{/* Theme */}}
                <div className={{`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                    <span className="inline-block text-[22px] md:text-[26px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[12px] bg-transparent">
                        {theme}
                    </span>
                </div>

                {{/* Main Title */}}
                <h2 className={{`text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[calc(1.3em-6px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}} dangerouslySetInnerHTML={{{{ __html: '{title}' }}}}>
                </h2>

                {{/* Middle Infographic (3 Dry Boxes) */}}
                <div className="relative w-full max-w-[1250px] mt-[40px] mb-[30px] h-auto flex flex-col md:flex-row items-stretch justify-center z-10 gap-6">
                    
                    {{/* Base Box */}}
                    <div className={{`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-gray-500 mb-4 uppercase">Base Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-black leading-snug break-keep" dangerouslySetInnerHTML={{{{ __html: '{base}' }}}}></p>
                    </div>

                    {{/* Bull Box */}}
                    <div className={{`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${{step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-blue-500 mb-4 uppercase">Bull Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#0055ff] leading-snug break-keep" dangerouslySetInnerHTML={{{{ __html: '{bull}' }}}}></p>
                    </div>

                    {{/* Bear Box */}}
                    <div className={{`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${{step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-red-500 mb-4 uppercase">Bear Scenario</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#e11d48] leading-snug break-keep" dangerouslySetInnerHTML={{{{ __html: '{bear}' }}}}></p>
                    </div>

                </div>

                {{/* Bottom Text */}}
                <div className={{`mt-[10px] max-w-[1100px] text-[16px] md:text-[20px] leading-[1.5] font-bold text-gray-700 break-keep text-center transition-all duration-[900ms] ease-out ${{step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                    <ul className="text-left inline-block space-y-3 mx-auto">
                        {bullets_html}
                    </ul>
                </div>

            </div>
        </section>
    );
}}
"""

slide_data = [
  {
    "name": "Section49",
    "theme": "[미래 핵심 산업 1] HBM과 반도체 슈퍼사이클의 지속",
    "title": "어떠한 시나리오에서도 한국 매크로를<br/>좌우할 단일 최대 변수",
    "base": "HBM 글로벌<br/>점유율 70%+ 유지",
    "bull": "합산 영업이익<br/>300~350조 원 폭증",
    "bear": "경쟁사 추격으로<br/>점유율 50%대 하락",
    "bullets": [
      "Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지",
      "Bull 시 SK하이닉스·삼성전자 합산 영업이익 폭증 전망 (2030년 300조+)",
      "그러나 모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존"
    ]
  },
  {
    "name": "Section50",
    "theme": "[미래 핵심 산업 2] 7,350억 달러 국가 이니셔티브, AI 인프라",
    "title": "데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결",
    "base": "2030년 한국 IT 용량<br/>6.3GW (현재 3배)",
    "bull": "글로벌 허브 집중<br/>10GW+ 도달 가능",
    "bear": "국가 이니셔티브<br/>지연 시 성장 둔화",
    "bullets": [
      "Stock Farm Road(3GW), SK-AWS 확장, 삼성 2,300억 달러 등 거대 파이프라인 집중",
      "단일 산업으로 GDP 10% 기여 목표라는 정부의 명시적 정책 의지 반영",
      "전력 수급 한계 극복 여부가 최상의 Bull 시나리오 달성을 위한 핵심 트리거"
    ]
  },
  {
    "name": "Section51",
    "theme": "[미래 핵심 산업 3] 휴머노이드 상용화의 티핑 포인트",
    "title": "공간의 표준을 재정의할 2030년대<br/>100조 원 규모 로봇 산업의 폭발",
    "base": "2030년대 산업 규모<br/>50조 원 안착",
    "bull": "상용화 가속으로<br/>100조 원+ 폭발",
    "bear": "티핑 포인트 지연<br/>(2035년 이후)",
    "bullets": [
      "현대차그룹, 삼성전자, 두산로보틱스가 주도하는 차세대 폼팩터 경쟁 심화",
      "인간의 노동력을 대체하고 물리적 공간의 표준을 완전히 재정의할 거대 산업",
      "2030~2035년 사이가 상용화의 진정한 Commercial Inflection Point로 작용"
    ]
  },
  {
    "name": "Section52",
    "theme": "[미래 핵심 산업 4] K-바이오 클러스터의 절대적 팽창",
    "title": "매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요",
    "base": "삼성바이오 2030년<br/>매출 10조 원+ 전망",
    "bull": "글로벌 CDMO 시장<br/>두 자릿수 점유 조기 달성",
    "bear": "글로벌 규제 및<br/>경쟁 심화로 수익성 둔화",
    "bullets": [
      "삼성바이오로직스 등 핵심 기업 매출 컨센서스 상향 및 K-바이오 글로벌 확장 가속화",
      "세포 및 유전자 치료 CDMO에서 글로벌 두 자릿수 점유율을 차지할 수 있는 잠재력",
      "매출 10조 시대를 여는 생산 역량이 창출할 거대한 연구시설 및 공장 부동산 실수요"
    ]
  },
  {
    "name": "Section53",
    "theme": "[미래 핵심 산업 5] 글로벌 방산/우주 1조 달러 시장 정벌",
    "title": "2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프",
    "base": "우주·방산 글로벌 진출<br/>안정적 시장 확보",
    "bull": "2030년 방산 수출<br/>500억 달러 (현재 3배)",
    "bear": "지정학적 리스크<br/>완화 시 모멘텀 축소",
    "bullets": [
      "KAI, 한화, KARI가 주도하는 K-방산과 우주 산업의 구조적 퀀텀 점프 기대",
      "1조 달러대 거대 글로벌 시장에서 지정학적 갈등을 기회로 삼는 새로운 신데렐라 산업",
      "미·중 패권 경쟁 및 유라시아 긴장 국면이 오히려 수출의 장기 슈퍼사이클을 지지"
    ]
  },
  {
    "name": "Section54",
    "theme": "[미래 핵심 산업 6] 무형자산 제국으로 진화하는 K-콘텐츠",
    "title": "음악을 넘어 게임, 패션, 영상으로<br/>확장될 새로운 문화 자본의 영토",
    "base": "글로벌 OTT 내<br/>점유율 지속 상승",
    "bull": "다변화 융합 시장<br/>2~3조 달러 진입",
    "bear": "글로벌 플랫폼<br/>종속성 심화",
    "bullets": [
      "HYBE, SM, CJ ENM 주도의 라이브 비주얼, IP 비즈니스, 게임 산업의 동반 팽창",
      "음악(K-pop) 단일 장르를 넘어 Game, Film, Animation, Fashion 등 문화 영토 다변화",
      "1조 달러대 K-pop 시장이 3조 달러대 거대 무형자산 제국으로 진화하는 변곡점"
    ]
  },
  {
    "name": "Section55",
    "theme": "[미래 핵심 산업 7] 딥테크 인프라의 거대한 옵션 가치",
    "title": "양자 컴퓨팅, 수소, 우주 산업이 담보하는<br/>국가 경제의 미래 방어막",
    "base": "2030년까지 GDP<br/>기여도 1% 미만",
    "bull": "초기 딥테크 안착<br/>(미래 방어막 실현)",
    "bear": "옵션 가치 실현<br/>불투명 (장기 정체)",
    "bullets": [
      "양자 컴퓨팅, 수소, 우주 등 딥테크 인프라의 파괴적 미래 잠재력에 선제적 대비",
      "신산업 특성상 단기적인 거시 경제 기여도는 낮으나 장기적 파급력은 예측 불허",
      "거시 경제의 지정학 및 기술 불확실성을 방어할 국가 차원의 필수적인 '옵션 가치'"
    ]
  },
  {
    "name": "Section56",
    "theme": "[미래 핵심 산업 8] 168조 원 실버 시장의 거대한 개막",
    "title": "글로벌 펀드와 융합하여 침투율 0.6%의<br/>블루오션을 선점할 시니어 케어",
    "base": "2030년 시니어 하우징<br/>168조 원 전망",
    "bull": "글로벌 펀드 진입으로<br/>침투율 급속 팽창",
    "bear": "규제 및 인프라<br/>한계로 0.6% 장기화",
    "bullets": [
      "한국 시니어 하우징 침투율은 0.6%로 미국(11%), 호주(6%) 대비 극도로 저개발된 블루오션",
      "전체 시니어 하우징 시장 규모는 2020년 72조 원에서 2030년 168조 원으로 폭발적 성장 전망",
      "이지스 등 국내 대형사 및 글로벌 자본(Warburg Pincus 등)의 본격적인 시장 진출 개시"
    ]
  }
]

# Section 48 (49p) - Chapter intro matching Section 42
section48_code = """import React, { useState, useEffect } from 'react';

export default function Section48({ isActive }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 900);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <style>{`
                .gradient-text-ch2 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 2.
                    </span>
                </div>
                <h2 className={`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text-ch2">
                        핵심 산업 모멘텀<br/>시나리오별 전망
                    </span>
                </h2>
            </div>
        </section>
    );
}
"""

with open('src/components/Section48.jsx', 'w', encoding='utf-8') as f:
    f.write(section48_code)

for data in slide_data:
    code = generate_slide_code(data["name"], data["theme"], data["title"], data["base"], data["bull"], data["bear"], data["bullets"])
    with open(f'src/components/{data["name"]}.jsx', 'w', encoding='utf-8') as f:
        f.write(code)

print("Successfully generated Section48 through Section56 to match the requested Dry 3-Box layout.")
