import os
import subprocess
import re

def modify_js_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update totalSlides to 120
    content = re.sub(r'const totalSlides\s*=\s*\d+;', 'const totalSlides = 120;', content)
    # Update port 8082 to 8083
    content = content.replace('http://localhost:8082/', 'http://localhost:8083/')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} with totalSlides = 120 and port = 8083.")

def main():
    # 1. Modify the scripts
    modify_js_file('extract_layout.js')
    modify_js_file('capture_backgrounds.js')

    # 2. Run extract_layout.js
    print("Running extract_layout.js...")
    res = subprocess.run(['node', 'extract_layout.js'], capture_output=True, text=True)
    print(res.stdout)
    if res.returncode != 0:
        print("Error extracting layout:", res.stderr)
        return

    # 3. Run capture_backgrounds.js
    print("Running capture_backgrounds.js...")
    res = subprocess.run(['node', 'capture_backgrounds.js'], capture_output=True, text=True)
    print(res.stdout)
    if res.returncode != 0:
        print("Error capturing backgrounds:", res.stderr)
        return

    # 4. Run build_pptx_hybrid.py
    print("Running build_pptx_hybrid.py...")
    res = subprocess.run(['python3', 'build_pptx_hybrid.py'], capture_output=True, text=True)
    print(res.stdout)
    if res.returncode != 0:
        print("Error building PPTX:", res.stderr)
        return

    print("Pipeline completed successfully!")

if __name__ == '__main__':
    main()
