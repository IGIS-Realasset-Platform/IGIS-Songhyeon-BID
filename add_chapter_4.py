import re
import os

def main():
    # 1. Create the Section27_NewContent.jsx file
    content_code = """import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section27_NewContent({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(20);

    useEffect(() => {
        if (!isActive) {
            setStep(20);
            return;
        }
        const t1 = setTimeout(() => setStep(1), 200);
        const t2 = setTimeout(() => setStep(2), 500);
        const t3 = setTimeout(() => setStep(3), 800);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#fdfdfd] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                
                {/* 소제목 */}
                <div>
                    <span className="inline-block text-[20px] md:text-[24px] font-bold text-[#1e3a8a] mb-[12px]">
                        {lang === 'kr' ? '뉴욕시 BID 생태계 현황' : 'NYC BID Ecosystem Overview'}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-[32px] md:text-[46px] lg:text-[52px] font-extrabold leading-[1.3] text-[#1d1d1f] break-keep mb-4">
                    {lang === 'kr' 
                        ? '72개 자조형 BID의 거대 생태계와 주요 지구 운영 지표' 
                        : 'Giant Ecosystem of 72 Self-Taxing BIDs and Key Metrics'}
                </h2>

                {/* 중앙 콘텐츠: 좌측 종합 현황판 / 우측 주요 BID 비교 */}
                <div className="w-full max-w-[1200px] mt-[20px] mb-[24px] flex flex-col lg:flex-row gap-6 justify-center items-stretch">
                    
                    {/* 좌측: 종합 현황판 */}
                    <div className="w-full lg:w-[40%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                        <div>
                            <span className="inline-block bg-[#0f172a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                {lang === 'kr' ? '뉴욕시 전체 BID 스펙' : 'NYC BID Global Specs'}
                            </span>
                            
                            <div className="space-y-4">
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="text-[13px] text-gray-500 font-bold block">TOTAL SCALE</span>
                                    <span className="text-[28px] font-black text-gray-900">72 ~ 78 개 지구</span>
                                    <span className="text-[13px] text-gray-600 block mt-1">5개 자치구 전역, 320마일 이상의 상업 가로 밀착 커버</span>
                                </div>
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="text-[13px] text-gray-500 font-bold block">ANNUAL BUDGET</span>
                                    <span className="text-[28px] font-black text-[#1e3a8a]">2억 1,600만 달러+</span>
                                    <span className="text-[13px] text-gray-600 block mt-1">부동산 소유자 자발적 추가 과세를 통한 독자 재원 확보</span>
                                </div>
                                <div>
                                    <span className="text-[13px] text-gray-500 font-bold block">PUBLIC VALUE SUPPLEMENTS</span>
                                    <span className="text-[15px] font-bold text-gray-800 block mt-1">🧹 연 400만 개 쓰레기봉투 수거</span>
                                    <span className="text-[15px] font-bold text-gray-800 block mt-0.5">🎨 연 448,000건 낙서 제거</span>
                                    <span className="text-[15px] font-bold text-gray-800 block mt-0.5">🎪 연 4,000건 이상의 지역 축제 개최</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 주요 맨해튼 BID 비교 테이블 */}
                    <div className="w-full lg:w-[60%] border-4 border-[#0f172a] bg-white p-6 text-left flex flex-col justify-between shadow-sm">
                        <div className="overflow-x-auto">
                            <span className="inline-block bg-[#1e3a8a] text-white text-[13px] font-black px-3 py-1 uppercase mb-4">
                                {lang === 'kr' ? '맨해튼 주요 5대 BID 비교 (지출/성과)' : 'Top 5 Manhattan BIDs Comparison'}
                            </span>
                            
                            <table className="w-full text-[14px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-900 bg-gray-50">
                                        <th className="py-2 px-3 font-bold text-gray-900">{lang === 'kr' ? '지구명' : 'District'}</th>
                                        <th className="py-2 px-3 font-bold text-[#1e3a8a] text-right">{lang === 'kr' ? '연 지출 규모' : 'Annual Exp'}</th>
                                        <th className="py-2 px-3 font-bold text-gray-900">{lang === 'kr' ? '운영 모델 & 성과 특징' : 'Key Characteristic & Impact'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-2.5 px-3 font-black text-gray-900">Times Square</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-red-600">~ $2,707만</td>
                                        <td className="py-2.5 px-3 text-gray-600">위생·공공안전 및 타임스스퀘어 신년 카운트다운 글로벌 브랜딩</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 font-black text-gray-900">Bryant Park</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">~ $2,965만</td>
                                        <td className="py-2.5 px-3 text-gray-600">겨울장터, 라이선스, 자체 카페 등 비즈니스 자립형 수익 극대화 모델</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 font-black text-gray-900">Downtown Alliance</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">~ $2,263만</td>
                                        <td className="py-2.5 px-3 text-gray-600">예산 60%를 위생·치안 투입 (24시간 순찰), 주거 인구 5배 견인</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 font-black text-gray-900">34th Street</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">~ $1,541만</td>
                                        <td className="py-2.5 px-3 text-gray-600">미드타운 상업 핵심축 관리, 브라이언트 파크와 통합 경영(Biederman)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 font-black text-gray-900">Grand Central</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-gray-900">~ $1,307만</td>
                                        <td className="py-2.5 px-3 text-gray-600">미국 최초로 채권을 발행하여 가로경관 개선 및 인프라 선투자 집행</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* 하단 설명글 */}
                <div className="mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center">
                    <ul className="text-left inline-block space-y-2 mx-auto">
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr' 
                                ? '뉴욕시 소기업청(SBS)이 이사회에 대리인을 파견하여 운영을 감시하고 Trends Report를 발간하여 공공성과 민간 주도 투명성을 조율' 
                                : 'NYC Department of Small Business Services (SBS) delegates board representatives to oversee compliance and issue annual trend reports'}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-[#1e3a8a]">▪</span>
                            <span>{lang === 'kr'
                                ? '연간 2,700만 달러 이상의 초대형 BID부터 6만 달러 규모의 소형 자조 조직까지 300배 이상 격차 속에서 맞춤형 구역 관리 제공'
                                : 'Varying from giant BIDs spending over $27M to small BIDs at $60K, serving customized neighborhood management'}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
"""
    with open('/Users/jkjeon2025/Documents/GitHub/IOTA_Strategy_Project_New/src/components/Section27_NewContent.jsx', 'w', encoding='utf-8') as f:
        f.write(content_code)
    print("Created Section27_NewContent.jsx successfully.")

    # 2. Modify MainLayout.jsx
    layout_file = '/Users/jkjeon2025/Documents/GitHub/IOTA_Strategy_Project_New/src/components/MainLayout.jsx'
    with open(layout_file, 'r', encoding='utf-8') as f:
        layout_code = f.read()

    # Import insertion
    import_pat = r"import Section27 from './Section27';"
    new_import = "import Section27 from './Section27';\nimport Section27_NewContent from './Section27_NewContent';"
    layout_code = layout_code.replace(import_pat, new_import)

    # slidesLength update
    layout_code = layout_code.replace("const slidesLength = 72;", "const slidesLength = 74;")

    # Array insertion after <Section27 />
    # Index 35 is Section27, we want to insert ChapterCover chapterNum="4" and Section27_NewContent right after Section27.
    array_pat = r"<Section27 />,\s*//\s*Page\s*36"
    new_array_item = '<Section27 />, // Page 36\n        <ChapterCover chapterNum="4" title={<>뉴욕 현황<br />72개 BID의 생태계</>} />, // Page 37\n        <Section27_NewContent />, // Page 38'
    layout_code = re.sub(array_pat, new_array_item, layout_code)

    # Fix all page comments in the array dynamically (from index 36 onwards in array comments, shift them by +2)
    lines = layout_code.split('\n')
    in_array = False
    new_lines = []
    for line in lines:
        if 'const slides = React.useMemo(() => [' in line:
            in_array = True
        elif '], []);' in line:
            in_array = False
        
        if in_array:
            # Match comments like // Page X
            m = re.search(r'//\s*Page\s*(\d+)', line)
            if m:
                p_num = int(m.group(1))
                if p_num > 36:
                    new_p_num = p_num + 2
                    line = line.replace(f'// Page {p_num}', f'// Page {new_p_num}')
                    line = line.replace(f'// Page{p_num}', f'// Page {new_p_num}')
        new_lines.append(line)
    layout_code = '\n'.join(new_lines)

    with open(layout_file, 'w', encoding='utf-8') as f:
        f.write(layout_code)
    print("Modified MainLayout.jsx successfully.")

    # 3. Modify NavigationData.js
    nav_file = '/Users/jkjeon2025/Documents/GitHub/IOTA_Strategy_Project_New/src/data/NavigationData.js'
    with open(nav_file, 'r', encoding='utf-8') as f:
        nav_code = f.read()

    # Shift all page-X IDs in NavigationData.js by +2 if X > 36
    # Let's write a regex that matches "page-(\d+)" and shifts it if > 36
    def shift_id(match):
        p_num = int(match.group(1))
        if p_num > 36:
            return f"page-{p_num + 2}"
        return f"page-{p_num}"

    nav_code = re.sub(r'page-(\d+)', shift_id, nav_code)

    # Let's insert the Chapter 4 items into menuDataEn and menuDataKr
    # Inside Part 2 (Part 2 has 3 chapters currently: Chapter 1, Chapter 2, Chapter 3)
    # We want to add Chapter 4 at the end of Part 2's chapters array.
    # In menuDataEn, Chapter 3 is Kessler, Rochester, 4 Major Structural Criticisms.
    # In menuDataKr, Chapter 3 is Kessler 판결, 로체스터시 설립 무산, 민주주의 결핍 등 구조적 비판 4선.
    
    # Let's locate the Chapter 3 block in menuDataEn and add Chapter 4 after it.
    ch3_en_pattern = r"""\{\s*title:\s*"Chapter 3\.\s*Legal Status\s*&\s*Criticisms",\s*id:\s*"page-33",\s*items:\s*\[\s*\{\s*label:\s*"Kessler Case:\s*Exception of One-Person-One-Vote",\s*id:\s*"page-34"\s*\},\s*\{\s*label:\s*"Rochester Failure \(2024\)",\s*id:\s*"page-35"\s*\},\s*\{\s*label:\s*"4 Major Structural Criticisms",\s*id:\s*"page-36"\s*\}\s*\]\s*\}"""
    ch4_en_block = """{
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
    nav_code = re.sub(ch3_en_pattern, ch4_en_block, nav_code)

    # Let's do the same for menuDataKr
    ch3_kr_pattern = r"""\{\s*title:\s*"Chapter 3\.\s*법적 판례와 실패/비판론",\s*id:\s*"page-33",\s*items:\s*\[\s*\{\s*label:\s*"Kessler 판결:\s*1인 1표 원칙 예외",\s*id:\s*"page-34"\s*\},\s*\{\s*label:\s*"로체스터시\(2024\) 설립 무산 실패기",\s*id:\s*"page-35"\s*\},\s*\{\s*label:\s*"민주주의 결핍 등 구조적 비판 4선",\s*id:\s*"page-36"\s*\}\s*\]\s*\}"""
    ch4_kr_block = """{
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
    nav_code = re.sub(ch3_kr_pattern, ch4_kr_block, nav_code)

    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(nav_code)
    print("Modified NavigationData.js successfully.")

if __name__ == '__main__':
    main()
