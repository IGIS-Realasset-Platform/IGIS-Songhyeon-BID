import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Header
header_pattern = r'(<header id="main-header"[^>]*class="[^"]*)(px-6 md:px-\[50px\] lg:px-\[180px\])([^"]*"\n\s*style="[^"]*">)\s*((?:.|\n)*?)(</header>)'

def header_repl(m):
    start = m.group(1)
    classes = m.group(2)
    end_tag = m.group(3)
    inner = m.group(4)
    close = m.group(5)
    
    # Remove padding and flex from outer header, put in inner wrapper
    start_clean = start.replace("flex justify-between items-center ", "")
    
    return f'{start_clean}{end_tag}\n            <div class="w-full max-w-[1700px] mx-auto flex justify-between items-center {classes}">\n{inner}            </div>\n{close}'

content = re.sub(header_pattern, header_repl, content)

# 2. Section 2
s2_pattern = r'(<section class="section content-section h-auto"[^>]*id="section2"[^>]*>)\s*(<!-- Header Spacer -->\s*<div class="h-\[100px\] w-full invisible"></div>)\s*((?:.|\n)*?)(</section>)'
def s2_repl(m):
    return f'{m.group(1)}\n{m.group(2)}\n            <div class="w-full max-w-[1700px] mx-auto">\n{m.group(3)}            </div>\n{m.group(4)}'

content = re.sub(s2_pattern, s2_repl, content)

# 3. Section 3
s3_pattern = r'(<section class="section content-section bs-section-3 h-auto bg-black pt-\[200px\]"[^>]*id="section3"[^>]*>)\s*((?:.|\n)*?)(</section>)'
def s3_repl(m):
    inner = m.group(2).rstrip()
    return f'{m.group(1)}\n            <div class="w-full max-w-[1700px] mx-auto">\n{inner}\n            </div>\n{m.group(3)}'

content = re.sub(s3_pattern, s3_repl, content)

# 4. Section 4 (Brand Guidelines)
# To prevent backgrounds from cutting off, we wrap the text-content-wrapper or the inner content.
# Actually, the green panel has `px-8 md:px-12 lg:px-24`. If we want it to not grow endlessly:
# `.max-w-2xl` already constrains the text. It's fine.

with open('index.html', 'w') as f:
    f.write(content)

print("Done")
