import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the incorrect scroll listener check because sArea.offsetTop doesn't work right inside relative containers sometimes, especially with scrollContainer.
# Using bounding client rect inside the scrollContainer is completely safe and robust.

new_js = """            const sArea = document.getElementById('sybd-scroll-area');
            const scrollContainerEl = document.getElementById('scroll-container'); // This is where scrollTop lives
            if (sArea && scrollContainerEl) {
                scrollContainerEl.addEventListener('scroll', () => {
                    // Use getBoundingClientRect for bulletproof positioning detection
                    const rect = sArea.getBoundingClientRect();
                    // When rect.top drops past about -20% of viewport height (you've scrolled that much past the top edge)
                    if (rect.top <= -(window.innerHeight * 0.2)) {
                        if (step1) {
                            step1.classList.remove('active');
                            if(!step1.classList.contains('up-out')) step1.classList.add('up-out');
                        }
                        if (step2) {
                            step2.classList.remove('down-in');
                            if(!step2.classList.contains('active')) step2.classList.add('active');
                            step2.style.pointerEvents = 'auto';
                        }
                        if (img4) {
                            img4.style.opacity = '1';
                        }
                    } else {
                        if (step1) {
                            step1.classList.remove('up-out');
                            if(!step1.classList.contains('active')) step1.classList.add('active');
                        }
                        if (step2) {
                            step2.classList.remove('active');
                            if(!step2.classList.contains('down-in')) step2.classList.add('down-in');
                            step2.style.pointerEvents = 'none';
                        }
                        if (img4) {
                            img4.style.opacity = '0';
                        }
                    }
                }, {passive:true});
            }"""

js_pattern_start = r'const sArea = document\.getElementById\(\'sybd-scroll-area\'\);'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    html = html[:match.start(1)] + new_js + "\n\n            " + html[match.start(2):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Re-fixed scroll logic")
else:
    print("Could not find js block")
