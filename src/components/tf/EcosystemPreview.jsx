import { Building2, Landmark, Network, Users } from 'lucide-react';

const icons = [Building2, Users, Landmark, Network];

const EcosystemPreview = ({ groups }) => (
  <section className="border border-slate-300 bg-white">
    <div className="grid lg:grid-cols-[0.42fr_1.58fr]">
      <header className="border-b border-slate-300 bg-slate-50 p-5 lg:border-b-0 lg:border-r lg:p-6">
        <h2 className="text-lg font-black text-slate-950">협업 생태계 지도</h2>
        <p className="mt-3 text-xs font-medium leading-6 text-slate-600">
          확정 거버넌스가 아니라, 현재 확인해야 할 관계 범위를 표시한 0단계 기준선입니다.
        </p>
        <div className="mt-6 border-l-4 border-[#0057b8] bg-white p-4">
          <p className="text-[10px] font-black text-slate-400">공동 중심</p>
          <p className="mt-1 text-sm font-black text-slate-950">송현 BID 1차 실증 관문</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2">
        {groups.map((group, index) => {
          const Icon = icons[index] || Network;
          return (
            <article
              key={group.id}
              className={`p-5 ${index % 2 === 0 ? 'md:border-r md:border-slate-300' : ''} ${index < 2 ? 'border-b border-slate-300' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-slate-300 bg-slate-50 text-[#0057b8]">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{group.name}</h3>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">{group.role}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.participants.map((participant) => (
                  <span key={participant} className="border border-slate-300 bg-white px-2 py-1 text-[10px] font-bold text-slate-600">
                    {participant}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-200 pt-3 text-[10px] font-black text-amber-700">상태 · {group.factStatus}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default EcosystemPreview;
