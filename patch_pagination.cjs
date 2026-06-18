const fs = require('fs');
const file = 'src/components/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '{/* Global Pagination & Navigation Controls */}';
const startIdx = content.indexOf(startStr);

const krIdx = content.indexOf('Keyboard Right');
const div1 = content.indexOf('</div>', krIdx);
const div2 = content.indexOf('</div>', div1 + 1);
const div3 = content.indexOf('</div>', div2 + 1);
const endIdx = div3 + 6; // Include the </div>

if (startIdx === -1 || div3 === -1) {
    console.error("Could not find bounds");
    process.exit(1);
}

const newContent = `{/* Global Pagination & Navigation Controls */}
    <div className={\`fixed bottom-[18px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[10px] z-[9999] mix-blend-difference transition-all duration-300 ease-in-out \${isNavOpen ? 'lg:ml-[120px]' : 'ml-0'}\`}>
        
        {/* Page Number Indicator (Centered Above Dots, Dropped 15px) */}
        <div className="flex items-center justify-center text-white font-sans text-[12px] md:text-[13px] opacity-80 translate-y-[15px]">
            <span className="font-medium">{currentSlide + 1}</span>
            <span className="mx-[6px] font-extralight opacity-50">/</span>
            <span className="font-medium">{slides.length}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-center">
            
            {/* Dots Pagination Track (Sliding Animation) */}
            {(() => {
                const total = slides.length;
                const maxDots = 15;
                let shift = currentSlide - 7;
                if (shift < 0) shift = 0;
                if (shift > total - maxDots) shift = Math.max(0, total - maxDots);

                return (
                    <>
                        <style>
                            {\`
                                .dots-track {
                                    transform: translateX(calc(-\${shift} * 26px));
                                }
                                @media (min-width: 768px) {
                                    .dots-track {
                                        transform: translateX(calc(-\${shift} * 30px));
                                    }
                                }
                            \`}
                        </style>
                        {/* 15칸 짜리 창문 */}
                        <div className="overflow-hidden w-[382px] md:w-[438px] py-2">
                            {/* 전체 점들이 담긴 실제 트랙 (좌우로 쓱 이동함) */}
                            <div className="flex items-center gap-2 md:gap-3 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] dots-track">
                                {slides.map((_, idx) => {
                                    const isDotActive = currentSlide === idx;
                                    const dist = Math.abs(currentSlide - idx);
                                    // 중앙(활성) 점이 가장 크고 좌우로 멀어질수록 작아짐
                                    const dotScale = Math.max(0.3, 1 - dist * 0.1); 
                                    
                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentSlide(idx)}
                                            className="relative flex-shrink-0 flex items-center justify-center w-[18px] h-[18px] cursor-pointer group"
                                            style={{ transform: \`scale(\${dotScale})\`, transition: 'transform 0.5s ease' }}
                                        >
                                            {/* Inner Fixed Dot (항상 흰색) */}
                                            <div className="w-[8px] h-[8px] rounded-full bg-white transition-all duration-300 group-hover:bg-gray-300"></div>
                                            
                                            {/* Outer Ring for Active State */}
                                            <div className={\`absolute inset-0 border-[1.5px] border-white rounded-full transition-all duration-500 ease-out \${isDotActive ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}\`}></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                );
            })()}
        </div>
    </div>`;

content = content.substring(0, startIdx) + newContent + content.substring(endIdx);
fs.writeFileSync(file, content, 'utf8');
console.log("Success");
