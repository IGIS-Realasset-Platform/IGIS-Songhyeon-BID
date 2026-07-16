import React from 'react';

export default function DataRoom() {
  const documents = [
    {
      title: '유진그룹-이지스 전략적 파트너십 제안서',
      date: '2026.06.12',
      type: 'PDF',
      category: 'IR / Investment'
    },
    {
      title: 'THE QUAD × Songhyeon Art Triangle 기획안',
      date: '2026.07.13',
      type: 'Notion / MD',
      category: 'Strategy / Planning'
    },
    {
      title: '도화서길 블록 매집 시나리오 및 타당성 검토',
      date: '2026.08 (TBD)',
      type: 'Excel',
      category: 'Financial Model'
    }
  ];

  return (
    <div className="p-10">
      <header className="mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Data & Resource Room</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          Songhyeon Art Triangle BID 기획 및 운영 관련 핵심 문서 자료실.
        </p>
      </header>

      <div className="bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Document Name</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Type</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-700 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {doc.title}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 bg-gray-200 text-xs font-semibold text-gray-800 rounded-sm">
                    {doc.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
