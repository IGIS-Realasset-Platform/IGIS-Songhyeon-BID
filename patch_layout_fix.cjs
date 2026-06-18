const fs = require('fs');
const file = 'src/components/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the flatTitles logic
const oldHook = `    const flatTitles = useMemo(() => {
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
    }, [lang]);`;

const newHook = `    const flatTitles = useMemo(() => {
        const data = lang === 'en' ? menuDataEn : menuDataKr;
        const titles = new Array(142).fill('');
        
        data.forEach(part => {
            if (part.id && part.id.startsWith('page-')) {
                const idx = parseInt(part.id.replace('page-', '')) - 1;
                if (idx >= 0) titles[idx] = part.title;
            }
            if (part.chapters) {
                part.chapters.forEach(chap => {
                    if (chap.id && chap.id.startsWith('page-')) {
                        const idx = parseInt(chap.id.replace('page-', '')) - 1;
                        if (idx >= 0) titles[idx] = chap.title;
                    }
                    if (chap.items) {
                        chap.items.forEach(item => {
                            if (item.id && item.id.startsWith('page-')) {
                                const idx = parseInt(item.id.replace('page-', '')) - 1;
                                if (idx >= 0) titles[idx] = item.label;
                            }
                        });
                    }
                });
            } else if (part.items) {
                part.items.forEach(item => {
                    if (item.id && item.id.startsWith('page-')) {
                        const idx = parseInt(item.id.replace('page-', '')) - 1;
                        if (idx >= 0) titles[idx] = item.label;
                    }
                });
            }
        });
        
        let currentTitle = '';
        for (let i = 0; i < titles.length; i++) {
            if (titles[i] !== '') {
                currentTitle = titles[i];
            } else {
                titles[i] = currentTitle;
            }
        }
        if (!titles[0]) titles[0] = "Cover";
        if (!titles[1]) titles[1] = "Executive Summary";
        return titles;
    }, [lang]);`;

content = content.replace(oldHook, newHook);

// 2. Fix the dot rendering logic for click area
const oldDotsRender = `                                    return (
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
                                    );`;

const newDotsRender = `                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentSlide(idx)}
                                            className="relative flex-shrink-0 flex items-center justify-center w-[24px] h-[24px] cursor-pointer group"
                                        >
                                            <div style={{ transform: \`scale(\${dotScale})\`, transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1)' }} className="relative flex items-center justify-center w-full h-full pointer-events-none">
                                                {/* Inner Fixed Dot (항상 흰색) */}
                                                <div className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-white transition-all duration-300 group-hover:bg-gray-300"></div>
                                                
                                                {/* Outer Ring for Active State */}
                                                <div className={\`absolute inset-[2px] border-[1.5px] border-white rounded-full transition-all duration-500 ease-out \${isDotActive ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}\`}></div>
                                            </div>
                                        </div>
                                    );`;

content = content.replace(oldDotsRender, newDotsRender);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
