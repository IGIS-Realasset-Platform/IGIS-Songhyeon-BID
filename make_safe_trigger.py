import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Instead of IntersectionObserver, since sometimes root/rootMargin is buggy with fixed/sticky setups, let's just re-add the foolproof scrollEvent check from earlier, it's 100% reliable.

js_pattern_start = r'// Reliable Observer'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    new_js = """
            // Reliable Scroll Event
            const sArea = document.getElementById('sybd-scroll-area');
            const step1 = document.getElementById('sybd-step-1');
            const step2 = document.getElementById('sybd-step-2');
            const img4 = document.getElementById('sybd-img-4');

            if (sArea && scrollContainer) {
                // If the user's setup scrolls a div #scroll-container
                scrollContainer.addEventListener('scroll', () => {
                    const rect = sArea.getBoundingClientRect();
                    // We reach half window scroll into the section
                    if (rect.top <= -(window.innerHeight * 0.3)) {
                        if (step1) {
                            step1.classList.remove('active');
                            step1.classList.add('up-out');
                        }
                        if (step2) {
                            step2.classList.remove('down-in');
                            step2.classList.add('active');
                            step2.style.pointerEvents = 'auto';
                        }
                        if (img4) {
                            img4.style.opacity = '1';
                        }
                    } else {
                        if (step1) {
                            step1.classList.remove('up-out');
                            step1.classList.add('active');
                        }
                        if (step2) {
                            step2.classList.remove('active');
                            step2.classList.add('down-in');
                            step2.style.pointerEvents = 'none';
                        }
                        if (img4) {
                            img4.style.opacity = '0';
                        }
                    }
                }, {passive:true});
            } else if (sArea) {
                // Fallback for window scrolling
                window.addEventListener('scroll', () => {
                    const rect = sArea.getBoundingClientRect();
                    if (rect.top <= -(window.innerHeight * 0.3)) {
                        if (step1) {
                            step1.classList.remove('active');
                            step1.classList.add('up-out');
                        }
                        if (step2) {
                            step2.classList.remove('down-in');
                            step2.classList.add('active');
                            step2.style.pointerEvents = 'auto';
                        }
                        if (img4) {
                            img4.style.opacity = '1';
                        }
                    } else {
                        if (step1) {
                            step1.classList.remove('up-out');
                            step1.classList.add('active');
                        }
                        if (step2) {
                            step2.classList.remove('active');
                            step2.classList.add('down-in');
                            step2.style.pointerEvents = 'none';
                        }
                        if (img4) {
                            img4.style.opacity = '0';
                        }
                    }
                }, {passive:true});
            }
            """
    html = html[:match.start(1)] + new_js + "\n            " + html[match.start(2):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Reverted to reliable scroll rect top event")

