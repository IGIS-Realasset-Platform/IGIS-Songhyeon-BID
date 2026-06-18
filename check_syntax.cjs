const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
let errors = 0;
for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    if (content.includes('{lang === \'kr\' ? {lang === \'kr\' ?')) {
        console.log('Double ternary in', file);
        fs.writeFileSync(path.join(dir, file), content.replace(/{lang === 'kr' \? {lang === 'kr' \? /g, "{lang === 'kr' ? "));
        errors++;
    }
}
console.log('Fixed', errors, 'files');
