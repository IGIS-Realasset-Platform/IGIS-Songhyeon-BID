import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Grab original section 5
s5_pattern = r'(<!-- SECTION 5 \(SYBD\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)(.*?)(</section>)'
match = re.search(s5_pattern, html, re.DOTALL)

if match:
    old_s5 = match.group(2)
    
    # Check if we have step 1 text
    if 'New Economy Cluster' not in old_s5:
        print("Could not find step 1 text")
    else:
        # Extract step 1
        s1_start = old_s5.find('<div\n                        class="w-full lg:w-[50%] h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px]')
        s1_end = old_s5.find('</div>\n                    </div>\n                </div>') + 6
        step1_inner = old_s5[s1_start:s1_end]

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

        step1_extracted = step1_inner.replace('<div\n                        class="w-full lg:w-[50%] h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-transparent pointer-events-auto pt-[100px] lg:pt-0 pb-10 lg:pb-0">', '').replace('</div>\n                    </div>\n                </div>', '').strip()

        new_s5_full = f"""
            <div class="w-full relative min-h-[100vh]" id="sybd-scroll-area">
                
                <div class="w-full relative overflow-hidden flex flex-col lg:block">

                    <div class="w-full flex relative z-10 lg:h-[100vh] order-1 lg:order-none pointer-events-none">
                        
                        <!-- TEXT AREA: Left half on desktop, full width on mobile -->
                        <div class="w-full lg:w-[50%] relative h-[100vh] overflow-hidden bg-white lg:bg-transparent flex flex-col justify-center pointer-events-auto">
                            
                            <!-- STEP 1 -->
                            <div id="sybd-step-1" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] transform translate-y-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] opacity-100 z-20 bg-white lg:bg-transparent">
{step1_extracted}
                            </div>
                            
                            <!-- STEP 2 -->
                            <div id="sybd-step-2" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] transform translate-y-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 pointer-events-none z-10 bg-white lg:bg-transparent">
{step2_html}
                            </div>

                        </div>
                    </div>

                    <!-- BACKGROUND AREA: Right half on desktop, order 2 on mobile -->
                    <div class="w-full h-[50vh] lg:h-[100vh] lg:absolute lg:top-0 lg:right-0 lg:w-[70%] z-0 relative order-2 lg:order-none overflow-hidden bg-[#e0e0e0]">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3" class="absolute top-0 left-0 w-full h-full object-cover opacity-100 z-10" style="object-position: right center;">
                        <img src="img/sybd4.jpg" alt="SYBD Map 4" id="sybd-img-4" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-[1000ms] ease-in-out z-20" style="object-position: center center;">
                    </div>

                </div>

            </div>
"""
        
        html = html[:match.start(2)] + new_s5_full + html[match.end(2):]

        # 4. JavaScript Logic Replacement
        js_pattern_start = r'// Removed SYBD scroll sync logic'
        js_pattern_end = r'window\.switchLanguage\s*=\s*function'
        match_js = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

        if match_js:
            new_js = """// Removed SYBD scroll sync logic, using IntersectionObserver instead
            }, { passive: true });

            // SYBD Wheel Animation
            const sArea = document.getElementById('sybd-scroll-area');
            const s1 = document.getElementById('sybd-step-1');
            const s2 = document.getElementById('sybd-step-2');
            const sImg4 = document.getElementById('sybd-img-4');
            let isStep2 = false;

            if (sArea) {
                sArea.addEventListener('wheel', (e) => {
                    // Check if we are hovered over the area
                    const bounds = sArea.getBoundingClientRect();
                    // only apply if element is in view
                    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
                        
                        if (e.deltaY > 0 && !isStep2) {
                            // Scroll Down -> Show Step 2
                            isStep2 = true;
                            if (s1) {
                                s1.style.transform = 'translateY(-3rem)';
                                s1.style.opacity = '0';
                                s1.style.pointerEvents = 'none';
                            }
                            if (s2) {
                                s2.style.transform = 'translateY(0)';
                                s2.style.opacity = '1';
                                s2.style.pointerEvents = 'auto';
                            }
                            if (sImg4) {
                                sImg4.style.opacity = '1';
                            }
                        } else if (e.deltaY < 0 && isStep2) {
                            // Scroll Up -> Show Step 1 
                            // only trigger if we are at the top of the element to avoid getting stuck
                            if (scrollContainer.scrollTop <= sArea.offsetTop + 100) {
                                isStep2 = false;
                                if (s1) {
                                    s1.style.transform = 'translateY(0)';
                                    s1.style.opacity = '1';
                                    s1.style.pointerEvents = 'auto';
                                }
                                if (s2) {
                                    s2.style.transform = 'translateY(3rem)';
                                    s2.style.opacity = '0';
                                    s2.style.pointerEvents = 'none';
                                }
                                if (sImg4) {
                                    sImg4.style.opacity = '0';
                                }
                            }
                        }
                    }
                }, { passive: true });
            }

            """
            html = html[:match_js.start(1)] + new_js + html[match_js.start(2):]

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Done make_slide_animate")

