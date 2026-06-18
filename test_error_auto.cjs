const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
    console.log('Starting dev server...');
    const server = spawn('npm', ['run', 'dev'], { detached: true });
    
    // Wait for server to start
    await new Promise(r => setTimeout(r, 4000));
    
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        let crashFound = false;

        page.on('pageerror', err => {
            console.error('BROWSER_PAGE_ERROR:', err.message);
            crashFound = true;
        });
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error('BROWSER_CONSOLE_ERROR:', msg.text());
                crashFound = true;
            }
        });

        console.log('Navigating to local app...');
        await page.goto('http://localhost:5173/');
        
        console.log('Waiting for load...');
        await new Promise(r => setTimeout(r, 2000));
        
        console.log('Clicking toggle button...');
        const toggleBtn = await page.$('button[aria-label="Toggle Navigator"]');
        if (toggleBtn) {
            await toggleBtn.click();
            console.log('Clicked toggle.');
            await new Promise(r => setTimeout(r, 1000));
        }

        console.log('Clicking a menu item...');
        const menuItem = await page.$('h3.cursor-pointer');
        if (menuItem) {
            await menuItem.click();
            console.log('Clicked item.');
            await new Promise(r => setTimeout(r, 1000));
        }

        await browser.close();
        if (!crashFound) {
            console.log('NO_CRASH_FOUND');
        }
    } catch (e) {
        console.error('SCRIPT_ERROR', e);
    } finally {
        process.kill(-server.pid);
    }
})();
