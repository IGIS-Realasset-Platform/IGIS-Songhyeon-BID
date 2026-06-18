import re

files = ['src/components/Section10.jsx', 'src/components/Section11.jsx', 'src/components/Section12.jsx']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Right now, all nodes are step >= 2.
    # In Section 10:
    # First node should be 2, Second node should be 3, Third node should be 4
    # The nodes are consecutive.
    # Let's find all occurrences of "step >= 2 ? 'opacity-100" and replace them sequentially
    
    # We will use re.finditer to find all matches of step >= 2 ? 'opacity-100
    
    # Actually, let's just find the first, second, and third matches.
    # We know the first match is inside the line style (for Section10) or not present.
    # We can just match the container divs for nodes.
    # We can search for `<div className={`relative z-10 flex flex-col items-center transition-all duration-[800ms] ease-out [^`]*`}`
    
    node_pattern = r"step >= 2 \? 'opacity-100 (translate-y-0 scale-100|scale-100 translate-y-0|translate-x-0)"
    
    matches = list(re.finditer(node_pattern, content))
    
    if len(matches) == 3:
        # Replace the 2nd one with step >= 3
        content = content[:matches[1].start()] + "step >= 3 ? 'opacity-100 " + matches[1].group(1) + content[matches[1].end():]
        # Replace the 3rd one with step >= 4 (adjust index because length changed)
        # Better to do from end to beginning
        content = content[:matches[2].start()] + "step >= 4 ? 'opacity-100 " + matches[2].group(1) + content[matches[2].end():]
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

