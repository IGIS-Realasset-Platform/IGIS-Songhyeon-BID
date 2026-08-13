import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssetBaseline = ({ assets }) => (
  <section className="border border-slate-300 bg-white">
    <div className="flex flex-col gap-2 border-b border-slate-300 p-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-lg font-black text-slate-950">자산·공간 관계 기준선</h2>
      </div>
      <p className="text-xs font-semibold text-slate-500">기존 상세페이지 유지 · 사실관계 재확인 진행</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-max min-w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-50 text-[10px] font-black text-slate-500">
            <th className="sticky left-0 z-10 min-w-44 border-r border-slate-300 bg-slate-50 px-4 py-3">자산</th>
            <th className="min-w-48 px-4 py-3">권역</th>
            <th className="min-w-48 px-4 py-3">관계 유형</th>
            <th className="min-w-48 px-4 py-3">사실상태</th>
            <th className="min-w-28 px-4 py-3">기준일</th>
            <th className="min-w-52 px-4 py-3">출처</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b border-slate-200 last:border-b-0">
              <th className="sticky left-0 z-10 border-r border-slate-300 bg-white px-4 py-4">
                <Link to={asset.path} className="inline-flex items-center gap-2 font-black text-slate-900 hover:text-[#0057b8]">
                  {asset.name}
                  <ArrowUpRight size={13} />
                </Link>
              </th>
              <td className="px-4 py-4 font-medium text-slate-600">{asset.area}</td>
              <td className="px-4 py-4 font-bold text-slate-700">{asset.relationType}</td>
              <td className="px-4 py-4 font-bold text-amber-700">{asset.factStatus}</td>
              <td className="px-4 py-4 font-medium text-slate-500">{asset.asOf}</td>
              <td className="px-4 py-4 font-medium text-slate-500">{asset.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default AssetBaseline;
