import re

files = ['src/components/Section10.jsx', 'src/components/Section11.jsx', 'src/components/Section12.jsx']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change description from step >= 2 to step >= 5
    # The description text has: `step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'`
    content = content.replace("step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'", "step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'")

    # Change step >= 5 to step >= 4
    # Wait, if we replace 5->4 first, it might clash with our newly replaced 5.
    # So let's use temporary tokens.
    
    # Let's replace the node condition patterns:
    # They are like: step >= 3 ?
    # Let's replace the exact patterns.
    # For width in Section 10:
    # style={{ width: step >= 5 ? '100%' : step >= 4 ? '50%' : step >= 3 ? '10%' : '0%' }}
    if 'Section10' in file_path:
        content = content.replace("step >= 5 ? '100%' : step >= 4 ? '50%' : step >= 3 ? '10%' : '0%'", "step >= 4 ? '100%' : step >= 3 ? '50%' : step >= 2 ? '10%' : '0%'")

    # Now change node animations
    # Nodes use: `step >= 3 ? ...`
    # We want 5->4, 4->3, 3->2
    # To avoid double replacement, do it in order: 5->4, 4->3, 3->2
    # But wait, description uses step >= 2. We already changed it to step >= 5.
    
    content = content.replace("step >= 5 ? 'opacity-100", "TEMP_5 ? 'opacity-100")
    content = content.replace("step >= 4 ? 'opacity-100", "TEMP_4 ? 'opacity-100")
    content = content.replace("step >= 3 ? 'opacity-100", "TEMP_3 ? 'opacity-100")
    
    # The description was already changed to step >= 5. Let's make sure it doesn't get messed up.
    # Ah, the description was replaced above to step >= 5 ? 'opacity-100 translate-y-0'
    # So it became TEMP_5 ? 'opacity-100
    # Actually, we know exactly what we want.
    
    # TEMP_3 -> step >= 2
    # TEMP_4 -> step >= 3
    # TEMP_5 (the original node 5) -> step >= 4
    # BUT wait, the description we changed to step >= 5 also became TEMP_5!
    # So let's re-read the file and do it cleaner.
    pass

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update line progress for Section10
    if 'Section10' in file_path:
        content = content.replace("step >= 5 ? '100%' : step >= 4 ? '50%' : step >= 3 ? '10%' : '0%'", "step >= 4 ? '100%' : step >= 3 ? '50%' : step >= 2 ? '10%' : '0%'")

    # 2. Update step >= 5 (Nodes) to step >= 4
    content = content.replace("step >= 5 ? 'opacity-100 translate-y-0 scale-100'", "step >= 4 ? 'opacity-100 translate-y-0 scale-100'")
    content = content.replace("step >= 5 ? 'opacity-100 scale-100 translate-y-0'", "step >= 4 ? 'opacity-100 scale-100 translate-y-0'")
    content = content.replace("step >= 5 ? 'opacity-100 translate-x-0'", "step >= 4 ? 'opacity-100 translate-x-0'")

    # 3. Update step >= 4 to step >= 3
    content = content.replace("step >= 4 ? 'opacity-100 translate-y-0 scale-100'", "step >= 3 ? 'opacity-100 translate-y-0 scale-100'")
    content = content.replace("step >= 4 ? 'opacity-100 scale-100 translate-y-0'", "step >= 3 ? 'opacity-100 scale-100 translate-y-0'")
    content = content.replace("step >= 4 ? 'opacity-100 translate-x-0'", "step >= 3 ? 'opacity-100 translate-x-0'")

    # 4. Update step >= 3 to step >= 2
    content = content.replace("step >= 3 ? 'opacity-100 translate-y-0 scale-100'", "step >= 2 ? 'opacity-100 translate-y-0 scale-100'")
    content = content.replace("step >= 3 ? 'opacity-100 scale-100 translate-y-0'", "step >= 2 ? 'opacity-100 scale-100 translate-y-0'")
    content = content.replace("step >= 3 ? 'opacity-100 translate-x-0'", "step >= 2 ? 'opacity-100 translate-x-0'")

    # 5. Update description from step >= 2 to step >= 5
    content = content.replace("step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'", "step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'")

    # 6. Update comments in useEffect
    content = content.replace("setTimeout(() => setStep(2), 1000); // Intro Text", "setTimeout(() => setStep(2), 1000); // Node 1")
    content = content.replace("setTimeout(() => setStep(3), 1600); // 2007 Node", "setTimeout(() => setStep(3), 1600); // Node 2")
    content = content.replace("setTimeout(() => setStep(4), 2200); // 2008 Node", "setTimeout(() => setStep(4), 2200); // Node 3")
    content = content.replace("setTimeout(() => setStep(5), 2800); // 2010 Node", "setTimeout(() => setStep(5), 2800); // Intro Text")
    
    content = content.replace("setTimeout(() => setStep(3), 1600); // Small Box (2007)", "setTimeout(() => setStep(3), 1600); // Node 2")
    content = content.replace("setTimeout(() => setStep(4), 2200); // Arrow (2.5x)", "setTimeout(() => setStep(4), 2200); // Node 3")
    content = content.replace("setTimeout(() => setStep(5), 2600); // Large Box (2025-2027)", "setTimeout(() => setStep(5), 2800); // Intro Text")

    content = content.replace("setTimeout(() => setStep(3), 1600); // Left Engine (Traditional)", "setTimeout(() => setStep(3), 1600); // Node 2")
    content = content.replace("setTimeout(() => setStep(4), 2200); // Right Engine (New Growth)", "setTimeout(() => setStep(4), 2200); // Node 3")
    content = content.replace("setTimeout(() => setStep(5), 2800); // Center Core (Semiconductor Reliance)", "setTimeout(() => setStep(5), 2800); // Intro Text")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for file_path in files:
    process_file(file_path)

print("Animation steps updated!")
