import os
import re

def find_untranslated():
    base_dir = "src/components"
    untranslated = []
    
    # We want to check Section41.jsx to Section72.jsx
    for i in range(41, 73):
        filename = f"Section{i}.jsx"
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
            
        for line_num, line in enumerate(lines, 1):
            # Check if there is Korean text
            if re.search(r'[가-힣]', line):
                # If it doesn't contain lang === 'kr', it's highly likely untranslated!
                # Also ignore comments
                if "lang === 'kr'" not in line and not line.strip().startswith("//") and not line.strip().startswith("/*") and not line.strip().startswith("*"):
                    # Wait, sometimes it might be spread across multiple lines.
                    # But if the line has Korean and NO lang check, we should flag it.
                    untranslated.append(f"{filename}:{line_num}: {line.strip()}")
                    
    with open("untranslated_report.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(untranslated))
        
if __name__ == "__main__":
    find_untranslated()
