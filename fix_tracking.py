import os
import re
import glob

# Files to process
files = glob.glob('src/components/Section*.jsx')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Theme text (spans)
    # Match className="inline-block... uppercase" and add tracking-[-0.02em] if not there
    content = re.sub(r'(className="inline-block[^"]*?uppercase)(?![^"]*tracking-\[-0\.02em\])([^"]*")', r'\1 tracking-[-0.02em]\2', content)

    # 2. Section1 title (h1)
    content = re.sub(r'tracking-\[-0\.03em\]', r'tracking-[-0.02em]', content)
    
    # 3. Section2 title (h3)
    content = re.sub(r'(className="text-\[36px\][^"]*font-extrabold[^"]*?text-\[#1d1d1f\])([^"]*?)tracking-tight([^"]*")', r'\1\2tracking-[-0.02em]\3', content)

    # 4. Section3~7 h2 titles
    content = re.sub(r'(className=\{`text-\[36px\].*?font-extrabold[^`]*?break-keep)(?![^`]*tracking-\[-0\.02em\])([^`]*`\})', r'\1 tracking-[-0.02em]\2', content)

    # 5. Section8 h2 titles (font-bold)
    content = re.sub(r'(className=\{`text-\[40px\].*?font-bold[^`]*?break-keep)(?![^`]*tracking-\[-0\.02em\])([^`]*`\})', r'\1 tracking-[-0.02em]\2', content)

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

print("Done")
