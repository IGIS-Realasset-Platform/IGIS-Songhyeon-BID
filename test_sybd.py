import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's check exactly what scroll container is used in CSS
if 'overflow-y:' in html and 'scroll-container' in html:
    print("Found scroll-container")

# The issue might be that sArea.getBoundingClientRect().top relative to viewport might not be what changes if the body is scrollable vs scroll-container.
# Using scroll-container's scrollTop might be safer.

js_part = """// Safer way: attach scroll listener purely for this specific section's scroll progress
            const sArea = document.getElementById('sybd-scroll-area');
            const scrollContainerEl = document.getElementById('scroll-container'); // This is where scrollTop lives
            if (sArea && scrollContainerEl) {
                scrollContainerEl.addEventListener('scroll', () => {
                    // Alternative safe approach: compare scrollTop against the element's actual offsetTop
                    const areaTop = sArea.offsetTop;
                    const st = scrollContainerEl.scrollTop;
                    const vh = window.innerHeight;
                    
                    // Trigger when scrollTop goes 30vh past the start of the section
                    if (st >= areaTop + vh * 0.3) {
                        if(step1) {
                            step1.classList.remove('active');
                            step1.classList.add('up-out');
                        }
                        if(step2) {
                            step2.classList.remove('down-in');
                            step2.classList.add('active');
                            step2.style.pointerEvents = 'auto'; // Ensure it's clickable just in case
                        }
                        if(img4) {
                            img4.style.opacity = '1';
                        }
                    } else {
                        if(step1) {
                            step1.classList.remove('up-out');
                            step1.classList.add('active');
                        }
                        if(step2) {
                            step2.classList.remove('active');
                            step2.classList.add('down-in');
                            step2.style.pointerEvents = 'none';
                        }
                        if(img4) {
                            img4.style.opacity = '0';
                        }
                    }
                }, {passive:true});
            }

            """

js_pattern_start = r'// Safer way: attach scroll listener purely for this specific section\'s scroll progress'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    html = html[:match.start(1)] + js_part + html[match.start(2):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed with precise offsetTop vs scrollTop logic")

