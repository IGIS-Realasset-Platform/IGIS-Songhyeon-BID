const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
    if (file.startsWith('Section') && file.endsWith('.jsx')) {
        let content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
        
        // 1. setTimeout
        content = content.replace(/setTimeout\((.*?), (\d+)\)/g, (match, fn, time) => {
            const newTime = Math.round(parseInt(time) * 0.90);
            return `setTimeout(${fn}, ${newTime})`;
        });

        // 2. duration-[Xms]
        content = content.replace(/duration-\[(\d+)ms\]/g, (match, time) => {
            const newTime = Math.round(parseInt(time) * 0.90);
            return `duration-[${newTime}ms]`;
        });

        // 3. delay-[Xms]
        content = content.replace(/delay-\[(\d+)ms\]/g, (match, time) => {
            const newTime = Math.round(parseInt(time) * 0.90);
            return `delay-[${newTime}ms]`;
        });

        // Just in case any predefined classes are left over
        content = content.replace(/duration-1000/g, 'duration-[900ms]');
        content = content.replace(/duration-700/g, 'duration-[630ms]');
        content = content.replace(/duration-500/g, 'duration-[450ms]');
        content = content.replace(/duration-300/g, 'duration-[270ms]');
        content = content.replace(/duration-200/g, 'duration-[180ms]');
        content = content.replace(/duration-150/g, 'duration-[135ms]');
        content = content.replace(/delay-1000/g, 'delay-[900ms]');
        content = content.replace(/delay-700/g, 'delay-[630ms]');
        content = content.replace(/delay-500/g, 'delay-[450ms]');
        content = content.replace(/delay-300/g, 'delay-[270ms]');
        content = content.replace(/delay-200/g, 'delay-[180ms]');
        content = content.replace(/delay-150/g, 'delay-[135ms]');
        
        fs.writeFileSync(path.join(componentsDir, file), content);
    }
});

// Update MainLayout.jsx
const mainLayoutPath = path.join(componentsDir, 'MainLayout.jsx');
let mainLayoutContent = fs.readFileSync(mainLayoutPath, 'utf-8');
mainLayoutContent = mainLayoutContent.replace(/const slideAnimationTimes = \[([\d, ]+)\];/, (match, arrStr) => {
    const times = arrStr.split(',').map(s => parseInt(s.trim()));
    const newTimes = times.map(t => Math.round(t * 0.90));
    return `const slideAnimationTimes = [${newTimes.join(', ')}];`;
});
mainLayoutContent = mainLayoutContent.replace(/slideAnimationTimes\[currentSlide\] \|\| (\d+)/, (match, time) => {
    const newTime = Math.round(parseInt(time) * 0.90);
    return `slideAnimationTimes[currentSlide] || ${newTime}`;
});

fs.writeFileSync(mainLayoutPath, mainLayoutContent);

console.log("Speedup 2 complete!");
