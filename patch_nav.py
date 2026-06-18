import os
import re

filepath = "src/data/NavigationData.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_chapter = """            },
            {
                title: "Chapter 3. 인구·구조적 변수",
                id: "page-58",
                items: [
                    { label: "인구 다이어트", id: "page-59" },
                    { label: "생산 인구 증발", id: "page-60" },
                    { label: "자본의 대이동", id: "page-61" },
                    { label: "거시 연착륙 전략", id: "page-62" }
                ]
            }"""

# Replace in menuDataEn
content = content.replace("""            {
                title: "Chapter 2. 핵심 산업 모멘텀 시나리오별 전망",
                id: "page-49",
                items: [
                    { label: "AI 반도체 / HBM", id: "page-50" },
                    { label: "AI 데이터센터", id: "page-51" },
                    { label: "로봇 / 휴머노이드", id: "page-52" },
                    { label: "바이오 / 장수의학", id: "page-53" },
                    { label: "방산·우주", id: "page-54" },
                    { label: "K-콘텐츠", id: "page-55" },
                    { label: "양자 / 수소 / 우주", id: "page-56" },
                    { label: "시니어 케어 경제", id: "page-57" }
                ]
            }""", """            {
                title: "Chapter 2. 핵심 산업 모멘텀 시나리오별 전망",
                id: "page-49",
                items: [
                    { label: "AI 반도체 / HBM", id: "page-50" },
                    { label: "AI 데이터센터", id: "page-51" },
                    { label: "로봇 / 휴머노이드", id: "page-52" },
                    { label: "바이오 / 장수의학", id: "page-53" },
                    { label: "방산·우주", id: "page-54" },
                    { label: "K-콘텐츠", id: "page-55" },
                    { label: "양자 / 수소 / 우주", id: "page-56" },
                    { label: "시니어 케어 경제", id: "page-57" }
                ]
""" + new_chapter)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("NavigationData.js patched successfully.")
