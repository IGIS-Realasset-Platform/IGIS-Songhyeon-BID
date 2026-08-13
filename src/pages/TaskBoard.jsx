import SonghyeonTaskBoard from '../components/iota-songhyeon/task-board/SonghyeonTaskBoard';
import SonghyeonIntegratedExecutionPlan from '../components/iota-songhyeon/task-board/SonghyeonIntegratedExecutionPlan';

export default function TaskBoard() {
  return (
    <div className="workspace-content box-border flex min-h-full w-full flex-col px-[60px] pb-[60px] pt-[29px] text-[#E5E5E5]">
      <SonghyeonTaskBoard />
      <SonghyeonIntegratedExecutionPlan />
    </div>
  );
}
