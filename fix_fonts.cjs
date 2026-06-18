const fs = require('fs');
const files = ['Section8.jsx', 'Section9.jsx', 'Section13.jsx', 'Section24.jsx', 'Section28.jsx', 'Section34.jsx'];
files.forEach(f => {
    let path = 'src/components/' + f;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/<span className="inline-block text-\[20px\] md:text-\[24px\] ([^"]+)">/g, `<span className="inline-block text-[22px] md:text-[26px] $1" style={{ fontFamily: "'Sanomat Wp', 'Sanomat Web', 'Sanomat', sans-serif" }}>`);
    fs.writeFileSync(path, content);
    console.log('Updated', f);
});
