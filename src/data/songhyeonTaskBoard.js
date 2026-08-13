import { milestoneWeeks } from './songhyeonMilestones.js';
import { songhyeonDetailedScheduleItems } from './songhyeonDetailedSchedule.js';
import { categoryForSonghyeonTask } from './songhyeonTaskCategories.js';
import { deliverableForSonghyeonTask } from './songhyeonTaskDeliverables.js';
import { nextActionForSonghyeonTask } from './songhyeonTaskNextActions.js';
import { normalizeSonghyeonGateStage } from './songhyeonGateStages.js';


export const SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY = 'G4-WS02-T04';

const statusMap = {
  in_progress: '진행중',
  not_started: '미착수',
  delayed: '지연',
  completed: '완료',
  on_hold: '보류',
};

const getWeek = (index) => milestoneWeeks[index] || milestoneWeeks.at(-1);

export function createInitialSonghyeonTasks() {
  return songhyeonDetailedScheduleItems
    .filter((item) => item.itemType === 'task')
    .map((item, index) => ({
      id: `songhyeon-${item.sourceKey.toLowerCase()}`,
      sourceKey: item.sourceKey,
      sourceType: item.sourceKey === SONGHYEON_TASK_BOARD_BUILD_SOURCE_KEY ? 'platform-build' : 'milestone',
      parentSourceKey: item.parentSourceKey,
      displayId: `BID-${String(index + 1).padStart(3, '0')}`,
      projectCode: 'SONGHYEON_BID',
      projectName: '송현 BID',
      categoryMain: categoryForSonghyeonTask(item.sourceKey, item.categoryMain),
      sectorDetail: item.stage,
      taskName: item.displayName,
      sourceText: item.sourceText,
      taskPurpose: item.sourceText,
      deliverables: deliverableForSonghyeonTask(item.sourceKey),
      nextAction: nextActionForSonghyeonTask(item.sourceKey),
      leadDept: item.leadLabel,
      assignee: '미정',
      coopDepts: [],
      externalParty: '',
      supportNeeded: '',
      stage: normalizeSonghyeonGateStage(item.stage),
      gateStage: normalizeSonghyeonGateStage(item.stage),
      status: statusMap[item.status] || '미착수',
      importanceLevel: '일반',
      taskType: '정규',
      dueDate: getWeek(item.endIndex).endDate,
      startDate: getWeek(item.startIndex).startDate,
      meetingAgenda: false,
      agendaReason: '',
      isBlocker: false,
      needsDecision: false,
      createdAt: '2026-08-12T00:00:00.000Z',
      updatedAt: '2026-08-12T00:00:00.000Z',
    }));
}

export const initialSonghyeonTasks = createInitialSonghyeonTasks();
