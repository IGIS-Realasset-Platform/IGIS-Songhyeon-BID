import os
import re

def patch_nav():
    path = "src/data/NavigationData.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    parts = content.split("export const menuDataKr = [")
    if len(parts) == 2:
        en_part = parts[0]
        # Replace titles and labels in en_part
        replacements = {
            '"Part 1. 역사적 분석"': '"Part 1. Historical Analysis"',
            '"Chapter 1. 거시 좌표의 이동"': '"Chapter 1. Shift in Macro Coordinates"',
            '"Chapter 6. 트로피 자산의 계보"': '"Chapter 6. Lineage of Trophy Assets"',
            '"Part 2. 미래 시나리오"': '"Part 2. Future Scenarios"',
            '"Chapter 1. 3개 시나리오 프레임"': '"Chapter 1. 3 Scenario Frameworks"',
            '"Chapter 2. 핵심 산업 모멘텀 시나리오별 전망"': '"Chapter 2. Industry Momentum by Scenario"',
            '"AI 반도체 / HBM"': '"AI Semi / HBM"',
            '"AI 데이터센터"': '"AI Data Center"',
            '"로봇 / 휴머노이드"': '"Robotics / Humanoids"',
            '"바이오 / 장수의학"': '"Bio / Longevity"',
            '"방산·우주"': '"Defense & Space"',
            '"K-콘텐츠"': '"K-Content"',
            '"양자 / 수소 / 우주"': '"Quantum / Hydrogen / Space"',
            '"시니어 케어 경제"': '"Senior Care Economy"',
            '"Chapter 3. 인구·구조적 변수"': '"Chapter 3. Demographic & Structural Variables"',
            '"인구 다이어트"': '"Demographic Diet"',
            '"생산 인구 증발"': '"Evaporation of Work-age Pop"',
            '"자본의 대이동"': '"Great Capital Shift"',
            '"거시 연착륙 전략"': '"Macro Soft-landing"',
            '"Chapter 4. 서울 오피스 시장 2030~2040 전망"': '"Chapter 4. Seoul Office 2030~2040"',
            '"7축 메가 권역 팽창"': '"7-Axis Mega District"',
            '"Base 시나리오 전망"': '"Base Scenario Outlook"',
            '"Bull 시나리오 전망"': '"Bull Scenario Outlook"',
            '"Bear 시나리오 방어력"': '"Bear Scenario Defense"',
            '"Flight-to-Quality"': '"Flight-to-Quality"',
            '"Chapter 5. 산업/물류 부동산 2030~2040"': '"Chapter 5. Industrial/Logistics 2030~2040"',
            '"데이터센터 분산화"': '"Data Center Decentralization"',
            '"시니어 하우징 빅뱅"': '"Senior Housing Big Bang"',
            '"생명과학/콜드체인"': '"Life Science / Cold Chain"',
            '"로봇 친화 창고"': '"Robot-Friendly Warehouse"',
            '"Part 3. 전략 포지셔닝"': '"Part 3. Strategic Positioning"',
            '"Part 4. IOTA 실행전략"': '"Part 4. IOTA Execution Strategy"'
        }
        for k, v in replacements.items():
            en_part = en_part.replace(k, v)
        
        with open(path, "w", encoding="utf-8") as f:
            f.write(en_part + "export const menuDataKr = [" + parts[1])


def patch_components():
    base_dir = "src/components"
    
    # Interstitial pages (which had <br/> and newlines)
    interstitials = {
        "Section48.jsx": (r">\s*핵심 산업 모멘텀<br/>\s*시나리오별 전망\s*<", ">{lang === 'kr' ? <>핵심 산업 모멘텀<br/>시나리오별 전망</> : <>Core Industry Momentum<br/>by Scenario</>}<"),
        "Section57.jsx": (r">\s*인구·구조적 변수\s*<", ">{lang === 'kr' ? '인구·구조적 변수' : 'Demographic & Structural Variables'}<"),
        "Section62.jsx": (r">\s*서울 오피스 시장 2030~2040 전망\s*<", ">{lang === 'kr' ? '서울 오피스 시장 2030~2040 전망' : 'Seoul Office Market 2030~2040 Outlook'}<"),
        "Section68.jsx": (r">\s*산업/물류 부동산 2030~2040\s*<", ">{lang === 'kr' ? '산업/물류 부동산 2030~2040' : 'Industrial / Logistics Real Estate 2030~2040'}<")
    }
    
    for f, (regex, rep) in interstitials.items():
        path = os.path.join(base_dir, f)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            content = re.sub(regex, rep, content)
            with open(path, "w", encoding="utf-8") as file:
                file.write(content)
                
    # Theme titles in normal pages (padded with newlines)
    themes = {
        "Section49.jsx": ("AI 반도체 / 메모리", "AI Semi / Memory"),
        "Section50.jsx": ("AI 데이터센터", "AI Data Centers"),
        "Section51.jsx": ("로봇 / 휴머노이드", "Robotics / Humanoids"),
        "Section52.jsx": ("바이오 융합 / 장수의학 / 세포·유전자치료", "Bio Convergence / Longevity / Cell & Gene Therapy"),
        "Section53.jsx": ("방산·우주", "Defense & Space"),
        "Section54.jsx": ("K-콘텐츠", "K-Content"),
        "Section55.jsx": ("양자 / 수소 / 우주", "Quantum / Hydrogen / Space"),
        "Section56.jsx": ("시니어 케어 경제", "Senior Care Economy"),
        "Section58.jsx": ("혹독한 인구 다이어트의 시작", "Beginning of a Harsh Demographic Diet"),
        "Section59.jsx": ("생산 인구 35% 증발의 충격파", "Shockwave of 35% Working-Age Pop Evaporation"),
        "Section60.jsx": ("인구 역설이 창출할 자본의 대이동", "Great Capital Shift via Demographic Paradox"),
        "Section61.jsx": ("이민자 수용 및 AI로 방어하는 펀더멘털", "Fundamentals Defended by Immigration & AI"),
        "Section63.jsx": ("7축 메가 권역으로의 팽창", "Expansion to a 7-Axis Mega District"),
        "Section64.jsx": ("Base 시나리오 임대료 전망", "Base Scenario Rent Outlook"),
        "Section65.jsx": ("Bull 시나리오의 도쿄 마루노우치 수렴", "Convergence with Tokyo Marunouchi in Bull Scenario"),
        "Section66.jsx": ("극단적 양극화를 방어하는 트로피 자산", "Trophy Assets Defending Extreme Polarization"),
        "Section67.jsx": ("공실률 전망", "Vacancy Outlook"),
        "Section69.jsx": ("데이터센터 수요 폭발과 분산화", "Data Center Demand Explosion & Decentralization"),
        "Section70.jsx": ("시니어 하우징 메가 트렌드", "Senior Housing Mega Trend"),
        "Section71.jsx": ("생명과학 및 콜드체인 물류 생태계", "Life Sciences & Cold-chain Pharma Ecosystem"),
        "Section72.jsx": ("Grade-A 물류센터의 패러다임 전환", "Paradigm Shift in Grade-A Logistics")
    }

    for f, (kr, en) in themes.items():
        path = os.path.join(base_dir, f)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            if f"{{lang === 'kr' ? '{kr}'" not in content:
                content = re.sub(
                    r">\s*" + re.escape(kr) + r"\s*<",
                    f">{{lang === 'kr' ? '{kr}' : '{en}'}}<",
                    content
                )
            with open(path, "w", encoding="utf-8") as file:
                file.write(content)

if __name__ == "__main__":
    patch_nav()
    patch_components()
    print("Missed titles/subtitles and navigation data patched successfully.")
