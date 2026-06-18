const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf-8');
    
    // Pattern to catch the specific nested ternary mistake my script made:
    // When it was inside {lang === 'kr' ? ( or {lang === 'kr' ? 
    // And it replaced the text with {lang === 'kr' ? <>...</> : <>...</>}
    
    // Simplest fix: Just run a regex that finds:
    // {lang === 'kr' ? (\s*){lang === 'kr' \? (.*?) : (.*?)}
    // and replace it with:
    // {lang === 'kr' ? ($1$2
    let changed = false;

    // Pattern 1: {lang === 'kr' ? {lang === 'kr' ? A : B} : C} => {lang === 'kr' ? A : C}
    const regex1 = /\{lang === 'kr' \?\s*\{lang === 'kr' \?\s*(.*?)\s*:\s*(.*?)\}/g;
    if (regex1.test(content)) {
        content = content.replace(regex1, "{lang === 'kr' ? $1");
        changed = true;
    }

    // Pattern 2: {lang === 'kr' ? (\s*){lang === 'kr' ? A : B} => {lang === 'kr' ? ($1A
    const regex2 = /\{lang === 'kr' \?\s*\(\s*\{lang === 'kr' \?\s*(.*?)\s*:\s*(.*?)\}/g;
    if (regex2.test(content)) {
        content = content.replace(regex2, "{lang === 'kr' ? (\n$1");
        changed = true;
    }
    
    // Pattern 3: {lang === 'kr' ? \s* {lang === 'kr' ? A : B}
    const regex3 = /\{lang === 'kr' \?\s*\{lang === 'kr' \?\s*(.*?)\s*:\s*(.*?)\}/g;
    if (regex3.test(content)) {
        content = content.replace(regex3, "{lang === 'kr' ? $1");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(p, content);
        console.log('Fixed', file);
    }
}
