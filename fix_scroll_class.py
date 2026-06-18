import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

s2_pos = html.find('id="sybd-step-2" class="sybd-step')
if s2_pos != -1:
    class_str_start = s2_pos + html[s2_pos:].find('class="') + 7
    class_str_end = class_str_start + html[class_str_start:].find('"')
    c_str = html[class_str_start:class_str_end]
    if 'active' in c_str and 'down-in' in c_str:
        html = html[:class_str_start] + c_str.replace('active', '') + html[class_str_end:]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Removed conflicting active class from step 2 initial state")

