import os

def patch_subtitle(content):
    return content.replace('font-black text-[#1d1d1f]', 'font-bold text-[#888]')

# S69 (70p)
with open('src/components/Section69.jsx', 'r', encoding='utf-8') as f:
    s69 = f.read()
s69 = patch_subtitle(s69)
# Title change
s69 = s69.replace('전력 인입 제약이라는 병목이 촉발한<br/>메가 자본의 블랙홀', '전력인입 제약으로 지방 분산가속,<br/>단일 부동산 카테고리로 향후 15년간 가장 큰 자본 흡수 예상')
# 18~22GW text size
s69 = s69.replace('text-[70px] font-black text-[#1d1d1f] mb-2 leading-none', 'text-[50px] md:text-[60px] font-black text-[#1d1d1f] mb-2 leading-none tracking-tighter break-keep')
with open('src/components/Section69.jsx', 'w', encoding='utf-8') as f: f.write(s69)

# S70 (71p)
with open('src/components/Section70.jsx', 'r', encoding='utf-8') as f:
    s70 = f.read()
s70 = patch_subtitle(s70)
# Centering
s70 = s70.replace('className="flex flex-col lg:flex-row w-full max-w-[1100px] mt-[40px] mb-[40px] gap-8"', 'className="flex flex-col lg:flex-row w-full max-w-[1100px] mx-auto justify-center mt-[40px] mb-[40px] gap-8"')
# Arrow
s70 = s70.replace('<div className="text-[40px] text-gray-500 font-black rotate-90 my-2">→</div>', '<div className="text-[40px] text-gray-500 font-black my-2 leading-none">↓</div>')
# 300 text size
s70 = s70.replace('text-[70px] font-black text-yellow-400 leading-none tracking-tighter', 'text-[100px] font-black text-yellow-400 leading-none tracking-tighter')
s70 = s70.replace('text-[40px] text-white', 'text-[50px] text-white font-bold ml-1')
with open('src/components/Section70.jsx', 'w', encoding='utf-8') as f: f.write(s70)

# S71 (72p)
with open('src/components/Section71.jsx', 'r', encoding='utf-8') as f:
    s71 = f.read()
s71 = patch_subtitle(s71)
# Box text
s71 = s71.replace('text-[18px] font-bold text-gray-600 bg-gray-50 border-[2px] border-gray-200 p-4 w-full', 'text-[24px] font-black text-[#1d1d1f] bg-gray-50 border-[3px] border-gray-300 p-8 w-full shadow-inner')
with open('src/components/Section71.jsx', 'w', encoding='utf-8') as f: f.write(s71)

# S72 (73p)
with open('src/components/Section72.jsx', 'r', encoding='utf-8') as f:
    s72 = f.read()
s72 = patch_subtitle(s72)
# Title remove colon
s72 = s72.replace('표준:<br/>로봇·AMR', '표준<br/>로봇·AMR')
# Height reduction
s72 = s72.replace('mt-[40px] mb-[40px]', 'mt-[20px] mb-[20px]')
s72 = s72.replace('p-10 shadow-lg', 'py-6 px-10 shadow-lg')
s72 = s72.replace('mt-6">', 'mt-4">') # gap mt-6 to mt-4
with open('src/components/Section72.jsx', 'w', encoding='utf-8') as f: f.write(s72)

print("Chapter 5 patches applied.")
