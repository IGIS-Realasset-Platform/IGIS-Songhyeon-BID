const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
    if (file.startsWith('Section') && file.endsWith('.jsx')) {
        let content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
        
        // Find all setStep timeouts
        const stepRegex = /setTimeout\(\(\) => setStep\((\d+)\), (\d+)\)/g;
        let match;
        const steps = {};
        while ((match = stepRegex.exec(content)) !== null) {
            steps[match[1]] = parseInt(match[2], 10);
        }
        
        if (steps['2'] !== undefined && steps['3'] !== undefined) {
            const time2 = steps['2'];
            const time3 = steps['3'];
            const gap = time3 - time2;
            
            if (gap > 0) {
                // Reduce gap by 20%
                const reduction = Math.round(gap * 0.20);
                
                // For all steps >= 3, subtract the reduction
                content = content.replace(/setTimeout\(\(\) => setStep\((\d+)\), (\d+)\)/g, (m, stepNumStr, timeStr) => {
                    const stepNum = parseInt(stepNumStr, 10);
                    let time = parseInt(timeStr, 10);
                    if (stepNum >= 3) {
                        time = Math.max(0, time - reduction);
                    }
                    return `setTimeout(() => setStep(${stepNum}), ${time})`;
                });
                
                fs.writeFileSync(path.join(componentsDir, file), content);
            }
        }
    }
});

console.log("Gap reduction complete!");
