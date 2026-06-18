const fs = require('fs');
const file = 'src/components/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update animation speed of the last page (142p)
// Original ends with: 2678, 2678, 2678, 2678];
// Change the very last 2678 to 600
content = content.replace(/2678\];(\s*)$/m, '600];$1');

// 2. Replace dots wrapper to have hover and bigger click area, keeping original shift logic valid
const oldDotsTrack = `<div className="flex items-center gap-2 md:gap-3 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] dots-track">
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
                            </div>`;

const newDotsTrack = `<div className="flex items-center gap-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] dots-track">
                                {slides.map((_, idx) => {
                                    const isDotActive = currentSlide === idx;
                                    const dist = Math.abs(currentSlide - idx);
                                    // 중앙(활성) 점이 가장 크고 좌우로 멀어질수록 작아짐
                                    const dotScale = Math.max(0.3, 1 - dist * 0.1); 
                                    
                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentSlide(idx)}
                                            // 마우스 클릭영역 확대 (26px / 30px) 및 호버시 연한 흰색 배경
                                            className="relative flex-shrink-0 flex items-center justify-center w-[26px] h-[26px] md:w-[30px] md:h-[30px] cursor-pointer group rounded-full hover:bg-white/10 transition-colors duration-300"
                                        >
                                            <div style={{ transform: \`scale(\${dotScale})\`, transition: 'transform 0.5s ease' }} className="relative flex items-center justify-center w-[18px] h-[18px] pointer-events-none">
                                                {/* Inner Fixed Dot (항상 흰색) */}
                                                <div className="w-[8px] h-[8px] rounded-full bg-white transition-all duration-300 group-hover:bg-gray-300"></div>
                                                
                                                {/* Outer Ring for Active State */}
                                                <div className={\`absolute inset-0 border-[1.5px] border-white rounded-full transition-all duration-500 ease-out \${isDotActive ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}\`}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>`;

content = content.replace(oldDotsTrack, newDotsTrack);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
