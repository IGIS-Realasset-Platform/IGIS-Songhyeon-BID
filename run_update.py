import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Grab original section 5
s5_pattern = r'(<!-- SECTION 5 \(SYBD(?: - SCROLL DRIVEN)?\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)(.*?)(</section>)'
match = re.search(s5_pattern, html, re.DOTALL)
if match:
    old_s5 = match.group(2)
    
    # 2. Extract step 1 items
    s1_start = old_s5.find('<div\n                        class="w-full lg:w-[50%] h-full')
    chart_start = old_s5.find('<!-- Chart Comparison -->')
    chat_end_div = old_s5.find('</div>', old_s5.find('Yongsan Station</div>')) + 7
    chart_html = old_s5[chart_start:chat_end_div]
    
    # 3. New step 2 html
    step2_html = """
                                <div class="font-bold text-[20px] md:text-[22px] text-gray-800 mb-2 font-inter tracking-tight" data-kr="Unrivaled Accessibility" data-en="Unrivaled Accessibility">
                                    Unrivaled Accessibility</div>
                                <h2 class="text-[40px] md:text-[50px] lg:text-[60px] font-extrabold leading-tight mb-2 text-black tracking-[-0.02em] font-inter mt-4">
                                    Korea's Central Station<br>and Mega Transport Hub
                                </h2>
                                <div class="mb-4 mt-6">
                                    <h3 class="text-[18px] md:text-[22px] font-bold text-[#3B7062] tracking-[-0.02em] leading-snug"
                                        data-kr="국가중앙역 + 광역교통 중심지의 독보적 접근성 제공<br><span class='text-black font-semibold text-[16px] md:text-[18px]'>The Nation's Ultimate Transit Hub - Unmatched, Unrivaled</span>"
                                        data-en="The Nation's Ultimate Transit Hub - Unmatched, Unrivaled<br><span class='text-black font-semibold text-[16px] md:text-[18px]'>국가중앙역 + 광역교통 중심지의 독보적 접근성 제공</span>">
                                        국가중앙역 + 광역교통 중심지의 독보적 접근성 제공<br>
                                        <span class="text-black font-semibold text-[16px] md:text-[18px]">The Nation's Ultimate Transit Hub - Unmatched, Unrivaled</span>
                                    </h3>
                                </div>
                                <div class="text-[14px] md:text-[15px] font-medium text-black leading-relaxed tracking-[-0.02em] space-y-4 mb-8">
                                    <p class="kr-target-text transition-all duration-300"
                                        data-kr="서울역은 총 11개 노선을 보유한 명실상부한 교통의 중심지로 인근에 위치한 용산역과 함께 우수한 광역 교통 인프라를 형성합니다.<br>또한, GTX-A/B, 신분당선 개발로 수도권 동남부 권역(강남-분당-판교 인근)으로부터 30분 내 접근이 가능하며<br>인천공항, 김포공항 까지 직접 연결되어 글로벌 혁신기업을 위한 최적의 입지 조건을 갖추고 있습니다."
                                        data-en="Seoul Station is Korea's foremost transportation hub, directly connected to 11 transit lines, including KTX, airport rail, and multiple metro routes. Together with nearby Yongsan Station, it forms an exceptional multimodal infrastructure at the center of the capital. With the addition of GTX-A/B and the Shinbundang Line, the site offers 30-minute access to key southeastern districts such as Gangnam, Bundang, and Pangyo. It also enables direct connections to both Incheon and Gimpo International Airports, making it an ideal location for global innovation-driven enterprises.">
                                        서울역은 총 11개 노선을 보유한 명실상부한 교통의 중심지로 인근에 위치한 용산역과 함께 우수한 광역 교통 인프라를 형성합니다.<br>
                                        또한, GTX-A/B, 신분당선 개발로 수도권 동남부 권역(강남-분당-판교 인근)으로부터 30분 내 접근이 가능하며<br>
                                        인천공항, 김포공항 까지 직접 연결되어 글로벌 혁신기업을 위한 최적의 입지 조건을 갖추고 있습니다.
                                    </p>
                                </div>
                                <div class="w-full flex flex-col gap-2 mt-2">
                                    <img src="img/airport.png" alt="Airports" class="w-full h-auto object-contain">
                                    <div class="w-full flex gap-4">
                                        <div class="w-1/2 text-[12px] md:text-[14px] text-black font-medium tracking-tight">approx. 43 minutes.</div>
                                        <div class="w-1/2 text-[12px] md:text-[14px] text-black font-medium tracking-tight">approx. 22 minutes.</div>
                                    </div>
                                </div>
    """

    new_s5 = rf"""
            <!-- Container with 200vh on Desktop for scroll effect, natural height on mobile -->
            <div class="w-full relative min-h-[100vh] lg:h-[200vh] lg:overflow-visible overflow-hidden" id="sybd-scroll-area">
                
                <div class="w-full lg:sticky lg:top-0 lg:left-0 lg:h-[100vh] overflow-hidden flex flex-col lg:block">

                    <div class="w-full flex relative lg:absolute lg:top-0 lg:left-0 z-10 lg:h-full lg:pointer-events-none order-1 lg:order-none">
                        <!-- CSS Grid overlapped text panels to prevent absolute positioning from ruining mobile height -->
                        <div class="grid w-full lg:w-[50%] bg-transparent pointer-events-auto items-center relative lg:h-[100vh]">
                            
                            <!-- STEP 1 -->
                            <div id="sybd-step-1" class="col-start-1 row-start-1 h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] pt-[100px] lg:pt-0 pb-10 lg:pb-0 transition-opacity duration-700 ease-in-out">
                                <div class="font-bold text-[20px] md:text-[22px] text-gray-800 mb-2 font-inter tracking-tight">
                                    New Economy Cluster</div>
                                <h2 class="text-[40px] md:text-[60px] lg:text-[84px] font-extrabold leading-none mb-10 text-black tracking-[-0.02em] font-inter">
                                    SYBD <span class="text-[11px] md:text-[13px] font-normal text-gray-500 align-middle tracking-normal">*Seoul Yongsan Business District</span>
                                </h2>
                                <div class="mb-4">
                                    <h3 class="text-[18px] md:text-[22px] font-bold text-[#3B7062] tracking-[-0.02em]"
                                        data-kr="글로벌 인재, 혁신 기업을 위한 새로운 업무 지구로의 부상"
                                        data-en="Becoming the New Business District for Global Talent and Innovative Companies">
                                        글로벌 인재, 혁신 기업을 위한 새로운 업무 지구로의 부상
                                    </h3>
                                    <div class="text-[14px] md:text-[16px] text-black mt-[10px] font-inter font-bold tracking-tight">
                                        Seoul's Next Global Business Hub</div>
                                </div>
                                <div class="text-[13px] md:text-[15px] text-black leading-relaxed tracking-[-0.02em] space-y-4 mb-10 font-normal kr-target-text">
                                    <p class="kr-target-text transition-all duration-300"
                                        data-kr="서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다."
                                        data-en="Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is becoming the most desired retail and office locations within the city. Just as Hudson Yards extends from Grand Central Terminal in New York to form a world-class business cluster, SYBD is poised to become Seoul's next-generation global business hub, seamlessly integrating transit, commerce, and innovation.">
                                        서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다.
                                    </p>
                                </div>

                                {chart_html}
                            </div>

                            <!-- STEP 2 -->
                            <div id="sybd-step-2" class="col-start-1 row-start-1 h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] pt-[100px] lg:pt-0 pb-10 lg:pb-0 opacity-0 pointer-events-none transition-opacity duration-700 ease-in-out">
{step2_html}
                            </div>

                        </div>
                    </div>

                    <!-- Background Images Layer -->
                    <div class="w-full h-auto lg:h-[100vh] lg:absolute lg:top-0 lg:right-0 lg:w-[70%] z-0 relative order-2 lg:order-none overflow-hidden">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3" class="relative lg:absolute top-0 left-0 w-full lg:h-full lg:object-cover opacity-100 pointer-events-none" style="object-position: right center;">
                        <img src="img/sybd4.jpg" alt="SYBD Map 4" id="sybd-img-4" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none transition-opacity duration-700 ease-in-out" style="object-position: center center;">
                    </div>

                </div>

                <!-- Desktop / Scroll triggers -->
                <div id="sybd-desktop-trigger" class="hidden lg:block absolute top-[100vh] w-full h-[10vh] pointer-events-none"></div>
                <div id="sybd-mobile-trigger" class="lg:hidden block absolute bottom-[20vh] w-full h-[10vh] pointer-events-none"></div>
            </div>
"""
    html = html[:match.start(2)] + new_s5 + html[match.end(2):]

# 4. JavaScript Logic Replacement
js_pattern_start = r'// SYBD Auto Animation'
js_pattern_end = r'window\.switchLanguage = function \(lang\)'
match_js = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match_js:
    new_js = """// SYBD Scroll Dissolve Animation
            const trigD = document.getElementById('sybd-desktop-trigger');
            const trigM = document.getElementById('sybd-mobile-trigger');
            const s1 = document.getElementById('sybd-step-1');
            const s2 = document.getElementById('sybd-step-2');
            const sImg4 = document.getElementById('sybd-img-4');

            const applyDissolve = (showStep2) => {
                if(showStep2) {
                    if(s1) { s1.style.opacity = '0'; s1.style.pointerEvents = 'none'; }
                    if(s2) { s2.style.opacity = '1'; s2.style.pointerEvents = 'auto'; }
                    if(sImg4) { sImg4.style.opacity = '1'; }
                } else {
                    if(s1) { s1.style.opacity = '1'; s1.style.pointerEvents = 'auto'; }
                    if(s2) { s2.style.opacity = '0'; s2.style.pointerEvents = 'none'; }
                    if(sImg4) { sImg4.style.opacity = '0'; }
                }
            };

            const obsOpts = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
            const sybdObserver = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    applyDissolve(e.isIntersecting);
                });
            }, obsOpts);

            if(trigD && window.innerWidth >= 1024) sybdObserver.observe(trigD);
            if(trigM && window.innerWidth < 1024) sybdObserver.observe(trigM);
            
            """
    html = html[:match_js.start(1)] + new_js + html[match_js.start(2):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
