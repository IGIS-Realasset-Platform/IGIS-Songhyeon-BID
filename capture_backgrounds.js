import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureBackgrounds(lang) {
  console.log(`Starting background template capture for language: ${lang}`);
  
  const imgDir = path.join(__dirname, 'img');
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.evaluateOnNewDocument(() => {
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay, ...args) {
      return originalSetTimeout(fn, Math.min(delay, 50), ...args);
    };
  });
  
  const totalSlides = 74;
  
  for (let s = 1; s <= totalSlides; s++) {
    const url = `http://localhost:8083/?lang=${lang}#page-${s}`;
    console.log(`Capturing slide ${s}/${totalSlides}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await page.evaluate(() => {
        // Disable transitions and animations to prevent incomplete renders during screenshot
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          el.style.transition = 'none';
          el.style.animation = 'none';
        });

        const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'A', 'BUTTON', 'STRONG', 'B', 'EM'];
        textTags.forEach(tag => {
          const elements = document.querySelectorAll(tag);
          elements.forEach(el => {
            el.style.setProperty('color', 'transparent', 'important');
            el.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            el.style.setProperty('background-image', 'none', 'important'); // Strip gradient text
            el.style.setProperty('text-shadow', 'none', 'important');
          });
        });
        
        const divs = document.querySelectorAll('div');
        divs.forEach(div => {
          let hasDirectText = false;
          for (let child of div.childNodes) {
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
              hasDirectText = true;
              break;
            }
          }
          if (hasDirectText) {
            div.style.setProperty('color', 'transparent', 'important');
            div.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            div.style.setProperty('background-image', 'none', 'important');
            div.style.setProperty('text-shadow', 'none', 'important');
          }
        });
        
        const pag = document.querySelector('.mix-blend-difference');
        if (pag) {
          pag.style.display = 'none';
        }
      });
      
      const outputPath = path.join(imgDir, `slide_bg_${s}.png`);
      await page.screenshot({ path: outputPath });
      
    } catch (err) {
      console.error(`Error capturing slide ${s}:`, err);
    }
  }
  
  await browser.close();
  console.log("Background templates capture completed successfully.");
}

(async () => {
  try {
    await captureBackgrounds('kr');
  } catch (err) {
    console.error("Capture process failed:", err);
  }
})();
