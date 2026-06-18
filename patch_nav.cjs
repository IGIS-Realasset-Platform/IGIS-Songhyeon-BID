const fs = require('fs');
let content = fs.readFileSync('src/data/NavigationData.js', 'utf8');

const ch6En = `            },
            {
                title: "Chapter 6",
                items: [
                    { label: "Lineage of Trophy Assets 2007~2026", id: "page-39" },
                    { label: "[Trophy 1] Trajectory of Absolute Coordinates", id: "page-40" },
                    { label: "[Trophy 2] Legacy of Global Capital Inflow by IFC", id: "page-41" }
                ]
            }`;

const ch6Kr = `            },
            {
                title: "Chapter 6",
                items: [
                    { label: "2007~2026 트로피 자산의 계보", id: "page-39" },
                    { label: "[트로피 랜드마크 1] 스카이라인을 바꾼 절대 좌표의 궤적", id: "page-40" },
                    { label: "[트로피 랜드마크 2] IFC 서울이 남긴 글로벌 자본 유입의 유산", id: "page-41" }
                ]
            }`;

content = content.replace(/\s*\{\s*label:\s*\"\[인프라 자산 3\] 전력 병목이 낳은 데이터센터의 희소성\"\s*,\s*id:\s*\"page-38\"\s*\}\s*\]\s*\}/, '                    { label: "[인프라 자산 3] 전력 병목이 낳은 데이터센터의 희소성", id: "page-38" }\n                ]\n' + ch6Kr);

content = content.replace(/\s*\{\s*label:\s*\"\[Infra 3\] Data Center Scarcity\"\s*,\s*id:\s*\"page-38\"\s*\}\s*\]\s*\}/, '                    { label: "[Infra 3] Data Center Scarcity", id: "page-38" }\n                ]\n' + ch6En);

fs.writeFileSync('src/data/NavigationData.js', content);
