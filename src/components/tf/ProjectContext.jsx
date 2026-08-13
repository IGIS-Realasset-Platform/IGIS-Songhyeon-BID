import { ArrowRight, CheckSquare2 } from 'lucide-react';

const ProjectContext = ({ context }) => (
  <section className="border border-slate-300 bg-white">
    <div className="grid grid-cols-[1.3fr_0.7fr]">
      <div className="border-r border-slate-300 p-7">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="border border-[#0057b8] bg-[#0057b8] px-2 py-1 text-[10px] font-black text-[#E5E5E5]">
            {context.currentStage.code}
          </span>
          <span className="text-xs font-bold text-[#0057b8]">{context.currentStage.name}</span>
        </div>
        <h2 className="max-w-4xl text-2xl font-black leading-9 text-slate-950">
          {context.positioning}
        </h2>
        <p className="mt-4 max-w-4xl text-base font-medium leading-7 text-slate-600">{context.definition}</p>
        <div className="mt-5 border-l-3 border-[#0057b8] bg-blue-50 px-4 py-3">
          <p className="text-[11px] font-black text-[#0057b8]">공동 목표</p>
          <p className="mt-1 break-keep text-base font-black leading-7 text-slate-900">{context.coreValue}</p>
        </div>
      </div>

      <div className="bg-slate-950 p-7 text-[#E5E5E5]">
        <p className="text-[10px] font-black text-blue-300">현재 목표</p>
        <p className="mt-3 break-keep text-base font-bold leading-7">{context.currentStage.objective}</p>
        <div className="my-5 h-px bg-white/20" />
        <p className="text-[10px] font-black text-slate-400">다음 단계</p>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold">
          <ArrowRight size={15} className="text-blue-300" />
          {context.nextGate}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 border-t border-slate-300">
      {context.operatingPrinciples.map((principle, index) => (
        <div
          key={principle}
          className={`flex gap-3 p-4 text-sm font-semibold leading-6 text-slate-600 ${index < 2 ? 'border-r border-slate-200' : ''}`}
        >
          <CheckSquare2 size={15} className="mt-0.5 shrink-0 text-[#0057b8]" />
          {principle}
        </div>
      ))}
    </div>
  </section>
);

export default ProjectContext;

