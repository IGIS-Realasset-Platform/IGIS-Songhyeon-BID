import { ArrowRight, CheckSquare2 } from 'lucide-react';
import { organizationRoles, projectContext, workPlanPhases } from '../data/songhyeonTfData';

const sharedPhases = workPlanPhases.filter((phase) => phase.track !== '기획추진 전담');
const planningTrack = workPlanPhases.find((phase) => phase.track === '기획추진 전담');

export default function ExecutionPlan() {
  return (
    <div className="pb-16">
      <header className="mb-7 border-b-2 border-slate-950 pb-6">
        <div className="flex items-end justify-between gap-10">
          <div className="max-w-[920px]">
            <h1 className="text-4xl font-black text-slate-950">송현 BID 업무실행계획</h1>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              플레이스메이킹과 에리어매니지먼트가 실제로 작동할 장소·참여·운영환경을 구축하고,
              확인된 근거를 다음 단계의 실행안으로 연결합니다.
            </p>
          </div>
          <dl className="grid min-w-[430px] grid-cols-2 border border-slate-300 bg-white">
            <div className="border-r border-slate-300 p-4">
              <dt className="text-[12px] font-black text-slate-400">현재 단계</dt>
              <dd className="mt-2 text-base font-black text-[#0057b8]">0단계 · 근거기반</dd>
            </div>
            <div className="p-4">
              <dt className="text-[12px] font-black text-slate-400">다음 단계</dt>
              <dd className="mt-2 text-base font-black text-slate-900">현장기회 정의</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="mb-7 border border-slate-300 bg-white">
        <div className="grid grid-cols-[1.25fr_0.75fr]">
          <div className="border-r border-slate-300 p-6">
            <h2 className="break-keep text-2xl font-black leading-9 text-slate-950">{projectContext.coreValue}</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              서울시 협업 자체를 공동 목표로 두지 않습니다. TF는 장소의 이용경험, 참여자원, 운영방식이 지속적으로 연결될 수 있는 환경을 우선 설계합니다.
            </p>
          </div>
          <div className="bg-slate-950 p-6 text-[#E5E5E5]">
            <h2 className="text-xl font-black">서울시 협업은 기획추진실 전담</h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-300">{projectContext.cityCollaboration.role}</p>
          </div>
        </div>
      </section>

      <section className="mb-7">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-950">조직별 공동 기여와 전담업무</h2>
        </div>
        <div className="grid grid-cols-4 border-l border-t border-slate-300">
          {organizationRoles.map((role) => (
            <article key={role.organization} className="border-b border-r border-slate-300 bg-white p-5">
              <h3 className="text-lg font-black text-slate-950">{role.organization}</h3>
              <p className="mt-2 min-h-12 border-l-3 border-[#0057b8] pl-3 text-sm font-bold leading-6 text-[#0057b8]">
                {role.sharedContribution}
              </p>
              <ul className="mt-5 space-y-3">
                {role.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex items-start gap-2 text-sm font-medium leading-6 text-slate-600">
                    <CheckSquare2 size={16} className="mt-1 shrink-0 text-slate-400" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">TF 공동 실행순서</h2>
          </div>
          <p className="text-sm font-bold text-slate-500">근거 → 기회 → 장소가설 → 운영환경 → 실증</p>
        </div>

        <div className="border-l border-t border-slate-300">
          {sharedPhases.map((phase, index) => (
            <article key={phase.id} className="grid grid-cols-[150px_1fr_280px] border-b border-r border-slate-300 bg-white">
              <div className={`${phase.status === '진행' ? 'bg-[#0057b8] text-[#E5E5E5]' : 'bg-slate-950 text-[#E5E5E5]'} p-5`}>
                <p className="text-[13px] font-black text-blue-200">{phase.id}</p>
                <p className="mt-2 text-base font-black">{phase.stage}</p>
                <p className="mt-5 text-sm font-bold">{phase.status}</p>
              </div>

              <div className="border-r border-slate-300 p-5">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{phase.title}</h3>
                    <p className="mt-2 text-sm font-black text-[#0057b8]">{phase.owner}</p>
                  </div>
                  <span className="border border-slate-300 bg-slate-50 px-3 py-1 text-[13px] font-black text-slate-600">
                    {phase.track}
                  </span>
                </div>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-700">{phase.objective}</p>
                <ul className="mt-4 grid grid-cols-3 border-l border-t border-slate-200">
                  {phase.tasks.map((task) => (
                    <li key={task} className="border-b border-r border-slate-200 p-3 text-sm font-medium leading-6 text-slate-600">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between bg-slate-50 p-5">
                <div>
                  <p className="text-[13px] font-black text-slate-400">완료기준</p>
                  <p className="mt-3 text-base font-bold leading-7 text-slate-900">{phase.gate}</p>
                </div>
                {index < sharedPhases.length - 1 && (
                  <div className="mt-6 flex items-center gap-2 text-sm font-black text-[#0057b8]">
                    다음 단계
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 border-2 border-[#0057b8] bg-blue-50">
        <div className="grid grid-cols-[220px_1fr_310px]">
          <div className="bg-[#0057b8] p-5 text-[#E5E5E5]">
            <p className="text-[13px] font-black text-blue-200">지원 업무</p>
            <h2 className="mt-3 text-xl font-black">{planningTrack.title}</h2>
            <p className="mt-4 text-base font-black">{planningTrack.owner}</p>
          </div>
          <div className="border-r border-blue-200 p-5">
            <p className="text-base font-semibold leading-7 text-slate-700">{planningTrack.objective}</p>
            <ul className="mt-4 grid grid-cols-3 border-l border-t border-blue-200">
              {planningTrack.tasks.map((task) => (
                <li key={task} className="border-b border-r border-blue-200 bg-white p-3 text-sm font-medium leading-6 text-slate-600">
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <p className="text-[13px] font-black text-[#0057b8]">실행순서 내 위치</p>
            <p className="mt-3 text-base font-bold leading-7 text-slate-900">
              TF의 장소·운영 가설을 지원하는 전담축이며, 공동 실행순서를 대신하지 않습니다.
            </p>
            <p className="mt-5 border-t border-blue-200 pt-4 text-sm font-bold leading-6 text-[#0057b8]">{planningTrack.gate}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

