const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replaceInFile = (filename, replacements) => {
    const filepath = path.join(dir, filename);
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf-8');
    let changed = false;
    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            content = content.replace(search, replace);
            changed = true;
        } else {
            console.log(`Not found in ${filename}: ${search}`);
        }
    }
    if (changed) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filename}`);
    }
};

replaceInFile('Section11.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 1조에서 2조 달러로 2배 성장,\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'1조에서 2조 달러로 2배 성장,\' : \'Doubling from $1T to $2T,\'}\n </span>'],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 대한민국의 20년 도약\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'대한민국의 20년 도약\' : \'Korea\\\'s 20-Year Leap\'}\n </span>']
]);

replaceInFile('Section12.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 중후장대와 신성장 산업의 결합,\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'중후장대와 신성장 산업의 결합,\' : \'Convergence of Heavy & New Growth Industries,\'}\n </span>'],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 그리고 심화된 단일 종목 종속성\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'그리고 심화된 단일 종목 종속성\' : \'And Deepened Dependency on a Single Sector\'}\n </span>']
]);

replaceInFile('Section13.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 산업별 모멘텀\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'산업별 모멘텀\' : \'Industry Momentum\'}\n </span>'],
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 한국 1조→2조 달러를 만든 10대 엔진\n </span>', '<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n {lang === \'kr\' ? \'한국 1조→2조 달러를 만든 10대 엔진\' : \'10 Engines that Drove Korea from $1T to $2T\'}\n </span>']
]);

// Let's just fix Section14 through 20 directly if there are specific strings that need fixing
// Or better, let's fix the navigation items and section titles that are most visible first.
replaceInFile('Section14.jsx', [
    ['<span className="inline-block text-[24px] md:text-[28px] font-bold text-[#888] uppercase tracking-[-0.02em] mb-[14px] bg-transparent">\n 가장 결정적 엔진임. <strong>삼성전자 매출은 2007년 약 100조 원에서 2025년 약 333조 원</strong>으로 3배 이상 확대.\n </span>', '']
]);

