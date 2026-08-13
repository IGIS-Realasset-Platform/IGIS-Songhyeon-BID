const interfaces = [
  { partner: '서울시·공공기관', window: '기획추진센터', handoff: '공공가치·공간사용·인허가·행정협력 조건을 TF에 공유', rule: '공식 협의 내용과 조건 변경은 회의록·이슈원장에 기록' },
  { partner: '파트너 기업', window: '기업마케팅센터 → 공간솔루션센터', handoff: '기업마케팅이 최초 접점과 관계정보를 전달하고, 공간솔루션이 참여모델·실무조건 협의', rule: '중복 접촉을 피하고 파트너 선정·주요 조건은 TF에서 결정' },
  { partner: '총괄 운영 파트너', window: '공간솔루션센터', handoff: '서비스·운영모델을 전달하고 인력·일정·동선·안전·품질·원가를 통합 조율', rule: '현장 성과와 이슈는 공간솔루션센터를 통해 TF에 보고' },
  { partner: '콘텐츠 협력사', window: '공간솔루션센터', handoff: '참여모델과 제공 자원을 협의하고 총괄 운영 파트너에게 현장 실행을 연계', rule: '개별 협력사의 독립 실행보다 현장 통합운영 기준을 우선' },
  { partner: '지역상권·지역조직', window: '공간솔루션센터', handoff: '지역 수요·자원과 공동기획 가능성을 확인해 서비스 가설에 반영', rule: '일회성 참여가 아니라 실행조건과 역할을 확인' },
  { partner: '자산·현장 조직', window: '공간솔루션센터 + 기획추진센터', handoff: 'PM·FM·보안·미화·시설·안전의 현장 제약과 책임 한계를 조율', rule: '안전·민원·시설 제약은 MVP 투입 전에 해소하거나 중단조건으로 명시' },
];

const internalFlow = [
  ['기업마케팅센터', '기업 발굴 · 최초 접점 · 관계정보 확인'],
  ['공간솔루션센터', '참여모델 · 서비스 · 운영조건 실무협의'],
  ['송현 BID TF', '실증 가설 · 파트너 · 참여조건 · 예산 · KPI 최종 결정'],
  ['총괄 운영 파트너', '인력 · 일정 · 안전 · 품질 · 원가를 통합해 현장 구현'],
];

export default function SonghyeonInterfaces() {
  return <div className="mx-auto flex min-w-0 w-full max-w-[1112px] flex-1 flex-col pb-[100px] pt-[28px]">
    <div className="mb-[8px] flex h-[36px] items-center justify-between">
      <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">협의 창구</h1>
    </div>
    <p className="mb-[24px] text-[16px] leading-[26px] text-[#86868B]">외부 협력자별 공식 접점과 내부 인계 경로를 단순하게 유지합니다.</p>

    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="text-[18px] font-bold tracking-tight text-white">내부 인계 흐름</h2>
    </div>
    <div className="mb-[48px] flex items-stretch gap-[8px]">
      {internalFlow.map(([title, detail], index) => <div key={title} className="contents">
        <div className="flex min-w-0 flex-1 flex-col justify-center rounded-[18px] border border-[#3c3c3c] bg-[#272726] p-[18px] transition-colors hover:bg-[#292928]">
          <span className="mb-[7px] text-[14px] font-bold text-white">{title}</span>
          <span className="text-[13px] leading-[20px] text-[#bbb9af]">{detail}</span>
        </div>
        {index < internalFlow.length - 1 && <div className="flex shrink-0 items-center text-[#666]">→</div>}
      </div>)}
    </div>

    <h2 className="mb-[16px] text-[20px] font-bold text-white">외부 주체별 단일 창구</h2>
    <div className="overflow-hidden rounded-[24px] border border-[#333]">
      <table className="w-full table-fixed text-left">
        <thead><tr>
          <th className="w-[180px] border-b border-r border-[#333] px-[20px] py-[14px] text-[14px] font-bold text-[#86868B]">외부 주체</th>
          <th className="w-[245px] border-b border-r border-[#333] px-[20px] py-[14px] text-[14px] font-bold text-[#2997FF]">공식 협의 창구</th>
          <th className="border-b border-r border-[#333] px-[20px] py-[14px] text-[14px] font-bold text-[#86868B]">내부 인계</th>
          <th className="w-[255px] border-b border-[#333] px-[20px] py-[14px] text-[14px] font-bold text-[#86868B]">운영 기준</th>
        </tr></thead>
        <tbody className="divide-y divide-[#333]">{interfaces.map((row) => <tr key={row.partner} className="transition-colors hover:bg-[#292928]">
          <td className="border-r border-[#333] px-[20px] py-[15px] align-middle text-[14px] font-bold text-[#E5E5E5]">{row.partner}</td>
          <td className="border-r border-[#333] px-[20px] py-[15px] align-middle text-[14px] font-bold leading-[22px] text-white">{row.window}</td>
          <td className="border-r border-[#333] px-[20px] py-[15px] align-middle text-[13px] leading-[21px] text-[#bbb9af]">{row.handoff}</td>
          <td className="px-[20px] py-[15px] align-middle text-[13px] leading-[21px] text-[#bbb9af]">{row.rule}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
