export const SONGHYEON_GATE_STAGES = [
  'G0 근거기반 구축',
  'G1 현장기회 정의',
  'G2 플레이스메이킹 가설',
  'G3 서비스·운영 실행성',
  'G4 에리어매니지먼트 환경',
  'G5 실증 준비·정합화',
  'G6 실증·학습',
];

const byCode = Object.fromEntries(SONGHYEON_GATE_STAGES.map((stage) => [stage.split(' ')[0], stage]));

export const normalizeSonghyeonGateStage = (value, sourceKey = '') => {
  const raw = String(value || '').trim();
  const sourceCode = String(sourceKey || '').match(/^G\d+/)?.[0];
  if (!raw) return byCode[sourceCode] || '';
  return byCode[raw] || byCode[raw.match(/^G\d+/)?.[0]] || byCode[sourceCode] || raw;
};
