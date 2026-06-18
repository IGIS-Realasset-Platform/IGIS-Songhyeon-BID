import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure CSS is in there properly
if '.sybd-step.up-out' not in html:
    print("CSS is missing!")
else:
    print("CSS found")

match = re.search(r'(<!-- SECTION 5 \(SYBD\) -->\s*<section class="w-full bg-white text-black relative" id="section5">)', html)
if match:
    # Need to verify step 1 has both 'sybd-step' and 'active' class
    # and step 2 has 'sybd-step' and 'down-in'
    
    html = html.replace('id="sybd-step-1" class="absolute top-0', 'id="sybd-step-1" class="sybd-step active absolute top-0')
    html = html.replace('id="sybd-step-2" class="absolute top-0', 'id="sybd-step-2" class="sybd-step down-in absolute top-0')
    
    # Just in case there are duplicates
    html = html.replace('class="sybd-step active sybd-step active', 'class="sybd-step active')
    html = html.replace('class="sybd-step down-in sybd-step down-in', 'class="sybd-step down-in')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed classes")
