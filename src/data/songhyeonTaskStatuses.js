export const SONGHYEON_TASK_STATUSES = ['미착수', '진행중', '완료', '중단'];

const statusAliases = {
  미착수: '미착수',
  진행중: '진행중',
  지연: '진행중',
  완료: '완료',
  보류: '중단',
  on_hold: '중단',
  중단: '중단',
};

export function normalizeSonghyeonTaskStatus(value) {
  return statusAliases[String(value || '').trim()] || '미착수';
}
