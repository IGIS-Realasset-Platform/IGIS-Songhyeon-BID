import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Wait, `scrollContainer` might not be in scope if not defined?
# yes it is: `const scrollContainer = document.getElementById("scroll-container");`
# The logic looks sound now, it explicitly catches `scrollContainer` or `window`.

# But earlier we found that the main site uses a wrapper:
# <div class="h-screen w-full overflow-y-auto no-scrollbar scroll-smooth" id="scroll-container">

# This is absolutely correct. 
# Did we remove `down-in` from the HTML of step2 so it doesn't have `active` baked in?
print(html.find('id="sybd-step-2" class="sybd-step active')) # should be -1
print(html.find('id="sybd-step-2" class="sybd-step down-in')) # should be > -1
