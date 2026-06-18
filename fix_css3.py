import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I want to specifically check if step2 HTML class has `active` baked into it initially which might override the CSS `opacity: 0`
s2_pattern = r'<div id="sybd-step-2" class="(.*?)"'
match = re.search(s2_pattern, html)
if match:
    class_str = match.group(1)
    print("step 2 classes:", class_str)
    if 'active' in class_str:
        new_class_str = class_str.replace('active', '').replace('  ', ' ')
        html = html[:match.start(1)] + new_class_str + html[match.end(1):]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Removed start active class")
