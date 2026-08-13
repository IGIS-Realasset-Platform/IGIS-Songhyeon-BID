import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function MarketData() {
  const assets = [
    { id: 1, name: 'G1 서울 (공평 15,16)', area: '43,388', year: '2026' },
    { id: 2, name: '그랜드센트럴', area: '37,925', year: '2020' },
    { id: 3, name: 'D타워 돈의문', area: '26,083', year: '2020' },
    { id: 4, name: '을지트윈타워', area: '44,369', year: '2019' },
    { id: 5, name: '센트로폴리스', area: '42,796', year: '2018' },
    { id: 6, name: '디타워 광화문', area: '31,899', year: '2015' },
    { id: 7, name: '그랑 서울', area: '53,100', year: '2014' },
    { id: 8, name: '케이트윈타워', area: '25,355', year: '2012' },
    { id: 9, name: '파인 애비뉴', area: '39,325', year: '2011' },
    { id: 10, name: '시그니쳐 타워', area: '30,249', year: '2011' },
    { id: 11, name: '미래에셋 센터원', area: '50,835', year: '2010' },
    { id: 12, name: 'SK T타워', area: '27,778', year: '2004' },
    { id: 13, name: '서울파이낸스센터 (SFC)', area: '36,118', year: '2001' },
    { id: 14, name: '우리은행 본점', area: '29,410', year: '1999' },
    { id: 15, name: '연세세브란스빌딩', area: '32,931', year: '1993' },
    { id: 16, name: '한화장교빌딩', area: '46,320', year: '1987' },
    { id: 17, name: '대한상공회의소', area: '34,282', year: '1984' },
    { id: 18, name: '광화문 교보빌딩', area: '28,627', year: '1984' },
    { id: 19, name: '부영태평빌딩', area: '26,524', year: '1984' },
    { id: 20, name: '서울스퀘어', area: '40,174', year: '1970' },
  ];

  const transactionColumns = [
    { key: 'ktwin', label: '케이트윈타워' },
    { key: 'pine', label: '파인애비뉴 A동' },
    { key: 'signature', label: '시그니쳐타워' },
    { key: 'centerpoint', label: '센터포인트 광화문' },
    { key: 'ferrum', label: '페럼타워' },
    { key: 'crescendo', label: '크레센도빌딩' },
    { key: 'susong', label: '수송스퀘어' },
    { key: 'daishin', label: '대신343' },
    { key: 'crystal', label: '크리스탈스퀘어' },
  ];

  const transactionRows = [
    { label: '자산 전경', isImage: true, ktwin: '/trans_ktwin.webp', pine: '/trans_pine.webp', signature: '/trans_signature.webp', centerpoint: '/trans_centerpoint.webp', ferrum: '/trans_ferrum.webp', crescendo: '/trans_crescendo.webp', susong: '/trans_susong.webp', daishin: '/trans_daishin.webp', crystal: '/trans_crystal.webp' },
    { label: '위치', ktwin: '종로1길 50', pine: '을지로 100', signature: '청계천로 100', centerpoint: '새문안로5길 31', ferrum: '을지로5길 19', crescendo: '새문안로 75', susong: '율곡로2길 19', daishin: '삼일대로 343', crystal: '청계천로 106' },
    { label: '준공년도', ktwin: '2012년', pine: '2011년', signature: '2011년', centerpoint: '2013년', ferrum: '2010년', crescendo: '2010년', susong: '2002년', daishin: '2017년', crystal: '2021년' },
    { label: '연면적', ktwin: '25,379평', pine: '19,896평', signature: '30,249평', centerpoint: '11,781평', ferrum: '16,848평', crescendo: '16,538평', susong: '15,234평', daishin: '16,144평', crystal: '5,573평' },
    { label: '거래금액', isBlackBold: true, ktwin: 'TBD', pine: 'TBD', signature: '10,346억원', centerpoint: '4,320억원', ferrum: '6,451억원', crescendo: '5,567억원', susong: '5,226억원', daishin: '6,620억원', crystal: '2,068억원' },
    { label: '평단가', isBlackBold: true, ktwin: 'TBD', pine: '약 4,000만원/평 [E]', signature: '3,420만원/평', centerpoint: '3,667만원/평', ferrum: '3,829만원/평', crescendo: '3,366만원/평', susong: '3,430만원/평', daishin: '4,101만원/평', crystal: '3,711만원/평' },
    { label: '거래시기', ktwin: 'TBD', pine: '\'26.3Q [E]', signature: '\'25.4Q', centerpoint: '\'25.3Q', ferrum: '\'25.3Q', crescendo: '\'25.2Q', susong: '\'25.2Q', daishin: '\'25.1Q', crystal: '\'25.1Q' },
    { label: '매도인', ktwin: '삼성SRA자산운용', pine: '신한카드', signature: '이지스자산운용', centerpoint: '코람코자산신탁', ferrum: '삼성생명', crescendo: 'DWS자산운용', susong: '이지스자산운용', daishin: '대신증권', crystal: '캐피탈랜드투자운용' },
    { label: '매수인', ktwin: '-', pine: '-', signature: 'KB자산운용', centerpoint: '교보AIM자산운용', ferrum: '동국제강', crescendo: '코람코자산신탁', susong: '디앤디인베스트먼트', daishin: '대신자산신탁', crystal: 'LB자산운용(리드코프)' },
    { label: '비고', ktwin: '-', pine: '-', signature: 'Share-deal 거래', centerpoint: 'Share-deal 거래', ferrum: '우선매수권 실행', crescendo: '-', susong: '-', daishin: '사옥 리츠 유동화', crystal: 'SI 사옥 목적 투자' },
  ];

  const leaseColumns = [
    { key: 'target', label: '케이트윈타워' },
    { key: 'center1', label: '센터원' },
    { key: 'granseoul', label: '그랑서울' },
    { key: 'centropolis', label: '센트로폴리스' },
    { key: 'sfc', label: 'SFC' },
    { key: 'dtower', label: 'D타워 광화문' },
    { key: 'concordian', label: '콘코디언빌딩' },
    { key: 'g1seoul', label: 'G1 서울' },
  ];

  const leaseRows = [
    { label: '자산 전경', isImage: true, target: '/comp_target.webp', center1: '/comp_center1.webp', granseoul: '/comp_granseoul.webp', centropolis: '/comp_centropolis.webp', sfc: '/comp_sfc.webp', dtower: '/comp_dtower.webp', concordian: '/comp_concordian.webp', g1seoul: '/comp_g1seoul.webp' },
    { label: '위치', target: '종로1길 50', center1: '을지로5길 26', granseoul: '종로 33', centropolis: '우정국로 26', sfc: '세종대로 136', dtower: '종로3길 17', concordian: '새문안로 76', g1seoul: '종로11길 18' },
    { label: '준공년도', target: '2012년', center1: '2010년', granseoul: '2014년', centropolis: '2018년', sfc: '2001년', dtower: '2015년', concordian: '2008년', g1seoul: '2026년(e)' },
    { label: '규모', target: 'B2~16F', center1: 'B8~32F', granseoul: 'B7~24F', centropolis: 'B8~26F', sfc: 'B8~30F', dtower: 'B8~24F', concordian: 'B8~29F', g1seoul: 'B8~25F' },
    { label: '연면적', target: '25,379평', center1: '50,835평', granseoul: '53,100평', centropolis: '42,796평', sfc: '36,118평', dtower: '31,899평', concordian: '18,360평', g1seoul: '43,464평' },
    { label: '기준층 전용면적', target: '413평', center1: '431평', granseoul: '605평', centropolis: '496평', sfc: '531평', dtower: '316평', concordian: '306평', g1seoul: '753평' },
    { label: '전용률', target: '57.36%', center1: '51.05%', granseoul: '57.38%', centropolis: '56.42%', sfc: '56.52%', dtower: '50.11%', concordian: '48.01%', g1seoul: '57.03%' },
    { label: '평당 보증금', target: '770,000원', center1: '1,630,000원', granseoul: '1,850,000원', centropolis: '1,750,000원', sfc: '1,700,000원', dtower: '1,495,000원', concordian: '1,464,000원', g1seoul: '1,940,000원' },
    { label: '평당 임대료', target: '156,000원', center1: '163,000원', granseoul: '185,000원', centropolis: '175,000원', sfc: '170,000원', dtower: '149,500원', concordian: '146,400원', g1seoul: '194,000원' },
    { label: '평당 관리비', target: '55,000원', center1: '60,000원', granseoul: '58,000원', centropolis: '58,000원', sfc: '59,000원', dtower: '49,500원', concordian: '61,500원', g1seoul: '63,000원' },
    { label: 'Rent-free (개월/년)', target: '1.0', center1: '0.0', granseoul: '0.0', centropolis: '0.0', sfc: '0.0', dtower: '0.0', concordian: '2.0', g1seoul: '2.8' },
    { label: 'E.NOC', target: '347,426원', center1: '442,148원', granseoul: '428,866원', centropolis: '418,144원', sfc: '410,179원', dtower: '402,099원', concordian: '387,294원', g1seoul: '374,500원', isHighlight: true },
    { label: '비고', target: "'26.1Q 계약사례", center1: "'25.4Q 마케팅가", granseoul: "'25.4Q 마케팅가", centropolis: "'25.4Q 마케팅가", sfc: "'25.4Q 마케팅가", dtower: "'25.4Q 마케팅가", concordian: "'25.4Q 마케팅가", g1seoul: "'25.4Q 계약사례" },
  ];

  return (
    <div className="animate-fade-in pb-16">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">입지분석 및 시장 데이터</h1>
        <div className="bg-[#f8f9fa] border border-gray-200 p-5 space-y-2 cursor-pointer hover:bg-gray-50 transition-colors">
          <p className="flex items-start text-[14px] text-gray-800 leading-relaxed font-medium">
            <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-900 block shrink-0"></span>
            입지 조건 (Core CBD): 반경 1km 이내 다중 환승역(지하철 1·3·5호선) 및 행정·업무·금융 코어 인프라 밀집.
          </p>
          <p className="flex items-start text-[14px] text-gray-800 leading-relaxed font-medium">
            <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-900 block shrink-0"></span>
            공급 스펙: CBD 권역 내 연면적 25,000평 이상 및 2010년 이후 준공 프라임 오피스는 총 11개소 한정.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Funnel Flow (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col justify-start">
          <h2 className="text-[15px] font-bold text-gray-900 mb-2 flex items-center">
            <div className="w-2 h-2 bg-gray-900 mr-2"></div>CBD Prime 오피스 필터링
          </h2>
          
          <div className="flex flex-col h-[520px]">
            <div className="flex-1 border border-[#1f2937] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative z-10 group">
              <div className="bg-[#1f2937] text-white font-bold text-[22px] w-full text-center py-2 group-hover:bg-black transition-colors">20개소</div>
              <div className="text-[12px] text-gray-600 font-semibold text-center mt-3 px-4">CBD 내 연면적 25,000py 이상<br/>오피스 자산</div>
            </div>
            
            <div className="h-[20px] flex justify-center items-center -my-px relative z-0">
              <div className="w-[1px] h-full bg-gray-300 border-l border-dashed border-gray-400"></div>
            </div>

            <div className="flex-1 border border-[#374151] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative z-10 group">
              <div className="bg-[#374151] text-[#172033] font-bold text-[22px] w-full text-center py-2 group-hover:bg-[#1f2937] transition-colors">11개소</div>
              <div className="text-[12px] text-gray-600 font-semibold text-center mt-3 px-4">2010년 이후 준공 자산</div>
            </div>

            <div className="h-[20px] flex justify-center items-center -my-px relative z-0">
              <div className="w-[1px] h-full bg-gray-300 border-l border-dashed border-gray-400"></div>
            </div>

            <div className="flex-1 border border-[#2563eb] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors relative z-10 group">
              <div className="bg-[#2563eb] text-[#172033] font-bold text-[22px] w-full text-center py-2 group-hover:bg-[#1d4ed8] transition-colors">5개소</div>
              <div className="text-[12px] text-gray-600 font-semibold text-center mt-3 px-4">Core CBD<br/>(광화문-종로 권역) 입지</div>
            </div>

            <div className="h-[20px] flex justify-center items-center -my-px relative z-0">
              <div className="w-[1px] h-full bg-gray-300 border-l border-dashed border-gray-400"></div>
            </div>

            <div className="flex-1 border-2 border-[#2563A6] bg-[#eff6ff] flex flex-col items-center justify-center cursor-pointer hover:bg-[#dbeafe] transition-colors shadow-[0_0_15px_rgba(37,99,235,0.15)] relative z-10">
              <div className="bg-[#2563A6] text-[#172033] font-extrabold text-[22px] w-full text-center py-2">1개소 (케이트윈타워)</div>
              <div className="text-[12px] text-[#1e3a8a] font-bold text-center mt-3 px-4 leading-tight">
                거래 가능 자산<br/>
                <span className="text-[10px] font-medium text-blue-600 mt-1 block">(최근 거래자산 및 사옥 또는 영속형 제외)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Map Image (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-[24px] mb-4"></div> {/* Alignment spacer */}
          <div className="border border-gray-200 bg-[#f8f9fa] h-[520px] flex items-center justify-center p-2 cursor-pointer hover:bg-gray-50 transition-colors relative group">
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-gray-200 transition-colors pointer-events-none"></div>
            <img 
              src="/cbd_prime_map.webp" 
              alt="Core CBD Map" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>
        </div>

        {/* Right: Assets Table (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="h-[24px] mb-4"></div> {/* Alignment spacer */}
          <div className="border border-gray-200 bg-white overflow-hidden h-[520px] flex flex-col">
            <table className="w-full text-center border-collapse text-[11px] h-full flex-1">
              <thead>
                <tr className="bg-[#1f2937] text-[#172033] h-[32px]">
                  <th className="px-1 font-semibold border-r border-gray-600 w-[12%]">구분</th>
                  <th className="px-2 font-semibold border-r border-gray-600 w-[48%]">자산명</th>
                  <th className="px-2 font-semibold border-r border-gray-600 w-[20%]">연면적(평)</th>
                  <th className="px-1 font-semibold w-[20%]">준공년도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 flex-1">
                {assets.map((asset, idx) => (
                  <tr 
                    key={asset.id} 
                    className={`cursor-pointer transition-colors h-[23.5px] ${
                      asset.isTarget 
                        ? 'bg-[#2563A6] text-[#172033] hover:bg-[#3b82f6]' 
                        : idx < 7 
                          ? 'bg-[#eff6ff] hover:bg-[#dbeafe] text-gray-800' 
                          : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <td className={`border-r ${asset.isTarget ? 'border-[#3b82f6]' : 'border-gray-100'} font-bold`}>{asset.id}</td>
                    <td className={`border-r ${asset.isTarget ? 'border-[#3b82f6]' : 'border-gray-100'} font-bold`}>{asset.name}</td>
                    <td className={`border-r ${asset.isTarget ? 'border-[#3b82f6]' : 'border-gray-100'}`}>{asset.area}</td>
                    <td>{asset.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {/* Neighboring Transaction Status Section */}
      <div className="mt-12 mb-8 w-full block">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-2 flex items-center">
          <div className="w-2 h-2 bg-gray-900 mr-2"></div>인근 거래 현황 (Transaction Comps)
        </h2>
        
        <div className="border border-gray-200 bg-white overflow-x-auto w-full custom-scrollbar block">
          <table className="w-max min-w-full text-center border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#1f2937] text-[#172033]">
                <th className="px-5 py-3 font-bold border-r border-gray-600 whitespace-nowrap sticky left-0 bg-[#1f2937] z-20 shadow-[1px_0_0_#4b5563]">
                  구분
                </th>
                {transactionColumns.map((col) => (
                  <th 
                    key={col.key} 
                    className="px-[19px] py-3 font-bold border-r border-gray-600 whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-900">
              {transactionRows.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`cursor-pointer transition-colors ${row.isHighlight ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50'}`}
                >
                  <th className={`px-5 py-3 font-semibold border-r border-gray-200 text-gray-700 whitespace-nowrap sticky left-0 z-10 shadow-[1px_0_0_#e5e7eb] ${row.isHighlight ? 'bg-[#f8f9fa] text-[#1d4ed8] font-extrabold' : 'bg-[#fafafa]'} ${row.isBlackBold ? 'text-black font-black text-[13px]' : ''}`}>
                    {row.label}
                  </th>
                  {transactionColumns.map((col) => (
                    <td 
                      key={col.key} 
                      className={`px-[19px] py-3 border-r whitespace-nowrap border-gray-200 ${row.isHighlight ? 'font-bold' : ''} ${row.isBlackBold ? 'text-black font-black text-[13px]' : ''}`}
                    >
                      {row.isImage ? (
                        <div className="w-[80px] md:w-[100px] h-[50px] md:h-[65px] mx-auto overflow-hidden border border-gray-200 relative group/img">
                          <img 
                            src={row[col.key]} 
                            alt="자산 전경" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110" 
                          />
                        </div>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Neighboring Lease Status Section - OUTSIDE THE GRID */}
      <div className="mt-12 mb-8 w-full block">
        <h2 className="text-[17px] font-bold text-gray-900 uppercase mb-2 flex items-center">
          <div className="w-2 h-2 bg-gray-900 mr-2"></div>인근 임대 현황 (Market Comps)
        </h2>
        
        <div className="border border-gray-200 bg-white overflow-x-auto w-full custom-scrollbar block">
          <table className="w-max min-w-full text-center border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#1f2937] text-[#172033]">
                <th className="px-2 py-3 font-bold border-r border-gray-600 bg-[#1f2937] leading-tight">
                  구분
                </th>
                {leaseColumns.map((col) => (
                  <th 
                    key={col.key} 
                    className={`px-1 py-3 font-bold border-r border-gray-600 leading-tight break-keep ${col.isTarget ? 'bg-[#1d4ed8] text-[#172033]' : ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-900">
              {leaseRows.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`cursor-pointer transition-colors ${row.isHighlight ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50'}`}
                >
                  <th className={`px-2 py-2.5 font-semibold border-r border-gray-200 text-gray-700 leading-tight ${row.isHighlight ? 'bg-[#f8f9fa] text-[#1d4ed8] font-extrabold' : 'bg-[#fafafa]'}`}>
                    {row.label}
                  </th>
                  {leaseColumns.map((col) => (
                    <td 
                      key={col.key} 
                      className={`px-1 py-2.5 border-r leading-tight break-keep ${col.isTarget ? 'border-[#5E8FBE] bg-[#eff6ff] font-bold text-[#1d4ed8]' : 'border-gray-200'} ${row.isHighlight && col.isTarget ? 'text-[14px] md:text-[15px] font-black' : ''} ${row.isHighlight && !col.isTarget ? 'font-bold' : ''}`}
                    >
                      {row.isImage ? (
                        <div className="w-[80px] md:w-[100px] h-[50px] md:h-[65px] mx-auto overflow-hidden border border-gray-200 relative group/img">
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                          <img 
                            src={row[col.key]} 
                            alt="자산 전경" 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110" 
                          />
                        </div>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-[10px] text-gray-400 font-medium text-right w-full block">
          Source : IGIS Research (E.NOC = (평당 보증금*보증금이율(2.0%)/12 + 평당 임대료*(12-Rent-free)/12 + 관리비) / 전용률)
        </div>
      </div>
    </div>
  );
}

