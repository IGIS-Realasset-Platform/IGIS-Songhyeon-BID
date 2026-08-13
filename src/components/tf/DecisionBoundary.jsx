import { Clock3 } from 'lucide-react';

const DecisionBoundary = ({ items }) => (
  <section className="border border-slate-300 bg-slate-50">
    <div className="border-b border-slate-300 p-5">
      <h2 className="text-lg font-black text-slate-950">지금 결정하지 않을 것</h2>
      <p className="mt-2 text-xs font-medium leading-5 text-slate-500">근거와 실행조건이 확인되는 단계에서 순차적으로 구체화합니다.</p>
    </div>
    <div className="grid md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.item} className={`p-4 ${index % 3 !== 2 ? 'xl:border-r xl:border-slate-300' : ''} ${index < 3 ? 'border-b border-slate-300' : ''} ${index % 2 === 0 ? 'md:border-r md:border-slate-300 xl:border-r' : 'md:border-r-0'}`}>
          <div className="flex items-start gap-3">
            <Clock3 size={15} className="mt-0.5 shrink-0 text-amber-700" />
            <div>
              <h3 className="text-xs font-black text-slate-900">{item.item}</h3>
              <p className="mt-2 text-[10px] font-black text-[#0057b8]">{item.availableStage}</p>
              <p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">{item.reason}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default DecisionBoundary;
