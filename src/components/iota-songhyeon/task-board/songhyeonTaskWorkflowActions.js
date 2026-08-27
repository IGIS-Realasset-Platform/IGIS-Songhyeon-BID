import { normalizeSonghyeonTaskStatus } from '../../../data/songhyeonTaskStatuses.js';

const STATUS_ACTIONS = {
  '미착수': [
    { status: '진행중', label: '진행 시작', description: '업무를 시작하고 진행 상태로 전환합니다.', tone: 'blue' },
  ],
  '진행중': [
    { status: '미착수', label: '미착수로 변경', description: '진행 상태를 취소하고 착수 전 단계로 되돌립니다.', tone: 'blue', requiresReason: true },
    { status: '완료', label: '완료 처리', description: '완료한 내용과 필요한 증빙을 기록합니다.', tone: 'green' },
    { status: '중단', label: '중단 처리', description: '중단 사유를 남기고 업무를 종료합니다.', tone: 'red', requiresReason: true },
  ],
  '완료': [
    { status: '진행중', label: '업무 재개', description: '완료 상태를 해제하고 업무를 다시 진행합니다.', tone: 'blue', requiresReason: true },
  ],
  '중단': [
    { status: '진행중', label: '업무 재개', description: '중단 상태를 해제하고 업무를 다시 진행합니다.', tone: 'blue', requiresReason: true },
  ],
};

export const taskWorkflowActions = (status) => STATUS_ACTIONS[normalizeSonghyeonTaskStatus(status)] || [];
