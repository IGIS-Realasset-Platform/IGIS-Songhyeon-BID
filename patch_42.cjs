const fs = require('fs');

// 1. Patch MainLayout.jsx
let layout = fs.readFileSync('src/components/MainLayout.jsx', 'utf8');

if (!layout.includes('import Section41')) {
    layout = layout.replace(
        /import Section40 from '\.\/Section40';/,
        "import Section40 from './Section40';\nimport Section41 from './Section41';"
    );
}

layout = layout.replace(/const slidesLength = \d+;/, 'const slidesLength = 42;');

if (!layout.includes('<Section41 />')) {
    layout = layout.replace(
        /<Section40 \/> \];/,
        '<Section40 />, <Section41 />];'
    );
}

layout = layout.replace(
    /const slideAnimationTimes = \[(.*?)\];/,
    (match, p1) => {
        let times = p1.split(',').map(s => s.trim());
        if (times.length === 41) {
            times.push('3000');
        }
        return 'const slideAnimationTimes = [' + times.join(', ') + '];';
    }
);

fs.writeFileSync('src/components/MainLayout.jsx', layout);

// 2. Patch NavigationData.js
let nav = fs.readFileSync('src/data/NavigationData.js', 'utf8');

nav = nav.replace(
    /\{\s*title:\s*"Part 2\. 미래 시나리오",\s*id:\s*""/g,
    '{ \n        title: "Part 2. 미래 시나리오", \n        id: "page-42"'
);

fs.writeFileSync('src/data/NavigationData.js', nav);
