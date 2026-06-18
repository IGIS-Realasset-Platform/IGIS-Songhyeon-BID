import os
import re

def add_use_language(content):
    if "useLanguage" not in content:
        content = content.replace(
            "import React, { useState, useEffect } from 'react';", 
            "import React, { useState, useEffect } from 'react';\nimport { useLanguage } from '../context/LanguageContext';"
        )
        content = re.sub(
            r'(export default function \w+\(.*\) {)', 
            r'\1\n    const { lang } = useLanguage();', 
            content
        )
    return content

replacements = {
    "Section41.jsx": [
        (">한국 GDP 2조<", ">{lang === 'kr' ? '한국 GDP 2조' : 'Korea GDP $2T'}<"),
        (">3조 달러<", ">{lang === 'kr' ? '3조 달러' : '$3T'}<"),
        (">2040 시나리오<", ">{lang === 'kr' ? '2040 시나리오' : '2040 Scenario'}<")
    ],
    "Section42.jsx": [
        (">Base · Bull · Bear<br/>3개 시나리오 프레임<", ">{lang === 'kr' ? <>Base · Bull · Bear<br/>3개 시나리오 프레임</> : <>Base · Bull · Bear<br/>3 Scenario Frameworks</>}<")
    ],
    "Section43.jsx": [
        ('{ title: "인구",', '{ title: lang === "kr" ? "인구" : "Population",'),
        ('{ title: "생산성",', '{ title: lang === "kr" ? "생산성" : "Productivity",'),
        ('{ title: "지정학",', '{ title: lang === "kr" ? "지정학" : "Geopolitics",'),
        ('{ title: "기술 패권",', '{ title: lang === "kr" ? "기술 패권" : "Tech Hegemony",'),
        (">시나리오 핵심 변수<", ">{lang === 'kr' ? '시나리오 핵심 변수' : 'Core Scenario Variables'}<"),
        (">한국 GDP 3조 달러 달성을 좌우하는 4대 프레임<", ">{lang === 'kr' ? '한국 GDP 3조 달러 달성을 좌우하는 4대 프레임' : '4 Frameworks Determining Korea\\'s $3T GDP Target'}<")
    ],
    "Section44.jsx": [
        (">Base Scenario (확률 50%)<", ">{lang === 'kr' ? 'Base Scenario (확률 50%)' : 'Base Scenario (50% Prob)'}<"),
        (">IMF·OECD·KDI<br/>공통 컨센서스 기반<br/>표준 성장 궤도 진입<", ">{lang === 'kr' ? <>IMF·OECD·KDI<br/>공통 컨센서스 기반<br/>표준 성장 궤도 진입</> : <>IMF·OECD·KDI<br/>Consensus-based<br/>Standard Growth Trajectory</>}<"),
        (">2030년 예상 GDP<", ">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}<"),
        (">2.2 ~ 2.4조 달러<", ">{lang === 'kr' ? '2.2 ~ 2.4조 달러' : '$2.2 ~ 2.4T'}<"),
        (">3조 달러 도달 시점<", ">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}<"),
        (">2037 ~ 2038년<", ">{lang === 'kr' ? '2037 ~ 2038년' : '2037 ~ 2038'}<"),
        (">핵심 전제<", ">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}<"),
        (">실질성장률 연 1.5~2.0%, 인플레 2~3% 유지<", ">{lang === 'kr' ? '실질성장률 연 1.5~2.0%, 인플레 2~3% 유지' : 'Real Growth 1.5~2.0%, Inflation 2~3%'}<"),
        (">환율 KRW/USD 1,200~1,300 박스권<", ">{lang === 'kr' ? '환율 KRW/USD 1,200~1,300 박스권' : 'FX KRW/USD 1,200~1,300 Range'}<"),
        (">AI 생산성 향상(0.3~0.5%p 상향)으로 인구 감소 상쇄<", ">{lang === 'kr' ? 'AI 생산성 향상(0.3~0.5%p 상향)으로 인구 감소 상쇄' : 'AI Productivity Gain (+0.3~0.5%p) Offsets Pop Decline'}<")
    ],
    "Section45.jsx": [
        (">Bull Scenario (확률 30%)<", ">{lang === 'kr' ? 'Bull Scenario (확률 30%)' : 'Bull Scenario (30% Prob)'}<"),
        (">고급제조 + 콘텐츠 + 금융<br/>\"동아시아 스위스\" 모델<br/>재포지셔닝<", ">{lang === 'kr' ? <>고급제조 + 콘텐츠 + 금융<br/>\"동아시아 스위스\" 모델<br/>재포지셔닝</> : <>Adv. Mfg + Content + Finance<br/>\"East Asian Switzerland\"<br/>Repositioning</>}<"),
        (">2030년 예상 GDP<", ">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}<"),
        (">2.5 ~ 2.7조 달러<", ">{lang === 'kr' ? '2.5 ~ 2.7조 달러' : '$2.5 ~ 2.7T'}<"),
        (">3조 달러 도달 시점<", ">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}<"),
        (">2034 ~ 2035년<", ">{lang === 'kr' ? '2034 ~ 2035년' : '2034 ~ 2035'}<"),
        (">핵심 전제<", ">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}<"),
        (">HBM/AI 인프라 패권 유지 및 대규모 외인 자본 유입<", ">{lang === 'kr' ? 'HBM/AI 인프라 패권 유지 및 대규모 외인 자본 유입' : 'HBM/AI Hegemony & Massive Foreign Capital Inflow'}<"),
        (">환율 KRW/USD 1,000~1,150 (원화 강세)<", ">{lang === 'kr' ? '환율 KRW/USD 1,000~1,150 (원화 강세)' : 'FX KRW/USD 1,000~1,150 (Strong KRW)'}<"),
        (">K-콘텐츠, K-방산, K-원전, K-조선 슈퍼사이클 진입<", ">{lang === 'kr' ? 'K-콘텐츠, K-방산, K-원전, K-조선 슈퍼사이클 진입' : 'K-Content, Defense, Nuclear, Ship Supercycle'}<")
    ],
    "Section46.jsx": [
        (">Bear Scenario (확률 20%)<", ">{lang === 'kr' ? 'Bear Scenario (확률 20%)' : 'Bear Scenario (20% Prob)'}<"),
        (">지정학적 갈등 및 구조적 모순<br/>심화에 따른<br/>일본식 \"잃어버린 10년\" 진입<", ">{lang === 'kr' ? <>지정학적 갈등 및 구조적 모순<br/>심화에 따른<br/>일본식 \"잃어버린 10년\" 진입</> : <>Geopolitical Friction & Struct. Issues<br/>Leading to<br/>Japan-style \"Lost Decade\"</>}<"),
        (">2030년 예상 GDP<", ">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}<"),
        (">2.0 ~ 2.1조 달러<", ">{lang === 'kr' ? '2.0 ~ 2.1조 달러' : '$2.0 ~ 2.1T'}<"),
        (">3조 달러 도달 시점<", ">{lang === 'kr' ? '3조 달러 도달 시점' : 'Time to $3T'}<"),
        (">2042년 이후 (또는 미달)<", ">{lang === 'kr' ? '2042년 이후 (또는 미달)' : 'Post-2042 (Or Never)'}<"),
        (">핵심 전제<", ">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}<"),
        (">2024년 정점 이후 가파른 인구 감소 (인구 절벽)<", ">{lang === 'kr' ? '2024년 정점 이후 가파른 인구 감소 (인구 절벽)' : 'Steep Population Decline post-2024 Peak'}<"),
        (">미·중 디커플링 심화 및 중국 반도체 자급 가속화<", ">{lang === 'kr' ? '미·중 디커플링 심화 및 중국 반도체 자급 가속화' : 'US-China Decoupling & China Semi Self-sufficiency'}<"),
        (">가계부채 누적 및 부동산 PF 부실 재발<", ">{lang === 'kr' ? '가계부채 누적 및 부동산 PF 부실 재발' : 'Household Debt & Real Estate PF Distress'}<")
    ],
    "Section47.jsx": [
        (">미래 시나리오 종합<", ">{lang === 'kr' ? '미래 시나리오 종합' : 'Future Scenarios Summary'}<"),
        (">한국 GDP 3조 달러 도달 시나리오별 핵심 지표 비교<", ">{lang === 'kr' ? '한국 GDP 3조 달러 도달 시나리오별 핵심 지표 비교' : 'Core Indicators for $3T GDP by Scenario'}<"),
        (">확률 50%<", ">{lang === 'kr' ? '확률 50%' : '50% Prob'}<"),
        (">확률 30%<", ">{lang === 'kr' ? '확률 30%' : '30% Prob'}<"),
        (">확률 20%<", ">{lang === 'kr' ? '확률 20%' : '20% Prob'}<"),
        (">2030년 예상 GDP<", ">{lang === 'kr' ? '2030년 예상 GDP' : '2030 Expected GDP'}<"),
        (">2.2 ~ 2.4조 달러<", ">{lang === 'kr' ? '2.2 ~ 2.4조 달러' : '$2.2 ~ 2.4T'}<"),
        (">2.5 ~ 2.7조 달러<", ">{lang === 'kr' ? '2.5 ~ 2.7조 달러' : '$2.5 ~ 2.7T'}<"),
        (">2.0 ~ 2.1조 달러<", ">{lang === 'kr' ? '2.0 ~ 2.1조 달러' : '$2.0 ~ 2.1T'}<"),
        (">3조 달러 도달<", ">{lang === 'kr' ? '3조 달러 도달' : 'Reach $3T'}<"),
        (">2037 ~ 2038년<", ">{lang === 'kr' ? '2037 ~ 2038년' : '2037 ~ 2038'}<"),
        (">2034 ~ 2035년<", ">{lang === 'kr' ? '2034 ~ 2035년' : '2034 ~ 2035'}<"),
        (">2042년 이후<", ">{lang === 'kr' ? '2042년 이후' : 'Post-2042'}<"),
        (">핵심 전제<", ">{lang === 'kr' ? '핵심 전제' : 'Core Premises'}<"),
        (">기관 컨센서스(IMF 등) 수렴<", ">{lang === 'kr' ? '기관 컨센서스(IMF 등) 수렴' : 'Aligns with IMF Consensus'}<"),
        (">실질성장률 연 1.5~2.0% 유지<", ">{lang === 'kr' ? '실질성장률 연 1.5~2.0% 유지' : 'Real Growth 1.5~2.0%'}<"),
        (">AI 향상이 인구 감소 효과 상쇄<", ">{lang === 'kr' ? 'AI 향상이 인구 감소 효과 상쇄' : 'AI offsets Pop Decline'}<"),
        (">\"동아시아 스위스\" 모델 안착<", ">{lang === 'kr' ? '\"동아시아 스위스\" 모델 안착' : '\"East Asian Swiss\" Model'}<"),
        (">주력 산업 글로벌 슈퍼사이클<", ">{lang === 'kr' ? '주력 산업 글로벌 슈퍼사이클' : 'Core Industry Supercycle'}<"),
        (">대규모 외국인 자본 유입<", ">{lang === 'kr' ? '대규모 외국인 자본 유입' : 'Massive Foreign Capital'}<"),
        (">일본식 \"잃어버린 10년\" 진입<", ">{lang === 'kr' ? '일본식 \"잃어버린 10년\" 진입' : 'Japan-style \"Lost Decade\"'}<"),
        (">가파른 인구 절벽 현실화<", ">{lang === 'kr' ? '가파른 인구 절벽 현실화' : 'Steep Demographic Cliff'}<"),
        (">미·중 디커플링 및 PF 부실 심화<", ">{lang === 'kr' ? '미·중 디커플링 및 PF 부실 심화' : 'US-China Decoupling & PF Default'}<")
    ],
    "Section48.jsx": [
        (">핵심 산업 모멘텀<br/>시나리오별 전망<", ">{lang === 'kr' ? <>핵심 산업 모멘텀<br/>시나리오별 전망</> : <>Core Industry Momentum<br/>by Scenario</>}<")
    ],
    "Section49.jsx": [
        (">AI 반도체 / 메모리<", ">{lang === 'kr' ? 'AI 반도체 / 메모리' : 'AI Semi / Memory'}<"),
        ("__html: '모든 시나리오에서 메모리는 한국 경제의 최대 변수'", "__html: lang === 'kr' ? '모든 시나리오에서 메모리는 한국 경제의 최대 변수' : 'Memory remains the biggest variable for Korea in all scenarios'"),
        (">Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지<", ">{lang === 'kr' ? 'Base 케이스에서도 한국이 HBM 글로벌 점유율 70%+ 유지' : 'Korea retains 70%+ global HBM share even in Base Case'}<"),
        (">Bull 시 SK하이닉스·삼성전자 합산 영업이익 폭증 전망 (2030년 300조+)<", ">{lang === 'kr' ? 'Bull 시 SK하이닉스·삼성전자 합산 영업이익 폭증 전망 (2030년 300조+)' : 'Bull: SK Hynix & Samsung combined OP surges (300T+ by 2030)'}<"),
        (">그러나 모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존<", ">{lang === 'kr' ? '그러나 모든 시나리오에서 메모리는 한국 경제의 단일 최대 변수로 잔존' : 'However, memory remains the single largest economic variable across all scenarios'}<")
    ],
    "Section50.jsx": [
        (">AI 데이터센터<", ">{lang === 'kr' ? 'AI 데이터센터' : 'AI Data Centers'}<"),
        ("__html: '데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결'", "__html: lang === 'kr' ? '데이터센터 10GW 시대를 여는<br/>글로벌 하이퍼스케일러의 집결' : 'Opening the 10GW Era<br/>Gathering of Global Hyperscalers'"),
        ("__html: '2030년 한국 IT 용량<br/>6.3GW (현재 3배)'", "__html: lang === 'kr' ? '2030년 한국 IT 용량<br/>6.3GW (현재 3배)' : '2030 IT Capacity<br/>6.3GW (3x Current)'"),
        ("__html: '글로벌 허브 집중<br/>10GW+ 도달 가능'", "__html: lang === 'kr' ? '글로벌 허브 집중<br/>10GW+ 도달 가능' : 'Global Hub Focus<br/>Can reach 10GW+'"),
        ("__html: '국가 이니셔티브<br/>지연 시 성장 둔화'", "__html: lang === 'kr' ? '국가 이니셔티브<br/>지연 시 성장 둔화' : 'Growth Slows if<br/>National Init. Delayed'"),
        (">Stock Farm Road(3GW), SK-AWS 확장, 삼성 2,300억 달러 등 거대 파이프라인 집중<", ">{lang === 'kr' ? 'Stock Farm Road(3GW), SK-AWS 확장, 삼성 2,300억 달러 등 거대 파이프라인 집중' : 'Massive pipelines like Stock Farm Road (3GW), SK-AWS, Samsung $230B'}<"),
        (">단일 산업으로 GDP 10% 기여 목표라는 정부의 명시적 정책 의지 반영<", ">{lang === 'kr' ? '단일 산업으로 GDP 10% 기여 목표라는 정부의 명시적 정책 의지 반영' : 'Reflects explicit gov intent for 10% GDP contribution as a single industry'}<"),
        (">전력 수급 한계 극복 여부가 최상의 Bull 시나리오 달성을 위한 핵심 트리거<", ">{lang === 'kr' ? '전력 수급 한계 극복 여부가 최상의 Bull 시나리오 달성을 위한 핵심 트리거' : 'Overcoming power constraints is the key trigger for the Bull scenario'}<")
    ],
    "Section51.jsx": [
        (">로봇 / 휴머노이드<", ">{lang === 'kr' ? '로봇 / 휴머노이드' : 'Robotics / Humanoids'}<"),
        ("__html: '공간의 표준을 재정의할 2030년대<br/>100조 원 규모 로봇 산업의 폭발'", "__html: lang === 'kr' ? '공간의 표준을 재정의할 2030년대<br/>100조 원 규모 로봇 산업의 폭발' : 'Redefining Spatial Standards:<br/>The 100T Won Robotics Explosion in the 2030s'"),
        ("__html: '2030년대 산업 규모<br/>50조 원 안착'", "__html: lang === 'kr' ? '2030년대 산업 규모<br/>50조 원 안착' : '2030s Industry Size<br/>Settles at 50T Won'"),
        ("__html: '상용화 가속으로<br/>100조 원+ 폭발'", "__html: lang === 'kr' ? '상용화 가속으로<br/>100조 원+ 폭발' : 'Accelerated Commercialization<br/>Explodes to 100T+ Won'"),
        ("__html: '티핑 포인트 지연<br/>(2035년 이후)'", "__html: lang === 'kr' ? '티핑 포인트 지연<br/>(2035년 이후)' : 'Tipping Point Delayed<br/>(Post-2035)'"),
        (">현대차그룹, 삼성전자, 두산로보틱스가 주도하는 차세대 폼팩터 경쟁 심화<", ">{lang === 'kr' ? '현대차그룹, 삼성전자, 두산로보틱스가 주도하는 차세대 폼팩터 경쟁 심화' : 'Next-gen form factor competition led by Hyundai, Samsung, Doosan Robotics'}<"),
        (">인간의 노동력을 대체하고 물리적 공간의 표준을 완전히 재정의할 거대 산업<", ">{lang === 'kr' ? '인간의 노동력을 대체하고 물리적 공간의 표준을 완전히 재정의할 거대 산업' : 'A massive industry replacing human labor and redefining physical spatial standards'}<"),
        (">2030~2035년 사이가 상용화의 진정한 Commercial Inflection Point로 작용<", ">{lang === 'kr' ? '2030~2035년 사이가 상용화의 진정한 Commercial Inflection Point로 작용' : '2030~2035 acts as the true Commercial Inflection Point for commercialization'}<")
    ],
    "Section52.jsx": [
        (">바이오 융합 / 장수의학 / 세포·유전자치료<", ">{lang === 'kr' ? '바이오 융합 / 장수의학 / 세포·유전자치료' : 'Bio Convergence / Longevity / Cell & Gene Therapy'}<"),
        ("__html: '매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요'", "__html: lang === 'kr' ? '매출 10조 시대를 여는 CDMO 역량이<br/>창출할 거대 부동산 실수요' : 'CDMO Capacity Opening 10T Era<br/>Creates Massive Real Estate Demand'"),
        ("__html: '삼성바이오 2030년<br/>매출 10조 원+ 전망'", "__html: lang === 'kr' ? '삼성바이오 2030년<br/>매출 10조 원+ 전망' : 'Samsung Bio 2030<br/>Revenue 10T+ Expected'"),
        ("__html: '글로벌 CDMO 시장<br/>두 자릿수 점유 조기 달성'", "__html: lang === 'kr' ? '글로벌 CDMO 시장<br/>두 자릿수 점유 조기 달성' : 'Global CDMO Market<br/>Early Double-Digit Share'"),
        ("__html: '글로벌 규제 및<br/>경쟁 심화로 수익성 둔화'", "__html: lang === 'kr' ? '글로벌 규제 및<br/>경쟁 심화로 수익성 둔화' : 'Profitability Slows<br/>Due to Regulation & Comp'"),
        (">삼성바이오로직스 등 핵심 기업 매출 컨센서스 상향 및 K-바이오 글로벌 확장 가속화<", ">{lang === 'kr' ? '삼성바이오로직스 등 핵심 기업 매출 컨센서스 상향 및 K-바이오 글로벌 확장 가속화' : 'Revenue consensus upgrades for key players like Samsung Bio and K-Bio global expansion'}<"),
        (">세포 및 유전자 치료 CDMO에서 글로벌 두 자릿수 점유율을 차지할 수 있는 잠재력<", ">{lang === 'kr' ? '세포 및 유전자 치료 CDMO에서 글로벌 두 자릿수 점유율을 차지할 수 있는 잠재력' : 'Potential to capture double-digit global market share in Cell & Gene Therapy CDMO'}<"),
        (">매출 10조 시대를 여는 생산 역량이 창출할 거대한 연구시설 및 공장 부동산 실수요<", ">{lang === 'kr' ? '매출 10조 시대를 여는 생산 역량이 창출할 거대한 연구시설 및 공장 부동산 실수요' : 'Massive real estate demand for R&D and factories created by 10T revenue capacity'}<")
    ],
    "Section53.jsx": [
        (">방산·우주<", ">{lang === 'kr' ? '방산·우주' : 'Defense & Space'}<"),
        ("__html: '2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프'", "__html: lang === 'kr' ? '2030년 500억 달러 수출을 겨냥하는<br/>K-디펜스의 퀀텀 점프' : 'Quantum Jump of K-Defense<br/>Targeting $50B Exports by 2030'"),
        ("__html: '우주·방산 글로벌 진출<br/>안정적 시장 확보'", "__html: lang === 'kr' ? '우주·방산 글로벌 진출<br/>안정적 시장 확보' : 'Global Space/Defense<br/>Stable Market Secured'"),
        ("__html: '2030년 방산 수출<br/>500억 달러 (현재 3배)'", "__html: lang === 'kr' ? '2030년 방산 수출<br/>500억 달러 (현재 3배)' : '2030 Defense Exports<br/>$50B (3x Current)'"),
        ("__html: '지정학적 리스크<br/>완화 시 모멘텀 축소'", "__html: lang === 'kr' ? '지정학적 리스크<br/>완화 시 모멘텀 축소' : 'Momentum Shrinks if<br/>Geopolitical Risk Eases'"),
        (">KAI, 한화, KARI가 주도하는 K-방산과 우주 산업의 구조적 퀀텀 점프 기대<", ">{lang === 'kr' ? 'KAI, 한화, KARI가 주도하는 K-방산과 우주 산업의 구조적 퀀텀 점프 기대' : 'Structural quantum jump expected in K-Defense and Space led by KAI, Hanwha, KARI'}<"),
        (">1조 달러대 거대 글로벌 시장에서 지정학적 갈등을 기회로 삼는 새로운 신데렐라 산업<", ">{lang === 'kr' ? '1조 달러대 거대 글로벌 시장에서 지정학적 갈등을 기회로 삼는 새로운 신데렐라 산업' : 'A new Cinderella industry leveraging geopolitical conflicts in a $1T global market'}<"),
        (">미·중 패권 경쟁 및 유라시아 긴장 국면이 오히려 수출의 장기 슈퍼사이클을 지지<", ">{lang === 'kr' ? '미·중 패권 경쟁 및 유라시아 긴장 국면이 오히려 수출의 장기 슈퍼사이클을 지지' : 'US-China rivalry and Eurasian tensions support a long-term export supercycle'}<")
    ],
    "Section54.jsx": [
        (">K-콘텐츠<", ">{lang === 'kr' ? 'K-콘텐츠' : 'K-Content'}<"),
        ("__html: '음악을 넘어 게임, 패션, 영상으로<br/>확장될 새로운 문화 자본의 영토'", "__html: lang === 'kr' ? '음악을 넘어 게임, 패션, 영상으로<br/>확장될 새로운 문화 자본의 영토' : 'New Cultural Capital Territories<br/>Expanding beyond Music to Games, Fashion, Film'"),
        ("__html: '글로벌 OTT 내<br/>점유율 지속 상승'", "__html: lang === 'kr' ? '글로벌 OTT 내<br/>점유율 지속 상승' : 'Global OTT<br/>Share Continues Rising'"),
        ("__html: '다변화 융합 시장<br/>2~3조 달러 진입'", "__html: lang === 'kr' ? '다변화 융합 시장<br/>2~3조 달러 진입' : 'Diversified Converged Market<br/>Enters $2-3T'"),
        ("__html: '글로벌 플랫폼<br/>종속성 심화'", "__html: lang === 'kr' ? '글로벌 플랫폼<br/>종속성 심화' : 'Deepening Dependence on<br/>Global Platforms'"),
        (">HYBE, SM, CJ ENM 주도의 라이브 비주얼, IP 비즈니스, 게임 산업의 동반 팽창<", ">{lang === 'kr' ? 'HYBE, SM, CJ ENM 주도의 라이브 비주얼, IP 비즈니스, 게임 산업의 동반 팽창' : 'Co-expansion of live visual, IP business, and games led by HYBE, SM, CJ ENM'}<"),
        (">음악(K-pop) 단일 장르를 넘어 Game, Film, Animation, Fashion 등 문화 영토 다변화<", ">{lang === 'kr' ? '음악(K-pop) 단일 장르를 넘어 Game, Film, Animation, Fashion 등 문화 영토 다변화' : 'Diversifying cultural territory beyond K-pop into Game, Film, Animation, Fashion'}<"),
        (">1조 달러대 K-pop 시장이 3조 달러대 거대 무형자산 제국으로 진화하는 변곡점<", ">{lang === 'kr' ? '1조 달러대 K-pop 시장이 3조 달러대 거대 무형자산 제국으로 진화하는 변곡점' : 'Inflection point: $1T K-pop market evolving into a $3T intangible asset empire'}<")
    ],
    "Section55.jsx": [
        (">양자 / 수소 / 우주<", ">{lang === 'kr' ? '양자 / 수소 / 우주' : 'Quantum / Hydrogen / Space'}<"),
        ("__html: '양자 컴퓨팅, 수소, 우주 산업이 담보하는<br/>국가 경제의 미래 방어막'", "__html: lang === 'kr' ? '양자 컴퓨팅, 수소, 우주 산업이 담보하는<br/>국가 경제의 미래 방어막' : 'Future Economic Shield secured by<br/>Quantum, Hydrogen, and Space'"),
        ("__html: '2030년까지 GDP<br/>기여도 1% 미만'", "__html: lang === 'kr' ? '2030년까지 GDP<br/>기여도 1% 미만' : 'Sub-1% GDP<br/>Contribution by 2030'"),
        ("__html: '초기 딥테크 안착<br/>(미래 방어막 실현)'", "__html: lang === 'kr' ? '초기 딥테크 안착<br/>(미래 방어막 실현)' : 'Early Deep Tech Anchored<br/>(Future Shield Realized)'"),
        ("__html: '옵션 가치 실현<br/>불투명 (장기 정체)'", "__html: lang === 'kr' ? '옵션 가치 실현<br/>불투명 (장기 정체)' : 'Option Value Realization<br/>Uncertain (Long-term Stagnation)'"),
        (">양자 컴퓨팅, 수소, 우주 등 딥테크 인프라의 파괴적 미래 잠재력에 선제적 대비<", ">{lang === 'kr' ? '양자 컴퓨팅, 수소, 우주 등 딥테크 인프라의 파괴적 미래 잠재력에 선제적 대비' : 'Preemptive preparation for the disruptive future potential of Deep Tech infrastructure'}<"),
        (">신산업 특성상 단기적인 거시 경제 기여도는 낮으나 장기적 파급력은 예측 불허<", ">{lang === 'kr' ? '신산업 특성상 단기적인 거시 경제 기여도는 낮으나 장기적 파급력은 예측 불허' : 'Low short-term macro contribution, but unpredictable long-term impact'}<"),
        (">거시 경제의 지정학 및 기술 불확실성을 방어할 국가 차원의 필수적인 '옵션 가치'<", ">{lang === 'kr' ? '거시 경제의 지정학 및 기술 불확실성을 방어할 국가 차원의 필수적인 \\'옵션 가치\\'' : 'Essential national \\'Option Value\\' to hedge against geopolitical and tech uncertainty'}<")
    ],
    "Section56.jsx": [
        (">시니어 케어 경제<", ">{lang === 'kr' ? '시니어 케어 경제' : 'Senior Care Economy'}<"),
        ("__html: '글로벌 펀드와 융합하여 침투율 0.6%의<br/>블루오션을 선점할 시니어 케어'", "__html: lang === 'kr' ? '글로벌 펀드와 융합하여 침투율 0.6%의<br/>블루오션을 선점할 시니어 케어' : 'Senior Care preempting a 0.6% penetration<br/>Blue Ocean with Global Funds'"),
        ("__html: '2030년 시니어 하우징<br/>168조 원 전망'", "__html: lang === 'kr' ? '2030년 시니어 하우징<br/>168조 원 전망' : '2030 Senior Housing<br/>168T Won Expected'"),
        ("__html: '글로벌 펀드 진입으로<br/>침투율 급속 팽창'", "__html: lang === 'kr' ? '글로벌 펀드 진입으로<br/>침투율 급속 팽창' : 'Rapid Penetration Growth<br/>via Global Funds'"),
        ("__html: '규제 및 인프라<br/>한계로 0.6% 장기화'", "__html: lang === 'kr' ? '규제 및 인프라<br/>한계로 0.6% 장기화' : '0.6% Penetration Prolonged<br/>by Regulatory Limits'"),
        (">한국 시니어 하우징 침투율은 0.6%로 미국(11%), 호주(6%) 대비 극도로 저개발된 블루오션<", ">{lang === 'kr' ? '한국 시니어 하우징 침투율은 0.6%로 미국(11%), 호주(6%) 대비 극도로 저개발된 블루오션' : 'Korea Senior Housing penetration is 0.6%, an extreme blue ocean compared to US(11%), AUS(6%)'}<"),
        (">전체 시니어 하우징 시장 규모는 2020년 72조 원에서 2030년 168조 원으로 폭발적 성장 전망<", ">{lang === 'kr' ? '전체 시니어 하우징 시장 규모는 2020년 72조 원에서 2030년 168조 원으로 폭발적 성장 전망' : 'Total Senior Housing market expected to explode from 72T in 2020 to 168T in 2030'}<"),
        (">이지스 KB골든라이프케어 협력 실버타운 출시(국내 운용사 최초 펀드 통한 실버타운 공급)<", ">{lang === 'kr' ? '이지스 KB골든라이프케어 협력 실버타운 출시(국내 운용사 최초 펀드 통한 실버타운 공급)' : 'IGIS-KB Golden Life Care Silver Town launch (first fund-based supply by a domestic AMC)'}<"),
        (">Warburg Pincus·Invesco 한국 시니어 시장 진입(2026 발표)이 시작점<", ">{lang === 'kr' ? 'Warburg Pincus·Invesco 한국 시니어 시장 진입(2026 발표)이 시작점' : 'Warburg Pincus & Invesco entry into Korea Senior Market (2026 expected) is the starting point'}<")
    ],
    "Section57.jsx": [
        (">인구·구조적 변수<", ">{lang === 'kr' ? '인구·구조적 변수' : 'Demographic & Structural Variables'}<")
    ],
    "Section58.jsx": [
        (">혹독한 인구 다이어트의 시작<", ">{lang === 'kr' ? '혹독한 인구 다이어트의 시작' : 'Beginning of a Harsh Demographic Diet'}<"),
        (">2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실<", ">{lang === 'kr' ? <>2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실</> : <>The reality of steep national shrinkage<br/>after the 2024 peak of 51.75M</>}<"),
        (">6,000만<", ">{lang === 'kr' ? '6,000만' : '60M'}<"),
        (">4,000만<", ">{lang === 'kr' ? '4,000만' : '40M'}<"),
        (">2,000만<", ">{lang === 'kr' ? '2,000만' : '20M'}<"),
        (">5,175만<", ">{lang === 'kr' ? '5,175만' : '51.75M'}<"),
        (">2024 (정점)<", ">{lang === 'kr' ? '2024 (정점)' : '2024 (Peak)'}<"),
        (">4,734만<", ">{lang === 'kr' ? '4,734만' : '47.34M'}<"),
        (">4,300만<", ">{lang === 'kr' ? '4,300만' : '43M'}<"),
        (">3,664만<", ">{lang === 'kr' ? '3,664만' : '36.64M'}<"),
        (">1,100~3,000만<", ">{lang === 'kr' ? '1,100~3,000만' : '11M~30M'}<"),
        (">2100 (추정)<", ">{lang === 'kr' ? '2100 (추정)' : '2100 (Est.)'}<"),
        (">통계청·UN 중위 변동치 기준 2024년 5,175만 명 정점 이후 본격적인 감소 진입<", ">{lang === 'kr' ? '통계청·UN 중위 변동치 기준 2024년 5,175만 명 정점 이후 본격적인 감소 진입' : 'Entering full decline after 2024 peak of 51.75M (Statistics Korea/UN Med. Var.)'}<"),
        (">2040년 약 4,734만 명, 2050년 약 4,300만 명, 2060년 3,664만 명으로 가파른 축소<", ">{lang === 'kr' ? '2040년 약 4,734만 명, 2050년 약 4,300만 명, 2060년 3,664만 명으로 가파른 축소' : 'Steep shrinkage: 47.34M by 2040, 43M by 2050, 36.64M by 2060'}<"),
        (">Bayesian 확률 추정 기준 2100년에는 1,100만~3,000만 명 사이로 국가 규모 축소 불가피<", ">{lang === 'kr' ? 'Bayesian 확률 추정 기준 2100년에는 1,100만~3,000만 명 사이로 국가 규모 축소 불가피' : 'Inevitable scale down to 11M-30M by 2100 (Bayesian Prob. Est.)'}<")
    ],
    "Section59.jsx": [
        (">생산 인구 35% 증발의 충격파<", ">{lang === 'kr' ? '생산 인구 35% 증발의 충격파' : 'Shockwave of 35% Working-Age Pop Evaporation'}<"),
        (">2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력<", ">{lang === 'kr' ? <>2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력</> : <>Downward pressure on potential growth<br/>as senior share tops 30% by 2035</>}<"),
        (">고령 인구(65세 이상) 비중 급증<", ">{lang === 'kr' ? '고령 인구(65세 이상) 비중 급증' : 'Senior Pop (65+) Surge'}<"),
        (">생산가능인구(15~64세) 증발<", ">{lang === 'kr' ? '생산가능인구(15~64세) 증발' : 'Working-age Pop (15-64) Evaporation'}<"),
        (">3,738만<", ">{lang === 'kr' ? '3,738만' : '37.38M'}<"),
        (">2020년<", ">{lang === 'kr' ? '2020년' : '2020'}<"),
        (">2,419만<", ">{lang === 'kr' ? '2,419만' : '24.19M'}<"),
        (">2050년<", ">{lang === 'kr' ? '2050년' : '2050'}<"),
        (">65세 이상 고령자 비중은 2025년 20%로 초고령사회 진입 후 2035년 30%를 돌파 전망<", ">{lang === 'kr' ? '65세 이상 고령자 비중은 2025년 20%로 초고령사회 진입 후 2035년 30%를 돌파 전망' : 'Seniors (65+) to hit 20% by 2025, topping 30% by 2035'}<"),
        (">생산가능인구(15~64세)는 2020년 3,738만 명에서 2050년 2,419만 명으로 약 35% 증발<", ">{lang === 'kr' ? '생산가능인구(15~64세)는 2020년 3,738만 명에서 2050년 2,419만 명으로 약 35% 증발' : 'Working-age pop drops from 37.38M in 2020 to 24.19M in 2050 (~35% drop)'}<"),
        (">극단적인 부양비 증가와 노동력 부족으로 거시 경제의 잠재성장률 하방 압력 가중<", ">{lang === 'kr' ? '극단적인 부양비 증가와 노동력 부족으로 거시 경제의 잠재성장률 하방 압력 가중' : 'Extreme dependency ratio & labor shortage adds downward macro pressure'}<")
    ],
    "Section60.jsx": [
        (">인구 역설이 창출할 자본의 대이동<", ">{lang === 'kr' ? '인구 역설이 창출할 자본의 대이동' : 'Great Capital Shift via Demographic Paradox'}<"),
        (">가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅<", ">{lang === 'kr' ? <>가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅</> : <>Household Asset Liquidity opening a<br/>Big Bang in Asset Mgt & Senior Housing Demand</>}<"),
        (">인구 감소의 역설<", ">{lang === 'kr' ? '인구 감소의 역설' : 'Demographic Paradox'}<"),
        (">가계 자산의<br/>대규모 유동화<", ">{lang === 'kr' ? <>가계 자산의<br/>대규모 유동화</> : <>Massive Household<br/>Asset Liquidity</>}<"),
        (">부동산 및 금융 자산 처분 가속<", ">{lang === 'kr' ? '부동산 및 금융 자산 처분 가속' : 'Accelerated RE & Financial Asset Disposal'}<"),
        (">자산운용 산업으로의 폭발적 자본 이전<", ">{lang === 'kr' ? '자산운용 산업으로의 폭발적 자본 이전' : 'Explosive Capital Transfer to Asset Mgt'}<"),
        (">시니어 하우징 및 헬스케어 수요 빅뱅<", ">{lang === 'kr' ? '시니어 하우징 및 헬스케어 수요 빅뱅' : 'Big Bang in Senior Housing & Healthcare'}<"),
        (">💡 글로벌 벤치마크: 일본 '잃어버린 30년'의 신규 시장 패턴과 유사<", ">{lang === 'kr' ? '💡 글로벌 벤치마크: 일본 \\'잃어버린 30년\\'의 신규 시장 패턴과 유사' : '💡 Global Benchmark: Similar to Japan\\'s New Market Patterns in Lost 30 Yrs'}<"),
        (">거시 양면성: 노동력 부족이라는 부정 효과와 시니어 하우징 등 신규 시장 창출 효과 병존<", ">{lang === 'kr' ? '거시 양면성: 노동력 부족이라는 부정 효과와 시니어 하우징 등 신규 시장 창출 효과 병존' : 'Macro Duality: Negative labor shortage co-exists with new market creation'}<"),
        (">가계의 부동산·금융 자산 처분이 자산운용 산업으로 이전되며 거대한 자본 대이동 발생<", ">{lang === 'kr' ? '가계의 부동산·금융 자산 처분이 자산운용 산업으로 이전되며 거대한 자본 대이동 발생' : 'Disposal of household assets shifts to AMC, causing massive capital movement'}<"),
        (">일본이 잃어버린 30년에도 자산운용·시니어 케어·인바운드 관광에서 새 시장을 만들어낸 패턴과 유사<", ">{lang === 'kr' ? '일본이 잃어버린 30년에도 자산운용·시니어 케어·인바운드 관광에서 새 시장을 만들어낸 패턴과 유사' : 'Similar to Japan creating new markets in AMC, Senior Care, and Inbound Tourism'}<")
    ],
    "Section61.jsx": [
        (">이민자 수용 및 AI로 방어하는 펀더멘털<", ">{lang === 'kr' ? '이민자 수용 및 AI로 방어하는 펀더멘털' : 'Fundamentals Defended by Immigration & AI'}<"),
        (">외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략<", ">{lang === 'kr' ? <>외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략</> : <>Macro Soft-Landing via 10% Foreigners<br/>& Tech Productivity Offsets</>}<"),
        (">잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략<", ">{lang === 'kr' ? '잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략' : '2 Core Strategies to Defend Downward Potential Growth'}<"),
        (">Strategy 01. 이민자 수용 확대<", ">{lang === 'kr' ? 'Strategy 01. 이민자 수용 확대' : 'Strategy 01. Expand Immigration'}<"),
        (">2040년 목표 (싱가포르 모델 차용)<", ">{lang === 'kr' ? '2040년 목표 (싱가포르 모델 차용)' : '2040 Target (Singapore Model)'}<"),
        (">Strategy 02. AI 기술 상쇄<", ">{lang === 'kr' ? 'Strategy 02. AI 기술 상쇄' : 'Strategy 02. AI Tech Offsets'}<"),
        (">생산성 향상을 통한 경제 방어 효과<", ">{lang === 'kr' ? '생산성 향상을 통한 경제 방어 효과' : 'Economic Defense via Productivity'}<"),
        (">한국 이민자 비중은 약 4.5% 수준이나, Bull 시나리오는 2040년 10%까지 끌어올리는 정책 전환을 전제<", ">{lang === 'kr' ? '한국 이민자 비중은 약 4.5% 수준이나, Bull 시나리오는 2040년 10%까지 끌어올리는 정책 전환을 전제' : 'Foreigner share at 4.5%, but Bull scenario targets 10% by 2040'}<"),
        (">이는 싱가포르 모델(외국인 비중 30%+)을 부분 차용하여 노동력 감소를 적극 방어하는 전략<", ">{lang === 'kr' ? '이는 싱가포르 모델(외국인 비중 30%+)을 부분 차용하여 노동력 감소를 적극 방어하는 전략' : 'Adopts Singapore model (30%+) to actively defend labor shortage'}<"),
        (">AI 기술 도입(BCG·McKinsey 보고서)으로 인한 생산성 향상이 인구 감소 효과를 최대 1.0%p 상쇄 가능<", ">{lang === 'kr' ? 'AI 기술 도입(BCG·McKinsey 보고서)으로 인한 생산성 향상이 인구 감소 효과를 최대 1.0%p 상쇄 가능' : 'AI adoption (BCG/McKinsey) can offset pop decline impact by up to 1.0%p'}<")
    ],
    "Section62.jsx": [
        (">서울 오피스 시장 2030~2040 전망<", ">{lang === 'kr' ? '서울 오피스 시장 2030~2040 전망' : 'Seoul Office Market 2030~2040 Outlook'}<")
    ],
    "Section63.jsx": [
        (">7축 메가 권역으로의 팽창<", ">{lang === 'kr' ? '7축 메가 권역으로의 팽창' : 'Expansion to a 7-Axis Mega District'}<"),
        (">YSBD(용산/서울역)와 KBD(삼성/잠실)가<br/>주도하는 권역 지도의 재편<", ">{lang === 'kr' ? <>YSBD(용산/서울역)와 KBD(삼성/잠실)가<br/>주도하는 권역 지도의 재편</> : <>District Map Reorganization Led by<br/>YSBD(Yongsan/Seoul Stn) & KBD(Samsung/Jamsil)</>}<"),
        (">기존 5축 권역 구조<", ">{lang === 'kr' ? '기존 5축 권역 구조' : 'Existing 5-Axis Structure'}<"),
        (">MBD (마곡)<", ">{lang === 'kr' ? 'MBD (마곡)' : 'MBD (Magok)'}<"),
        (">BBD (분당·판교)<", ">{lang === 'kr' ? 'BBD (분당·판교)' : 'BBD (Bundang/Pangyo)'}<"),
        (">진화된 7축 메가 권역<", ">{lang === 'kr' ? '진화된 7축 메가 권역' : 'Evolved 7-Axis Mega District'}<"),
        (">신규 메가 거점 편입<", ">{lang === 'kr' ? '신규 메가 거점 편입' : 'New Mega Nodes Included'}<"),
        (">(용산·서울역)<", ">{lang === 'kr' ? '(용산·서울역)' : '(Yongsan/Seoul Stn)'}<"),
        (">(삼성·잠실)<", ">{lang === 'kr' ? '(삼성·잠실)' : '(Samsung/Jamsil)'}<"),
        (">기존 5축 권역 병존<", ">{lang === 'kr' ? '기존 5축 권역 병존' : 'Existing 5-Axis Coexists'}<"),
        (">향후 15년간 가장 큰 구조 변화는 YSBD(용산역 + 서울역 IOTA 일대) 신규 권역의 등장과 GBD 동쪽 확장(GBC·잠실MICE·환승센터)임<", ">{lang === 'kr' ? '향후 15년간 가장 큰 구조 변화는 YSBD(용산역 + 서울역 IOTA 일대) 신규 권역의 등장과 GBD 동쪽 확장(GBC·잠실MICE·환승센터)임' : 'Biggest shift over 15 yrs is emergence of YSBD and GBD eastbound expansion (GBC, Jamsil MICE)'}<"),
        (">기존 3대 핵심축(CBD, GBD, YBD)과 2대 확장축(MBD, BBD)에 2개의 신규 초대형 거점이 편입되며 7축 구조로 진화<", ">{lang === 'kr' ? '기존 3대 핵심축(CBD, GBD, YBD)과 2대 확장축(MBD, BBD)에 2개의 신규 초대형 거점이 편입되며 7축 구조로 진화' : '2 new mega-nodes added to existing 3 cores and 2 extended axes, evolving into 7-axis structure'}<")
    ],
    "Section64.jsx": [
        (">Base 시나리오 임대료 전망<", ">{lang === 'kr' ? 'Base 시나리오 임대료 전망' : 'Base Scenario Rent Outlook'}<"),
        (">2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱<", ">{lang === 'kr' ? <>2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱</> : <>New Trophy Asset (IOTA/GBC) Pricing<br/>Topping 340k KRW/py by 2040</>}<"),
        (">2030년<", ">{lang === 'kr' ? '2030년' : '2030'}<"),
        (">2035년<", ">{lang === 'kr' ? '2035년' : '2035'}<"),
        (">2040년<", ">{lang === 'kr' ? '2040년' : '2040'}<"),
        (">CBD 프라임 평균<", ">{lang === 'kr' ? 'CBD 프라임 평균' : 'CBD Prime Avg'}<"),
        (">만 원<", ">{lang === 'kr' ? '만 원' : '0k KRW'}<"),
        (">GBD 프라임 평균<", ">{lang === 'kr' ? 'GBD 프라임 평균' : 'GBD Prime Avg'}<"),
        (">IOTA 서울 트로피 오피스<", ">{lang === 'kr' ? 'IOTA 서울 트로피 오피스' : 'IOTA Seoul Trophy Office'}<"),
        (">도쿄 수준의<", ">{lang === 'kr' ? '도쿄 수준의' : 'Tokyo Level'}<"),
        (">CBD 프라임은 2030년 약 17~18만 원에서 2040년 25~28만 원으로 상승 전망<", ">{lang === 'kr' ? 'CBD 프라임은 2030년 약 17~18만 원에서 2040년 25~28만 원으로 상승 전망' : 'CBD Prime to rise from 170k-180k (2030) to 250k-280k KRW/py (2040)'}<"),
        (">GBD 프라임은 2030년 약 18~20만 원에서 2040년 30~34만 원까지 수직 상승 전망<", ">{lang === 'kr' ? 'GBD 프라임은 2030년 약 18~20만 원에서 2040년 30~34만 원까지 수직 상승 전망' : 'GBD Prime to surge vertically from 180k-200k (2030) to 300k-340k KRW/py (2040)'}<"),
        (">IOTA 및 GBC 등 신규 트로피 자산은 도쿄 마루노우치(USD 200/sqft) 대비 65~80% 수준으로 수렴하며 압도적 프라이싱 형성<", ">{lang === 'kr' ? 'IOTA 및 GBC 등 신규 트로피 자산은 도쿄 마루노우치(USD 200/sqft) 대비 65~80% 수준으로 수렴하며 압도적 프라이싱 형성' : 'New Trophies (IOTA/GBC) to converge at 65-80% of Tokyo Marunouchi, setting dominant pricing'}<")
    ],
    "Section65.jsx": [
        (">Bull 시나리오의 도쿄 마루노우치 수렴<", ">{lang === 'kr' ? 'Bull 시나리오의 도쿄 마루노우치 수렴' : 'Convergence with Tokyo Marunouchi in Bull Scenario'}<"),
        (">평당 50만 원 시대, 글로벌 1선 도시의<br/>핵심부와 어깨를 나란히 하다<", ">{lang === 'kr' ? <>평당 50만 원 시대, 글로벌 1선 도시의<br/>핵심부와 어깨를 나란히 하다</> : <>500k KRW/py Era, Standing Shoulder-to-Shoulder<br/>with Global Tier-1 City Cores</>}<"),
        (">IOTA·GBC 신규 트로피 자산<", ">{lang === 'kr' ? 'IOTA·GBC 신규 트로피 자산' : 'IOTA/GBC New Trophy Assets'}<"),
        (">만 원<", ">{lang === 'kr' ? '만 원' : '0k KRW'}<"),
        (">/ 평·월<", ">{lang === 'kr' ? '/ 평·월' : '/ py·mo'}<"),
        (">환산 시 USD 200/sqft 돌파<", ">{lang === 'kr' ? '환산 시 USD 200/sqft 돌파' : 'Topping USD 200/sqft'}<"),
        (">글로벌 최고 수준 핵심 권역<", ">{lang === 'kr' ? '글로벌 최고 수준 핵심 권역' : 'Global Top-Tier Core'}<"),
        (">도쿄<br/>마루노우치<", ">{lang === 'kr' ? <>도쿄<br/>마루노우치</> : <>Tokyo<br/>Marunouchi</>}<"),
        (">글로벌 1선 도시 코어 오피스와의<br/>임대료 디커플링(Decoupling) 완전 해소<", ">{lang === 'kr' ? <>글로벌 1선 도시 코어 오피스와의<br/>임대료 디커플링(Decoupling) 완전 해소</> : <>Complete Resolution of Rent Decoupling<br/>with Global Tier-1 City Cores</>}<"),
        (">가장 낙관적인 Bull 시나리오 발동 시, GBD 프라임은 2040년 38~42만 원 수준 도달 전망<", ">{lang === 'kr' ? '가장 낙관적인 Bull 시나리오 발동 시, GBD 프라임은 2040년 38~42만 원 수준 도달 전망' : 'In most optimistic Bull Scenario, GBD Prime to reach 380k-420k KRW by 2040'}<"),
        (">IOTA 및 GBC 트로피 자산은 2035년 35만 원을 거쳐 2040년 45~50만 원/평·월 시대 개막<", ">{lang === 'kr' ? 'IOTA 및 GBC 트로피 자산은 2035년 35만 원을 거쳐 2040년 45~50만 원/평·월 시대 개막' : 'IOTA/GBC Trophies passing 350k in 2035 to open 450k-500k KRW/py era by 2040'}<"),
        (">이는 도쿄 마루노우치 코어 오피스의 상징적 저항선인 USD 200/sqft와 완전히 수렴하는 역사적 분기점<", ">{lang === 'kr' ? '이는 도쿄 마루노우치 코어 오피스의 상징적 저항선인 USD 200/sqft와 완전히 수렴하는 역사적 분기점' : 'A historic inflection point fully converging with Tokyo Marunouchi\\'s USD 200/sqft resistance line'}<")
    ],
    "Section66.jsx": [
        (">극단적 양극화를 방어하는 트로피 자산<", ">{lang === 'kr' ? '극단적 양극화를 방어하는 트로피 자산' : 'Trophy Assets Defending Extreme Polarization'}<"),
        (">Bear 국면에서도 프리미엄을 사수할<br/>신규 랜드마크의 탁월한 자산 방어력<", ">{lang === 'kr' ? <>Bear 국면에서도 프리미엄을 사수할<br/>신규 랜드마크의 탁월한 자산 방어력</> : <>Excellent Asset Defense of New Landmarks<br/>Retaining Premium even in Bear Market</>}<"),
        (">2030년 정점 이후 인구·기업 통폐합 쇼크 (Bear Scenario)<", ">{lang === 'kr' ? '2030년 정점 이후 인구·기업 통폐합 쇼크 (Bear Scenario)' : 'Post-2030 Demographic/Corp Consolidation Shock (Bear)'}<"),
        (">가치 약세 및 횡보<", ">{lang === 'kr' ? '가치 약세 및 횡보' : 'Value Weakness & Stagnation'}<"),
        (">일반 등급 클래스(Class B) 공실 누적<", ">{lang === 'kr' ? '일반 등급 클래스(Class B) 공실 누적' : 'General Grade (Class B) Vacancy Accumulation'}<"),
        (">CBD 일부 노후 자산 임대료 약세<", ">{lang === 'kr' ? 'CBD 일부 노후 자산 임대료 약세' : 'CBD Aging Asset Rent Weakness'}<"),
        (">절대적 방어력 (프리미엄 사수)<", ">{lang === 'kr' ? '절대적 방어력 (프리미엄 사수)' : 'Absolute Defense (Premium Retained)'}<"),
        (">IOTA · GBC 신규 트로피 자산<", ">{lang === 'kr' ? 'IOTA · GBC 신규 트로피 자산' : 'IOTA/GBC New Trophy Assets'}<"),
        (">거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지<", ">{lang === 'kr' ? '거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지' : 'Solid pricing maintained by GBD/Samsung-dong core demand despite macro shock'}<"),
        (">Bear 시나리오 발동 시 2030년 정점 이후 인구 및 기업 본사 통폐합으로 전체 시장 임대료 횡보세 진입<", ">{lang === 'kr' ? 'Bear 시나리오 발동 시 2030년 정점 이후 인구 및 기업 본사 통폐합으로 전체 시장 임대료 횡보세 진입' : 'Under Bear scenario, market rents stagnate due to demographic/corp consolidation post-2030'}<"),
        (">CBD 일부 자산은 노후화와 수요 이탈로 약세를 보이며 극단적 양극화 현상 심화<", ">{lang === 'kr' ? 'CBD 일부 자산은 노후화와 수요 이탈로 약세를 보이며 극단적 양극화 현상 심화' : 'Some CBD assets weaken from aging/demand flight, worsening extreme polarization'}<"),
        (">반면 IOTA 등 삼성동 신규 랜드마크는 핵심 코어 자산으로서 자본의 '안전 도피처(Safe Haven)' 역할을 수행<", ">{lang === 'kr' ? '반면 IOTA 등 삼성동 신규 랜드마크는 핵심 코어 자산으로서 자본의 \\'안전 도피처(Safe Haven)\\' 역할을 수행' : 'Conversely, new landmarks like IOTA act as a Safe Haven for capital as core assets'}<")
    ],
    "Section67.jsx": [
        (">공실률 전망<", ">{lang === 'kr' ? '공실률 전망' : 'Vacancy Outlook'}<"),
        (">노후 자산의 도태 속에서 오직 프라임 등급만이<br/>향유할 4% 이내 완전 임차<", ">{lang === 'kr' ? <>노후 자산의 도태 속에서 오직 프라임 등급만이<br/>향유할 4% 이내 완전 임차</> : <>Only Prime Grades to Enjoy Sub-4% Full Occupancy<br/>Amidst the Culling of Aging Assets</>}<"),
        (">최상위 프라임 등급 (Trophy)<", ">{lang === 'kr' ? '최상위 프라임 등급 (Trophy)' : 'Top Prime Grade (Trophy)'}<"),
        (">공실률 4% 이내 유지<", ">{lang === 'kr' ? '공실률 4% 이내 유지' : 'Sub-4% Vacancy Maintained'}<"),
        (">▶ 완전 임차(Full Occupancy) 달성<", ">{lang === 'kr' ? '▶ 완전 임차(Full Occupancy) 달성' : '▶ Full Occupancy Achieved'}<"),
        (">서울 권역 평균 (Base 시나리오)<", ">{lang === 'kr' ? '서울 권역 평균 (Base 시나리오)' : 'Seoul Avg (Base Scenario)'}<"),
        (">2035년 이후 6~8% 도달<", ">{lang === 'kr' ? '2035년 이후 6~8% 도달' : '6~8% Reached Post-2035'}<"),
        (">▶ 인구 감소 충격 반영 (완충 구간)<", ">{lang === 'kr' ? '▶ 인구 감소 충격 반영 (완충 구간)' : '▶ Reflects Demo Shock (Buffer Zone)'}<"),
        (">일반 오피스 & 노후 자산 (Class B 이하)<", ">{lang === 'kr' ? '일반 오피스 & 노후 자산 (Class B 이하)' : 'General/Aging (Class B & Below)'}<"),
        (">10%+ 의미 있는 심각한 공실 발생<", ">{lang === 'kr' ? '10%+ 의미 있는 심각한 공실 발생' : '10%+ Meaningful Severe Vacancy'}<"),
        (">▶ 자산 도태 가속화 (Flight-to-Quality)<", ">{lang === 'kr' ? '▶ 자산 도태 가속화 (Flight-to-Quality)' : '▶ Accelerated Culling (Flight-to-Quality)'}<"),
        (">권역 평균 공실률은 Base 시 2030년 5~7%, 2035년 이후 인구 감소가 반영되며 6~8%로 상승 전망<", ">{lang === 'kr' ? '권역 평균 공실률은 Base 시 2030년 5~7%, 2035년 이후 인구 감소가 반영되며 6~8%로 상승 전망' : 'Avg vacancy to rise from 5-7% in 2030 to 6-8% post-2035 reflecting demo decline (Base)'}<"),
        (">Bear 시나리오 발동 시 권역 평균 10% 이상 도달 및 Class B 이하 노후 자산의 급격한 도태 우려<", ">{lang === 'kr' ? 'Bear 시나리오 발동 시 권역 평균 10% 이상 도달 및 Class B 이하 노후 자산의 급격한 도태 우려' : 'Under Bear, avg vacancy tops 10% triggering rapid culling of Class B and below'}<"),
        (">그러나 프라임 등급은 'Flight-to-Quality' 쏠림 현상으로 4% 이내의 완전 임차 상태를 구조적으로 향유<", ">{lang === 'kr' ? '그러나 프라임 등급은 \\'Flight-to-Quality\\' 쏠림 현상으로 4% 이내의 완전 임차 상태를 구조적으로 향유' : 'However, Prime grades structurally enjoy sub-4% full occupancy due to Flight-to-Quality'}<")
    ],
    "Section68.jsx": [
        (">산업/물류 부동산 2030~2040<", ">{lang === 'kr' ? '산업/물류 부동산 2030~2040' : 'Industrial / Logistics Real Estate 2030~2040'}<")
    ],
    "Section69.jsx": [
        (">데이터센터 수요 폭발과 분산화<", ">{lang === 'kr' ? '데이터센터 수요 폭발과 분산화' : 'Data Center Demand Explosion & Decentralization'}<"),
        (">전력인입 제약으로 지방 분산가속,<br/>단일 부동산 카테고리로 향후 15년간 가장 큰 자본 흡수 예상<", ">{lang === 'kr' ? <>전력인입 제약으로 지방 분산가속,<br/>단일 부동산 카테고리로 향후 15년간 가장 큰 자본 흡수 예상</> : <>Power constraints speed local decentralization,<br/>Single asset class to absorb largest capital over 15 yrs</>}<"),
        (">한국 데이터센터 전력 수요 전망<", ">{lang === 'kr' ? '한국 데이터센터 전력 수요 전망' : 'Korea Data Center Power Demand Outlook'}<"),
        (">2030년 (Base)<", ">{lang === 'kr' ? '2030년 (Base)' : '2030 (Base)'}<"),
        (">2035년<", ">{lang === 'kr' ? '2035년' : '2035'}<"),
        (">2040년<", ">{lang === 'kr' ? '2040년' : '2040'}<"),
        (">수도권 전력 인입 제약<", ">{lang === 'kr' ? '수도권 전력 인입 제약' : 'Greater Seoul Power Constraints'}<"),
        (">성장의 구조적 병목 (Bottleneck) 발생<", ">{lang === 'kr' ? '성장의 구조적 병목 (Bottleneck) 발생' : 'Structural Growth Bottleneck'}<"),
        (">지방 거점 분산 가속화<", ">{lang === 'kr' ? '지방 거점 분산 가속화' : 'Accelerated Regional Decentralization'}<"),
        (">전남 · 경북 · 강원 중심의 신규 클러스터 조성<", ">{lang === 'kr' ? '전남 · 경북 · 강원 중심의 신규 클러스터 조성' : 'New Clusters in Jeonnam, Gyeongbuk, Gangwon'}<"),
        (">한국 데이터센터 수요는 2030년 6.3GW에서 2040년 최대 22GW까지 3.5배 이상 폭발적 성장 전망<", ">{lang === 'kr' ? '한국 데이터센터 수요는 2030년 6.3GW에서 2040년 최대 22GW까지 3.5배 이상 폭발적 성장 전망' : 'Korea Data Center demand to grow 3.5x from 6.3GW in 2030 to max 22GW in 2040'}<"),
        (">수도권 전력망 한계가 구조적 제약으로 작용하며, 풍부한 전력 확보가 가능한 지방으로의 입지 분산 필연적<", ">{lang === 'kr' ? '수도권 전력망 한계가 구조적 제약으로 작용하며, 풍부한 전력 확보가 가능한 지방으로의 입지 분산 필연적' : 'Greater Seoul power grid limits necessitate dispersion to power-rich regional locations'}<"),
        (">결과적으로 데이터센터는 단일 산업 부동산 카테고리로서 향후 15년간 가장 거대한 자본을 흡수할 섹터로 부상<", ">{lang === 'kr' ? '결과적으로 데이터센터는 단일 산업 부동산 카테고리로서 향후 15년간 가장 거대한 자본을 흡수할 섹터로 부상' : 'Consequently, Data Centers emerge as the single sector absorbing the largest capital over 15 yrs'}<")
    ],
    "Section70.jsx": [
        (">시니어 하우징 메가 트렌드<", ">{lang === 'kr' ? '시니어 하우징 메가 트렌드' : 'Senior Housing Mega Trend'}<"),
        (">300조 원 거대 시장을 장악할<br/>한국형 시니어 REIT 모델의 탄생<", ">{lang === 'kr' ? <>300조 원 거대 시장을 장악할<br/>한국형 시니어 REIT 모델의 탄생</> : <>Birth of Korean Senior REIT Model<br/>Dominating a 300T Won Mega Market</>}<"),
        (">2030년 168조 원<", ">{lang === 'kr' ? '2030년 168조 원' : '2030: 168T Won'}<"),
        (">2040년 시장 규모<", ">{lang === 'kr' ? '2040년 시장 규모' : '2040 Market Size'}<"),
        (">조 원+<", ">{lang === 'kr' ? '조 원+' : 'T+'}<"),
        (">침투율 0.6% ➔ 3~5% 확장 시<br/><span className=\"text-white text-[24px]\">신규 공급 50만 호 이상 필요</span><", ">{lang === 'kr' ? <>침투율 0.6% ➔ 3~5% 확장 시<br/><span className=\"text-white text-[24px]\">신규 공급 50만 호 이상 필요</span></> : <>Penetration 0.6% ➔ 3-5% implies<br/><span className=\"text-white text-[24px]\">500k+ new units needed</span></>}<"),
        (">이지스 시니어 플랫폼의 비전<", ">{lang === 'kr' ? '이지스 시니어 플랫폼의 비전' : 'IGIS Senior Platform Vision'}<"),
        (">블랙스톤 BREIT<", ">{lang === 'kr' ? '블랙스톤 BREIT' : 'Blackstone BREIT'}<"),
        (">압도적 펀딩·스케일업<", ">{lang === 'kr' ? '압도적 펀딩·스케일업' : 'Dominant Funding & Scale-up'}<"),
        (">미국 Welltower 모델<", ">{lang === 'kr' ? '미국 Welltower 모델' : 'US Welltower Model'}<"),
        (">헬스케어·운영 전문성 결합<", ">{lang === 'kr' ? '헬스케어·운영 전문성 결합' : 'Healthcare & Ops Expertise'}<"),
        (">한국형 압도적 시니어 REIT 모델 진화<", ">{lang === 'kr' ? '한국형 압도적 시니어 REIT 모델 진화' : 'Evolution of Dominant Korean Senior REIT'}<"),
        (">한국 시니어 하우징 시장은 2030년 168조 원에서 2040년 300조 원 이상으로 폭발적 성장이 확정된 메가 섹터<", ">{lang === 'kr' ? '한국 시니어 하우징 시장은 2030년 168조 원에서 2040년 300조 원 이상으로 폭발적 성장이 확정된 메가 섹터' : 'Korea Senior Housing to explode from 168T (2030) to 300T+ (2040), a guaranteed mega sector'}<"),
        (">현재 0.6%에 불과한 침투율이 글로벌 평균인 3~5% 수준으로 오를 경우 최소 50만 호의 신규 공급 필요<", ">{lang === 'kr' ? '현재 0.6%에 불과한 침투율이 글로벌 평균인 3~5% 수준으로 오를 경우 최소 50만 호의 신규 공급 필요' : 'Rising from 0.6% to 3-5% global average requires at least 500,000 new units'}<"),
        (">이지스는 블랙스톤(BREIT)의 자본력과 웰타워(Welltower)의 운영 전문성을 결합한 거대 시니어 REIT로 시장 장악<", ">{lang === 'kr' ? '이지스는 블랙스톤(BREIT)의 자본력과 웰타워(Welltower)의 운영 전문성을 결합한 거대 시니어 REIT로 시장 장악' : 'IGIS dominates with a mega Senior REIT merging BREIT\\'s capital and Welltower\\'s ops expertise'}<")
    ],
    "Section71.jsx": [
        (">생명과학 클러스터와 콜드체인 제약 물류가<br/>결합하는 신규 거점의 안착<", ">{lang === 'kr' ? <>생명과학 클러스터와 콜드체인 제약 물류가<br/>결합하는 신규 거점의 안착</> : <>Anchoring New Nodes Merging<br/>Life Sciences & Cold-chain Pharma Logistics</>}<"),
        (">생명과학 클러스터<", ">{lang === 'kr' ? '생명과학 클러스터' : 'Life Science Cluster'}<"),
        (">송도<", ">{lang === 'kr' ? '송도' : 'Songdo'}<"),
        (">판교<", ">{lang === 'kr' ? '판교' : 'Pangyo'}<"),
        (">마곡<", ">{lang === 'kr' ? '마곡' : 'Magok'}<"),
        (">K-바이오 클러스터 특화 부동산이<br/>독립적인 우량 신규 카테고리로 안착<", ">{lang === 'kr' ? <>K-바이오 클러스터 특화 부동산이<br/>독립적인 우량 신규 카테고리로 안착</> : <>K-Bio Cluster-specific RE settles<br/>as an independent premium category</>}<"),
        (">콜드체인 · 제약 물류<", ">{lang === 'kr' ? '콜드체인 · 제약 물류' : 'Cold Chain & Pharma Logistics'}<"),
        (">인구 고령화<", ">{lang === 'kr' ? '인구 고령화' : 'Aging Pop'}<"),
        (">바이오 직배송<", ">{lang === 'kr' ? '바이오 직배송' : 'Bio Direct Delivery'}<"),
        (">의약품 수요 증가와 맞물려<br/>특수 온도 제어 물류 수요의 지속적 성장<", ">{lang === 'kr' ? <>의약품 수요 증가와 맞물려<br/>특수 온도 제어 물류 수요의 지속적 성장</> : <>Continuous growth in temp-controlled<br/>logistics paired with pharma demand</>}<"),
        (">송도, 판교, 마곡 등 주요 거점을 중심으로 한 '생명과학 클러스터'가 새로운 핵심 카테고리로 부상<", ">{lang === 'kr' ? '송도, 판교, 마곡 등 주요 거점을 중심으로 한 \\'생명과학 클러스터\\'가 새로운 핵심 카테고리로 부상' : 'Life Science Clusters around Songdo, Pangyo, Magok emerge as a new core category'}<"),
        (">인구 고령화 및 바이오/의약품 직배송 트렌드와 결합하여 콜드체인(특수 제어) 물류 인프라 수요 급증<", ">{lang === 'kr' ? '인구 고령화 및 바이오/의약품 직배송 트렌드와 결합하여 콜드체인(특수 제어) 물류 인프라 수요 급증' : 'Cold chain infra demand surges with aging pop and bio direct delivery trends'}<"),
        (">연구개발 거점과 특수 물류 인프라가 시너지를 내며 K-바이오 특화 밸류체인 부동산 완성<", ">{lang === 'kr' ? '연구개발 거점과 특수 물류 인프라가 시너지를 내며 K-바이오 특화 밸류체인 부동산 완성' : 'R&D nodes and specialized infra synergize to complete the K-Bio RE value chain'}<")
    ],
    "Section72.jsx": [
        (">Grade-A 물류센터의 패러다임 전환<", ">{lang === 'kr' ? 'Grade-A 물류센터의 패러다임 전환' : 'Paradigm Shift in Grade-A Logistics'}<"),
        (">모든 신규 대형 물류센터의 절대적 설계 표준<br/>로봇·AMR 친화형<", ">{lang === 'kr' ? <>모든 신규 대형 물류센터의 절대적 설계 표준<br/>로봇·AMR 친화형</> : <>Absolute Design Standard for New Logistics:<br/>Robot & AMR-Friendly</>}<"),
        (">Industry Leaders 주도<", ">{lang === 'kr' ? 'Industry Leaders 주도' : 'Led by Industry Leaders'}<"),
        (">쿠팡<", ">{lang === 'kr' ? '쿠팡' : 'Coupang'}<"),
        (">CJ대한통운<", ">{lang === 'kr' ? 'CJ대한통운' : 'CJ Logistics'}<"),
        (">네이버<", ">{lang === 'kr' ? '네이버' : 'Naver'}<"),
        (">LG CNS<", ">{lang === 'kr' ? 'LG CNS' : 'LG CNS'}<"),
        (">로봇 · AMR 친화 설계 (Robot-Friendly)<", ">{lang === 'kr' ? '로봇 · AMR 친화 설계 (Robot-Friendly)' : 'Robot & AMR Friendly Design'}<"),
        (">초평탄 바닥 구조 및 하중 강화<", ">{lang === 'kr' ? '초평탄 바닥 구조 및 하중 강화' : 'Super Flat Floor & Load Bearing'}<"),
        (">물류 로봇 전용 동선 최적화<", ">{lang === 'kr' ? '물류 로봇 전용 동선 최적화' : 'Optimized Robot Routing'}<"),
        (">고전력 인입 및 5G 통신망 완비<", ">{lang === 'kr' ? '고전력 인입 및 5G 통신망 완비' : 'High Power & 5G Network Ready'}<"),
        (">향후 모든 신규 Grade-A 물류센터의 절대적 표준<", ">{lang === 'kr' ? '향후 모든 신규 Grade-A 물류센터의 절대적 표준' : 'Absolute Standard for all Future Grade-A Logistics'}<"),
        (">쿠팡, CJ대한통운, 네이버, LG CNS 등 물류 및 IT 거인들이 전면적인 자동화를 시장의 벤치마크로 주도<", ">{lang === 'kr' ? '쿠팡, CJ대한통운, 네이버, LG CNS 등 물류 및 IT 거인들이 전면적인 자동화를 시장의 벤치마크로 주도' : 'Logistics/IT giants like Coupang, CJ, Naver lead full automation as the market benchmark'}<"),
        (">바닥 평탄도, 로봇 전용 통신/전력망, 하중 등 로봇(AMR/AGV) 운영에 최적화된 하드웨어 스펙 필수 요구<", ">{lang === 'kr' ? '바닥 평탄도, 로봇 전용 통신/전력망, 하중 등 로봇(AMR/AGV) 운영에 최적화된 하드웨어 스펙 필수 요구' : 'Requires HW specs optimized for AMR/AGV operations: flat floors, dedicated networks, loads'}<"),
        (">단순 창고를 넘어선 '자동화 설비의 플랫폼'으로서 로봇 친화 설계가 우량 물류센터의 생존 조건으로 정착<", ">{lang === 'kr' ? '단순 창고를 넘어선 \\'자동화 설비의 플랫폼\\'으로서 로봇 친화 설계가 우량 물류센터의 생존 조건으로 정착' : 'Beyond mere warehousing, robot-friendly design becomes a survival condition as an \\'automation platform\\''}<")
    ]
}

def main():
    base_dir = "src/components"
    for filename, reps in replacements.items():
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = add_use_language(content)
        
        for k, v in reps:
            content = content.replace(k, v)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    print("Translation patch completed for Section41-Section72.")

if __name__ == "__main__":
    main()
