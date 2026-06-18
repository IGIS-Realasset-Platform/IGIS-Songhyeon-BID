import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

js_pattern_start = r'// Reliable Scroll Event'
js_pattern_end = r'window\.switchLanguage\s*=\s*function'
match = re.search(f'({js_pattern_start}.*?)({js_pattern_end})', html, re.DOTALL)

if match:
    new_js = """
            // 100% Reliable IntersectionObserver on Trigger Element
            const trigger = document.getElementById('sybd-trigger');
            const step1 = document.getElementById('sybd-step-1');
            const step2 = document.getElementById('sybd-step-2');
            const img4 = document.getElementById('sybd-img-4');

            if (trigger) {
                // We observe the invisible line we placed at 100vh down the 200vh container.
                // When we scroll down and it crosses the bottom of the screen, we fire.
                // We use the scroll container as root to be safe against any overflow setups.
                const observerOptions = {
                    root: document.getElementById('scroll-container'), 
                    rootMargin: '0px 0px -30% 0px', // Trigger when it is 30% from the bottom of the screen
                    threshold: 0
                };

                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
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
                            // Check bounding client rect relative to root bound (or viewport)
                            // If boundingClientRect.top > 0 it means we scrolled back up past it
                            // Note: e.boundingClientRect.top is relative to viewport.
                            // If it's positive, it means it went back down the screen.
                            // If we pass the trigger scrolling up, it exits the bottom of the rootMargin
                            // To be absolutely safe, let's just check the Y position
                            
                            if (e.boundingClientRect.top > (window.innerHeight * 0.5)) {
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
                        }
                    });
                }, observerOptions);

                obs.observe(trigger);
            }
            """
    html = html[:match.start(1)] + new_js + "\n            " + html[match.start(2):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Replaced with highly robust Trigger Observer")

