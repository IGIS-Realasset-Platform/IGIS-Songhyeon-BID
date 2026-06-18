const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  console.log("Navigating to http://localhost:8082/#page-1");
  try {
    await page.goto('http://localhost:8082/#page-1', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log("Navigation complete.");
  } catch(e) {
    console.log("Navigation error:", e.message);
  }

  await browser.close();
})();
