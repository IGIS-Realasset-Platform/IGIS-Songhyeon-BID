import re
import os

files = [f'src/components/Section{i}.jsx' for i in range(14, 24)]

def replace_sizes(content):
    # Container sizes
    content = content.replace('max-w-[900px]', 'max-w-[1200px]')
    content = content.replace('max-w-[1000px]', 'max-w-[1200px]')
    content = content.replace('h-[360px]', 'h-[460px]')
    content = content.replace('h-[400px]', 'h-[460px]')
    
    # Description Text wrapper
    content = content.replace('text-[15px] md:text-[19px]', 'text-[18px] md:text-[24px]')
    
    # Shape dimensions
    content = content.replace('w-[100px] h-[100px]', 'w-[160px] h-[160px]')
    content = content.replace('w-[120px] h-[120px]', 'w-[200px] h-[200px]')
    content = content.replace('w-[180px] h-[180px]', 'w-[280px] h-[280px]')
    content = content.replace('w-[200px] h-[200px]', 'w-[300px] h-[300px]')
    content = content.replace('w-[220px] h-[220px]', 'w-[320px] h-[320px]')
    content = content.replace('w-[240px] h-[240px]', 'w-[340px] h-[340px]')
    content = content.replace('w-[260px] h-[260px]', 'w-[360px] h-[360px]')
    content = content.replace('w-[280px] h-[280px]', 'w-[380px] h-[380px]')
    
    # Section 14 specific boxes
    content = content.replace('w-[280px]', 'w-[360px]')
    content = content.replace('h-[240px]', 'h-[320px]')
    
    # Section 15 specific width
    content = content.replace('w-[160px]', 'w-[240px]')

    # Font sizes
    content = content.replace('text-[11px]', 'text-[16px]')
    content = content.replace('text-[12px]', 'text-[18px]')
    content = content.replace('text-[13px]', 'text-[18px]')
    content = content.replace('text-[14px]', 'text-[20px]')
    content = content.replace('text-[16px]', 'text-[24px]')
    content = content.replace('text-[18px]', 'text-[28px]')
    content = content.replace('text-[20px]', 'text-[32px]')
    content = content.replace('text-[24px]', 'text-[36px]')
    content = content.replace('text-[28px]', 'text-[42px]')
    content = content.replace('text-[36px]', 'text-[52px]')
    content = content.replace('text-[48px]', 'text-[64px]')
    content = content.replace('text-[64px]', 'text-[80px]')

    # Icons / SVG sizes
    content = content.replace('w-12 h-12', 'w-20 h-20')
    content = content.replace('w-[60px] h-[60px]', 'w-[80px] h-[80px]')
    content = content.replace('-top-4 -right-4', '-top-6 -right-6')
    content = content.replace('-top-4 -left-4', '-top-6 -left-6')

    return content

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = replace_sizes(content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Upscaled sizes in Sections 14-23")
