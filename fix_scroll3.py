import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

js_pattern_start = r'// Safer way: attach scroll listener purely for this specific section\'s scroll progress'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    new_js = """// Safer way: attach scroll listener purely for this specific section's scroll progress
            const sArea = document.getElementById('sybd-scroll-area');
            const scrollContainerEl = document.getElementById('scroll-container'); // Make sure we have the exact right container
            if (sArea && scrollContainerEl) {
                scrollContainerEl.addEventListener('scroll', () => {
                    const rect = sArea.getBoundingClientRect();
                    
                    // Because there are fixed headers or offsets, a reliable way to check if we've scrolled well into the sticky section:
                    // If the top of the container goes past 0 (i.e. negative), we are inside the sticky sequence.
                    // Let's trigger the swap when it's parsed 20% of the viewport height into negative space.
                    if (rect.top <= -window.innerHeight * 0.2) {
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
    html = html[:match.start(1)] + new_js + html[match.start(2):]

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed scroll container logic")
else:
    print("Could not find pattern")

