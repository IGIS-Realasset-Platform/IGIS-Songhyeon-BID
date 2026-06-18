const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
    if (file.startsWith('Section') && file.endsWith('.jsx')) {
        let content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
        
        // 1. setTimeout
        content = content.replace(/setTimeout\((.*?), (\d+)\)/g, (match, fn, time) => {
            const newTime = Math.round(parseInt(time) * 0.85);
            return `setTimeout(${fn}, ${newTime})`;
        });

        // 2. duration-[Xms]
        content = content.replace(/duration-\[(\d+)ms\]/g, (match, time) => {
            const newTime = Math.round(parseInt(time) * 0.85);
            return `duration-[${newTime}ms]`;
        });

        // 3. duration predefined classes
        content = content.replace(/duration-1000/g, 'duration-[850ms]');
        content = content.replace(/duration-700/g, 'duration-[600ms]');
        content = content.replace(/duration-500/g, 'duration-[425ms]');
        content = content.replace(/duration-300/g, 'duration-[255ms]');
        content = content.replace(/duration-200/g, 'duration-[170ms]');
        content = content.replace(/duration-150/g, 'duration-[130ms]');

        // 4. delay-[Xms]
        content = content.replace(/delay-\[(\d+)ms\]/g, (match, time) => {
            const newTime = Math.round(parseInt(time) * 0.85);
            return `delay-[${newTime}ms]`;
        });

        // 5. delay predefined classes
        content = content.replace(/delay-1000/g, 'delay-[850ms]');
        content = content.replace(/delay-700/g, 'delay-[600ms]');
        content = content.replace(/delay-500/g, 'delay-[425ms]');
        content = content.replace(/delay-300/g, 'delay-[255ms]');
        content = content.replace(/delay-200/g, 'delay-[170ms]');
        content = content.replace(/delay-150/g, 'delay-[130ms]');
        
        fs.writeFileSync(path.join(componentsDir, file), content);
    }
});

// Update MainLayout.jsx
const mainLayoutPath = path.join(componentsDir, 'MainLayout.jsx');
let mainLayoutContent = fs.readFileSync(mainLayoutPath, 'utf-8');
mainLayoutContent = mainLayoutContent.replace(/const slideAnimationTimes = \[([\d, ]+)\];/, (match, arrStr) => {
    const times = arrStr.split(',').map(s => parseInt(s.trim()));
    const newTimes = times.map(t => Math.round(t * 0.85));
    return `const slideAnimationTimes = [${newTimes.join(', ')}];`;
});
mainLayoutContent = mainLayoutContent.replace(/slideAnimationTimes\[currentSlide\] \|\| (\d+)/, (match, time) => {
    const newTime = Math.round(parseInt(time) * 0.85);
    return `slideAnimationTimes[currentSlide] || ${newTime}`;
});

fs.writeFileSync(mainLayoutPath, mainLayoutContent);

console.log("Speedup complete!");
