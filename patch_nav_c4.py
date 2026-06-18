import os

filepath = "src/data/NavigationData.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_chapter = """            },
            {
                title: "Chapter 4. 서울 오피스 시장 2030~2040 전망",
                id: "page-63",
                items: [
                    { label: "7축 메가 권역 팽창", id: "page-64" },
                    { label: "Base 시나리오 전망", id: "page-65" },
                    { label: "Bull 시나리오 전망", id: "page-66" },
                    { label: "Bear 시나리오 방어력", id: "page-67" },
                    { label: "Flight-to-Quality", id: "page-68" }
                ]
            }"""

# Replace in menuDataEn
content = content.replace("""            {
                title: "Chapter 3. 인구·구조적 변수",
                id: "page-58",
                items: [
                    { label: "인구 다이어트", id: "page-59" },
                    { label: "생산 인구 증발", id: "page-60" },
                    { label: "자본의 대이동", id: "page-61" },
                    { label: "거시 연착륙 전략", id: "page-62" }
                ]
            }""", """            {
                title: "Chapter 3. 인구·구조적 변수",
                id: "page-58",
                items: [
                    { label: "인구 다이어트", id: "page-59" },
                    { label: "생산 인구 증발", id: "page-60" },
                    { label: "자본의 대이동", id: "page-61" },
                    { label: "거시 연착륙 전략", id: "page-62" }
                ]
""" + new_chapter)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("NavigationData.js patched successfully for Chapter 4.")
