# User Preferences and Rules

## Typography
- **NEVER use letter-spacing (tracking)** on top subtitles (e.g., `tracking-widest`, `tracking-wide`, `tracking-tight`). The user strongly dislikes added tracking on subtitles.
- Prefer slightly larger, bolder titles and text sizes for better readability.
- **[CRITICAL RULE]** 텍스트에 특별한 지시사항이 없는 한 임의로 자간(letter-spacing, tracking) 속성을 절대 넣지 않는다. 사용자가 명시적으로 요구할 때만 추가할 것.
- **[CRITICAL RULE]** 제목 밑의 검은색 분리선(`w-16 h-1 bg-black` 등)은 앞으로 디자인에서 절대 사용하지 않는다.

## UI Layout (Bottom Text)
- **[CRITICAL RULE]** 모든 슬라이드의 하단 설명 텍스트 래퍼는 반드시 다음 클래스를 100% 동일하게 유지한다:
  `mt-[10px] max-w-[1000px] text-[15px] md:text-[19px] leading-[1.45] font-medium text-gray-700 break-keep text-center`
- **[CRITICAL RULE]** 하단 텍스트 내의 리스트(`<ul>`)는 반드시 `text-left inline-block space-y-2 mx-auto` 속성을 유지한다. (임의로 space-y-3 등 간격 조정 절대 금지)
- 쫌생이 핏 절대 금지: 모든 요소는 시원시원하게 배치하되, 이전에 확립된 하단 텍스트 폰트/여백 규격을 임의로 절대 수정하지 않는다.

## Intro Slide Colors (간지 색상 규칙 - 절대 엄수)
- **[CRITICAL RULE] Part 간지색**: 핑크-오렌지 그라데이션 `linear-gradient(90deg, #e04c9a, #f45407)`
- **[CRITICAL RULE] Chapter 간지색**: 시안-블루 그라데이션 `linear-gradient(90deg, #c1e2dd, #587d94)`
- **[CRITICAL RULE]** 새로운 파트나 챕터 간지를 만들 때 위 지정된 색상 외에 임의의 색상(예: 노란색 등)을 절대 사용하지 않는다.

## Content Summarization (본문 요약 규칙 - 절대 엄수)
- **[CRITICAL RULE]** 하단 텍스트나 본문 내용을 작성할 때, 사용자가 준 원문(설명글)을 쫌생이처럼 길게 그대로 베껴 쓰지 않는다.
- 반드시 슬라이드 맥락에 맞게 **핵심 내용만 간추려서 임팩트 있고 세련된 개조식(bullet points)으로 요약/축약**하여 작성한다.

## Slide Structure & Design (슬라이드 구성 및 인포그래픽 방향성)
- **[CRITICAL RULE]** 모든 슬라이드는 아기자기한 느낌을 배제하고, **단단하고 신뢰감 있는 포멀한 톤앤매너**를 유지한다.
- **[CRITICAL RULE]** 슬라이드 구성은 텍스트 나열이 아닌, 정보를 한눈에 이해할 수 있는 **인포그래픽(시각 요소, 카드, 테이블, 다이어그램 등) 중심**으로 계획한다.
- **[CRITICAL RULE]** 중앙 컨텐츠 영역은 디자인이 천편일률적이거나 지루한 템플릿 나열형으로 흐르지 않도록, 기존의 레이아웃 가이드에 얽매이지 않고 SVG 프로세스 플로우, 입체적 관계망 다이어그램, 3각 비교 테이블, 그리드 대시보드 등 표현하고자 하는 원고 맥락에 맞게 자유롭고 다채로운 시각적 인포그래픽 구조를 직접 기획 및 커스텀 디자인하여 적용한다.
- **[CRITICAL RULE]** 박스(Container)를 사용할 경우, 둥근 모서리(`rounded-*`) 사용을 지양하고 **완전한 직사각형**으로 처리한다.
- **[CRITICAL RULE]** 박스의 외곽선은 **직사각형 남색 외곽선**(`border border-[#0f172a]` 또는 네이비 계열)을 사용하여 임팩트와 포멀함을 전달한다.
- **[CRITICAL RULE]** 각 페이지 내 디자인 컴포넌트의 컬러는 가급적 **남색/네이비 계열**로 통일화하며, 필요한 경우에만 포인트 컬러를 제한적으로 사용한다.
- **[CRITICAL RULE]** 슬라이드 기본 레이아웃 구성 요소:
  - **소제목**: 본 슬라이드의 대주제/주체
  - **제목**: 슬라이드가 주장하는 핵심 메시지/결론
  - **컨텐츠**: 시나리오 텍스트가 시각적으로 녹아든 인포그래픽 영역
  - **하단 텍스트**: 규격(`mt-[10px] max-w-[1000px] ...`)에 부합하는 부가 설명

