import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace window.addEventListener('scroll', with scrollContainer.addEventListener('scroll',
# since the main scroll area might be the container, not window.
js_part = """// Safer way: attach scroll listener purely for this specific section's scroll progress
            const sArea = document.getElementById('sybd-scroll-area');
            if (sArea && scrollContainer) {
                scrollContainer.addEventListener('scroll', () => {
                    const rect = sArea.getBoundingClientRect();
                    // When rect.top becomes negative, we are scrolling past the top of the container
                    // We trigger the animation when scrolled 30% of viewport height into the area
                    if (rect.top <= -window.innerHeight * 0.3) {
                        if(step1) {
                            step1.classList.remove('active');
                            step1.classList.add('up-out');
                        }
                        if(step2) {
                            step2.classList.remove('down-in');
                            step2.classList.add('active');
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
                        }
                        if(img4) {
                            img4.style.opacity = '0';
                        }
                    }
                }, {passive:true});
            }"""

js_pattern_start = r'// Safer way: attach scroll listener purely for this specific section\'s scroll progress'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    html = html[:match.start(1)] + js_part + "\n\n            " + html[match.start(2):]

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed scroll container listener")
else:
    print("Failed to find pattern for JS replacement")

