import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractLayoutForLanguage(lang) {
  console.log(`Starting extraction for language: ${lang}`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Full 120 slides for final generation
  const totalSlides = 120;
  const slideDataList = [];
  
  // Speed up react state timeouts slightly
  await page.evaluateOnNewDocument(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay, ...args) {
      return originalSetTimeout(fn, Math.min(delay, 50), ...args);
    };
  });
  
  for (let s = 1; s <= totalSlides; s++) {
    const url = `http://localhost:8083/?lang=${lang}#page-${s}`;
    console.log(`[${lang}] Loading slide ${s}/${totalSlides}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Wait 1.0 second to ensure transitions settle to final state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract layout text nodes and card boundaries
      const slideData = await page.evaluate((slideIndex) => {
        const isVisible = (el) => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && 
                 style.visibility !== 'hidden' && 
                 parseFloat(style.opacity) !== 0 && 
                 el.offsetWidth > 0 && 
                 el.offsetHeight > 0;
        };
        
        // Setup a persistent temporary element for color conversion (avoid recreation reflow)
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
            // Let the browser engine parse colorStr (oklch, rgb, hex, relative colors)
            tempColorDiv.style.color = colorStr;
            return window.getComputedStyle(tempColorDiv).color; // Standardized as 'rgb(r,g,b)' or 'rgba(...)'
          } catch (e) {
            console.error("Color parse error for", colorStr, e);
          }
          return colorStr;
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
          return { slideIndex, bgColor: 'rgb(255,255,255)', cards: [], texts: [] };
        }
        
        const sectionEl = activeWrapper.querySelector('section');
        const bgColor = sectionEl ? convertToRgb(window.getComputedStyle(sectionEl).backgroundColor) : 'rgb(255, 255, 255)';
        
        const all = activeWrapper.querySelectorAll('*');
        const cards = [];
        const texts = [];
        
        all.forEach(el => {
          if (!isVisible(el)) return;
          
          // Skip pagination controls & container
          if (el.closest('.mix-blend-difference')) return;
          
          const style = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          
          const hasBg = style.backgroundColor && 
                        style.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                        style.backgroundColor !== 'transparent';
          const hasBorder = style.borderStyle && 
                            style.borderStyle !== 'none' && 
                            style.borderWidth !== '0px';
          const isWrapper = rect.width >= window.innerWidth * 0.95 && 
                            rect.height >= window.innerHeight * 0.95;
          
          if (el.tagName === 'DIV' && (hasBg || hasBorder) && !isWrapper && rect.width > 15 && rect.height > 15) {
            cards.push({
              rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
              bgColor: convertToRgb(style.backgroundColor),
              borderColor: convertToRgb(style.borderColor),
              borderWidth: style.borderWidth,
              borderRadius: style.borderRadius
            });
          }
          
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
        
        // Filter out parents for block layout splitting, but KEEP parents of inline markup (SPAN, STRONG, etc.)
        const excludeIndices = new Set();
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
              
              if (c_rect.x >= p_rect.x - 8 && 
                  c_rect.y >= p_rect.y - 8 && 
                  (c_rect.x + c_rect.w) <= (p_rect.x + p_rect.w + 8) && 
                  (c_rect.y + c_rect.h) <= (p_rect.y + p_rect.h + 8)) {
                
                // If the child is an inline tag, keep the parent (whole sentence) and exclude this child.
                // Otherwise, it's a block structure; exclude the container parent and keep the child.
                const inlineTags = ['SPAN', 'STRONG', 'B', 'EM', 'A'];
                if (inlineTags.includes(t_current.tagName)) {
                  excludeIndices.add(i); // Exclude inline child
                } else {
                  excludeIndices.add(j); // Exclude block container parent
                }
              }
            }
          }
        }
        const filteredTexts = texts.filter((_, idx) => !excludeIndices.has(idx));
        
        return {
          slideIndex,
          bgColor,
          cards,
          texts: filteredTexts
        };
      }, s);
      
      slideDataList.push(slideData);
      
    } catch (err) {
      console.error(`Error on slide ${s}:`, err);
      slideDataList.push({ slideIndex: s, bgColor: 'rgb(255,255,255)', cards: [], texts: [] });
    }
  }
  
  await browser.close();
  
  const outputPath = path.join(__dirname, `layout_data_${lang}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(slideDataList, null, 2));
  console.log(`Saved layout data to ${outputPath}`);
}

(async () => {
  try {
    await extractLayoutForLanguage('kr');
    console.log("Extraction completed successfully.");
  } catch (err) {
    console.error("Extraction failed:", err);
  }
})();
