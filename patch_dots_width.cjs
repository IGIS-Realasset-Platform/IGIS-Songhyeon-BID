const fs = require('fs');
const file = 'src/components/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    '<div className="overflow-hidden w-[382px] md:w-[438px] py-2">',
    '<div className="overflow-hidden w-[390px] md:w-[450px] py-2">'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Success");
