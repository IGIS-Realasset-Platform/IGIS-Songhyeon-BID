import os

def generate_slide_code(name, theme, title, box1_title, box1_val, box2_title, box2_val, box3_title, box3_val, bullets):
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
                    
                    {{/* Box 1 */}}
                    <div className={{`flex-1 bg-white border-[6px] border-gray-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${{step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-gray-500 mb-4 uppercase">{box1_title}</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-gray-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-black leading-snug break-keep">{box1_val}</p>
                    </div>

                    {{/* Box 2 */}}
                    <div className={{`flex-1 bg-[#f8fbff] border-[6px] border-blue-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${{step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-blue-500 mb-4 uppercase">{box2_title}</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-blue-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#0055ff] leading-snug break-keep">{box2_val}</p>
                    </div>

                    {{/* Box 3 */}}
                    <div className={{`flex-1 bg-[#fff8f8] border-[6px] border-red-400 py-10 px-6 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 ${{step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}}`}}>
                        <span className="text-[20px] font-bold text-red-500 mb-4 uppercase">{box3_title}</span>
                        <div className="w-full max-w-[100px] h-[4px] bg-red-200 mb-6"></div>
                        <p className="text-[24px] md:text-[28px] font-black text-[#e11d48] leading-snug break-keep">{box3_val}</p>
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
    "name": "Section58",
    "theme": "인구 구조 1 혹독한 인구 다이어트의 시작",
    "title": "2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실",
    "box1_title": "2024년 정점",
    "box1_val": "5,175만 명",
    "box2_title": "2050년 인구",
    "box2_val": "약 4,300만 명",
    "box3_title": "2100년 전망",
    "box3_val": "1,100~3,000만 명",
    "bullets": [
      "통계청·UN 중위 변동치 기준 2024년 5,175만 명 정점 이후 본격적인 감소 진입",
      "2040년 약 4,734만 명, 2050년 약 4,300만 명, 2060년 3,664만 명으로 가파른 축소",
      "Bayesian 확률 추정 기준 2100년에는 1,100만~3,000만 명 사이로 국가 규모 축소 불가피"
    ]
  },
  {
    "name": "Section59",
    "theme": "인구 구조 2 생산 인구 35% 증발의 충격파",
    "title": "2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력",
    "box1_title": "2025년 초고령사회",
    "box1_val": "고령 비중 20%",
    "box2_title": "2035년 고령 비중",
    "box2_val": "30% 돌파",
    "box3_title": "2050년 생산가능인구",
    "box3_val": "35% 증발",
    "bullets": [
      "65세 이상 고령자 비중은 2025년 20%로 초고령사회 진입 후 2035년 30%를 돌파 전망",
      "생산가능인구(15~64세)는 2020년 3,738만 명에서 2050년 2,419만 명으로 약 35% 감소",
      "극단적인 부양비 증가와 노동력 부족으로 거시 경제의 잠재성장률 하방 압력 가중"
    ]
  },
  {
    "name": "Section60",
    "theme": "인구 구조 3 인구 역설이 창출할 자본의 대이동",
    "title": "가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅",
    "box1_title": "부정 효과",
    "box1_val": "노동력 부족 및 성장 둔화",
    "box2_title": "신규 시장 창출",
    "box2_val": "자산운용·시니어 하우징 폭발",
    "box3_title": "글로벌 벤치마크",
    "box3_val": "일본의 잃어버린 30년 패턴",
    "bullets": [
      "거시 양면성: 노동력 부족이라는 부정 효과와 시니어 하우징 등 신규 시장 창출 효과 병존",
      "가계의 부동산·금융 자산 처분이 자산운용 산업으로 이전되며 거대한 자본 대이동 발생",
      "일본이 잃어버린 30년에도 자산운용·시니어 케어·인바운드 관광에서 새 시장을 만들어낸 패턴과 유사"
    ]
  },
  {
    "name": "Section61",
    "theme": "인구 구조 4 이민자 수용 및 AI로 방어하는 펀더멘털",
    "title": "외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략",
    "box1_title": "현재 이민자 비중",
    "box1_val": "4.5% (2024년)",
    "box2_title": "Bull 시나리오 전망",
    "box2_val": "이민자 10% 확대",
    "box3_title": "기술적 생산성 상쇄",
    "box3_val": "AI로 0.5~1.0%p 방어",
    "bullets": [
      "한국 이민자 비중은 약 4.5% 수준이나, Bull 시나리오는 2040년 10%까지 끌어올리는 정책 전환을 전제",
      "이는 싱가포르 모델(외국인 비중 30%+)을 부분 차용하여 노동력 감소를 적극 방어하는 전략",
      "AI 기술 도입(BCG·McKinsey 보고서)으로 인한 생산성 향상이 인구 감소 효과를 최대 1.0%p 상쇄 가능"
    ]
  }
]

# Section 57 (58p) - Chapter intro matching Section 48 (which matches 42)
section57_code = """import React, { useState, useEffect } from 'react';

export default function Section57({ isActive }) {
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
                .gradient-text-ch3 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 3.
                    </span>
                </div>
                <h2 className={`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="gradient-text-ch3">
                        인구·구조적 변수
                    </span>
                </h2>
            </div>
        </section>
    );
}
"""

with open('src/components/Section57.jsx', 'w', encoding='utf-8') as f:
    f.write(section57_code)

for data in slide_data:
    code = generate_slide_code(data["name"], data["theme"], data["title"], data["box1_title"], data["box1_val"], data["box2_title"], data["box2_val"], data["box3_title"], data["box3_val"], data["bullets"])
    with open(f'src/components/{data["name"]}.jsx', 'w', encoding='utf-8') as f:
        f.write(code)

print("Successfully generated Section57 through Section61.")
