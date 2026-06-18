const fs = require('fs');
const file = 'src/components/LeftNavigator.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace section render
const oldSection = `{menuData.map((section, idx) => (
 <div key={idx} className="mb-4 last:mb-0">
 {idx > 0 && <div className="w-full h-[1px] bg-gray-200 mb-4 mt-2"></div>}
 <h3 
     onClick={(e) => section.id && handleNavigate(e, { id: section.id })}
     className={\`text-[13px] font-bold mb-2 px-1 uppercase font-guardian transition-colors \${section.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-400'}\`}
 >
     {section.title}
 </h3>
 {section.chapters?.map((chapter, chapIdx) => (
 <div key={chapIdx} className="mb-3 last:mb-0">
 {chapter.title && <h4 
 onClick={(e) => chapter.id && handleNavigate(e, { id: chapter.id })}
 className={\`text-[11px] font-bold mb-1 px-1 transition-colors \${chapter.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-500'}\`}
 >{chapter.title}</h4>}`;

const newSection = `{menuData.map((section, idx) => {
    const isSectionActive = section.id === activeHash.replace('#', '') || section.chapters?.some(chap => chap.id === activeHash.replace('#', '') || chap.items?.some(item => \`#\${item.id}\` === activeHash)) || section.items?.some(item => \`#\${item.id}\` === activeHash);
    
    return (
        <div key={idx} className="mb-4 last:mb-0">
            {idx > 0 && <div className="w-full h-[1px] bg-gray-200 mb-4 mt-2"></div>}
            <h3 
                onClick={(e) => section.id && handleNavigate(e, { id: section.id })}
                className={\`text-[13px] font-bold mb-2 px-1 uppercase font-guardian transition-colors \${isSectionActive ? 'text-blue-600' : (section.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-400')}\`}
            >
                {section.title}
            </h3>
            {section.chapters?.map((chapter, chapIdx) => {
                const isChapterActive = chapter.id === activeHash.replace('#', '') || chapter.items?.some(item => \`#\${item.id}\` === activeHash);
                
                return (
                    <div key={chapIdx} className="mb-3 last:mb-0">
                        {chapter.title && <h4 
                            onClick={(e) => chapter.id && handleNavigate(e, { id: chapter.id })}
                            className={\`text-[11px] font-bold mb-1 px-1 transition-colors \${isChapterActive ? 'text-blue-500' : (chapter.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-500')}\`}
                        >{chapter.title}</h4>}
`;

content = content.replace(oldSection, newSection);

// Don't forget to close the map loops properly since we changed from `(...)` to `{... return (...)}`
const oldEnds = ` })}
 </div>
 </div>
 ))}
 </div>
 ))}`;

const newEnds = ` })}
 </div>
 </div>
 );
 })}
 </div>
 );
 })}`;

content = content.replace(oldEnds, newEnds);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
