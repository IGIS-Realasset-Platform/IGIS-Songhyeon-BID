export const SONGHYEON_GATE_STAGES = [
  'G0 기준선',
  'G1 기회·인터뷰',
  'G2 서비스 가설',
  'G3 실행조건',
  'G4 MVP·협력',
  'G5 실행준비',
  'G6 실증·학습',
];

const byCode = Object.fromEntries(SONGHYEON_GATE_STAGES.map((stage) => [stage.split(' ')[0], stage]));

export const normalizeSonghyeonGateStage = (value, sourceKey = '') => {
  const raw = String(value || '').trim();
  const sourceCode = String(sourceKey || '').match(/^G\d+/)?.[0];
  if (!raw) return byCode[sourceCode] || '';
  return byCode[raw] || byCode[raw.match(/^G\d+/)?.[0]] || byCode[sourceCode] || raw;
};
