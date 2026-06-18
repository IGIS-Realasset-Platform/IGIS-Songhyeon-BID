import re

for file_path in ['src/components/SectionIotaOne.jsx', 'src/components/SectionIotaTwo.jsx']:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace max-w-[1300px] with max-w-full
    content = re.sub(r'max-w-\[1300px\]', 'max-w-full', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Max width fixed!")
