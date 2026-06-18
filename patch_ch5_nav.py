import os

nav_path = "src/data/NavigationData.js"

with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

new_chapter_5 = """            },
            {
                title: "Chapter 5. 산업/물류 부동산 2030~2040",
                id: "page-69",
                items: [
                    { label: "데이터센터 분산화", id: "page-70" },
                    { label: "시니어 하우징 빅뱅", id: "page-71" },
                    { label: "생명과학/콜드체인", id: "page-72" },
                    { label: "로봇 친화 창고", id: "page-73" }
                ]
            }"""

nav_content = nav_content.replace("""            {
                title: "Chapter 4. 서울 오피스 시장 2030~2040 전망",
                id: "page-63",
                items: [
                    { label: "7축 메가 권역 팽창", id: "page-64" },
                    { label: "Base 시나리오 전망", id: "page-65" },
                    { label: "Bull 시나리오 전망", id: "page-66" },
                    { label: "Bear 시나리오 방어력", id: "page-67" },
                    { label: "Flight-to-Quality", id: "page-68" }
                ]
            }""", """            {
                title: "Chapter 4. 서울 오피스 시장 2030~2040 전망",
                id: "page-63",
                items: [
                    { label: "7축 메가 권역 팽창", id: "page-64" },
                    { label: "Base 시나리오 전망", id: "page-65" },
                    { label: "Bull 시나리오 전망", id: "page-66" },
                    { label: "Bear 시나리오 방어력", id: "page-67" },
                    { label: "Flight-to-Quality", id: "page-68" }
                ]
""" + new_chapter_5)

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

layout_path = "src/components/MainLayout.jsx"
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_content = f.read()

imports = """import Section65 from './Section65';
import Section66 from './Section66';
import Section67 from './Section67';"""
new_imports = """import Section65 from './Section65';
import Section66 from './Section66';
import Section67 from './Section67';
import Section68 from './Section68';
import Section69 from './Section69';
import Section70 from './Section70';
import Section71 from './Section71';
import Section72 from './Section72';"""
layout_content = layout_content.replace(imports, new_imports)

sections_arr = """<Section65 />, <Section66 />, <Section67 />];"""
new_sections_arr = """<Section65 />, <Section66 />, <Section67 />, <Section68 />, <Section69 />, <Section70 />, <Section71 />, <Section72 />];"""
layout_content = layout_content.replace(sections_arr, new_sections_arr)

layout_content = layout_content.replace("const slidesLength = 68;", "const slidesLength = 73;")

times_arr = """1500, 3000, 3000, 3000, 3000, 3000];"""
new_times_arr = """1500, 3000, 3000, 3000, 3000, 3000, 1500, 3000, 3000, 3000, 3000];"""
layout_content = layout_content.replace(times_arr, new_times_arr)

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_content)

print("Navigation and MainLayout updated successfully.")
