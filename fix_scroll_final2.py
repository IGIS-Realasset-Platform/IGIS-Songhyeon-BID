import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's rethink the JS logic. If `sArea` isn't triggering correctly because of absolute positioning, let's just use IntersectionObserver which is foolproof.

js_pattern_start = r'// SYBD Intersection Observer'
js_pattern_end = r'// Safer way: attach scroll listener purely for this specific section\'s scroll progress'
js_pattern_end2 = r'window\.switchLanguage\s*=\s*function'

match = re.search(f'({js_pattern_start}.*?)({js_pattern_end}.*?)({js_pattern_end2})', html, re.DOTALL)

if match:
    new_js = """            // Reliable Observer
            const trigger = document.getElementById('sybd-trigger');
            const step1 = document.getElementById('sybd-step-1');
            const step2 = document.getElementById('sybd-step-2');
            const img4 = document.getElementById('sybd-img-4');

            if (trigger) {
                // We'll observe the trigger which is placed 100vh down in the 200vh container
                // This means checking when it enters the viewport
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        // The trigger is a 10px tall box at absolute top: 100vh.
                        // As we scroll down, it will rise from the bottom of the screen.
                        // Wait until it crosses the middle of the screen (or just enters it)
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
                            // Only revert if we are scrolling UP past it
                            // We can check e.boundingClientRect.top > 0 (it went out the bottom)
                            if (e.boundingClientRect.top > 0) {
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
                }, { 
                    root: document.getElementById('scroll-container'), 
                    rootMargin: '-50% 0px -50% 0px' 
                });
                obs.observe(trigger);
            }

            """
    
    html = html[:match.start(1)] + new_js + html[match.start(3):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Replaced with Intersection Observer inside scroll-container")
