import re

def main():
    # 1. Modify MainLayout.jsx
    layout_file = 'src/components/MainLayout.jsx'
    with open(layout_file, 'r', encoding='utf-8') as f:
        layout_code = f.read()

    # Import insertion
    import_pat = "import Section27 from './Section27';"
    new_import = "import Section27 from './Section27';\nimport Section27_NewContent from './Section27_NewContent';"
    layout_code = layout_code.replace(import_pat, new_import)

    # slidesLength update
    layout_code = layout_code.replace("const slidesLength = 72;", "const slidesLength = 74;")

    # We want to replace Section27 and Section28 lines with Chapter 4 insertion
    # Since Section27 has comment '// Page 32' in the reverted state:
    array_pat = r"<Section27 />,\s*//\s*Page\s*32\s*<Section28 />,\s*//\s*Page\s*33\s*\(Part\s*3\s*Cover\)"
    # Let's use a simpler match that replaces Section27 and Section28 block
    target_block = """        <Section27 />, // Page 32
        <Section28 />, // Page 33 (Part 3 Cover)"""
    
    replacement_block = """        <Section27 />, // Page 32
        <ChapterCover chapterNum="4" title={<>뉴욕 현황<br />72개 BID의 생태계</>} />, // Page 33
        <Section27_NewContent />, // Page 34
        <Section28 />, // Page 35 (Part 3 Cover)"""
    
    layout_code = layout_code.replace(target_block, replacement_block)

    # Shift subsequent comments in the array
    lines = layout_code.split('\n')
    in_array = False
    new_lines = []
    # We only want to shift comments after our replacement block
    # Let's count how many we have seen.
    replacement_seen = False
    for line in lines:
        if 'const slides = React.useMemo(() => [' in line:
            in_array = True
        elif '], []);' in line:
            in_array = False
        
        if 'Section27_NewContent' in line:
            replacement_seen = True
            
        if in_array and replacement_seen:
            # Shift comments of form: // Page X (if X is greater than 34)
            # The replacement block has:
            # ChapterCover -> Page 33
            # Section27_NewContent -> Page 34
            # Section28 -> Page 35
            # So anything with old Page 34 or larger must be shifted by +2!
            # Example: <ChapterCover chapterNum="1" ... />, // Page 34 -> Page 36
            m = re.search(r'//\s*Page\s*(\d+)', line)
            if m:
                p_num = int(m.group(1))
                if p_num >= 34 and 'Section27_NewContent' not in line and 'Section28' not in line:
                    new_p_num = p_num + 2
                    line = line.replace(f'// Page {p_num}', f'// Page {new_p_num}')
                    line = line.replace(f'// Page{p_num}', f'// Page {new_p_num}')
        new_lines.append(line)
    
    layout_code = '\n'.join(new_lines)

    with open(layout_file, 'w', encoding='utf-8') as f:
        f.write(layout_code)
    print("Modified MainLayout.jsx successfully.")

    # 2. Modify NavigationData.js
    nav_file = 'src/data/NavigationData.js'
    with open(nav_file, 'r', encoding='utf-8') as f:
        nav_code = f.read()

    # Shift all page-X IDs in NavigationData.js by +2 if X > 36
    def shift_id(match):
        p_num = int(match.group(1))
        if p_num > 36:
            return f"page-{p_num + 2}"
        return f"page-{p_num}"

    nav_code = re.sub(r'page-(\d+)', shift_id, nav_code)

    # Insert Chapter 4 into menuDataEn
    ch3_en_pattern = """            {
                title: "Chapter 3. Legal Status & Criticisms",
                id: "page-33",
                items: [
                    { label: "Kessler Case: Exception of One-Person-One-Vote", id: "page-34" },
                    { label: "Rochester Failure (2024)", id: "page-35" },
                    { label: "4 Major Structural Criticisms", id: "page-36" }
                ]
            }"""
    ch4_en_block = """            {
                title: "Chapter 3. Legal Status & Criticisms",
                id: "page-33",
                items: [
                    { label: "Kessler Case: Exception of One-Person-One-Vote", id: "page-34" },
                    { label: "Rochester Failure (2024)", id: "page-35" },
                    { label: "4 Major Structural Criticisms", id: "page-36" }
                ]
            },
            {
                title: "Chapter 4. NYC BID Ecosystem & Major Districts",
                id: "page-37",
                items: [
                    { label: "NYC 72 BIDs Ecosystem Status", id: "page-38" }
                ]
            }"""
    nav_code = nav_code.replace(ch3_en_pattern, ch4_en_block)

    # Insert Chapter 4 into menuDataKr
    ch3_kr_pattern = """            {
                title: "Chapter 3. 법적 판례와 실패/비판론",
                id: "page-33",
                items: [
                    { label: "Kessler 판결: 1인 1표 원칙 예외", id: "page-34" },
                    { label: "로체스터시(2024) 설립 무산 실패기", id: "page-35" },
                    { label: "민주주의 결핍 등 구조적 비판 4선", id: "page-36" }
                ]
            }"""
    ch4_kr_block = """            {
                title: "Chapter 3. 법적 판례와 실패/비판론",
                id: "page-33",
                items: [
                    { label: "Kessler 판결: 1인 1표 원칙 예외", id: "page-34" },
                    { label: "로체스터시(2024) 설립 무산 실패기", id: "page-35" },
                    { label: "민주주의 결핍 등 구조적 비판 4선", id: "page-36" }
                ]
            },
            {
                title: "Chapter 4. 뉴욕 현황 — 72개 BID의 생태계",
                id: "page-37",
                items: [
                    { label: "뉴욕시 72개 BID 생태계 현황", id: "page-38" }
                ]
            }"""
    nav_code = nav_code.replace(ch3_kr_pattern, ch4_kr_block)

    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(nav_code)
    print("Modified NavigationData.js successfully.")

if __name__ == '__main__':
    main()
