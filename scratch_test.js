import puppeteer from 'puppeteer';

async function testExtract() {
  console.log("Starting test extraction for page 11...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Speed up react state timeouts
  await page.evaluateOnNewDocument(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay, ...args) {
      return originalSetTimeout(fn, Math.min(delay, 50), ...args);
    };
  });

  const url = `http://localhost:8082/?lang=kr#page-11`;
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 1500));

  const debugData = await page.evaluate(() => {
    const isVisible = (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && 
             style.visibility !== 'hidden' && 
             parseFloat(style.opacity) !== 0 && 
             el.offsetWidth > 0 && 
             el.offsetHeight > 0;
    };

    let tempColorDiv = document.getElementById('temp-color-converter');
    if (!tempColorDiv) {
      tempColorDiv = document.createElement('div');
      tempColorDiv.id = 'temp-color-converter';
      tempColorDiv.style.visibility = 'hidden';
      tempColorDiv.style.position = 'absolute';
      tempColorDiv.style.width = '0';
      tempColorDiv.style.height = '0';
      tempColorDiv.style.overflow = 'hidden';
      document.body.appendChild(tempColorDiv);
    }

    const convertToRgb = (colorStr) => {
      if (!colorStr || colorStr === 'transparent') return 'rgba(0, 0, 0, 0)';
      try {
        tempColorDiv.style.color = colorStr;
        return window.getComputedStyle(tempColorDiv).color;
      } catch (e) {
        return colorStr;
      }
    };

    const wrappers = Array.from(document.querySelectorAll('div'));
    const activeWrapper = wrappers.find(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'absolute' && el.classList.contains('inset-0')) {
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.left) < 5 && rect.width > 1000;
      }
      return false;
    });

    if (!activeWrapper) {
      return { error: 'No active wrapper' };
    }

    const all = activeWrapper.querySelectorAll('*');
    const texts = [];

    all.forEach(el => {
      if (!isVisible(el)) return;
      if (el.closest('.mix-blend-difference')) return;

      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      let hasDirectText = false;
      for (let child of el.childNodes) {
        if (child.nodeType == Node.TEXT_NODE && child.textContent.trim().length > 0) {
          hasDirectText = true;
          break;
        }
      }

      const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'A', 'BUTTON', 'STRONG'];
      if ((textTags.includes(el.tagName) || (el.tagName === 'DIV' && hasDirectText)) && el.innerText.trim().length > 0) {
        texts.push({
          tagName: el.tagName,
          text: el.innerText.trim().replace(/\s+/g, ' '),
          rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
          color: convertToRgb(style.color),
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          fontFamily: style.fontFamily,
          textAlign: style.textAlign
        });
      }
    });

    // Run filter
    const excludeIndices = new Set();
    const filterLogs = [];

    for (let i = 0; i < texts.length; i++) {
      const t_current = texts[i];
      for (let j = 0; j < texts.length; j++) {
        if (i === j) continue;
        const t_other = texts[j];

        const isContained = t_other.text.includes(t_current.text) && t_other.text !== t_current.text;
        const isIdenticalParent = t_other.text === t_current.text && j < i;

        if (isContained || isIdenticalParent) {
          const p_rect = t_other.rect;
          const c_rect = t_current.rect;

          const boundaryMatch = c_rect.x >= p_rect.x - 8 && 
                                c_rect.y >= p_rect.y - 8 && 
                                (c_rect.x + c_rect.w) <= (p_rect.x + p_rect.w + 8) && 
                                (c_rect.y + c_rect.h) <= (p_rect.y + p_rect.h + 8);

          if (boundaryMatch) {
            const inlineTags = ['SPAN', 'STRONG', 'B', 'EM', 'A'];
            let action = '';
            if (inlineTags.includes(t_current.tagName)) {
              excludeIndices.add(i);
              action = `Exclude child i=${i} (${t_current.tagName}: "${t_current.text}") because parent j=${j} (${t_other.tagName}: "${t_other.text}") contains it`;
            } else {
              excludeIndices.add(j);
              action = `Exclude parent j=${j} (${t_other.tagName}: "${t_other.text}") because child i=${i} (${t_current.tagName}: "${t_current.text}") is block and we want to keep child`;
            }
            filterLogs.push({
              i, i_tag: t_current.tagName, i_text: t_current.text,
              j, j_tag: t_other.tagName, j_text: t_other.text,
              action
            });
          }
        }
      }
    }

    const filtered = texts.filter((_, idx) => !excludeIndices.has(idx));
    return {
      rawTexts: texts.map((t, idx) => ({ idx, tagName: t.tagName, text: t.text, rect: t.rect })),
      filterLogs,
      filteredTexts: filtered.map((t) => ({ tagName: t.tagName, text: t.text, rect: t.rect }))
    };
  });

  console.log("=== RAW TEXTS ===");
  console.log(JSON.stringify(debugData.rawTexts, null, 2));
  console.log("=== FILTER LOGS ===");
  console.log(JSON.stringify(debugData.filterLogs, null, 2));
  console.log("=== FILTERED TEXTS ===");
  console.log(JSON.stringify(debugData.filteredTexts, null, 2));

  await browser.close();
}

testExtract();
