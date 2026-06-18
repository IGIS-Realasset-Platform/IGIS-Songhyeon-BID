import re

files = ['src/components/Section10.jsx', 'src/components/Section11.jsx', 'src/components/Section12.jsx']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the desc block that is currently inside the timeline container
    desc_pattern = r'(\s*\{\/\* Description Text \*\/\}\s*<div className=\{`mt-12 max-w-\[\d+px\] text-\[15px\] md:text-\[19px\] [^`]+`\}>\s*<ul[\s\S]*?<\/ul>\s*<\/div>)'
    match = re.search(desc_pattern, content)
    if not match:
        print("Not found in", file_path)
        continue
    
    desc_block = match.group(1)
    
    # Remove it
    content = content.replace(desc_block, '', 1)
    
    # Insert it between the two </div> tags at the end
    # Find the end pattern:
    # </div>
    # 
    # </div>
    # </section>
    
    # The first </div> closes the timeline container.
    insert_pattern = r'(<\/div>\s*)(<\/div>\s*<\/section>)'
    
    match_insert = re.search(insert_pattern, content)
    if match_insert:
        content = content[:match_insert.start(2)] + desc_block + "\n" + content[match_insert.start(2):]
    else:
        print("Insert point not found in", file_path)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Fixed", file_path)
