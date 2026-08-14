import SonghyeonTaskBoard from '../components/iota-songhyeon/task-board/SonghyeonTaskBoard';
import SonghyeonIntegratedExecutionPlan from '../components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan';
import { WorkspacePageFrame } from '../components/workspace/WorkspacePageLayout';

export default function TaskBoard() {
  return (
    <WorkspacePageFrame fluidContent className="workspace-content box-border px-[60px]" contentClassName="flex flex-col">
      <SonghyeonTaskBoard />
      <SonghyeonIntegratedExecutionPlan />
    </WorkspacePageFrame>
  );
}
