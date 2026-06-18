const fs = require('fs');

const s42 = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section42({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 900);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-[#1d1d1f] flex flex-col items-center justify-center relative px-6 md:px-16 overflow-hidden">
            <style>{\`
                .gradient-text-ch6 {
                    background: linear-gradient(90deg, #c1e2dd, #587d94);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            \`}</style>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
                <div className={\`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] \${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    <span className="inline-block text-[22px] md:text-[26px] font-normal text-white mb-[14px]" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>
                        Chapter 1.
                    </span>
                </div>
                <h2 className={\`text-[34px] md:text-[54px] lg:text-[66px] font-bold leading-[calc(1.3em-6px)] break-keep transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    <span className="gradient-text-ch6">
                        Base · Bull · Bear<br/>3개 시나리오 프레임
                    </span>
                </h2>
            </div>
        </section>
    );
}`;

const s43 = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section43({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    const variables = [
        { title: "인구", sub: "Population" },
        { title: "생산성", sub: "Productivity" },
        { title: "지정학", sub: "Geopolitics" },
        { title: "기술 패권", sub: "Tech Hegemony" }
    ];

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden relative">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className={\`text-center transition-all duration-[1000ms] ease-out \${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}>
                    <h3 className="text-[#0055ff] font-bold text-[14px] md:text-[16px] mb-4 uppercase tracking-widest">
                        Core Variables
                    </h3>
                    <h2 className="text-[28px] md:text-[44px] lg:text-[52px] font-bold text-black leading-[1.4] break-keep mb-16 tracking-[-0.02em]">
                        2조에서 3조 달러로 가는 경로는 단순 직선 외삽이 아닙니다.<br/>
                        <span className="text-gray-400">4대 변수가 미래의 시나리오를 결정짓습니다.</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {variables.map((item, idx) => (
                        <div key={idx} className={\`bg-gray-50 rounded-[24px] p-6 md:p-8 border border-gray-100 flex flex-col items-center text-center transition-all duration-[1000ms] ease-out \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`} style={{ transitionDelay: \`\${idx * 150}ms\` }}>
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mb-6 text-[18px]">
                                {idx + 1}
                            </div>
                            <h4 className="text-[20px] md:text-[24px] font-bold text-black mb-1">{item.title}</h4>
                            <p className="text-gray-400 text-[13px] md:text-[15px] font-medium uppercase tracking-wider">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}`;

const s44 = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section44({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden relative">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                <div className={\`flex-1 transition-all duration-[1000ms] ease-out \${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}\`}>
                    <div className="inline-block px-5 py-2 rounded-full bg-gray-100 text-gray-800 font-bold text-[14px] md:text-[16px] mb-6 tracking-wide">
                        확률 50%
                    </div>
                    <h2 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-black leading-[1.1] mb-6 tracking-[-0.02em]">
                        Base Scenario
                    </h2>
                    <p className="text-[18px] md:text-[22px] text-gray-500 font-medium break-keep leading-relaxed tracking-[-0.01em]">
                        IMF·OECD·KDI 공통 컨센서스에 수렴하는 표준 성장 궤도. AI 생산성 효과가 인구 감소 효과를 일부 상쇄합니다.
                    </p>
                </div>
                <div className={\`flex-1 w-full bg-gray-50 rounded-[32px] p-8 md:p-12 border border-gray-200 transition-all duration-[1000ms] ease-out \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}\`}>
                    <div className="space-y-8">
                        <div>
                            <p className="text-gray-400 text-[14px] md:text-[15px] font-bold mb-2">2030년 예상 GDP</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-black tracking-tight">2.2 ~ 2.4조 달러</p>
                        </div>
                        <div className="w-full h-px bg-gray-200"></div>
                        <div>
                            <p className="text-gray-400 text-[14px] md:text-[15px] font-bold mb-2">3조 달러 도달 시점</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-black tracking-tight">2037 ~ 2038년</p>
                        </div>
                        <div className="w-full h-px bg-gray-200"></div>
                        <div>
                            <p className="text-gray-400 text-[14px] md:text-[15px] font-bold mb-4">핵심 전제 (Assumptions)</p>
                            <ul className="text-gray-700 space-y-3 text-[15px] md:text-[17px] break-keep leading-relaxed font-medium">
                                <li className="flex gap-3"><span className="text-gray-300">•</span> 실질성장률 연 1.5~2.0%, 인플레 2~3%</li>
                                <li className="flex gap-3"><span className="text-gray-300">•</span> 환율 KRW/USD 1,200~1,300 박스권</li>
                                <li className="flex gap-3"><span className="text-gray-300">•</span> AI 생산성 향상(0.3~0.5%p 상향) 반영</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}`;

const s45 = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section45({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden relative">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                <div className={\`flex-1 transition-all duration-[1000ms] ease-out \${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}\`}>
                    <div className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-[14px] md:text-[16px] mb-6 tracking-wide">
                        확률 30%
                    </div>
                    <h2 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-black leading-[1.1] mb-6 tracking-[-0.02em]">
                        Bull Scenario
                    </h2>
                    <p className="text-[18px] md:text-[22px] text-gray-500 font-medium break-keep leading-relaxed tracking-[-0.01em]">
                        한국이 "동아시아 스위스" 모델(고급 제조 + 콘텐츠 + 금융)로 재포지셔닝되며, 글로벌 슈퍼사이클이 동시 도래합니다.
                    </p>
                </div>
                <div className={\`flex-1 w-full bg-[#f8fbff] rounded-[32px] p-8 md:p-12 border border-blue-100 transition-all duration-[1000ms] ease-out \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}\`}>
                    <div className="space-y-8">
                        <div>
                            <p className="text-blue-400 text-[14px] md:text-[15px] font-bold mb-2">2030년 예상 GDP</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-[#0055ff] tracking-tight">2.5 ~ 2.7조 달러</p>
                        </div>
                        <div className="w-full h-px bg-blue-100"></div>
                        <div>
                            <p className="text-blue-400 text-[14px] md:text-[15px] font-bold mb-2">3조 달러 도달 시점</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-[#0055ff] tracking-tight">2034 ~ 2035년</p>
                        </div>
                        <div className="w-full h-px bg-blue-100"></div>
                        <div>
                            <p className="text-blue-400 text-[14px] md:text-[15px] font-bold mb-4">핵심 전제 (Assumptions)</p>
                            <ul className="text-gray-700 space-y-3 text-[15px] md:text-[17px] break-keep leading-relaxed font-medium">
                                <li className="flex gap-3"><span className="text-blue-300">•</span> HBM/AI 인프라 패권 유지 및 대규모 외인 자본 유입</li>
                                <li className="flex gap-3"><span className="text-blue-300">•</span> 환율 KRW/USD 1,000~1,150 (강세)</li>
                                <li className="flex gap-3"><span className="text-blue-300">•</span> K-콘텐츠, K-방산, K-원전, K-조선 슈퍼사이클 동시 도래</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}`;

const s46 = `import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Section46({ isActive }) {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!isActive) { setStep(0); return; }
        const t1 = setTimeout(() => setStep(1), 300);
        const t2 = setTimeout(() => setStep(2), 700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [isActive]);

    return (
        <section className="section w-full h-full bg-white flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden relative">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                <div className={\`flex-1 transition-all duration-[1000ms] ease-out \${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}\`}>
                    <div className="inline-block px-5 py-2 rounded-full bg-red-100 text-red-700 font-bold text-[14px] md:text-[16px] mb-6 tracking-wide">
                        확률 20%
                    </div>
                    <h2 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-black leading-[1.1] mb-6 tracking-[-0.02em]">
                        Bear Scenario
                    </h2>
                    <p className="text-[18px] md:text-[22px] text-gray-500 font-medium break-keep leading-relaxed tracking-[-0.01em]">
                        지정학적 갈등과 구조적 모순이 겹치며, 일본식 "잃어버린 10년" 시나리오로 진입합니다.
                    </p>
                </div>
                <div className={\`flex-1 w-full bg-[#fff8f8] rounded-[32px] p-8 md:p-12 border border-red-100 transition-all duration-[1000ms] ease-out \${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}\`}>
                    <div className="space-y-8">
                        <div>
                            <p className="text-red-400 text-[14px] md:text-[15px] font-bold mb-2">2030년 예상 GDP</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-[#e11d48] tracking-tight">2.0 ~ 2.1조 달러</p>
                        </div>
                        <div className="w-full h-px bg-red-100"></div>
                        <div>
                            <p className="text-red-400 text-[14px] md:text-[15px] font-bold mb-2">3조 달러 도달 시점</p>
                            <p className="text-[28px] md:text-[36px] font-bold text-[#e11d48] tracking-tight">2042년 이후 (또는 미달)</p>
                        </div>
                        <div className="w-full h-px bg-red-100"></div>
                        <div>
                            <p className="text-red-400 text-[14px] md:text-[15px] font-bold mb-4">핵심 전제 (Assumptions)</p>
                            <ul className="text-gray-700 space-y-3 text-[15px] md:text-[17px] break-keep leading-relaxed font-medium">
                                <li className="flex gap-3"><span className="text-red-300">•</span> 인구 절벽 (2024년 인구 정점 후 가파른 감소)</li>
                                <li className="flex gap-3"><span className="text-red-300">•</span> 미중 디커플링 와중에 한국 위치 모호 및 중국 반도체 자급 가속</li>
                                <li className="flex gap-3"><span className="text-red-300">•</span> 가계부채 부담 누적 및 부동산 PF 부실 재발</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}`;

fs.writeFileSync('src/components/Section42.jsx', s42);
fs.writeFileSync('src/components/Section43.jsx', s43);
fs.writeFileSync('src/components/Section44.jsx', s44);
fs.writeFileSync('src/components/Section45.jsx', s45);
fs.writeFileSync('src/components/Section46.jsx', s46);

// Patch MainLayout.jsx
let layout = fs.readFileSync('src/components/MainLayout.jsx', 'utf8');

if (!layout.includes('import Section42 from')) {
    layout = layout.replace(
        "import Section41 from './Section41';",
        "import Section41 from './Section41';\nimport Section42 from './Section42';\nimport Section43 from './Section43';\nimport Section44 from './Section44';\nimport Section45 from './Section45';\nimport Section46 from './Section46';"
    );
}

// 42 to 47 because we added 5 slides. Original length was 42. So 42 + 5 = 47.
layout = layout.replace(/const slidesLength = \d+;/, "const slidesLength = 47;");

const slidesRegex = /const slides = \[(.*?)\];/;
const slidesMatch = layout.match(slidesRegex);
if (slidesMatch && !slidesMatch[1].includes('Section46')) {
    let newSlides = slidesMatch[1] + ", <Section42 />, <Section43 />, <Section44 />, <Section45 />, <Section46 />";
    layout = layout.replace(slidesRegex, \`const slides = [\${newSlides}];\`);
}

const timesRegex = /const slideAnimationTimes = \[(.*?)\];/;
const timesMatch = layout.match(timesRegex);
if (timesMatch && timesMatch[1].split(',').length < 47) {
    let newTimes = timesMatch[1] + ", 3000, 3000, 3000, 3000, 3000";
    layout = layout.replace(timesRegex, \`const slideAnimationTimes = [\${newTimes}];\`);
}

fs.writeFileSync('src/components/MainLayout.jsx', layout);

// Patch NavigationData.js
let nav = fs.readFileSync('src/data/NavigationData.js', 'utf8');

// We need to add the new items under "Part 2. 미래 시나리오"
// In the current NavigationData, it looks like:
// { title: "Part 2. 미래 시나리오", id: "page-42", chapters: [] }
// Wait, Section42 is page-43.
// The user says "그 다음페이지 Chapter 1."
// So page-42 is "Part 2. 미래 시나리오" cover (Section41).
// page-43 is Chapter 1 cover (Section42).
// page-44 to page-47 are the new slides.

const newChapterStr = \`chapters: [
            {
                title: "Chapter 1. 3개 시나리오 프레임",
                id: "page-43",
                items: [
                    { label: "Core Variables", id: "page-44" },
                    { label: "Base Scenario", id: "page-45" },
                    { label: "Bull Scenario", id: "page-46" },
                    { label: "Bear Scenario", id: "page-47" }
                ]
            }
        ]\`;

nav = nav.replace(
    /title:\s*"Part 2\. 미래 시나리오",\s*id:\s*"page-42",\s*chapters:\s*\[\]/g,
    \`title: "Part 2. 미래 시나리오", \n        id: "page-42", \n        \${newChapterStr}\`
);

fs.writeFileSync('src/data/NavigationData.js', nav);
console.log('Patch complete.');
