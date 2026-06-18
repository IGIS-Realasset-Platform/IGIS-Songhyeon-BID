const { exec } = require('child_process');
const puppeteer = require('puppeteer');

(async () => {
    console.log('Starting dev server...');
    const serverProcess = exec('npm run dev');
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('pageerror', err => {
        console.error('Browser Error:', err);
    });
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('Browser Console Error:', msg.text());
        }
    });

    console.log('Navigating to local app...');
    await page.goto('http://localhost:5173/');
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Clicking the toggle button...');
    const toggleButton = await page.$('button[aria-label="Toggle Navigator"]');
    if (toggleButton) {
        await toggleButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Clicked toggle button.');
    } else {
        console.log('Toggle button not found.');
    }

    console.log('Clicking a menu item...');
    const menuItem = await page.$('h3.cursor-pointer');
    if (menuItem) {
        await menuItem.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Clicked menu item.');
    } else {
        console.log('Menu item not found.');
    }

    await browser.close();
    serverProcess.kill();
    console.log('Done.');
})();
