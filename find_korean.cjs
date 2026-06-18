const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(dir).filter(f => f.startsWith('Section') && f.endsWith('.jsx'));
let totalIssues = 0;

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const lines = content.split('\n');
    let issuesInFile = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/[가-힣]/.test(line)) {
            // Ignore if it's already using lang condition, or a comment, or part of a translated block if we just check for 'lang' (though sometimes 'lang' is on a previous line, but this is a rough check)
            if (!line.includes('lang') && !line.includes('//') && !line.includes('/*') && !line.includes('*') && !line.includes('const ')) {
                // If the previous lines have 'lang ===', it might be part of a multiline ternary.
                // Let's just collect it and we can manually review.
                issuesInFile.push({ lineNum: i + 1, text: line.trim() });
            }
        }
    }
    
    if (issuesInFile.length > 0) {
        console.log(`\nFile: ${file}`);
        issuesInFile.forEach(issue => console.log(`  L${issue.lineNum}: ${issue.text}`));
        totalIssues += issuesInFile.length;
    }
}
console.log(`\nTotal potential issues: ${totalIssues}`);
