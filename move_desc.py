import re
import sys

files = ['src/components/Section10.jsx', 'src/components/Section11.jsx', 'src/components/Section12.jsx']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Extract the description block
    desc_pattern = r'(\s*\{\/\* Description Text \*\/\}\s*<div className=\{`mt-\d+ max-w-\[\d+px\] text-\[17px\] md:text-\[21px\] [^`]+`\}>\s*<ul[\s\S]*?<\/ul>\s*<\/div>)'
    match = re.search(desc_pattern, content)
    if not match:
        print(f"Description not found in {file_path}")
        continue
    
    desc_block = match.group(1)
    
    # Remove it from its current position
    content = content.replace(desc_block, '', 1)
    
    # Update classes in desc_block: 
    # mt-10 or mt-8 -> mt-12
    desc_block = re.sub(r'mt-\d+', 'mt-12', desc_block, count=1)
    # text-[17px] md:text-[21px] -> text-[15px] md:text-[19px]
    desc_block = desc_block.replace('text-[17px] md:text-[21px]', 'text-[15px] md:text-[19px]')
    
    # 2. Find the end of the Infographic Timeline block
    # It ends right before </div>\n\n            </div>\n        </section>
    # or we can look for the closing of the flex container that contains the timeline nodes.
    # The timeline container is something like:
    # <div className="relative w-full max-w-[1000px] mt-[60px] h-[460px] flex items-center justify-between">
    # ...
    # </div>
    # It's always followed by:
    # </div>
    # </section>
    
    insert_pattern = r'(\s*<\/div>\s*<\/div>\s*<\/section>)'
    # We want to insert the desc_block right before the last closing </div> of the main wrapper.
    # Actually, the main wrapper is <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
    # The timeline is inside it. So inserting before the closing </div> of the max-w-[1400px] container is correct.
    
    match_insert = re.search(insert_pattern, content)
    if not match_insert:
        print(f"Insert point not found in {file_path}")
        continue
    
    insert_point = match_insert.group(1)
    # Replace the insert point with desc_block + insert_point
    content = content.replace(insert_point, desc_block + insert_point, 1)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed {file_path}")

