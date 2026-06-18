import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find section 5
s5_pattern = r'(<!-- SECTION 5 \(SYBD\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)(.*?)(</section>)'
match = re.search(s5_pattern, html, re.DOTALL)
if not match:
    print("Could not find section 5")
    exit()

s5_content = match.group(2)

# Extract Step 1 Text
text_pattern = r'(<div\s+class="[^"]*w-full lg:w-\[50%\] h-full flex flex-col justify-center px-6 md:px-\[60px\] lg:px-\[180px\] bg-transparent pointer-events-auto pt-\[100px\] lg:pt-0 pb-10 lg:pb-0">)(.*?)(</div>\s*</div>\s*<!-- Background Overlap Layer)'
text_match = re.search(text_pattern, s5_content, re.DOTALL)
text1_inner = text_match.group(2)

# Building the new Step 2 text HTML
step2_html = """
                        <div class="font-bold text-[20px] md:text-[22px] text-gray-800 mb-2 font-inter tracking-tight">
                            Unrivaled Accessibility</div>
                        <h2
                            class="text-[40px] md:text-[50px] lg:text-[60px] font-extrabold leading-tight mb-2 text-black tracking-[-0.02em] font-inter mt-4">
                            Korea's Central Station<br>and Mega Transport Hub
                        </h2>

                        <div class="mb-4 mt-6">
                            <h3 class="text-[18px] md:text-[22px] font-bold text-[#3B7062] tracking-[-0.02em] leading-snug">
                                국가중앙역 + 광역교통 중심지의 독보적 접근성 제공<br>
                                <span class="text-black font-semibold text-[16px] md:text-[18px]">The Nation's Ultimate Transit Hub - Unmatched, Unrivaled</span>
                            </h3>
                        </div>

                        <div
                            class="text-[14px] md:text-[15px] font-medium text-black leading-relaxed tracking-[-0.02em] space-y-4 mb-8">
                            <p class="kr-target-text">
                                서울역은 총 11개 노선을 보유한 명실상부한 교통의 중심지로 인근에 위치한 용산역과 함께 우수한 광역 교통 인프라를 형성합니다.<br>
                                또한, GTX-A/B, 신분당선 개발로 수도권 동남부 권역(강남-분당-판교 인근)으로부터 30분 내 접근이 가능하며<br>
                                인천공항, 김포공항 까지 직접 연결되어 글로벌 혁신기업을 위한 최적의 입지 조건을 갖추고 있습니다.
                            </p>
                            <p class="en-only-text" style="display:none;">
                                Seoul Station is Korea's foremost transportation hub, directly connected to 11 transit lines, including KTX, airport rail, and multiple metro routes. Together with nearby Yongsan Station, it forms an exceptional multimodal infrastructure at the center of the capital. With the addition of GTX-A/B and the Shinbundang Line, the site offers 30-minute access to key southeastern districts such as Gangnam, Bundang, and Pangyo. It also enables direct connections to both Incheon and Gimpo International Airports, making it an ideal location for global innovation-driven enterprises.
                            </p>
                        </div>

                        <div class="w-full flex items-center mb-6">
                            <img src="img/train icon.png" alt="Train Icons" class="w-full max-w-[400px] h-auto object-contain">
                        </div>

                        <div class="w-full flex gap-4 mt-2">
                            <div class="w-1/2 flex flex-col">
                                <img src="img/airport.png" alt="Incheon Airport" class="w-full h-auto object-cover rounded shadow-sm aspect-video mb-2" style="object-position: left center;">
                                <div class="text-[12px] md:text-[14px] text-black font-medium tracking-tight">approx. 43 minutes.</div>
                            </div>
                            <div class="w-1/2 flex flex-col">
                                <img src="img/airport.png" alt="Gimpo Airport" class="w-full h-auto object-cover rounded shadow-sm aspect-video mb-2" style="object-position: right center;">
                                <div class="text-[12px] md:text-[14px] text-black font-medium tracking-tight">approx. 22 minutes.</div>
                            </div>
                        </div>
"""

# New Section 5
new_s5_html = f"""
        <!-- SECTION 5 (SYBD - SCROLL DRIVEN) -->
        <section class="w-full bg-white text-black relative" id="section5">
            <!-- WE BUILD A 200vh CONTAINER TO ALLOW SCROLLING -->
            <div class="w-full relative">
                
                <!-- STICKY BACKGROUND LAYER -->
                <!-- Use h-screen mostly. On mobile maybe h-[50vh]. Let's say h-[100vh] lg:h-[100vh] for simplicity since we want background tracking. -->
                <div class="w-full h-[50vh] lg:h-[100vh] sticky top-0 left-0 z-0 overflow-hidden">
                    <div class="absolute top-0 right-0 w-full lg:w-[70%] h-full">
                        <img src="img/sybd1.jpg" alt="SYBD Map 1" class="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out" id="sybd-img-1" style="object-position: right center;">
                        <img src="img/sybd2.jpg" alt="SYBD Map 2" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out" id="sybd-img-2" style="object-position: right center;">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none lg:origin-right transition-opacity duration-700 ease-in-out" id="sybd-img-3" style="object-position: right center;">
                        <!-- Step 2 Image -->
                        <img src="img/sybd4.jpg" alt="SYBD Map 4" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 z-20 pointer-events-none transition-opacity duration-700 ease-in-out" id="sybd-img-4" style="object-position: center center;">
                    </div>
                </div>

                <!-- SCROLLABLE FOREGROUND LAYER -->
                <div class="relative z-10 w-full pointer-events-none -mt-[50vh] lg:-mt-[100vh]">
                    
                    <!-- Step 1 Text (100vh) -->
                    <div class="w-full h-auto lg:h-[100vh] flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-auto py-12 lg:py-0 lg:w-[50%]" id="sybd-step-1">
{text1_inner}
                    </div>

                    <!-- Step 2 Text (100vh) -->
                    <div class="w-full h-auto lg:h-[100vh] flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-auto py-12 lg:py-0 lg:w-[50%]" id="sybd-step-2">
{step2_html}
                    </div>

                </div>

            </div>
        </section>
"""

new_html = html[:match.start()] + new_s5_html + html[match.end():]

# Now, we also need to add IntersectionObserver logic to script for sybd-img-4
script_start = new_html.find('const switchSybdImage = () => {')
script_insert = """
                const sybdStep2 = document.getElementById('sybd-step-2');
                const sybdImg4 = document.getElementById('sybd-img-4');
                let isStep2Visible = false;

                const step2Observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        window.requestAnimationFrame(() => {
                            if (entry.isIntersecting) {
                                isStep2Visible = true;
                                sybdImg4.style.opacity = '1';
                                // Pause the auto loop
                                if (sybdInterval) {
                                    clearTimeout(sybdInterval);
                                    sybdInterval = null;
                                }
                            } else {
                                isStep2Visible = false;
                                sybdImg4.style.opacity = '0';
                                // Resume loop if step 1 is visible
                                if (!sybdInterval) {
                                    sybdInterval = setTimeout(switchSybdImage, 2500);
                                }
                            }
                        });
                    });
                }, { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.1 });

                if (sybdStep2) step2Observer.observe(sybdStep2);
"""

new_html = new_html[:script_start] + script_insert + new_html[script_start:]

# Inside switchSybdImage, we must prevent it if step 2 is visible
replace_switch = """const switchSybdImage = () => {
                    if (isStep2Visible) return;"""

new_html = new_html.replace('const switchSybdImage = () => {', replace_switch)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("done")
