import os
import re

def patch_final():
    base_dir = "src/components"
    
    replacements = {
        "Section42.jsx": [
            (r"Base · Bull · Bear<br/>\s*3개 시나리오 프레임", "{lang === 'kr' ? <>Base · Bull · Bear<br/>3개 시나리오 프레임</> : <>Base · Bull · Bear<br/>3 Scenario Frameworks</>}")
        ],
        "Section43.jsx": [
            (r">시나리오 핵심 변수<", ">{lang === 'kr' ? '시나리오 핵심 변수' : 'Core Scenario Variables'}<"),
            (r">한국 GDP 3조 달러 달성을 좌우하는 4대 프레임<", ">{lang === 'kr' ? '한국 GDP 3조 달러 달성을 좌우하는 4대 프레임' : '4 Core Frameworks determining Korea\\'s $3T GDP'}<")
        ],
        "Section44.jsx": [
            (r"Base Scenario \(확률 50%\)", "{lang === 'kr' ? 'Base Scenario (확률 50%)' : 'Base Scenario (50% Prob)'}"),
            (r"IMF·OECD·KDI<br/>\s*공통 컨센서스 기반<br/>\s*표준 성장 궤도 진입", "{lang === 'kr' ? <>IMF·OECD·KDI<br/>공통 컨센서스 기반<br/>표준 성장 궤도 진입</> : <>Standard Growth Trajectory<br/>based on IMF/OECD/KDI Consensus</>}")
        ],
        "Section45.jsx": [
            (r"Bull Scenario \(확률 30%\)", "{lang === 'kr' ? 'Bull Scenario (확률 30%)' : 'Bull Scenario (30% Prob)'}"),
            (r"고급제조 \+ 콘텐츠 \+ 금융<br/>\s*\"동아시아 스위스\" 모델<br/>\s*재포지셔닝", "{lang === 'kr' ? <>고급제조 + 콘텐츠 + 금융<br/>\"동아시아 스위스\" 모델<br/>재포지셔닝</> : <>High-end Mfg + Content + Finance<br/>Repositioning to \"East Asian Swiss\" Model</>}")
        ],
        "Section46.jsx": [
            (r"Bear Scenario \(확률 20%\)", "{lang === 'kr' ? 'Bear Scenario (확률 20%)' : 'Bear Scenario (20% Prob)'}"),
            (r"지정학적 갈등 및 구조적 모순<br/>\s*심화에 따른<br/>\s*일본식 \"잃어버린 10년\" 진입", "{lang === 'kr' ? <>지정학적 갈등 및 구조적 모순<br/>심화에 따른<br/>일본식 \"잃어버린 10년\" 진입</> : <>Japan-style \"Lost Decade\"<br/>due to geopolitical & structural conflicts</>}")
        ],
        "Section58.jsx": [
            (r"2024년 5,175만 정점 통과 후 직면할<br/>\s*가파른 국가 규모 축소의 현실", "{lang === 'kr' ? <>2024년 5,175만 정점 통과 후 직면할<br/>가파른 국가 규모 축소의 현실</> : <>Steep shrinkage of national scale<br/>facing after 2024 peak of 51.75M</>}")
        ],
        "Section59.jsx": [
            (r"2035년 고령 비중 30% 돌파가 몰고 올<br/>\s*잠재성장률 하방 압력", "{lang === 'kr' ? <>2035년 고령 비중 30% 돌파가 몰고 올<br/>잠재성장률 하방 압력</> : <>Downward pressure on potential growth<br/>driven by elderly pop exceeding 30% in 2035</>}")
        ],
        "Section60.jsx": [
            (r"가계 자산의 유동화가 열어젖힐<br/>\s*자산운용 및 시니어 하우징 수요의 빅뱅", "{lang === 'kr' ? <>가계 자산의 유동화가 열어젖힐<br/>자산운용 및 시니어 하우징 수요의 빅뱅</> : <>Big bang in AM & Senior Housing demand<br/>unlocked by household asset securitization</>}")
        ],
        "Section61.jsx": [
            (r"외국인 10% 비중 확대와 기술적 생산성<br/>\s*상쇄를 통한 거시 연착륙 전략", "{lang === 'kr' ? <>외국인 10% 비중 확대와 기술적 생산성<br/>상쇄를 통한 거시 연착륙 전략</> : <>Macro soft-landing strategy via 10% foreign pop<br/>and tech productivity offsets</>}"),
            (r">잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략<", ">{lang === 'kr' ? '잠재성장률 하방 압력을 방어하기 위한 2대 핵심 전략' : '2 Core Strategies to Defend Downward Pressure on Potential Growth'}<")
        ],
        "Section63.jsx": [
            (r"YSBD\(용산/서울역\)와 KBD\(삼성/잠실\)가<br/>\s*주도하는 권역 지도의 재편", "{lang === 'kr' ? <>YSBD(용산/서울역)와 KBD(삼성/잠실)가<br/>주도하는 권역 지도의 재편</> : <>Reorganization of District Map<br/>led by YSBD (Yongsan/Seoul Station) & KBD (Samsung/Jamsil)</>}"),
            (r">\s*기존 5축 권역 병존\s*<", ">{lang === 'kr' ? '기존 5축 권역 병존' : 'Coexistence of Existing 5-Axis'}<")
        ],
        "Section64.jsx": [
            (r"2040년 평당 34만 원을 돌파할<br/>\s*신규 트로피 자산\(IOTA·GBC\)의 프라이싱", "{lang === 'kr' ? <>2040년 평당 34만 원을 돌파할<br/>신규 트로피 자산(IOTA·GBC)의 프라이싱</> : <>Pricing of New Trophy Assets (IOTA·GBC)<br/>Surpassing 340K KRW/py in 2040</>}")
        ],
        "Section65.jsx": [
            (r"평당 50만 원 시대, 글로벌 1선 도시의<br/>\s*핵심부와 어깨를 나란히 하다", "{lang === 'kr' ? <>평당 50만 원 시대, 글로벌 1선 도시의<br/>핵심부와 어깨를 나란히 하다</> : <>Era of 500K KRW/py,<br/>Standing shoulder to shoulder with Global Tier 1 Core</>}"),
            (r">환산 시 USD 200/sqft 돌파<", ">{lang === 'kr' ? '환산 시 USD 200/sqft 돌파' : 'Exceeding USD 200/sqft upon conversion'}<"),
            (r"도쿄<br/>\s*마루노우치", "{lang === 'kr' ? <>도쿄<br/>마루노우치</> : <>Tokyo<br/>Marunouchi</>}"),
            (r"글로벌 1선 도시 코어 오피스와의<br/>\s*임대료 디커플링\(Decoupling\) 완전 해소", "{lang === 'kr' ? <>글로벌 1선 도시 코어 오피스와의<br/>임대료 디커플링(Decoupling) 완전 해소</> : <>Complete Resolution of Rent Decoupling<br/>with Global Tier 1 Core Offices</>}")
        ],
        "Section66.jsx": [
            (r"Bear 국면에서도 프리미엄을 사수할<br/>\s*신규 랜드마크의 탁월한 자산 방어력", "{lang === 'kr' ? <>Bear 국면에서도 프리미엄을 사수할<br/>신규 랜드마크의 탁월한 자산 방어력</> : <>Excellent Asset Defense of New Landmarks<br/>Safeguarding Premium even in Bear Phase</>}"),
            (r">2030년 정점 이후 인구·기업 통폐합 쇼크 \(Bear Scenario\)<", ">{lang === 'kr' ? '2030년 정점 이후 인구·기업 통폐합 쇼크 (Bear Scenario)' : 'Pop/Corporate Consolidation Shock Post-2030 Peak (Bear Scenario)'}<"),
            (r">거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지<", ">{lang === 'kr' ? '거시 하방 충격에도 GBD·삼성동 코어 수요 집중으로 견고한 가격 유지' : 'Solid Pricing Maintained via Core Demand in GBD/Samsung-dong despite Macro Shock'}<")
        ],
        "Section67.jsx": [
            (r"노후 자산의 도태 속에서 오직 프라임 등급만이<br/>\s*향유할 4% 이내 완전 임차", "{lang === 'kr' ? <>노후 자산의 도태 속에서 오직 프라임 등급만이<br/>향유할 4% 이내 완전 임차</> : <>Only Prime Grades Enjoying Sub-4% Full Tenancy<br/>Amid Phasing Out of Aging Assets</>}")
        ],
        "Section69.jsx": [
            (r"전력인입 제약으로 지방 분산가속,<br/>\s*단일 부동산 카테고리로 향후 15년간 가장 큰 자본 흡수 예상", "{lang === 'kr' ? <>전력인입 제약으로 지방 분산가속,<br/>단일 부동산 카테고리로 향후 15년간 가장 큰 자본 흡수 예상</> : <>Acceleration of Provincial Dispersal due to Power Constraints,<br/>Expected to Absorb Most Capital over Next 15 Years as a Single Asset Class</>}")
        ],
        "Section70.jsx": [
            (r"300조 원 거대 시장을 장악할<br/>\s*한국형 시니어 REIT 모델의 탄생", "{lang === 'kr' ? <>300조 원 거대 시장을 장악할<br/>한국형 시니어 REIT 모델의 탄생</> : <>Birth of Korean-style Senior REIT Model<br/>to Dominate the 300 Trillion KRW Market</>}")
        ],
        "Section71.jsx": [
            (r"생명과학 클러스터와 콜드체인 제약 물류가<br/>\s*결합하는 신규 거점의 안착", "{lang === 'kr' ? <>생명과학 클러스터와 콜드체인 제약 물류가<br/>결합하는 신규 거점의 안착</> : <>Establishment of New Hubs Combining<br/>Life Science Clusters & Cold-chain Pharma Logistics</>}"),
            (r"K-바이오 클러스터 특화 부동산이<br/>\s*독립적인 우량 신규 카테고리로 안착", "{lang === 'kr' ? <>K-바이오 클러스터 특화 부동산이<br/>독립적인 우량 신규 카테고리로 안착</> : <>K-Bio Cluster Specialized Real Estate<br/>Established as an Independent Blue-chip Category</>}"),
            (r"의약품 수요 증가와 맞물려<br/>\s*특수 온도 제어 물류 수요의 지속적 성장", "{lang === 'kr' ? <>의약품 수요 증가와 맞물려<br/>특수 온도 제어 물류 수요의 지속적 성장</> : <>Continuous Growth of Temp-controlled Logistics<br/>Coupled with Increasing Pharma Demand</>}")
        ],
        "Section72.jsx": [
            (r"모든 신규 대형 물류센터의 절대적 설계 표준<br/>\s*로봇·AMR 친화형", "{lang === 'kr' ? <>모든 신규 대형 물류센터의 절대적 설계 표준<br/>로봇·AMR 친화형</> : <>Absolute Design Standard for All New Mega Logistics Centers:<br/>Robot/AMR Friendly</>}")
        ]
    }

    for f, rep_list in replacements.items():
        path = os.path.join(base_dir, f)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            for regex, replacement in rep_list:
                # check to prevent double replace
                if "? <>" not in regex and "? '" not in regex:
                    content = re.sub(regex, replacement, content)
            with open(path, "w", encoding="utf-8") as file:
                file.write(content)

if __name__ == "__main__":
    patch_final()
