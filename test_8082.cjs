const puppeteer = require('puppeteer');

(async () => {
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
        await page.goto('http://localhost:8082/IOTA-Stratey#page-2');
        
        console.log('Waiting for load...');
        await new Promise(r => setTimeout(r, 2000));
        
        const html = await page.content();
        if (html.includes('id="scroll-container"')) {
            console.log('Found scroll-container.');
            // Let's check what's inside it!
            const text = await page.evaluate(() => {
                const el = document.getElementById('scroll-container');
                return el ? el.innerText.substring(0, 200) : '';
            });
            console.log('Content preview:', text);
        } else {
            console.log('scroll-container NOT FOUND.');
        }

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
    }
})();
