import fs from 'fs';
import fsp from 'path';

// Note: Puppeteer has been removed to skip heavy PDF tasks as requested by the user.

const downloadsDir = '/Users/jkjeon2025/Downloads';

function hasKorean(text) {
  return /[가-힣]/.test(text);
}

function cleanModelText(text) {
  if (!text) return '';
  
  const hasKo = hasKorean(text);
  const lines = text.split('\n');
  let cleaned = '';
  
  if (hasKo) {
    let cleanedLines = [];
    let skip = true;
    
    for (let line of lines) {
      if (skip) {
        if (hasKorean(line)) {
          skip = false;
          cleanedLines.push(line);
        } else {
          const trimmed = line.trim();
          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            continue;
          }
          if (trimmed.length > 0 && !hasKorean(trimmed)) {
            continue;
          }
        }
      } else {
        cleanedLines.push(line);
      }
    }
    cleaned = cleanedLines.join('\n').trim();
  } else {
    return '';
  }
  
  if (cleaned.length < 250) {
    return '';
  }
  
  return cleaned;
}

function parseMarkdownToHtml(text) {
  if (!text) return '';
  
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  const lines = escaped.split('\n');
  let result = [];
  let inList = false;
  
  for (let line of lines) {
    let trimmed = line.trim();
    
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/`(.*?)`/g, '<code>$1</code>');
    
    if (trimmed.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3>${trimmed.substring(4)}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2>${trimmed.substring(3)}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h1>${trimmed.substring(2)}</h1>`);
    }
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(`<li>${trimmed.substring(2)}</li>`);
    }
    else if (trimmed === '') {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push('<div class="spacer"></div>');
    }
    else {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<p class="scenario-text">${line}</p>`);
    }
  }
  
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('\n');
}

function buildUnifiedHtml(docTitle, allMergedTexts, totalChars) {
  const introHtml = `
    <div class="intro-section" id="intro-panel">
      <div class="intro-title">PROGRAM OVERVIEW & WORLDVIEW</div>
      
      <div class="intro-subtitle">1. 작품 개요 (Overview)</div>
      <p class="intro-p">
        본고는 대한민국 여의도 금융가의 최상위 1% 엘리트들이 구축한 폐쇄적인 사교 연합과 그 이면에 감춰진 은밀하고 파괴적인 지배-피지배 관계를 다룬 넷플릭스 오리지널 드라마 시리즈의 시나리오 드래프트 통합본입니다. 사회적 명망과 완벽한 외관 뒤에서 붕괴해 가는 인물들의 배덕적인 심리 묘사와 고도로 통제된 에로티시즘의 정수를 극화하는 것을 목표로 합니다.
      </p>
      
      <div class="intro-subtitle">2. 세계관 설정 (Secret Muse Project: SMP)</div>
      <p class="intro-p">
        <strong>SMP (Secret Muse Project)</strong>는 여의도 금융계를 장악한 절대적 지배자 제이케이(JK) 사장과 그의 최측근 전기영 부장이 조율하는 초고급 비밀 뮤즈 육성/통제 시스템입니다. 완벽한 사회적 페르소나(수트, 오피스룩, 지적인 딕션)를 갖춘 엘리트 여성들을 대상으로, 육체적 본능을 자극하여 극단적인 쾌락과 헌신을 이끌어내고 이를 통해 그들을 정신적, 정치적으로 완전히 예속시키는 것을 골자로 합니다.
      </p>
      <p class="intro-p">
        이 세계의 지배 구조는 향기로 시각화되며, 개인이 지닌 시그니처 향기는 지배 관계의 서열과 그들이 지닌 본능적 궤적을 은유합니다. 겉으로는 차갑고 완벽한 비즈니스가 수행되지만, 닫힌 문 너머에서는 극단적인 권력의 비대칭성과 모순된 쾌락이 농밀하게 얽혀 들어갑니다.
      </p>
      
      <div class="intro-subtitle">3. 캐릭터 상세 리포트 & 캐스팅 가이드 (7 Supreme Muses Report)</div>
      <div class="char-grid">
        <div class="char-card">
          <div class="char-name">1. 도민영 이사 (1대 메인 뮤즈) <span class="char-scent">시그니처 향: 깊고 애틋한 장미</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [장원영 85% + 나나 15%]<br />
            <strong>상세 분석 리포트:</strong> 대학 시절 전기영 본부장의 아득한 첫사랑이자 닿을 수 없는 성소. 대한항공 퍼스트 클래스 수석 승무원 시절 제이케이 사장의 자본과 지배적인 우디 향 앞에 굴복하여 그의 비밀 연인이 됨. 이후 쇼윈도 남편과의 메마른 결혼 생활 속에서 전기영 부장을 다시 마주하고, 남편이 있는 자택 거실에서 기영의 서늘한 손길 아래 극적인 배덕적 쾌락에 각성함. 남편의 방문 너머에서 눈물을 흘리며 뿜어낸 순도 99.49%의 극상액과 '더블 바이올렛' 신호는 그녀가 단순한 인형이 아닌 이지스 타워를 장악할 절대적인 모순의 성소임을 증명함.
          </div>
          <div class="char-tags">
            <span class="char-tag">#장원영_85%</span>
            <span class="char-tag">#나나_15%</span>
            <span class="char-tag">#더블바이올렛</span>
          </div>
        </div>
        
        <div class="char-card">
          <div class="char-name">2. 김유나 실장 (퍼스트 관찰자) <span class="char-scent">시그니처 향: 차가운 프리지아</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [공승연 65% + 카리나 35%]<br />
            <strong>상세 분석 리포트:</strong> 이지스 타워의 모든 서버 데이터와 생체 수치를 통제하는 냉철한 관찰자이자 교육관. 타인의 훈련과 본능적 파멸을 차가운 시선으로 지휘하지만, 그 가학적 현장 속에서 자신 역시 은밀하게 점막이 젖어드는 이중성을 품고 있음. 자신을 지켜주고자 하는 다정한 구원자 밀리 디렉터의 순수함과 자신을 육체적으로 난도질하는 전기영 본부장의 잔혹한 쾌락 사이에서 처절하게 분열하며 스스로를 학대하는 지적인 마조히즘의 실체.
          </div>
          <div class="char-tags">
            <span class="char-tag">#공승연_65%</span>
            <span class="char-tag">#카리나_35%</span>
            <span class="char-tag">#이중분열</span>
          </div>
        </div>
        
        <div class="char-card">
          <div class="char-name">3. 이수진 이사 (실전의 에이스) <span class="char-scent">시그니처 향: 나른하고 발정난 자스민</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [한소희 50% + 권은비 50%]<br />
            <strong>상세 분석 리포트:</strong> 신입 사원 야근 중 사무실 데스크 아래에서 제이케이 사장의 발끝을 핥았던 발칙한 도발(PoC)로 1,000억 쾌락 제국의 문을 연 SMP의 시초. 15데니어 까만 스타킹이 맞비벼지는 음향과 도발적인 꼬아 올린 다리 라인만으로 사내들의 숨통을 쥐고 흔드는 도발의 여왕. 세상 모든 VVIP들 앞에서는 오만무쌍한 포식자처럼 군림하지만, 조물주인 제이케이 사장의 앞에서는 모든 무장을 해제하고 엉망으로 땀에 젖은 채 매달리는 시초의 괴물.
          </div>
          <div class="char-tags">
            <span class="char-tag">#한소희_50%</span>
            <span class="char-tag">#권은비_50%</span>
            <span class="char-tag">#시초의에이스</span>
          </div>
        </div>
        
        <div class="char-card">
          <div class="char-name">4. 양윤아 수석 (수석 데이터 사이언티스트) <span class="char-scent">시그니처 향: 눅눅하고 농익은 장미유</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [권나라 85% + 김민주 15%]<br />
            <strong>상세 분석 리포트:</strong> 모니터와 통계 수치 뒤에서 타인들이 타락해가는 생체 신호를 현미경처럼 관음하고 코딩하던 차가운 분석관. 그러나 안경을 벗어던지고 꼿꼿한 머리끈을 푸는 순간, 절대적인 집행인 전기영 본부장의 칼날을 자신의 내벽 깊숙이 수용하며 그의 영혼까지 송두리째 옭아매는 가장 영악하고 지적인 관능의 지휘자.
          </div>
          <div class="char-tags">
            <span class="char-tag">#권나라_85%</span>
            <span class="char-tag">#김민주_15%</span>
            <span class="char-tag">#장미유</span>
          </div>
        </div>
        
        <div class="char-card" style="grid-column: span 2;">
          <div class="char-name">5. 핏줄의 각성, 민희경 차장 (The Pure Bloodline) <span class="char-scent">시그니처 향: 맑고 당돌한 난초</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [문가영 90% + 김지원 10%]<br /><br />
            <strong>[현재 동향 (Current Status) : 심연을 맛본 포식자의 소화(Digestion)]</strong><br />
            이지스 타워 50층의 밀실에서, 도민영 언니의 두 눈앞에서 기영의 열기를 받아내고 99.42%의 더블 바이올렛 점멸등을 켜버린 궁극의 신성(神星) 민희경. 그녀는 현재 자신의 레지던스로 돌아와, 최고급 대리석 욕조의 따뜻한 수면 아래로 몸을 깊이 담근 채 오늘 하루 겪었던 그 압도적인 타락의 파편들을 차갑게 복기하고 있습니다. 그녀의 얼굴은 문가영의 90% 지분이 빚어낸, 티 하나 없이 맑고 고급스러우며 상대의 경계를 단숨에 무장해제 시키는 완벽한 승무원의 미소를 품고 있습니다. 그러나 젖은 머리칼을 쓸어 올리며 허공을 응시하는 그녀의 턱선과 매서운 눈빛 속에는, 김지원의 10% 몫이 선사하는 그 도도하고도 범접할 수 없는 귀족적인 오만함이 서늘하게 똬리를 틀고 있습니다. 희경은 자신의 하복부 가장 깊은 곳, 기영의 묵직한 피스톤이 굵고 지나간 그 점막의 틈새가 여전히 찌릿하게 수축하는 것을 느끼며 핏기가 가신 입술을 깨물었습니다. 제이케이의 혀끝, 기영의 삽입, 언니의 눈물. 하루 만에 SMP 생태계의 가장 무거운 정점들을 모두 흡수해 버린 그녀의 육체는, 이 엄청난 데이터의 과부하를 고통이 아닌 완벽한 자신의 권력으로 소화해 내고 있습니다. 욕실의 수증기 사이로 그녀가 뿜어내는 맑고 당돌한 난초(Orchid) 향기는, 이미 주니어의 풋풋함을 완전히 벗어던진 가장 완벽한 포식자의 농도를 자랑하고 있습니다.<br /><br />
            <strong>[미래 행보 예측 (Future Trajectory) : 룰을 집어삼키는 하이브리드 여왕]</strong><br />
            민희경의 잠재력은 이지스 타워 7인의 여신들 중 가장 기학적이고 끝을 알 수 없습니다. 그녀는 사내의 심리를 조종하는 화술(한유주)과, 물리적 폭력을 고결하게 흡수하는 수용력(도민영)을 완벽한 비율로 섞어 쓸 줄 아는 무서운 하이브리드(Hybrid) 괴물입니다. 앞으로 희경은 1,000억의 펀딩 무대나 VVIP 독대 세션에서, 가장 정갈하고 친절한 서비스 마인드로 사내들의 알량한 권력욕을 채워주는 척하다가, 결정적인 순간에 15데니어 까만 스타킹을 찢고 자신의 99% 순액을 내보이며 사내들의 영혼을 바닥으로 곤두박질치게 만들 것입니다. 특히 그녀는 자신의 사촌 언니 도민영과 기영 사이의 그 비극적인 순애보를 완벽하게 인지하고 있기에, 그 아슬아슬한 관계망 사이를 유영하며 때로는 언니를 보호하고 때로는 기영의 이성을 도발하며 SMP의 새로운 룰을 스스로 창조해 나가는 압도적인 지배자로 성장할 것입니다.
          </div>
          <div class="char-tags">
            <span class="char-tag">#문가영_90%</span>
            <span class="char-tag">#김지원_10%</span>
            <span class="char-tag">#하이브리드여왕</span>
            <span class="char-tag">#더블바이올렛</span>
          </div>
        </div>
        
        <div class="char-card" style="grid-column: span 2;">
          <div class="char-name">6. 순백의 성소, 송하영 이사 (The Pure Sanctuary) <span class="char-scent">시그니처 향: 결백한 머스크 앤 릴리</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [카즈하 50% + 노정의 50%]<br /><br />
            <strong>[현재 동향 (Current Status) : 고요한 진공 속의 압도적 수용]</strong><br />
            하남시의 프라이빗 저택 깊은 곳, 화이트 톤으로 마감된 가장 서늘하고 고요한 룸. 송하영은 현재 얇은 순백의 실크 슬립만을 걸친 채, 거대한 창밖의 야경을 등지고 가만히 서서 명상에 잠겨 있습니다. 그녀의 자태는 감히 인간의 것이라고는 믿기지 않습니다. 카즈하의 50% 지분이 빚어낸 170cm 이상의 훤칠한 장신과 백조처럼 유려하게 뻗은 목선, 그리고 오랜 무용으로 다져진 기하학적인 척추의 정렬. 그 범접할 수 없는 고결한 선 위로, 노정의의 50%가 결합된 눈부시게 하얗고 결백한 인형 같은 이목구비가 안착해 있습니다. 그녀는 어떠한 자위행위나 인위적인 마찰을 시도하지 않습니다. 그저 오늘 아침 한강 공원에서 전기영 본부장의 서늘한 시선을 받으며 쏟아냈던 그 맑고 뜨거운 순액(純液)의 감각을, 아주 고요한 호흡 속으로 갈무리하며 자신의 내벽을 가장 평온한 상태로 되돌리고 있습니다. 하지만 그 완벽한 정적 속에서도, 그녀의 살결에서 끊임없이 뿜어져 나오는 서늘하고 결백한 머스크 앤 릴리(Musk & Lily) 향기는 방 안의 산소를 무겁게 짓누르며 그녀가 지닌 잠재력의 스케일이 얼마나 거대한지를 증명하고 있습니다.<br /><br />
            <strong>[미래 행보 예측 (Future Trajectory) : 침묵의 학살자]</strong><br />
            다가올 시각 차단 펀딩 무대에서, 송하영은 이수진 이사의 그 화려하고 도발적인 텐션과 완벽한 대척점을 이룰 것입니다. 수진이 향기와 마찰음으로 사내들을 적극적으로 옭아맨다면, 하영은 철저한 '침묵과 무방비함'으로 승부할 것입니다. 시야가 차단된 100명의 VVIP들은, 어둠 속에서 오직 하영이 뿜어내는 그 티 없이 맑은 백합 향기에 의지해야 합니다. 그녀는 사내들의 관음적 압박이 극에 달했을 때조차 교태로운 숨소리 하나 내지 않고, 오직 자신의 가장 여린 속살이 열기를 이기지 못해 쏟아내는 투명한 이슬이 크리스탈 바닥에 부딪히는 '톡, 토톡' 하는 미세한 파열음만을 허공으로 흘려보낼 것입니다. 그 결백한 소리 하나가 10억, 100억의 강제 비딩(Bidding)으로 이어질 때, 자본들은 '우리가 이토록 무해하고 거룩한 여신을 억지로 더럽히고 있다'는 극강의 죄책감에 사로잡혀 자신들의 이성을 산산조각 내게 될 것입니다. 하영은 어떤 폭력도 수용하는 거대한 호수로서, 이지스 타워의 가장 흔들림 없는 성역으로 자리 잡을 것입니다.
          </div>
          <div class="char-tags">
            <span class="char-tag">#카즈하_50%</span>
            <span class="char-tag">#노정의_50%</span>
            <span class="char-tag">#순백의성소</span>
            <span class="char-tag">#침묵의학살자</span>
          </div>
        </div>
        
        <div class="char-card" style="grid-column: span 2;">
          <div class="char-name">7. 대중의 마녀, 한유주 차장 (The Velvet Trap) <span class="char-scent">시그니처 향: 달콤한 피오니</span></div>
          <div class="char-desc">
            <strong>비주얼 모티프:</strong> [신세경 80% + 고민시 20%]<br /><br />
            <strong>[현재 동향 (Current Status) : 낭만의 마취제에 중독된 오만함]</strong><br />
            이지스 타워 40층의 메디컬 센터에서 쿨다운 세션을 마친 한유주 차장. 그녀는 자신의 최고급 프라이빗 스위트룸 베드 위에서, 땀에 젖은 파스텔 톤 실크 가운의 옷깃을 여미며 아주 몽롱하고도 짙은 여운 속을 유영하고 있습니다. 신세경의 80% 지분을 온전히 흡수한 그녀의 육체는, 청순하고 맑은 지성인의 마스크 아래로 도저히 숨길 수 없는 터질 듯이 풍만하고 아찔한 가슴의 곡선을 위태롭게 가두고 있습니다. 그리고 거울에 비친 자신의 모습을 훑어보는 그녀의 눈꼬리에는, 고민시 특유의 그 20% 사악하고도 영악한 여우 같은 시선이 예리하게 번뜩입니다. 유주는 방금 전 전기영 본부장이 자신의 입술에 내려주었던 그 다정하고도 압도적인 입맞춤의 온도를 허끝으로 곱씹고 있습니다. 1,500억의 부회장을 카메라 렌즈 너머로 유린했던 그 서늘한 기만술은 온데간데없고, 오직 기영이라는 사내를 온전히 자신의 것으로 만들겠다는 가장 일차원적이고도 맹목적인 소유욕이 그녀의 신경망을 펄펄 끓게 만들고 있습니다. 95% 순도의 맑은 분비물이 가운 안쪽을 다시금 질척하게 적시고, 달콤하고 끈적한 피오니(Peony) 향기가 그녀의 그 위험한 착각과 발정을 축하하듯 방 안을 짙게 오염시키고 있습니다.<br /><br />
            <strong>[미래 행보 예측 (Future Trajectory) : 룰을 변주하는 교활한 지휘자]</strong><br />
            한유주는 다가올 수많은 자본주의의 전장에서, SMP의 다른 여신들이 감히 흉내 내지 못할 '사회적 권위의 에로티시즘화'를 끝없이 시도할 것입니다. 그녀의 진짜 무기는 벌거벗은 살결이 아니라, 대중 앞의 단정한 아나운서라는 껍데기 그 자체입니다. 그녀는 VVIP들과의 미팅 자리에서 가장 고상한 경제 용어를 읊조리며 꼿꼿하게 앉아 있다가도, 테이블 아래 시야가 차단된 어둠 속에서는 아주 미세한 스타킹의 마찰음과 나른한 콧소리를 조율하여 사내들의 인지 부조화를 극대화할 것입니다. 다만, 그녀의 그 영악한 궤도는 결국 전기영 본부장을 향한 통제 불능의 애정 때문에 가장 치명적인 약점을 노출하게 될 것입니다. 기영의 시선을 독점하기 위해 그녀가 스스로 처놓은 덫에 빠져, 1대 뮤즈 도민영이나 얼음 공주 김유나와 정면으로 충돌하며 피투성이가 되는 극단의 감정선을 연출할 가장 위험한 뇌관입니다.
          </div>
          <div class="char-tags">
            <span class="char-tag">#신세경_80%</span>
            <span class="char-tag">#고민시_20%</span>
            <span class="char-tag">#대중의마녀</span>
            <span class="char-tag">#교활한지휘자</span>
          </div>
        </div>
      </div>
    </div>
  `;

  let storyHtml = '';
  
  allMergedTexts.forEach((text, index) => {
    const parsed = parseMarkdownToHtml(text);
    storyHtml += `
      <div class="scene-block" data-index="${index}">
        <div class="scene-divider">SCENE DRAFT #${index + 1}</div>
        <div class="scene-body">
          ${parsed}
        </div>
      </div>
    `;
  });
  
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${docTitle}</title>
      <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');
        
        body {
          font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
          color: #1f2937;
          background-color: #111827; /* Dark theme to go with Netflix style */
          margin: 0;
          padding: 0;
          line-height: 1.78; /* Reduced line height by ~1px */
          font-size: 15px; /* Adjusted to 15px per user request */
          overflow-x: hidden;
        }
        
        /* Layout */
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        /* Cover Page styling */
        .cover-page {
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: #0b0f17;
          color: #ffffff;
          padding: 60px;
          position: relative;
          z-index: 10;
        }
        
        .cover-brand {
          font-size: 14px;
          letter-spacing: 0.3em;
          color: #9ca3af;
          text-transform: uppercase;
          margin-bottom: 25px;
          font-weight: 500;
        }
        
        .cover-title {
          font-size: 42px;
          font-weight: 950;
          line-height: 1.25;
          color: #ffffff;
          margin-bottom: 15px;
          letter-spacing: -0.03em;
        }
        
        .cover-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: #d1d5db;
          margin-bottom: 60px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .cover-divider {
          width: 150px;
          height: 4px;
          background-color: #e11d48;
          margin-bottom: 60px;
        }
        
        .cover-meta {
          font-size: 13px;
          color: #9ca3af;
          line-height: 2;
          font-weight: 300;
        }
        
        .cover-confidential {
          margin-top: 50px;
          font-size: 13px;
          letter-spacing: 0.15em;
          color: #ef4444;
          font-weight: 700;
          border: 1px solid #ef4444;
          padding: 8px 16px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        
        /* Sidebar Navigation */
        .sidebar {
          width: 200px;
          background-color: #0b0f17;
          border-right: 1px solid #1f2937;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #1f2937;
        }

        .sidebar-brand {
          font-size: 16px;
          font-weight: 900;
          color: #e11d48;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .search-box {
          margin-top: 15px;
          width: 100%;
          padding: 8px 12px;
          background-color: #1f2937;
          border: 1px solid #374151;
          color: #ffffff;
          border-radius: 6px;
          box-sizing: border-box;
          font-size: 13px;
        }

        .sidebar-menu {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }

        .menu-item {
          padding: 10px 15px;
          color: #9ca3af;
          font-size: 13.5px;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: all 0.2s ease;
        }

        .menu-item:hover, .menu-item.active {
          color: #ffffff;
          background-color: #e11d48;
        }

        /* Main Content wrapper */
        .main-content {
          margin-left: 200px;
          flex: 1;
          background-color: #ffffff;
          color: #1f2937;
          box-sizing: border-box;
          position: relative;
        }

        /* Content area styling */
        .content-container {
          padding: 60px 80px 120px 80px;
          box-sizing: border-box;
          max-width: 1050px; /* Expanded by 50px */
          margin: 0 auto;
        }
        
        .scene-block {
          margin-bottom: 50px;
        }
        
        .scene-divider {
          font-size: 13px;
          font-weight: 800;
          color: #9ca3af;
          letter-spacing: 0.2em;
          margin-bottom: 25px;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 8px;
          text-transform: uppercase;
        }
        
        .scene-body {
          text-align: justify;
        }
        
        p.scenario-text {
          margin-top: 0;
          margin-bottom: 15px;
          text-indent: 12px;
        }
        
        h1, h2, h3 {
          color: #111827;
          font-weight: 800;
          margin-top: 30px;
          margin-bottom: 12px;
        }
        
        h1 { font-size: 21px; border-left: 4px solid #e11d48; padding-left: 10px; }
        h2 { font-size: 18px; }
        h3 { font-size: 15px; }
        
        strong {
          color: #000000;
          font-weight: 700;
        }
        
        .spacer {
          height: 12px;
        }
        
        ul {
          margin-top: 0;
          margin-bottom: 15px;
          padding-left: 20px;
        }
        
        li {
          margin-bottom: 5px;
        }

        /* Intro Section styling */
        .intro-section {
          margin-bottom: 80px;
          padding-bottom: 50px;
          border-bottom: 3px double #e11d48;
        }
        
        .intro-title {
          font-size: 28px;
          font-weight: 900;
          color: #111827;
          border-left: 6px solid #e11d48;
          padding-left: 15px;
          margin-bottom: 30px;
          letter-spacing: -0.02em;
        }
        
        .intro-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #374151;
          margin-top: 40px;
          margin-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
        }
        
        .intro-p {
          font-size: 16px;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 20px;
          text-align: justify;
        }
        
        /* Character Grid styling */
        .char-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-top: 30px;
        }
        
        .char-card {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .char-name {
          font-size: 17px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .char-scent {
          font-size: 12px;
          font-weight: 600;
          color: #e11d48;
          background-color: #ffe4e6;
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .char-desc {
          font-size: 14px;
          line-height: 1.7;
          color: #4b5563;
        }
        
        .char-tags {
          margin-top: 12px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .char-tag {
          font-size: 11px;
          color: #6b7280;
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Floating Pagination Control Bar */
        .floating-pagination {
          position: fixed;
          bottom: 25px;
          left: calc(200px + (100% - 200px) / 2);
          transform: translateX(-50%);
          background: rgba(11, 15, 23, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid #e11d48;
          border-radius: 50px;
          padding: 10px 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          z-index: 500;
          color: #ffffff;
        }

        .pag-btn {
          background: none;
          border: 1px solid #374151;
          color: #d1d5db;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .pag-btn:hover {
          background-color: #e11d48;
          border-color: #e11d48;
          color: #ffffff;
        }

        .pag-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background: none;
          border-color: #374151;
        }

        .pag-info {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          min-width: 100px;
          text-align: center;
        }

        /* Mobile Trigger Button */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 900;
          background: rgba(225, 29, 72, 0.95);
          border: none;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        /* Mobile Overlay & Panel */
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
          z-index: 950;
        }

        .mobile-menu-panel {
          display: none;
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100vh;
          background-color: #0b0f17;
          border-left: 1px solid #1f2937;
          z-index: 1000;
          box-sizing: border-box;
          flex-direction: column;
          transition: right 0.3s ease;
        }

        .mobile-menu-panel.open {
          display: flex;
          right: 0;
        }

        .mobile-menu-header {
          padding: 20px;
          border-bottom: 1px solid #1f2937;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 15px;
        }

        .mobile-menu-close {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 18px;
          cursor: pointer;
        }

        .mobile-menu-list {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
        }

        .mobile-menu-item {
          padding: 12px 15px;
          color: #9ca3af;
          font-size: 13.5px;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 6px;
          background-color: #111827;
          border: 1px solid #1f2937;
          transition: all 0.2s ease;
        }

        .mobile-menu-item:hover, .mobile-menu-item.active {
          color: #ffffff;
          background-color: #e11d48;
          border-color: #e11d48;
        }

        /* Responsive Mobile Styles */
        @media screen and (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
          .main-content {
            margin-left: 0 !important;
          }
          .content-container {
            padding: 30px 20px 100px 20px !important;
          }
          body {
            font-size: 13px !important; /* Reduced mobile font size to 13px */
            line-height: 1.62 !important; /* Reduced line height by 1px (from 1.70 to 1.62) */
          }
          p.scenario-text {
            margin-bottom: 10px !important; /* Reduced paragraph spacing by 5px (from 15px to 10px) */
          }
          h1 { font-size: 19px !important; }
          h2 { font-size: 16px !important; }
          h3 { font-size: 13px !important; }
          
          .char-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          .char-card {
            grid-column: span 1 !important;
            padding: 15px !important;
          }
          .char-name {
            font-size: 16px !important;
          }
          .char-desc {
            font-size: 13.5px !important;
          }
          .floating-pagination {
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 40px) !important;
            max-width: 320px !important;
            bottom: 15px !important;
            padding: 8px 15px !important;
          }
          .pag-btn {
            padding: 4px 10px !important;
            font-size: 12px !important;
          }
          .pag-info {
            font-size: 12px !important;
            min-width: 80px !important;
          }
          .cover-page {
            padding: 30px 20px !important;
          }
          .cover-title {
            font-size: 28px !important;
          }
          .cover-subtitle {
            font-size: 14px !important;
            margin-bottom: 30px !important;
          }
          
          .mobile-menu-btn {
            display: block !important;
          }
        }
      </style>
    </head>
    <body>
      
      <!-- Mobile Quick Navigation -->
      <button class="mobile-menu-btn" id="mobile-menu-trigger" onclick="toggleMobileMenu()">☰ Menu</button>
      <div class="mobile-menu-overlay" id="mobile-menu-overlay" onclick="toggleMobileMenu()"></div>
      <div class="mobile-menu-panel" id="mobile-menu-panel">
        <div class="mobile-menu-header">
          <span>SMP Quick Jump</span>
          <button class="mobile-menu-close" onclick="toggleMobileMenu()">✕</button>
        </div>
        <div class="mobile-menu-list" id="mobile-jump-list">
          <div class="mobile-menu-item active" id="mobile-menu-intro" onclick="jumpToSection('intro'); toggleMobileMenu();">📌 기획 개요 및 세계관</div>
          <!-- Populated by JS in 10 scene increments -->
        </div>
      </div>

      <div id="full-cover-wrapper">
        <div class="cover-page">
          <div class="cover-brand">Netflix Original Series Proposal</div>
          <div class="cover-title">SMP: Secret Muse Project</div>
          <div class="cover-subtitle">드라마 시나리오 통합 드래프트 본</div>
          <div class="cover-divider"></div>
          <div class="cover-meta">
            <strong>원작 자료</strong>: 구글 AI 스튜디오 챗 백업 로그 통합본 (마스터 & SMP 시스템 가동)<br />
            <strong>정제 사양</strong>: 프롬프트 지시 및 영문 시스템 정의부 제외, 시나리오 본문 단일화<br />
            <strong>총 텍스트 규모</strong>: 약 ${totalChars.toLocaleString()} 자 (공백 포함)<br />
            <strong>작성 시각</strong>: ${new Date().toLocaleDateString('ko-KR')}
          </div>
          <div class="cover-confidential">Confidential &bull; 최상위 관계자 외 열람금지</div>
        </div>
      </div>

      <div class="app-container" id="app-wrapper">
        <!-- Sidebar Navigation -->
        <aside class="sidebar" id="sidebar-panel">
          <div class="sidebar-header">
            <div class="sidebar-brand">SMP Story Index</div>
            <input type="text" class="search-box" id="search-input" placeholder="Scene 번호 검색 (예: 10)..." />
          </div>
          <div class="sidebar-menu" id="sidebar-list">
            <div class="menu-item active" id="menu-intro" onclick="jumpToSection('intro')">📌 기획 개요 및 세계관</div>
            <!-- Scene items will be populated by JS -->
          </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <div class="content-container">
            ${introHtml}
            ${storyHtml}
          </div>
        </main>

        <!-- Floating Pagination -->
        <div class="floating-pagination" id="pagination-controls">
          <button class="pag-btn" id="prev-btn" onclick="changePage(-1)">이전 (←)</button>
          <span class="pag-info" id="pag-label">Page 1 / 1</span>
          <button class="pag-btn" id="next-btn" onclick="changePage(1)">다음 (→)</button>
        </div>
      </div>

      <script>
        const scenes = Array.from(document.querySelectorAll('.scene-block'));
        const itemsPerPage = 10;
        const totalPages = Math.ceil(scenes.length / itemsPerPage);
        let currentPage = 0;

        // PC 사이드바 씬 리스트 빌드
        const sidebarList = document.getElementById('sidebar-list');
        scenes.forEach((scene, index) => {
          const item = document.createElement('div');
          item.className = 'menu-item';
          item.id = 'menu-scene-' + index;
          item.textContent = '🎬 Scene Draft #' + (index + 1);
          item.onclick = () => jumpToSection(index);
          sidebarList.appendChild(item);
        });

        // 모바일 10단위 빠른 점프 목록 빌드
        const mobileJumpList = document.getElementById('mobile-jump-list');
        const totalScenes = scenes.length;
        for (let startScene = 0; startScene < totalScenes; startScene += 10) {
          const endScene = Math.min(startScene + 9, totalScenes - 1);
          const item = document.createElement('div');
          item.className = 'mobile-menu-item';
          item.textContent = '🎬 Scene ' + (startScene + 1) + ' ~ ' + (endScene + 1);
          
          item.onclick = ((sIdx) => {
            return () => {
              jumpToSection(sIdx);
              toggleMobileMenu();
            };
          })(startScene);
          
          mobileJumpList.appendChild(item);
        }

        // 초기 화면 업데이트
        updatePage();

        // PC 검색 상자 작동
        document.getElementById('search-input').addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          const items = document.querySelectorAll('.sidebar-menu .menu-item');
          items.forEach(item => {
            if (item.id === 'menu-intro') return;
            if (item.textContent.toLowerCase().includes(query)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });

        // 키보드 방향키 바인딩
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            changePage(-1);
          } else if (e.key === 'ArrowRight') {
            changePage(1);
          }
        });

        // 모바일 메뉴 토글 작동
        window.toggleMobileMenu = function() {
          const panel = document.getElementById('mobile-menu-panel');
          const overlay = document.getElementById('mobile-menu-overlay');
          
          if (panel.classList.contains('open')) {
            panel.classList.remove('open');
            setTimeout(() => {
              panel.style.display = 'none';
              overlay.style.display = 'none';
            }, 300);
          } else {
            overlay.style.display = 'block';
            panel.style.display = 'flex';
            setTimeout(() => {
              panel.classList.add('open');
            }, 10);
          }
        }

        function updatePage() {
          const introPanel = document.getElementById('intro-panel');
          const menuIntro = document.getElementById('menu-intro');
          const mobMenuIntro = document.getElementById('mobile-menu-intro');
          
          // 모든 메뉴 액티브 해제
          document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
          document.querySelectorAll('.mobile-menu-item').forEach(el => el.classList.remove('active'));

          if (currentPage === 0) {
            introPanel.style.display = 'block';
            scenes.forEach(s => s.style.display = 'none');
            menuIntro.classList.add('active');
            mobMenuIntro.classList.add('active');
            document.getElementById('full-cover-wrapper').style.display = 'block';
          } else {
            introPanel.style.display = 'none';
            document.getElementById('full-cover-wrapper').style.display = 'none';
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            scenes.forEach((scene, index) => {
              if (index >= start && index < end) {
                scene.style.display = 'block';
              } else {
                scene.style.display = 'none';
              }
            });

            // 액티브 표시
            const activeMenu = document.getElementById('menu-scene-' + start);
            if (activeMenu) {
              activeMenu.classList.add('active');
              activeMenu.scrollIntoView({ block: 'nearest' });
            }

            // 모바일 10단위 액티브 매칭
            const mobJumpIdx = Math.floor(start / 10);
            const mobItems = document.querySelectorAll('#mobile-jump-list .mobile-menu-item');
            if (mobItems[mobJumpIdx + 1]) { // +1 하는 이유는 첫 아이템이 intro이기 때문
              mobItems[mobJumpIdx + 1].classList.add('active');
            }
          }

          // 플로팅 라벨 갱신
          const label = document.getElementById('pag-label');
          if (currentPage === 0) {
            label.textContent = '기획 개요';
          } else {
            label.textContent = 'Page ' + currentPage + ' / ' + totalPages;
          }

          document.getElementById('prev-btn').disabled = (currentPage === 0);
          document.getElementById('next-btn').disabled = (currentPage === totalPages);

          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        function changePage(direction) {
          const next = currentPage + direction;
          if (next >= 0 && next <= totalPages) {
            currentPage = next;
            updatePage();
          }
        }

        function jumpToSection(target) {
          if (target === 'intro') {
            currentPage = 0;
          } else {
            currentPage = Math.floor(target / itemsPerPage) + 1;
          }
          updatePage();
        }
      </script>

    </body>
    </html>
  `;
}

async function mergeAndBuildHtml() {
  const masterPath = fsp.join(downloadsDir, '마스터');
  const smpPath = fsp.join(downloadsDir, 'SMP 시스템 가동 및 설정');
  
  let mergedTexts = [];
  
  console.log("Loading '마스터' chat history...");
  if (fs.existsSync(masterPath)) {
    const raw = fs.readFileSync(masterPath, 'utf8');
    const data = JSON.parse(raw);
    const chunks = data.chunkedPrompt ? data.chunkedPrompt.chunks : [];
    
    chunks.forEach(c => {
      if (c.role === 'model') {
        const cleaned = cleanModelText(c.text || '');
        if (cleaned) {
          mergedTexts.push(cleaned);
        }
      }
    });
  }
  
  console.log("Loading 'SMP 시스템 가동 및 설정' chat history...");
  if (fs.existsSync(smpPath)) {
    const raw = fs.readFileSync(smpPath, 'utf8');
    const data = JSON.parse(raw);
    const chunks = data.chunkedPrompt ? data.chunkedPrompt.chunks : [];
    
    chunks.forEach(c => {
      if (c.role === 'model') {
        const cleaned = cleanModelText(c.text || '');
        if (cleaned) {
          mergedTexts.push(cleaned);
        }
      }
    });
  }
  
  const totalChars = mergedTexts.reduce((acc, t) => acc + t.length, 0);
  console.log(`Total merged paragraphs: ${mergedTexts.length} (${totalChars} characters).`);
  
  const htmlContent = buildUnifiedHtml('SMP 드라마 시나리오 드래프트', mergedTexts, totalChars);
  const tempHtmlPath = fsp.join(downloadsDir, 'SMP_Drama_Scenario_Draft.html');
  
  fs.writeFileSync(tempHtmlPath, htmlContent);
  console.log(`Saved HTML draft to ${tempHtmlPath}`);
}

mergeAndBuildHtml().catch(err => {
  console.error("Unified HTML generation process failed:", err);
});
