import { ArrowUpRight } from 'lucide-react';

const EvidenceStatus = ({ categories }) => (
  <section className="border border-slate-300 bg-white">
    <div className="flex flex-col gap-2 border-b border-slate-300 p-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-lg font-black text-slate-950">근거기반 구축 현황</h2>
      </div>
      <p className="text-xs font-semibold text-slate-500">수치 확정 전 · 자료 기준선 우선 구축</p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-max min-w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-50 text-[10px] font-black text-slate-500">
            <th className="sticky left-0 z-10 min-w-36 border-r border-slate-300 bg-slate-50 px-4 py-3">구분</th>
            <th className="min-w-72 px-4 py-3">확인 범위</th>
            <th className="min-w-24 px-4 py-3">집계</th>
            <th className="min-w-44 px-4 py-3">사실상태</th>
            <th className="min-w-80 px-4 py-3">다음 확인행동</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-slate-200 last:border-b-0">
              <th className="sticky left-0 z-10 border-r border-slate-300 bg-white px-4 py-4 font-black text-slate-900">
                {category.category}
              </th>
              <td className="px-4 py-4 font-medium leading-5 text-slate-600">{category.scope}</td>
              <td className="px-4 py-4">
                <span className="border border-slate-300 bg-slate-50 px-2 py-1 font-bold text-slate-600">{category.count}</span>
              </td>
              <td className="px-4 py-4 font-bold text-amber-700">{category.factStatus}</td>
              <td className="px-4 py-4 font-medium leading-5 text-slate-600">
                <span className="flex items-start gap-2">
                  <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-[#0057b8]" />
                  {category.nextAction}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default EvidenceStatus;
