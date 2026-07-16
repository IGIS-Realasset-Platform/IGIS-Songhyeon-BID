import React from 'react';
import { Link } from 'react-router-dom';

export default function AssetPortfolio() {
  const assets = [
    { name: '더케이트윈타워', type: 'Core Office', status: '운영 중', path: '/assets/k-twin' },
    { name: '트윈트리 빌딩', type: 'Core Office', status: '운영 중', path: '/assets/twin-tree' },
    { name: '쌈지길', type: 'Retail (Craft Hub)', status: '리츠/펀드 편입 운영', path: '/assets/ssamzigil' },
    { name: '안녕인사동', type: 'Retail / Culture', status: '운영 중', path: '/assets/annyeong' },
    { name: '신규 매입 중소자산 2개', type: 'Development', status: '검토 중', path: '/assets/new-assets' }
  ];

  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Asset Portfolio</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          Songhyeon Art Triangle을 구성하는 이지스자산운용의 실물 자산 및 신규 매입 검토 자산 현황임.
        </p>
      </header>

      <div className="bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">자산명</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">유형</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">상태</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase text-right">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{asset.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{asset.status}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={asset.path} className="text-sm font-medium text-blue-600 hover:underline">
                    보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
