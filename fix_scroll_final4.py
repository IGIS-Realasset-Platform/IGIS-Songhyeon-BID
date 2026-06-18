import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the IntersectionObserver logic checking
js_pattern = r"""                        if \(e\.isIntersecting\) \{
                            if \(step1\) \{
                                step1\.classList\.remove\('active'\);
                                step1\.classList\.add\('up-out'\);
                            \}
                            if \(step2\) \{
                                step2\.classList\.remove\('down-in'\);
                                step2\.classList\.add\('active'\);
                                step2\.style\.pointerEvents = 'auto';
                            \}
                            if \(img4\) \{
                                img4\.style\.opacity = '1';
                            \}
                        \} else \{
                            // Only revert if we are scrolling UP past it
                            // We can check e\.boundingClientRect\.top > 0 \(it went out the bottom\)
                            if \(e\.boundingClientRect\.top > 0\) \{
                                if \(step1\) \{
                                    step1\.classList\.remove\('up-out'\);
                                    step1\.classList\.add\('active'\);
                                \}
                                if \(step2\) \{
                                    step2\.classList\.remove\('active'\);
                                    step2\.classList\.add\('down-in'\);
                                    step2\.style\.pointerEvents = 'none';
                                \}
                                if \(img4\) \{
                                    img4\.style\.opacity = '0';
                                \}
                            \}
                        \}"""

new_js = """                        if (e.isIntersecting || e.boundingClientRect.top < 0) {
                            if (step1) {
                                step1.classList.remove('active');
                                step1.classList.add('up-out');
                            }
                            if (step2) {
                                step2.classList.remove('down-in');
                                step2.classList.add('active');
                            }
                            if (img4) img4.style.opacity = '1';
                        } else {
                            if (step1) {
                                step1.classList.remove('up-out');
                                step1.classList.add('active');
                            }
                            if (step2) {
                                step2.classList.remove('active');
                                step2.classList.add('down-in');
                            }
                            if (img4) img4.style.opacity = '0';
                        }"""

html = re.sub(js_pattern, new_js, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Observer logic expanded!")
