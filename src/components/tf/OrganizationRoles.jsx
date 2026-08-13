import { CheckSquare2 } from 'lucide-react';

const OrganizationRoles = ({ roles, cityCollaboration }) => (
  <section className="border border-slate-300 bg-white">
    <div className="flex items-end justify-between border-b border-slate-300 p-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">플레이스메이킹·에리어매니지먼트 공동 기여</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          조직별 보유역량을 장소·참여·운영환경 구축에 연결하며, 세부 역할은 단계별 근거와 실행조건에 따라 구체화합니다.
        </p>
      </div>
      <div className="max-w-[390px] border-l-3 border-[#0057b8] bg-blue-50 px-4 py-3">
        <p className="text-[11px] font-black text-[#0057b8]">기획추진실 전담 업무흐름</p>
        <p className="mt-1 text-sm font-bold leading-6 text-slate-700">{cityCollaboration.role}</p>
      </div>
    </div>

    <div className="grid grid-cols-4 border-l border-t border-slate-200">
      {roles.map((role) => (
        <article key={role.organization} className="border-b border-r border-slate-200 p-4">
          <h3 className="text-base font-black text-slate-950">{role.organization}</h3>
          <p className="mt-2 min-h-12 text-sm font-black leading-6 text-[#0057b8]">{role.sharedContribution}</p>
          <ul className="mt-4 space-y-2">
            {role.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-medium leading-6 text-slate-600">
                <CheckSquare2 size={15} className="mt-1 shrink-0 text-slate-400" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default OrganizationRoles;
