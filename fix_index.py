import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Section 2 30% to 35%
html = html.replace('class="w-full md:w-[30%] flex flex-col justify-center', 'class="w-full md:w-[35%] flex flex-col justify-center')

# 2. Cleanup en-only-text duplicating in step 1
buggy_text_pattern = re.compile(
    r'(<div\s+class="text-\[13px\] md:text-\[15px\] text-black leading-relaxed tracking-\[-0\.02em\] space-y-4 mb-10 font-normal kr-target-text">.*?</p>\s*)<p class="en-only-text font-inter opacity-90".*?</p>(\s*</div>)',
    re.DOTALL
)
html = re.sub(buggy_text_pattern, r'\1\2', html)

# 3. Rewrite section 5 to use a pure dissolve instead of mt-[100vh] scrolling layers
s5_pattern = r'(<!-- SECTION 5 \(SYBD - SCROLL DRIVEN\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)(.*?)(</section>)'
match = re.search(s5_pattern, html, re.DOTALL)
if match:
    # We will build a totally new s5_content that implements the dissolve layout.
    # The new layout:
    # <div class="w-full h-[200vh] relative" id="sybd-auto-container">
    #   <div class="w-full h-[100vh] sticky top-0 left-0 overflow-hidden">
    #       <!-- BG maps -->
    #       <div class="absolute top-0 right-0 w-full lg:w-[70%] h-full"> ... sybd3.jpg / sybd4.jpg ... </div>
    #       <!-- Foreground texts -->
    #       <div class="absolute top-0 left-0 w-full h-full lg:w-[50%] p-6 md:p-[60px] lg:p-[180px] bg-white lg:bg-transparent pointer-events-auto transition-opacity duration-700 ease-in-out" id="sybd-step-1">
    #           (inner text 1)
    #       </div>
    #       <div class="absolute top-0 left-0 w-full h-full lg:w-[50%] p-6 md:p-[60px] lg:p-[180px] bg-white lg:bg-transparent pointer-events-auto transition-opacity duration-700 ease-in-out opacity-0" id="sybd-step-2">
    #           (inner text 2)
    #       </div>
    #   </div>
    #   <div class="absolute top-[100vh] w-full h-[10vh] pointer-events-none" id="sybd-step-2-trigger"></div>
    # </div>
    
    old_s5 = match.group(2)
    
    # Extract inner text of step 1
    t1_match = re.search(r'(<div[^>]*id="sybd-step-1"[^>]*>)(.*?)(</div>\s*<!-- Step 2 Text)', old_s5, re.DOTALL)
    t1_inner = t1_match.group(2) if t1_match else ""
    
    # Extract inner text of step 2
    t2_match = re.search(r'(<div[^>]*id="sybd-step-2"[^>]*>)(.*?)(</div>\s*</div>\s*</div>)', old_s5, re.DOTALL)
    t2_inner = t2_match.group(2) if t2_match else ""

    new_s5 = f'''
            <div class="w-full h-[200vh] relative" id="sybd-auto-container">
                <div class="w-full h-[100vh] sticky top-0 left-0 overflow-hidden z-0">
                    <!-- BACKGROUNDS -->
                    <div class="absolute top-0 right-0 w-full lg:w-[70%] h-full">
                        <img src="img/sybd3.jpg" alt="SYBD Map 3" class="absolute top-0 left-0 w-full h-full object-cover z-10" style="object-position: right center;">
                        <img src="img/sybd4.jpg" alt="SYBD Map 4" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 z-20 pointer-events-none transition-opacity duration-700 ease-in-out" id="sybd-img-4" style="object-position: center center;">
                    </div>
                    
                    <!-- TEXT PANELS (Overlaid, fading) -->
                    <div class="absolute top-0 left-0 w-full h-full lg:w-[50%] flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-auto z-30 transition-opacity duration-700 ease-in-out" id="sybd-step-1">
{t1_inner}
                    </div>
                    
                    <div class="absolute top-0 left-0 w-full h-full lg:w-[50%] flex flex-col justify-center px-6 md:px-[60px] lg:px-[180px] bg-white lg:bg-transparent pointer-events-auto z-30 transition-opacity duration-700 ease-in-out opacity-0 pointer-events-none" id="sybd-step-2">
{t2_inner}
                    </div>
                </div>
                
                <!-- SCROLL TRIGGER -->
                <div class="absolute top-[100vh] w-full h-[10vh] pointer-events-none" id="sybd-step-2-trigger"></div>
            </div>
'''
    html = html[:match.start(2)] + new_s5 + html[match.end(2):]

# 4. Update the Javascript observer to observe sybd-step-2-trigger and toggle opacities for text AND bg
js_start = html.find("const step2Observer")
if js_start != -1:
    js_end = html.find("if (sybdStep2) step2Observer.observe(sybdStep2);", js_start) + len("if (sybdStep2) step2Observer.observe(sybdStep2);")
    new_js = """
                const trigger = document.getElementById('sybd-step-2-trigger');
                const sybdStep1 = document.getElementById('sybd-step-1');
                const sybdStep2 = document.getElementById('sybd-step-2');
                const sybdImg4 = document.getElementById('sybd-img-4');

                if (trigger && step2Observer) {
                    const step2ObserverObj = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Scrolled down into step 2 trigger
                                if (sybdStep1) { sybdStep1.style.opacity = '0'; sybdStep1.style.pointerEvents = 'none'; }
                                if (sybdStep2) { sybdStep2.style.opacity = '1'; sybdStep2.style.pointerEvents = 'auto'; }
                                if (sybdImg4) { sybdImg4.style.opacity = '1'; }
                            } else {
                                // Scrolled above step 2 trigger
                                if (entry.boundingClientRect.top > 0) {
                                    if (sybdStep1) { sybdStep1.style.opacity = '1'; sybdStep1.style.pointerEvents = 'auto'; }
                                    if (sybdStep2) { sybdStep2.style.opacity = '0'; sybdStep2.style.pointerEvents = 'none'; }
                                    if (sybdImg4) { sybdImg4.style.opacity = '0'; }
                                }
                            }
                        });
                    }, { root: null, rootMargin: '0px', threshold: 0.1 });
                    step2ObserverObj.observe(trigger);
                }
"""
    # Quick replace of the sybd text observer variables
    observer_pattern = re.compile(r'const\s+step2Observer\s*=\s*new\s+IntersectionObserver.*?if\s*\(sybdStep2\)\s*step2Observer\.observe\(sybdStep2\);', re.DOTALL)
    html = re.sub(observer_pattern, new_js.strip(), html)

    # Clean out the obsolete auto loop vars
    clean1 = re.compile(r'let sybdInterval;\s*let currentSybdImage = 1;', re.DOTALL)
    html = re.sub(clean1, '', html)
    
    clean2 = re.compile(r'const switchSybdImage = \(\) => \{.+?\};\s*const sybdObserver = new IntersectionObserver\(.*?\}\);\s*sybdObserver\.observe\(sybdAutoContainer\);', re.DOTALL)
    html = re.sub(clean2, '', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("done")
