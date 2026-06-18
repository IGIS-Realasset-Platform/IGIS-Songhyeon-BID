import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePdf() {
  console.log("Generating premium PDF guideline and specification document (5-page standard)...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // High quality content styling
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <title>AI-Collaborative Web-to-PPTX Conversion Standard Guideline</title>
      <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        
        body {
          font-family: 'Pretendard', -apple-system, sans-serif;
          color: #1e293b;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
        
        .page {
          padding: 50px 60px;
          box-sizing: border-box;
          page-break-after: always;
          min-height: 100vh;
          position: relative;
        }
        
        .page:last-child {
          page-break-after: avoid;
        }
        
        /* Header styling */
        .header {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        
        .header-title {
          font-size: 13px;
          font-weight: 800;
          color: #1e3a8a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .header-project {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }
        
        /* Typography */
        h1 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
          margin-top: 50px;
          margin-bottom: 10px;
          letter-spacing: -0.03em;
        }
        
        .subtitle {
          font-size: 16px;
          color: #475569;
          margin-bottom: 40px;
          font-weight: 500;
        }
        
        h2 {
          font-size: 18px;
          font-weight: 800;
          color: #1e3a8a;
          margin-top: 30px;
          margin-bottom: 12px;
          border-left: 5px solid #1e3a8a;
          padding-left: 12px;
          letter-spacing: -0.01em;
        }
        
        h3 {
          font-size: 15px;
          font-weight: 700;
          color: #334155;
          margin-top: 20px;
          margin-bottom: 8px;
        }
        
        p, li {
          font-size: 13.5px;
          color: #334155;
          margin-bottom: 8px;
          text-align: justify;
        }
        
        ul {
          margin-top: 5px;
          padding-left: 20px;
        }
        
        li {
          margin-bottom: 5px;
        }
        
        code {
          font-family: 'Courier New', Courier, monospace;
          background-color: #f1f5f9;
          color: #0f172a;
          padding: 2px 5px;
          border-radius: 4px;
          font-size: 12.5px;
          font-weight: 600;
        }
        
        pre {
          background-color: #0f172a;
          color: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.5;
          margin: 15px 0;
          font-family: 'Courier New', Courier, monospace;
          white-space: pre-wrap;
          word-break: break-all;
          word-wrap: break-word;
        }
        
        /* Layout elements */
        .meta-box {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
          margin-top: 35px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        
        .meta-label {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        
        .meta-value {
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
        }
        
        /* Tables */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          margin-bottom: 20px;
        }
        
        th {
          background-color: #1e3a8a;
          color: #ffffff;
          font-weight: 700;
          text-align: left;
          padding: 8px 10px;
          font-size: 11.5px;
          border: 1px solid #1e3a8a;
        }
        
        td {
          padding: 8px 10px;
          font-size: 12.5px;
          border: 1px solid #e2e8f0;
          color: #334155;
        }
        
        tr:nth-child(even) td {
          background-color: #f8fafc;
        }
        
        .callout {
          background-color: #eff6ff;
          border-left: 4px solid #2563eb;
          border-radius: 0 8px 8px 0;
          padding: 12px 15px;
          margin: 15px 0;
        }
        
        .callout-title {
          font-weight: 700;
          font-size: 13.5px;
          color: #1e40af;
          margin-bottom: 4px;
        }
        
        .footer {
          position: absolute;
          bottom: 35px;
          left: 60px;
          right: 60px;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 10.5px;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      
      <!-- PAGE 1: TITLE PAGE & OVERVIEW -->
      <div class="page" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="header">
            <span class="header-title">AI-Collaborative Presentation Standard Specification</span>
            <span class="header-project">Enterprise Guideline</span>
          </div>
          
          <h1>Web-to-PPTX 변환 표준 가이드라인 및<br/>AI 프롬프트 엔지니어링 설계 사양서</h1>
          <div class="subtitle">웹 프레젠테이션 엔진의 Native / Hybrid PPTX 포팅 표준 및 AI 지시 규격서</div>
          
          <div class="callout">
            <div class="callout-title">가이드라인 제정 목적</div>
            <p style="margin: 0; font-size: 13px;">본 가이드라인은 React, Vite 및 HTML 기반으로 코딩된 동적 웹 프레젠테이션 문서를 Mac Keynote 및 MS PowerPoint에서 직접 편집 및 이동이 가능한 고품질 PPTX 파일로 자동 변환하기 위한 <strong>기술 규격</strong>과 <strong>AI 지시 표준 프롬프트 규격</strong>을 정의합니다. 본 지침을 준수함으로써 변환 시 흔히 발생하는 텍스트 누락, 레이아웃 깨짐, 배경 상자 유실을 원천적으로 차단합니다.</p>
          </div>
          
          <h2>1. 변환 메커니즘 개요</h2>
          <p>웹 기반 프리젠테이션 사이트의 동적 컴포넌트들을 정확한 메타데이터 좌표로 분해하고, 이를 PPTX 파일 스펙에 부합하는 개별 도형 및 독자적인 텍스트 레이어로 완벽히 분리·재구성하는 메커니즘을 적용합니다. 이를 위해 Puppeteer 헤드리스 크롬 드라이버와 python-pptx 라이브러리를 연동한 자동화 파이프라인을 구축합니다.</p>
        </div>
        
        <div>
          <div class="meta-box">
            <div class="meta-item">
              <span class="meta-label">문서 번호</span>
              <span class="meta-value">IGIS-STD-2026-V1.0</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">최종 개정일</span>
              <span class="meta-value">2026년 6월 15일</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">공동 제정 및 권한자</span>
              <span class="meta-value">기획추진센터</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">적용 대상</span>
              <span class="meta-value">사내 웹 기반 프레젠테이션 산출물 전수</span>
            </div>
          </div>
          
          <div class="footer">
            <span>© 2026 IGIS Asset Management</span>
            <span>Page 1 of 5</span>
          </div>
        </div>
      </div>
      
      <!-- PAGE 2: STRATEGIC STANDARD MODEL RATIONALE -->
      <div class="page">
        <div class="header">
          <span class="header-title">Technical Strategy & Decision Rationale</span>
          <span class="header-project">Web-to-PPTX Conversion</span>
        </div>
        
        <h2>2. 실무형 포팅 전략: 하이브리드-네이티브 결합 표준 모델 채택 배경</h2>
        <p>기존의 완전 네이티브 구현 방식(모든 컨텐츠의 카드, 구분선, 복잡한 인포그래픽 그래픽을 AI가 직접 생성하는 형태)은 한정된 템플릿만으로는 수십 개에 이르는 다양한 가변적 레이아웃을 소화하는 데 명백한 구조적 한계가 존재합니다. 또한 무리한 템플릿 표준화는 전체 페이지를 천편일률적이고 단조롭게 만들어 프레젠테이션의 생동감을 해칠 우려가 있습니다.</p>
        <p>이에 따라 본 사양서는 다음과 같은 의사결정적 근거를 바탕으로 <strong>[하이브리드-네이티브 결합 모델]</strong>을 기업 표준 변환 아키텍처로 선언합니다.</p>
        
        <div class="callout" style="background-color: #f8fafc; border-left-color: #1e3a8a;">
          <div class="callout-title" style="color: #1e3a8a;">[의사결정 Rationale] 왜 하이브리드 결합 모델이 실무 표준인가?</div>
          <p style="margin: 0; font-size: 13px;">
            1. <strong>실무형 편집 범위 분석</strong>: 대표님 및 임원 보고 단계에서 발생하는 오타 정정, 수치 변경, 설명글 수정 요구는 매우 빈번하지만, 이미 정형화되어 디자인 합의를 마친 인포그래픽이나 차트의 구조적 배치를 Keynote 상에서 수정하는 일은 극히 미미합니다.<br/><br/>
            2. <strong>제작 속도 및 가성비 극대화</strong>: 따라서 가장 디자인 재현도가 정확하고 속도가 빠른 스크린샷 배경 이미지 포팅을 근간으로 삼되, 변경 가능성이 높은 <strong>1:1 개별 텍스트 박스</strong>와 비교적 구현이 간단한 <strong>기본 구분선/도형 개체</strong>는 직접 네이티브 객체로 렌더링하여 실무적 편집성을 타협 없이 완전히 확보합니다.
          </p>
        </div>

        <h3>■ 변환 옵션별 장단점 및 채택 기준 표준</h3>
        <table>
          <thead>
            <tr>
              <th style="width: 25%;">변환 옵션</th>
              <th style="width: 35%;">주요 메커니즘</th>
              <th style="width: 40%;">실무적 장단점 및 채택 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>옵션 1: 완전 네이티브</strong></td>
              <td>모든 카드, 그래픽 개체, 차트를 파워포인트 도형 스펙으로 100% 매핑</td>
              <td>수정 범위는 넓으나, 템플릿 다양성 부재 시 디자인이 천편일률적으로 변하고 구현 속도가 매우 느림. (<strong>비채택</strong>)</td>
            </tr>
            <tr>
              <td><strong>옵션 2: 하이브리드 결합<br/>(표준 모델)</strong></td>
              <td>고해상도 템플릿을 배경 이미지로 얹고, 1:1 편집용 텍스트박스 및 기본 구분선을 네이티브로 얹음</td>
              <td>디자인 정합성이 100% 보장되며, 텍스트 편집이 가능하고 제작 및 배포 속도가 극도로 빠름. (<strong>기획추진센터 공식 표준 채택</strong>)</td>
            </tr>
          </tbody>
        </table>
        
        <div class="footer">
          <span>© 2026 IGIS Asset Management</span>
          <span>Page 2 of 5</span>
        </div>
      </div>
      
      <!-- PAGE 3: AI PROMPT STANDARD GUIDELINE -->
      <div class="page">
        <div class="header">
          <span class="header-title">AI Prompting Standard</span>
          <span class="header-project">Web-to-PPTX Conversion</span>
        </div>
        
        <h2>3. 변환 업무 지시용 표준 AI 프롬프트 규격</h2>
        <p>개발자 및 기획자가 AI 어시스턴트에게 새로운 웹-to-PPTX 변환 스크립트 제작을 지시하거나 변환 알고리즘 수정을 요구할 때, 아래의 **표준 구조 프롬프트**를 전달하여 오류를 미연에 방지합니다.</p>
        
        <div class="callout" style="background-color: #f8fafc; border-left-color: #0f172a;">
          <div class="callout-title" style="color: #0f172a;">[지침] AI 지시어 작성 시 필수 포함 5대 지시 제약 조건</div>
          <p style="margin: 0; font-size: 12.5px;">
            1. <strong>1:1 개별 텍스트 박스 분리</strong>: 텍스트 수평/수직 병합 알고리즘 배제 및 모든 텍스트의 독립 textbox 처리 지시.<br/>
            2. <strong>텍스트 투명도 기반 배경 캡처</strong>: visibility:hidden 대신 color:transparent를 적용하여 디자인 테두리 박스 보존 지시.<br/>
            3. <strong>정렬축 보정 가로폭 버퍼</strong>: left, center, right 정렬 상태에 따른 기하학적 기준축 보정 및 너비 확장 수식 주입 지시.<br/>
            4. <strong>인라인 서식 예외 트리 필터</strong>: STRONG, SPAN 등 인라인 태그가 포함된 본문의 부모 단락 묶음 유지 알고리즘 지시.<br/>
            5. <strong>색상/서체 변환 보정 필터</strong>: oklch를 RGB 표준 색상으로 정규화하는 임시 computedStyle Div 상주 및 Pretendard Variable 폰트 강제 적용 지시.
          </p>
        </div>

        <h3>■ 표준 AI 지시 프롬프트 템플릿</h3>
        <p>향후 변환 스크립트 작성 시 AI에게 다음 프롬프트를 복사하여 입력합니다.</p>
        <pre>
[Role] 너는 프레젠테이션 웹 사이트를 PPTX/Keynote용 슬라이드로 변환하는 전문 프론트엔드/자동화 엔지니어다.
[Task] React 웹 슬라이드 주소를 로드하여 편집 가능한 개별 텍스트 레이어가 얹혀진 PPTX 파일 생성 파이프라인을 작성하라.
[Strict Rules]
1. (배경 캡처) 텍스트를 은닉해 배경을 캡처할 때, H1~H6, P, SPAN, STRONG 등 모든 텍스트 태그에 style.color = 'transparent'를 부여하라. style.visibility = 'hidden'은 사용하지 마라. 배경 박스와 테두리 선(Border), 그림자(Shadow)는 온전히 배경 이미지에 포함되어야 한다.
2. (레이아웃 추출) DOM 분석 시 STRONG, SPAN, B, EM, A 같은 인라인 태그는 자식 노드의 좌표를 쪼개지 말고, 부모 노드(LI, P, H1~H6 등) 단위로 전체 문장 텍스트와 좌표를 수집해 문장 유실을 원천적으로 막아라.
3. (텍스트 정렬 보정) 파워포인트 빌드 시 텍스트 상자 너비를 웹의 1.45~1.8배로 확장하되, 정렬선 훼손을 방지하기 위해 다음 수식을 적용하여 X좌표를 보정하라.
   - Left: left = original_x
   - Center: left = (original_x + original_w / 2) - new_w / 2
   - Right: left = (original_x + original_w) - new_w
4. (서체 및 색상) PPTX 텍스트의 Paragraph와 Run 수준 글꼴을 "Pretendard Variable"로 강제 통일하고, oklch 포맷 색상은 rgb 표준 형식으로 변환하여 빌더에 제공하라.</pre>
        
        <div class="footer">
          <span>© 2026 IGIS Asset Management</span>
          <span>Page 3 of 5</span>
        </div>
      </div>
      
      <!-- PAGE 4: TECHNICAL SPECIFICATION (1) -->
      <div class="page">
        <div class="header">
          <span class="header-title">Technical Specifications</span>
          <span class="header-project">Web-to-PPTX Conversion</span>
        </div>
        
        <h2>4. 핵심 기술 해결 방안 및 아키텍처 명세</h2>
        <p>AI가 변환 모듈을 빌드할 때 반드시 구현해야 하는 4대 문제 영역별 구현 공식 및 아키텍처 명세입니다.</p>
        
        <h3>A. 설명글 유실 방지: 태그 인지형 중복/계층 필터링 (extract_layout.js)</h3>
        <p>텍스트 노드가 다른 하위 자식 노드를 포함하고 있을 때, 기하학적 Bounding Box 오차 범위(8px) 이내에서 두 노드의 포함 관계를 비교해 필터링을 수행합니다. 이때 태그 성격에 따라 필터 동작을 명확히 분기합니다.</p>
        
        <table>
          <thead>
            <tr>
              <th style="width: 30%;">태그 성격 및 종류</th>
              <th style="width: 30%;">필터 작동 규칙</th>
              <th style="width: 40%;">설계 목적 및 결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>인라인 태그</strong><br/><code>SPAN</code>, <code>STRONG</code>, <code>B</code>, <code>EM</code>, <code>A</code></td>
              <td>자식 노드를 제거하고,<br/><strong>부모 문장 노드를 보존</strong></td>
              <td>문장 중간에 강조(bold)나 링크가 섞여 있어도 문장 전체가 쪼개지지 않고 통째로 복원됨.</td>
            </tr>
            <tr>
              <td><strong>블록 태그</strong><br/><code>DIV</code>, <code>P</code>, <code>LI</code>, <code>H1~H6</code></td>
              <td>부모 컨테이너를 제거하고,<br/><strong>개별 자식 노드를 보존</strong></td>
              <td>독립적인 데이터 카드나 단락들이 서로 엉키지 않고 각각의 텍스트 박스로 개별 분리됨.</td>
            </tr>
          </tbody>
        </table>

        <h3>B. 중첩 카드 및 테두리(Border) 누락 방지 (capture_backgrounds.js)</h3>
        <p>큰 상자 내에 작은 박스 형태의 UI 카드들이 들어있는 복잡한 디자인 템플릿의 경우, 텍스트 요소를 물리적으로 화면에서 감추면(<code>visibility: hidden</code>) 해당 태그의 배경 테두리 및 음영 그래픽도 함께 소멸됩니다.</p>
        
        <div class="callout">
          <div class="callout-title">해결 공식: Text Transparency Strategy (텍스트 투명화 제어)</div>
          <p style="margin: 0; font-size: 13px;">
            모든 텍스트 노드에 대해 <code>el.style.color = 'transparent'</code>를 부여하여 텍스트의 픽셀 렌더링만 억제합니다. 이 경우 엘리먼트의 물리적 영역(Width, Height)과 CSS 속성(<code>background-color</code>, <code>border</code>, <code>box-shadow</code>)은 100% 정상 작동하므로, 자식 박스가 지워지지 않은 원본 그래픽 상태 그대로 스크린샷 캡처가 가능합니다.
          </p>
        </div>
        
        <div class="footer">
          <span>© 2026 IGIS Asset Management</span>
          <span>Page 4 of 5</span>
        </div>
      </div>
      
      <!-- PAGE 5: TECHNICAL SPECIFICATION (2) -->
      <div class="page">
        <div class="header">
          <span class="header-title">Technical Specifications</span>
          <span class="header-project">Web-to-PPTX Conversion</span>
        </div>
        
        <h3>C. 텍스트 너비 확장 및 정렬 정합성 보정 (build_pptx_*.py)</h3>
        <p>웹 브라우저의 폰트 자간과 Keynote/PPTX 렌더링 엔진의 자간 오차로 인해 긴 텍스트의 끝자락 단어가 강제로 아랫줄로 밀리는 현상이 발생합니다. 이를 방지하기 위해 텍스트 길이와 정렬 방식(textAlign)을 연동한 기하학적 보정 수식을 설계합니다.</p>
        
        <ul>
          <li><strong>너비 확장 버퍼 규칙</strong>: 15자 미만의 짧은 인덱스 텍스트는 <code>width * 1.45</code> 배, 15자 이상의 긴 본문/설명 텍스트는 <code>width * 1.80</code> 배의 너비 확장 버퍼를 적용합니다.</li>
          <li><strong>중심축 정렬선 유지 공식 (Alignment Correction Formular)</strong>:</li>
        </ul>
        
        <table>
          <thead>
            <tr>
              <th style="width: 25%;">텍스트 정렬선</th>
              <th style="width: 45%;">수식 알고리즘 (Python 코드 규격)</th>
              <th style="width: 30%;">비주얼 효과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Left (좌측 정렬)</strong></td>
              <td><code>left = original_x</code><br/><code>width = (original_w * factor) + 40</code></td>
              <td>좌측 시작점은 고정되고 우측 공간만 확장됨.</td>
            </tr>
            <tr>
              <td><strong>Center (중앙 정렬)</strong></td>
              <td><code>cx = original_x + original_w / 2</code><br/><code>left = cx - (original_w * factor) / 2</code></td>
              <td>텍스트의 중앙 기하학적 중심축을 고정한 채 양방향으로 확장됨.</td>
            </tr>
            <tr>
              <td><strong>Right (우측 정렬)</strong></td>
              <td><code>right_edge = original_x + original_w</code><br/><code>left = right_edge - (original_w * factor)</code></td>
              <td>우측 끝 정렬선을 완벽하게 유지하며 좌측 방향으로 확장됨.</td>
            </tr>
          </tbody>
        </table>

        <h3>D. oklch 색상 컴포팅 및 Pretendard Variable 서체 이중 적용</h3>
        <p>파워포인트 텍스트 편집 안전을 위해 텍스트 수집단과 빌더 단 모두에서 서체와 색상을 정화합니다.</p>
        <ol>
          <li><strong>색상 표준화 파서</strong>: 웹 문서에 임시 Div(<code>temp-color-converter</code>)를 상주시켜 브라우저 내부 스타일 시트로 입력된 oklch 값을 정규 <code>rgb(r,g,b)</code>로 변환해 레이아웃 데이터에 적재합니다. 빌더 단의 파서가 혹여 파싱되지 않은 oklch 문자열을 감지하면 안전 예외 필터를 통해 브랜드 지정 블루(<code>#1e3a8a</code>)로 안전 자동 치환합니다.</li>
          <li><strong>이중 서체 주입</strong>: PPTX 개체를 Keynote로 임포트할 시 서체 깨짐을 방지하기 위해 텍스트 프레임 단락(<code>paragraph.font.name</code>)과 개별 텍스트 런(<code>run.font.name</code>) 양쪽에 <code>"Pretendard Variable"</code> 글꼴을 이중으로 강제 적용합니다.</li>
        </ol>

        <h2>5. 변환 품질 관리(QA) 표준 가이드</h2>
        <p>변환이 완료된 PPTX 파일 배포 전, 수집 데이터 검수 스크립트를 통해 다음의 기준을 충족하는지 전수 검증을 거칩니다.</p>
        <ul>
          <li><strong>문장 유실 체크</strong>: 1글자 단위 노드가 과도하게 분절되지 않았으며 리스트 기호만 남고 설명문이 누락된 장표가 없을 것.</li>
          <li><strong>정렬축 체크</strong>: 동일 영역(Tolerance 5px) 내에서 텍스트가 중첩 포개어지는 박스가 없을 것.</li>
        </ul>
        
        <div class="footer">
          <span>© 2026 IGIS Asset Management</span>
          <span>Page 5 of 5</span>
        </div>
      </div>
      
    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(__dirname, 'IOTA_Strategy_PPTX_Conversion_Plan.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });

  console.log(`PDF plan document successfully saved to ${pdfPath}`);
  await browser.close();
}

generatePdf();
