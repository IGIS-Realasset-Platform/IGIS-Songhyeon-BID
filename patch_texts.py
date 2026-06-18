import os
import re

files_to_patch = {
    "Section49.jsx": {
        "theme": "AI 반도체 / 메모리",
        "title": "모든 시나리오에서 메모리는 한국 경제의 최대 변수"
    },
    "Section50.jsx": {
        "theme": "AI 데이터센터"
    },
    "Section51.jsx": {
        "theme": "로봇 / 휴머노이드"
    },
    "Section52.jsx": {
        "theme": "바이오 융합 / 장수의학 / 세포·유전자치료"
    },
    "Section53.jsx": {
        "theme": "방산·우주"
    },
    "Section54.jsx": {
        "theme": "K-콘텐츠"
    },
    "Section55.jsx": {
        "theme": "양자 / 수소 / 우주"
    },
    "Section56.jsx": {
        "theme": "시니어 케어 경제"
    }
}

base_path = "src/components"

for filename, patches in files_to_patch.items():
    filepath = os.path.join(base_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Patch Theme
    theme_pattern = r'(<span className="inline-block text-\[22px\] md:text-\[26px\] font-bold text-\[\#888\] uppercase tracking-\[-0\.02em\] mb-\[12px\] bg-transparent">\s*).*?(\s*</span>)'
    content = re.sub(theme_pattern, r'\g<1>' + patches['theme'] + r'\g<2>', content, flags=re.DOTALL)
    
    # Patch Title (only for Section49)
    if 'title' in patches:
        title_pattern = r"(dangerouslySetInnerHTML={{ __html: ').*?(' }})"
        content = re.sub(title_pattern, r"\g<1>" + patches['title'] + r"\g<2>", content)

    # Patch Section 56 specific text
    if filename == "Section56.jsx":
        old_bullet = '<li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>이지스 등 국내 대형사 및 글로벌 자본(Warburg Pincus 등)의 본격적인 시장 진출 개시</span></li>'
        new_bullet = '<li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>이지스 KB골든라이프케어 협력 실버타운 출시(국내 운용사 최초 펀드 통한 실버타운 공급)</span></li>\n                        <li className="flex items-start"><span className="mr-3 text-[#1d1d1f]">▪</span><span>Warburg Pincus·Invesco 한국 시니어 시장 진입(2026 발표)이 시작점</span></li>'
        content = content.replace(old_bullet, new_bullet)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully patched themes, titles, and bullets.")
