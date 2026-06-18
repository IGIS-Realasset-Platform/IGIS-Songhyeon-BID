import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <div class="w-full md:w-[35%] flex flex-col justify-center
html = html.replace('class="w-full md:w-[35%] flex flex-col justify-center items-center mt-12 md:mt-0 ml-auto font-inter">', 'class="w-full md:w-[30%] flex flex-col justify-center items-center mt-12 md:mt-0 ml-auto font-inter">')

# Revert Section 5
s5_pattern = r'(<!-- SECTION 5 \(SYBD(?: - SCROLL DRIVEN)?\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)(.*?)(</section>)'
original_s5 = """
            <div class="w-full relative h-[100vh] lg:h-[100vh] overflow-hidden flex flex-col lg:block"
                id="sybd-auto-container">
                <!-- Foreground Layer: Text Content over Maps (Top on Mobile/iPad) -->
                <div
                    class="w-full flex relative lg:absolute lg:top-0 lg:left-0 z-10 lg:h-full lg:pointer-events-none order-1 lg:order-none">
                    <div
                        class="w-full lg:w-[50%] h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-transparent pointer-events-auto pt-[100px] lg:pt-0 pb-10 lg:pb-0">
                        <div class="font-bold text-[20px] md:text-[22px] text-gray-800 mb-2 font-inter tracking-tight">
                            New Economy Cluster</div>
                        <h2
                            class="text-[40px] md:text-[60px] lg:text-[84px] font-extrabold leading-none mb-10 text-black tracking-[-0.02em] font-inter">
                            SYBD <span
                                class="text-[11px] md:text-[13px] font-normal text-gray-500 align-middle tracking-normal">*Seoul
                                Yongsan Business District</span>
                        </h2>

                        <div class="mb-4">
                            <h3 class="text-[18px] md:text-[22px] font-bold text-[#3B7062] tracking-[-0.02em]"
                                data-kr="글로벌 인재, 혁신 기업을 위한 새로운 업무 지구로의 부상"
                                data-en="Becoming the New Business District for Global Talent and Innovative Companies">
                                글로벌 인재, 혁신 기업을 위한 새로운 업무 지구로의 부상
                            </h3>
                            <div
                                class="text-[14px] md:text-[16px] text-black mt-[10px] font-inter font-bold tracking-tight">
                                Seoul's Next Global Business Hub</div>
                        </div>

                        <div
                            class="text-[13px] md:text-[15px] text-black leading-relaxed tracking-[-0.02em] space-y-4 mb-10 font-normal kr-target-text">
                            <p class="kr-target-text transition-all duration-300" data-kr="서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다."
                                data-en="Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is becoming the most desired retail and office locations within the city. Just as Hudson Yards extends from Grand Central Terminal in New York to form a world-class business cluster, SYBD is poised to become Seoul's next-generation global business hub, seamlessly integrating transit, commerce, and innovation.">
                                서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로
                                도약할 것입니다.
                            </p>
                            <p class="en-only-text font-inter opacity-90 transition-all duration-300" data-kr=""
                                data-en="Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is becoming the most desired retail and office locations within the city. Just as Hudson Yards extends from Grand Central Terminal in New York to form a world-class business cluster, SYBD is poised to become Seoul's next-generation global business hub, seamlessly integrating transit, commerce, and innovation."
                                style="display:none;">
                                Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is
                                becoming the most desired retail and office locations within the city. Just as Hudson
                                Yards extends from Grand Central Terminal in New York to form a world-class business
                                cluster, SYBD is poised to become Seoul's next-generation global business hub,
                                seamlessly integrating transit, commerce, and innovation.
                            </p>
                        </div>

                        <!-- Chart Comparison -->
                        <div
                            class="w-full h-[280px] md:h-[340px] flex font-inter text-[11px] md:text-[12px] font-medium text-black tracking-tight justify-between items-stretch relative mt-4 mb-[70px] lg:mb-0">
                            <!-- Manhattan -->
                            <div class="w-[48%] flex flex-col items-center h-full">
                                <div class="mb-3 text-[14px] md:text-[16px]">Manhattan</div>
                                <div class="bg-[#2B3531] text-white px-2 py-2 w-full text-center tracking-normal">Grand
                                    Central Station</div>
                                <div class="w-px bg-black relative flex-[2] min-h-[40px] my-1">
                                    <div
                                        class="absolute -top-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-black animate-arrow-top">
                                    </div>
                                    <div
                                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 whitespace-nowrap text-center leading-[1.2] isolate before:absolute before:inset-0 before:bg-white before:opacity-80 before:-z-10 rounded">
                                        3km<br><span class="font-normal text-[10px]">(10,000 feet)</span>
                                    </div>
                                </div>
                                <div class="bg-[#3A4A41] text-white px-2 py-2 w-full text-center tracking-normal">Penn
                                    Station</div>
                                <div class="w-px bg-black relative flex-[1] min-h-[20px] my-1">
                                    <div
                                        class="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-black animate-arrow-bottom">
                                    </div>
                                </div>
                                <div
                                    class="bg-[#2B3531] text-white px-2 py-2 w-full text-center tracking-normal mt-auto shrink-0">
                                    Hudson Yards Station</div>
                            </div>

                            <!-- Seoul -->
                            <div class="w-[48%] flex flex-col items-center h-full">
                                <div class="mb-3 text-[14px] md:text-[16px]">Seoul</div>
                                <div class="bg-[#2B3531] text-white px-2 py-2 w-full text-center tracking-normal">Seoul
                                    Station</div>
                                <div class="w-px bg-black relative flex-[3] min-h-[80px] my-1">
                                    <div
                                        class="absolute -top-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-black animate-arrow-top">
                                    </div>
                                    <div
                                        class="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-black animate-arrow-bottom">
                                    </div>
                                    <div
                                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 whitespace-nowrap text-center leading-[1.2] isolate before:absolute before:inset-0 before:bg-white before:opacity-80 before:-z-10 rounded">
                                        2.7km<br><span class="font-normal text-[10px]">(9,000 feet)</span>
                                    </div>
                                </div>
                                <div
                                    class="bg-[#2B3531] text-white px-2 py-2 w-full text-center tracking-normal mt-auto shrink-0">
                                    Yongsan Station</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Background Overlap Layer / Bottom Image Layer for Mobile (Order 2) -->
                <div
                    class="w-full h-auto lg:h-[100vh] lg:absolute lg:top-0 lg:right-0 lg:w-[70%] z-0 relative order-2 lg:order-none overflow-hidden">
                    <!-- Base relative image to dictate full natural height when not absolute -->
                    <img src="img/sybd1.jpg" alt="SYBD Map 1"
                        class="absolute top-0 left-0 w-full h-full lg:object-cover object-cover opacity-100 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out"
                        id="sybd-img-1" style="object-position: right center;">
                    <img src="img/sybd2.jpg" alt="SYBD Map 2"
                        class="absolute top-0 left-0 w-full h-full lg:object-cover object-cover opacity-0 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out"
                        id="sybd-img-2" style="object-position: right center;">
                    <img src="img/sybd3.jpg" alt="SYBD Map 3"
                        class="absolute top-0 left-0 w-full h-full lg:object-cover object-cover opacity-0 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out"
                        id="sybd-img-3" style="object-position: right center;">
                </div>

            </div>
"""
import re
match = re.search(s5_pattern, html, re.DOTALL)
if match:
    html = html[:match.start()] + '<!-- SECTION 5 (SYBD) -->\n        <section class="w-full bg-white text-black relative" id="section5">\n' + original_s5 + '\n        </section>' + html[match.end():]

# Revert Script
script_pattern = r'(// Removed SYBD scroll sync logic, using IntersectionObserver instead\s*\}, \{ passive: true \}\);\s*)(.*?)(window\.switchLanguage = function \(lang\) \{)'
original_script = """            // SYBD Auto Animation
            const sybdAutoContainer = document.getElementById('sybd-auto-container');
            let sybdInterval;
            let currentSybdImage = 1;

            if (sybdAutoContainer && sybdImg1 && sybdImg2 && sybdImg3) {
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.3
                };

                const switchSybdImage = () => {
                    currentSybdImage = (currentSybdImage % 3) + 1;

                    sybdImg1.style.opacity = currentSybdImage === 1 ? '1' : '0';
                    sybdImg2.style.opacity = currentSybdImage === 2 ? '1' : '0';
                    sybdImg3.style.opacity = currentSybdImage === 3 ? '1' : '0';

                    const nextDelay = currentSybdImage === 3 ? 6000 : 2500;
                    sybdInterval = setTimeout(switchSybdImage, nextDelay);
                };

                const sybdObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (!sybdInterval) {
                                sybdInterval = setTimeout(switchSybdImage, 2500);
                            }
                        } else {
                            if (sybdInterval) {
                                clearTimeout(sybdInterval);
                                sybdInterval = null;
                            }
                        }
                    });
                }, observerOptions);

                sybdObserver.observe(sybdAutoContainer);
            }

            """
# Put back sybd elements definition:
sybd_defs = """            const sybdContainer = document.getElementById('sybd-scroll-container');
            const sybdImg1 = document.getElementById('sybd-img-1');
            const sybdImg2 = document.getElementById('sybd-img-2');
            const sybdImg3 = document.getElementById('sybd-img-3');

            scrollContainer.addEventListener("scroll", function () {"""
            
html = html.replace('scrollContainer.addEventListener("scroll", function () {', sybd_defs)

match_script = re.search(script_pattern, html, re.DOTALL)
if match_script:
    html = html[:match_script.start(2)] + original_script + html[match_script.start(3):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
