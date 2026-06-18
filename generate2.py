import os

def generate_slide_code(name, theme, title, m1_title, m1_value, m2_title, m2_value, bullets):
    bullets_html = "\n                        ".join([f'<li className="flex items-start"><span className="mr-3 text-black font-extrabold mt-1">▪</span><span>{b}</span></li>' for b in bullets])
    return f"""import React, {{ useState, useEffect }} from 'react';

export default function {name}({{ isActive }}) {{
    const [step, setStep] = useState(0);

    useEffect(() => {{
        if (!isActive) {{ setStep(0); return; }}
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 800);
        const t3 = setTimeout(() => setStep(3), 1100);
        const t4 = setTimeout(() => setStep(4), 1600);
        return () => {{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); }};
    }}, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {{/* Theme */}}
                <div className={{`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                    <span className="inline-block text-[22px] md:text-[26px] font-extrabold text-[#777] uppercase tracking-[-0.02em] mb-[12px]">
                        {theme}
                    </span>
                </div>

                {{/* Main Title */}}
                <h2 className={{`text-[34px] md:text-[46px] lg:text-[52px] font-black leading-[calc(1.3em-4px)] text-[#1d1d1f] break-keep tracking-[-0.02em] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}} dangerouslySetInnerHTML={{{{ __html: '{title}' }}}}>
                </h2>

                {{/* Infographic Middle Section (Dry & Bold) */}}
                <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-6 mt-[40px] mb-[40px] justify-center">
                    <div className={{`flex-1 flex flex-col items-center justify-center bg-white border-[6px] border-[#1d1d1f] py-[40px] px-8 transition-all duration-[1000ms] ease-out ${{step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                        <p className="text-[18px] md:text-[20px] font-bold text-gray-500 uppercase mb-3 break-keep">{m1_title}</p>
                        <p className="text-[36px] md:text-[48px] font-black text-black tracking-tight leading-tight break-keep">{m1_value}</p>
                    </div>
                    <div className={{`flex-1 flex flex-col items-center justify-center bg-gray-50 border-[6px] border-gray-400 py-[40px] px-8 transition-all duration-[1000ms] ease-out delay-200 ${{step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                        <p className="text-[18px] md:text-[20px] font-bold text-gray-500 uppercase mb-3 break-keep">{m2_title}</p>
                        <p className="text-[36px] md:text-[48px] font-black text-gray-800 tracking-tight leading-tight break-keep">{m2_value}</p>
                    </div>
                </div>

                {{/* Bottom Summary */}}
                <div className={{`w-full max-w-[1200px] pt-8 border-t-[4px] border-[#1d1d1f] transition-all duration-[900ms] ease-out ${{step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}}`}}>
                    <ul className="text-[18px] md:text-[22px] text-gray-800 leading-[1.6] font-bold space-y-3 break-keep inline-block text-left mx-auto">
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
    "m1_title": "HBM 글로벌 점유율",
    "m1_value": "70%+ 유지",
    "m2_title": "2030년 예상 합산 영업이익",
    "m2_value": "300~350조 원",
    "bullets": [
      "Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지",
      "Bull 시 SK하이닉스·삼성전자 합산 영업이익 폭증 전망 (2030년 300조+)",
      "Bear 시 마이크론·CXMT 추격으로 점유율 50%대로 하락",
      "그러나 모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존"
    ]
  },
  {
    "name": "Section50",
    "theme": "[미래 핵심 산업 2] 7,350억 달러 국가 이니셔티브, AI 인프라",
    "title": "데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결",
    "m1_title": "2030년 한국 IT 용량",
    "m1_value": "10GW+ 도달 가능",
    "m2_title": "정부 sovereign AI 투자",
    "m2_value": "7,350억 달러",
    "bullets": [
      "Base 케이스 6.3GW (현재 3배), Bull 케이스 10GW+ 도달 전망",
      "Stock Farm Road(3GW), SK-AWS 확장, 삼성 2,300억 달러 등 거대 파이프라인 집중",
      "단일 산업으로 GDP 10% 기여 목표라는 정부의 명시적 정책 의지 반영"
    ]
  },
  {
    "name": "Section51",
    "theme": "[미래 핵심 산업 3] 휴머노이드 상용화의 티핑 포인트",
    "title": "공간의 표준을 재정의할 2030년대<br/>100조 원 규모 로봇 산업의 폭발",
    "m1_title": "2030년대 로봇 산업 규모",
    "m1_value": "100조 원+ 폭발",
    "m2_title": "Commercial Inflection",
    "m2_value": "2030~2035년",
    "bullets": [
      "현대차그룹, 삼성전자, 두산로보틱스가 주도하는 차세대 폼팩터 경쟁 심화",
      "Base 시 2030년 산업 규모 50조 원, Bull 시 100조 원 돌파 가능",
      "인간의 노동력을 대체하고 물리적 공간의 표준을 재정의하는 거대한 티핑 포인트"
    ]
  },
  {
    "name": "Section52",
    "theme": "[미래 핵심 산업 4] K-바이오 클러스터의 절대적 팽창",
    "title": "매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요",
    "m1_title": "삼성바이오 2030년 매출",
    "m1_value": "10조 원+ 전망",
    "m2_title": "글로벌 CDMO 시장",
    "m2_value": "두 자릿수 점유율 달성",
    "bullets": [
      "삼성바이오로직스 매출 2024년 4.6조 원에서 2030년 10조 원 이상으로 컨센서스 상향",
      "셀트리온 짐펜트라 미국 출시 등 K-바이오 글로벌 확장 가속화",
      "매출 10조 시대를 여는 역량이 창출할 거대한 연구 및 생산 부동산 실수요"
    ]
  },
  {
    "name": "Section53",
    "theme": "[미래 핵심 산업 5] 글로벌 방산/우주 1조 달러 시장 정벌",
    "title": "2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프",
    "m1_title": "2030년 방산 수출 전망",
    "m1_value": "500억 달러",
    "m2_title": "글로벌 방산 시장 규모",
    "m2_value": "1조 달러대 정벌",
    "bullets": [
      "Bull 시 2030년 방산 수출은 현재의 3배 수준인 500억 달러 도달 가능",
      "KAI, 한화, KARI가 주도하는 K-방산과 우주 산업의 구조적 퀀텀 점프",
      "1조 달러대 글로벌 시장에서 지정학적 갈등을 기회로 삼는 새로운 신데렐라 산업"
    ]
  },
  {
    "name": "Section54",
    "theme": "[미래 핵심 산업 6] 무형자산 제국으로 진화하는 K-콘텐츠",
    "title": "음악을 넘어 게임, 패션, 영상으로<br/>확장될 새로운 문화 자본의 영토",
    "m1_title": "다변화 융합 시장",
    "m1_value": "2~3조 달러 진입",
    "m2_title": "글로벌 라이브·IP 비즈니스",
    "m2_value": "새로운 문화 자본",
    "bullets": [
      "글로벌 OTT 시장에서 한국 콘텐츠의 구조적 점유율 상승 및 영향력 강화",
      "HYBE, SM, CJ ENM 주도의 라이브 비주얼, IP 비즈니스, 게임 산업 동반 확장",
      "음악(K-pop)을 넘어 Game, Film, Animation, Fashion으로 영토 다변화"
    ]
  },
  {
    "name": "Section55",
    "theme": "[미래 핵심 산업 7] 딥테크 인프라의 거대한 옵션 가치",
    "title": "양자 컴퓨팅, 수소, 우주 산업이 담보하는<br/>국가 경제의 미래 방어막",
    "m1_title": "국가 경제의 방어막",
    "m1_value": "거대한 옵션 가치",
    "m2_title": "2030년 GDP 기여도",
    "m2_value": "1% 미만 (초기)",
    "bullets": [
      "양자 컴퓨팅, 수소, 우주 등 딥테크 인프라의 미래 잠재력 발굴",
      "신산업 특성상 Base/Bull 케이스에서 2030년까지 GDP 기여도는 매우 미미한 수준",
      "그러나 거시 경제의 불확실성을 방어할 필수 불가결한 거대 '옵션 가치'"
    ]
  },
  {
    "name": "Section56",
    "theme": "[미래 핵심 산업 8] 168조 원 실버 시장의 거대한 개막",
    "title": "글로벌 펀드와 융합하여 침투율 0.6%의<br/>블루오션을 선점할 시니어 케어",
    "m1_title": "2030년 시니어 시장 규모",
    "m1_value": "168조 원 달성",
    "m2_title": "한국 시니어 하우징 침투율",
    "m2_value": "극도의 블루오션 0.6%",
    "bullets": [
      "2025년 한국 침투율 0.6%로 미국 11%, 호주 6% 대비 극도로 저개발된 블루오션",
      "시장 규모는 2020년 72조 원에서 2030년 168조 원으로 폭발적 성장 전망",
      "이지스 등 국내사 및 글로벌 펀드(Warburg Pincus 등)의 진입이 본격화되는 변곡점"
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
    code = generate_slide_code(data["name"], data["theme"], data["title"], data["m1_title"], data["m1_value"], data["m2_title"], data["m2_value"], data["bullets"])
    with open(f'src/components/{data["name"]}.jsx', 'w', encoding='utf-8') as f:
        f.write(code)

print("Successfully updated Section48 through Section56 to match the requested Dry & Bold layout.")
