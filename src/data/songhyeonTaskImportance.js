export const SONGHYEON_TASK_IMPORTANCE_LEVELS = ['핵심', '중간', '낮음'];

const importanceAliases = {
  핵심: '핵심',
  주요: '중간',
  중간: '중간',
  일반: '낮음',
  낮음: '낮음',
};

export function normalizeSonghyeonTaskImportance(value) {
  return importanceAliases[String(value || '').trim()] || '낮음';
}
