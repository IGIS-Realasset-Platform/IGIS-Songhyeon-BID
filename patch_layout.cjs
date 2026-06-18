const fs = require('fs');
const file = 'src/components/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject imports
if (!content.includes('menuDataEn')) {
    content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect, useMemo } from 'react';\nimport { menuDataEn, menuDataKr } from '../data/NavigationData';\nimport { useLanguage } from '../context/LanguageContext';"
    );
}

// 2. Inject flatTitles hook inside MainLayout
if (!content.includes('const flatTitles')) {
    const hookInjectionStr = `export default function MainLayout({ isNavOpen, setIsNavOpen, onNavigate }) {
    const { lang } = useLanguage();
    const flatTitles = useMemo(() => {
        const data = lang === 'en' ? menuDataEn : menuDataKr;
        const titles = [];
        data.forEach(part => {
            if (part.chapters) {
                part.chapters.forEach(chap => {
                    if (chap.items) {
                        chap.items.forEach(item => titles.push(item.label));
                    }
                });
            } else if (part.items) {
                part.items.forEach(item => titles.push(item.label));
            }
        });
        return titles;
    }, [lang]);
`;
    content = content.replace("export default function MainLayout({ isNavOpen, setIsNavOpen, onNavigate }) {", hookInjectionStr);
}

// 3. Replace Pagination Controls
const startStr = '{/* Global Pagination & Navigation Controls */}';
const startIdx = content.indexOf(startStr);
const endIdx = content.lastIndexOf('</>');

const newContent = `</div> {/* <-- Restored the closing div for the slide wrapper that was swallowed earlier */}
    {/* Global Pagination & Navigation Controls */}
    <div className={\`fixed bottom-[18px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[10px] z-[9999] mix-blend-difference transition-all duration-300 ease-in-out \${isNavOpen ? 'lg:ml-[120px]' : 'ml-0'} w-[100vw] md:w-auto scale-[0.65] md:scale-100 origin-bottom\`}>
        
        {/* Page Number Indicator (Centered Above Dots, Dropped 15px) */}
        <div className="flex items-center justify-center text-white font-sans text-[16px] md:text-[13px] opacity-80 translate-y-[15px]">
            <span className="font-medium">{currentSlide + 1}</span>
            <span className="mx-[6px] font-extralight opacity-50">/</span>
            <span className="font-medium">{slides.length}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-center gap-4 w-full px-4 md:px-0">
            
            {/* Dots Pagination Track (Sliding Animation) */}
            {(() => {
                const total = slides.length;
                const maxDots = 21; // 21 dots as requested
                let shift = currentSlide - 10; // Center is 10
                if (shift < 0) shift = 0;
                if (shift > total - maxDots) shift = Math.max(0, total - maxDots);

                const leftEndIndex = shift;
                const rightEndIndex = Math.min(total - 1, shift + maxDots - 1);

                return (
                    <>
                        <style>
                            {\`
                                .dots-track {
                                    transform: translateX(calc(-\${shift} * 26px));
                                }
                                @media (min-width: 768px) {
                                    .dots-track {
                                        transform: translateX(calc(-\${shift} * 28px));
                                    }
                                }
                            \`}
                        </style>

                        {/* Left End Info */}
                        <div className="flex items-center text-white/60 text-[14px] md:text-[12px] font-light mr-2 cursor-pointer hover:text-white transition-colors" onClick={() => setCurrentSlide(leftEndIndex)}>
                            <span className="w-[20px] text-right font-medium mr-[6px]">{leftEndIndex + 1}</span>
                            <span className="truncate max-w-[120px] md:max-w-[140px] tracking-tight">{flatTitles[leftEndIndex] || ''}</span>
                        </div>

                        {/* 21칸 짜리 창문 (21 * 26 = 546px / 21 * 28 = 588px) */}
                        <div className="overflow-hidden w-[546px] md:w-[588px] py-4">
                            {/* 전체 점들이 담긴 실제 트랙 (좌우로 쓱 이동함) */}
                            <div className="flex items-center gap-[6px] md:gap-[8px] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] dots-track">
                                {slides.map((_, idx) => {
                                    const isDotActive = currentSlide === idx;
                                    const dist = Math.abs(currentSlide - idx);
                                    // 중앙(활성) 점이 가장 크고 좌우로 멀어질수록 작아짐
                                    const dotScale = Math.max(0.2, 1 - dist * 0.08); 
                                    
                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentSlide(idx)}
                                            // 마우스 클릭 영역 확대: w-[20px] h-[20px] 기본크기에 여백(p)을 주어 실 클릭영역은 더 큼
                                            className="relative flex-shrink-0 flex items-center justify-center w-[20px] h-[20px] cursor-pointer group"
                                            style={{ transform: \`scale(\${dotScale})\`, transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1)' }}
                                        >
                                            {/* Inner Fixed Dot (항상 흰색) */}
                                            <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full bg-white transition-all duration-300 group-hover:bg-gray-300"></div>
                                            
                                            {/* Outer Ring for Active State */}
                                            <div className={\`absolute inset-[-4px] border-[1.5px] border-white rounded-full transition-all duration-500 ease-out \${isDotActive ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}\`}></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right End Info */}
                        <div className="flex items-center text-white/60 text-[14px] md:text-[12px] font-light ml-2 text-right cursor-pointer hover:text-white transition-colors" onClick={() => setCurrentSlide(rightEndIndex)}>
                            <span className="truncate max-w-[120px] md:max-w-[140px] tracking-tight">{flatTitles[rightEndIndex] || ''}</span>
                            <span className="w-[20px] text-left font-medium ml-[6px]">{rightEndIndex + 1}</span>
                        </div>
                    </>
                );
            })()}
        </div>
    </div>
`;

content = content.substring(0, startIdx) + newContent + content.substring(endIdx);
fs.writeFileSync(file, content, 'utf8');
console.log("Success");
