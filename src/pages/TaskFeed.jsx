import SonghyeonTaskFeed from '../components/iota-songhyeon/task-feed/SonghyeonTaskFeed';
import { WorkspacePageFrame, WorkspacePageHeader } from '../components/workspace/WorkspacePageLayout';

export default function TaskFeed() {
  return (
    <WorkspacePageFrame contentClassName="px-[60px]">
      <SonghyeonTaskFeed
        renderHeader={(actions) => (
          <WorkspacePageHeader
            title="업무 피드"
            description="회의록과 협업 메시지를 자유롭게 기록하고 공유합니다."
            descriptionClassName="self-end"
            actions={actions}
          />
        )}
      />
    </WorkspacePageFrame>
  );
}
