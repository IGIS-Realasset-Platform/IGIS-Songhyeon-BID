const puppeteer = require('puppeteer');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
const server = app.listen(3000, async () => {
  console.log('Server started');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:3000/#page-42', { waitUntil: 'networkidle0' });
  
  await browser.close();
  server.close();
});
