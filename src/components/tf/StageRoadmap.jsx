const StageRoadmap = ({ stages }) => (
  <section className="border border-slate-300 bg-white">
    <div className="border-b border-slate-300 p-5">
      <h2 className="text-xl font-black text-slate-950">플레이스메이킹·에리어매니지먼트 실행순서</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        장소·운영 근거에서 시작해 현장기회, 플레이스메이킹 가설, 실행성, 에리어매니지먼트 환경, 실증 준비와 학습 순으로 진행합니다.
      </p>
    </div>

    <div className="overflow-x-auto">
      <div className="grid min-w-[1120px] grid-cols-7">
        {stages.map((stage, index) => (
          <article
            key={stage.id}
            className={`${index < stages.length - 1 ? 'border-r border-slate-300' : ''} ${stage.status === '현재' ? 'bg-[#0057b8] text-[#E5E5E5]' : 'bg-white text-slate-900'} p-4`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[10px] font-black ${stage.status === '현재' ? 'text-blue-100' : 'text-slate-400'}`}>
                {stage.id}단계
              </span>
              <span className={`border px-2 py-1 text-[9px] font-black ${stage.status === '현재' ? 'border-white/60 text-[#E5E5E5]' : 'border-slate-300 text-slate-500'}`}>
                {stage.status}
              </span>
            </div>
            <h3 className="mt-4 min-h-10 text-sm font-black leading-5">{stage.title}</h3>
            <p className={`mt-3 min-h-10 text-[11px] font-medium leading-5 ${stage.status === '현재' ? 'text-blue-100' : 'text-slate-500'}`}>
              {stage.short}
            </p>
            <div className={`mt-4 border-t pt-3 ${stage.status === '현재' ? 'border-white/30' : 'border-slate-200'}`}>
              <p className={`text-[9px] font-black ${stage.status === '현재' ? 'text-blue-200' : 'text-slate-400'}`}>완료기준</p>
              <p className="mt-1 text-[11px] font-bold">{stage.gate}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default StageRoadmap;

