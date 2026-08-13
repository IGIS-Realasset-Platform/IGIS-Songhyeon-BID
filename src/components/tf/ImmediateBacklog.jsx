import { CheckCircle2 } from 'lucide-react';

const ImmediateBacklog = ({ groups }) => (
  <section>
    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-lg font-black text-slate-950">지금 바로 시작할 업무</h2>
      </div>
      <p className="text-xs font-semibold text-slate-500">P0 근거 → P1 관계 → P2 다음 단계 준비</p>
    </div>

    <div className="grid border-l border-t border-slate-300 lg:grid-cols-3">
      {groups.map((group) => (
        <article key={group.id} className="border-b border-r border-slate-300 bg-white">
          <header className="border-b border-slate-300 bg-slate-950 p-4 text-[#E5E5E5]">
            <div className="flex items-center justify-between gap-3">
              <span className="border border-blue-400 px-2 py-1 text-[10px] font-black text-blue-300">
                {group.priority}
              </span>
              <span className="text-[10px] font-bold text-slate-400">업무 {group.items.length}개</span>
            </div>
            <h3 className="mt-3 text-base font-black">{group.title}</h3>
            <p className="mt-2 text-xs font-medium leading-5 text-slate-300">{group.description}</p>
          </header>

          <div>
            {group.items.map((item, index) => (
              <div key={item.title} className={`${index > 0 ? 'border-t border-slate-200' : ''} p-4`}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#0057b8]" />
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-[11px] font-bold text-[#0057b8]">{item.owner}</p>
                  </div>
                </div>
                <dl className="mt-4 space-y-3 border-l-2 border-slate-200 pl-3 text-[11px] leading-5">
                  <div>
                    <dt className="font-black text-slate-400">필요 데이터</dt>
                    <dd className="font-medium text-slate-600">{item.requiredData}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-400">다음 행동</dt>
                    <dd className="font-medium text-slate-600">{item.nextAction}</dd>
                  </div>
                  <div>
                    <dt className="font-black text-slate-400">완료 증거</dt>
                    <dd className="font-bold text-slate-800">{item.completionEvidence}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ImmediateBacklog;

