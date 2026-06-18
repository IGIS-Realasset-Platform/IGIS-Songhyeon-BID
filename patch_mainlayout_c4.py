import os
import re

filepath = "src/components/MainLayout.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports = """import Section58 from './Section58';
import Section59 from './Section59';
import Section60 from './Section60';
import Section61 from './Section61';"""

new_imports = """import Section58 from './Section58';
import Section59 from './Section59';
import Section60 from './Section60';
import Section61 from './Section61';
import Section62 from './Section62';
import Section63 from './Section63';
import Section64 from './Section64';
import Section65 from './Section65';
import Section66 from './Section66';
import Section67 from './Section67';"""

content = content.replace(imports, new_imports)

# Add sections to array
sections_arr = """        { id: 'page-58', component: Section58 },
        { id: 'page-59', component: Section59 },
        { id: 'page-60', component: Section60 },
        { id: 'page-61', component: Section61 }"""

new_sections_arr = """        { id: 'page-58', component: Section58 },
        { id: 'page-59', component: Section59 },
        { id: 'page-60', component: Section60 },
        { id: 'page-61', component: Section61 },
        { id: 'page-62', component: Section62 },
        { id: 'page-63', component: Section63 },
        { id: 'page-64', component: Section64 },
        { id: 'page-65', component: Section65 },
        { id: 'page-66', component: Section66 },
        { id: 'page-67', component: Section67 }"""

content = content.replace(sections_arr, new_sections_arr)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("MainLayout.jsx patched successfully.")
