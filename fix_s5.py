import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update 30% to 35% on section 2
html = html.replace('class="w-full md:w-[30%] flex flex-col justify-center items-center', 
                    'class="w-full md:w-[35%] flex flex-col justify-center items-center')

# Extract step 1 inner HTML safely
step1_pattern = r'(<div\s+class="w-full lg:w-\[50%\] h-full flex flex-col justify-center[^>]*>)(.*?)(</div>\s*</div>\s*<!-- Background Overlap Layer)'
match1 = re.search(step1_pattern, html, re.DOTALL)
if match1:
    step1_inner = match1.group(2)
    # Deduplicate EN-only text
    step1_inner = step1_inner.replace(
        '<p class="kr-target-text transition-all duration-300" data-kr="서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다."\n                                data-en="Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is becoming the most desired retail and office locations within the city. Just as Hudson Yards extends from Grand Central Terminal in New York to form a world-class business cluster, SYBD is poised to become Seoul\'s next-generation global business hub, seamlessly integrating transit, commerce, and innovation.">\n                                서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로\n                                도약할 것입니다.\n                            </p>',
        '<p class="kr-target-text transition-all duration-300"\n                                data-kr="서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다."\n                                data-en="Connecting Seoul Station and Yongsan Station, SYBD (Seoul Yongsan Business District) is becoming the most desired retail and office locations within the city. Just as Hudson Yards extends from Grand Central Terminal in New York to form a world-class business cluster, SYBD is poised to become Seoul\'s next-generation global business hub, seamlessly integrating transit, commerce, and innovation.">\n                                서울역과 용산역을 잇는 교통의 결절지인 SYBD는 뉴욕의 그랜드 센트럴에서 허드슨 야드를 아우르는 글로벌 업무지구와 같이 서울의 차기 글로벌 비즈니스 허브로 도약할 것입니다.\n                            </p>'
    )
    step1_inner = re.sub(r'<p class="en-only-text font-inter opacity-90 transition-all duration-300" data-kr="".*?</p>', '', step1_inner, flags=re.DOTALL)

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

    new_s5_full = f"""
            <div class="w-full relative h-[150vh] lg:h-[200vh]" id="sybd-scroll-area">
                
                <!-- STICKY CONTAINER -->
                <div class="w-full h-[100vh] sticky top-0 left-0 overflow-hidden bg-white">
                    
                    <!-- LEFT TEXT PANELS (Absolute stacked on top of each other) -->
                    <div class="absolute top-0 left-0 w-full h-full lg:w-[50%] z-20">
                    
                        <!-- STEP 1 -->
                        <div id="sybd-step-1" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-auto transition-opacity duration-700 ease-in-out">
{step1_inner}
                        </div>
                        
                        <!-- STEP 2 -->
                        <div id="sybd-step-2" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-none opacity-0 transition-opacity duration-700 ease-in-out">
{step2_html}
                        </div>
                        
                    </div>
                    
                    <!-- RIGHT BACKGROUND MAPS -->
                    <div class="absolute top-0 right-0 w-full lg:w-[70%] h-full z-10 hidden lg:block">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3" class="absolute top-0 left-0 w-full h-full object-cover" style="object-position: right center;">
                        <img src="img/sybd4.jpg" alt="SYBD Map 4" id="sybd-img-4" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out" style="object-position: center center;">
                    </div>
                    
                    <!-- MOBILE BACKGROUND (bottom area on mobile if needed, or we just let it be hidden on mobile if overlapping) -->
                    <div class="absolute bottom-0 left-0 w-full h-[30vh] md:h-[40vh] z-10 lg:hidden">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3 Mobile" class="absolute top-0 left-0 w-full h-full object-cover" style="object-position: center;">
                        <img src="img/sybd4.jpg" alt="SYBD Map 4 Mobile" id="sybd-img-4-mob" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out" style="object-position: center;">
                    </div>

                </div>
                
                <!-- SCROLL TRIGGER -->
                <div id="sybd-trigger" class="absolute top-[80vh] w-full h-[10px] pointer-events-none bg-transparent"></div>
            </div>
"""
    
    # Replace entire sybd-auto-container div
    s5_full_pattern = r'(<div\s+class="w-full relative h-\[100vh\] lg:h-\[100vh\] overflow-hidden flex flex-col lg:block"\s*id="sybd-auto-container">)(.*?)(<!-- Background Overlap Layer / Bottom Image Layer for Mobile \(Order 2\) -->\s*<div\s+class="w-full h-auto lg:h-\[100vh\] lg:absolute lg:top-0 lg:right-0 lg:w-\[70%\] z-0 relative order-2 lg:order-none overflow-hidden">.*?</div>\s*</div>)'
    
    html = re.sub(s5_full_pattern, new_s5_full.replace('\\', '\\\\'), html, flags=re.DOTALL)

    # 4. JavaScript Logic Replacement
    js_pattern_start = r'// SYBD Auto Animation'
    js_pattern_end = r'window\.switchLanguage\s*=\s*function'
    match_js = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

    if match_js:
        new_js = """// SYBD Scroll Dissolve Animation
            const trigger = document.getElementById('sybd-trigger');
            const step1 = document.getElementById('sybd-step-1');
            const step2 = document.getElementById('sybd-step-2');
            const map4 = document.getElementById('sybd-img-4');
            const map4Mob = document.getElementById('sybd-img-4-mob');

            const applyDissolve = (showStep2) => {
                if(showStep2) {
                    if(step1) { step1.style.opacity = '0'; step1.style.pointerEvents = 'none'; }
                    if(step2) { step2.style.opacity = '1'; step2.style.pointerEvents = 'auto'; }
                    if(map4) map4.style.opacity = '1';
                    if(map4Mob) map4Mob.style.opacity = '1';
                } else {
                    if(step1) { step1.style.opacity = '1'; step1.style.pointerEvents = 'auto'; }
                    if(step2) { step2.style.opacity = '0'; step2.style.pointerEvents = 'none'; }
                    if(map4) map4.style.opacity = '0';
                    if(map4Mob) map4Mob.style.opacity = '0';
                }
            };

            if (trigger) {
                const obsOpts = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
                const sybdObserver = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        applyDissolve(e.isIntersecting);
                    });
                }, obsOpts);
                sybdObserver.observe(trigger);
            }
            
            """
        html = html[:match_js.start(1)] + new_js + html[match_js.start(2):]

    # Clean old JS variables just below `scrollArrow`
    clean_defs = r"const sybdContainer = document\.getElementById\('sybd-scroll-container'\);\s*const sybdImg1 = document\.getElementById\('sybd-img-1'\);\s*const sybdImg2 = document\.getElementById\('sybd-img-2'\);\s*const sybdImg3 = document\.getElementById\('sybd-img-3'\);"
    html = re.sub(clean_defs, "", html)


    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Done")
else:
    print("Match 1 failed")

