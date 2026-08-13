const GlobalCaseInsights = ({ insights }) => (
  <section className="border border-slate-300 bg-white">
    <div className="border-b border-slate-300 p-5">
      <h2 className="text-lg font-black text-slate-950">국내외 사례에서 가져올 운영 원칙</h2>
      <p className="mt-2 text-xs font-medium text-slate-500">사례 자체를 복제하지 않고 송현 실증에 적용 가능한 조건만 추출합니다.</p>
    </div>
    <div className="grid md:grid-cols-2 xl:grid-cols-4">
      {insights.map((insight, index) => (
        <article key={insight.principle} className={`p-5 ${index < insights.length - 1 ? 'xl:border-r xl:border-slate-300' : ''} ${index < 2 ? 'border-b border-slate-300 xl:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r md:border-slate-300 xl:border-r' : ''}`}>
          <span className="text-[10px] font-black text-slate-400">0{index + 1}</span>
          <h3 className="mt-3 text-sm font-black text-slate-900">{insight.principle}</h3>
          <p className="mt-3 text-xs font-medium leading-6 text-slate-600">{insight.implication}</p>
        </article>
      ))}
    </div>
  </section>
);

export default GlobalCaseInsights;
