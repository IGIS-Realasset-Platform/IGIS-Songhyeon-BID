const validationScope = [
  { title: '민관 협업', detail: '서울시·공공기관과의 공간사용, 행정협력, 역할분담 프로토콜을 검증함' },
  { title: '서비스·원가', detail: '서비스 품질, CapEx·OpEx, 참여주체의 비용·책임 한계와 지속 가능성을 확인함' },
  { title: '현장 운영', detail: '안전·보안·미화·시설 O&M, 민원 대응과 운영 파트너의 실행 가능성을 검증함' },
  { title: '성과·계약', detail: '이용자 반응, 운영성과, 파트너 참여조건과 표준 위탁·협력 조건을 기록함' },
];

const guardrails = [
  ['단기 이벤트화', '일회성 행사나 마케팅 성과만으로 프로젝트를 평가하지 않음'],
  ['네트워킹의 목적화', '기업 소개 자체를 성과로 보지 않고 실제 참여조건과 실행 가능성까지 확인함'],
  ['선(先) 콘텐츠 선정', '현장 문제와 이용자 수요를 확인하기 전에 콘텐츠를 먼저 확정하지 않음'],
  ['해외사례 단순 대입', '해외 BID 성과를 송현에 그대로 적용하지 않고 국내 행정·운영조건을 별도 검증함'],
  ['근거 없는 수익화', '서울시와의 사전 협의와 비용·책임 검토 없이 수익모델을 기정사실화하지 않음'],
  ['SBD 사업성 과대해석', '송현 결과를 서울역–남산 SBD의 사업성 지표로 직접 확대 해석하지 않음'],
];

const readiness = [
  ['가설 타당성', '최소 범위의 현장 문제와 검증 질문이 명확한가'],
  ['책임 명확성', '민관 역할, 현장 책임자, 안전·민원·인허가 책임이 정리됐는가'],
  ['재무·안전', 'CapEx·OpEx, 보험, 물리적·법적 안전요건과 중단 기준이 확인됐는가'],
  ['성과 측정', '이용량·체류·만족도·운영원가 등 성공과 실패를 판정할 데이터가 정의됐는가'],
];

export default function SonghyeonPrinciples() {
  return <div className="mx-auto flex min-w-0 w-full max-w-[1112px] flex-1 flex-col pb-[100px] pt-[28px]">
    <div className="mb-[8px] flex h-[36px] items-center justify-between">
      <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">운영 원칙</h1>
    </div>
    <p className="mb-[24px] text-[16px] leading-[26px] text-[#86868B]">송현을 거시 마스터플랜이 아닌 최소 실증으로 운영하기 위한 범위와 판단 기준입니다.</p>

    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="text-[18px] font-bold tracking-tight text-white">송현에서 확인할 것</h2>
    </div>
    <div className="mb-[56px] grid grid-cols-2 gap-[12px]">
      {validationScope.map((item) => <div key={item.title} className="rounded-[18px] border border-[#3c3c3c] bg-[#272726] p-[22px] transition-colors hover:bg-[#292928]">
        <h3 className="mb-[8px] text-[16px] font-bold text-[#2997FF]">{item.title}</h3>
        <p className="text-[14px] leading-[23px] text-[#c3c2b7]">{item.detail}</p>
      </div>)}
    </div>

    <h2 className="mb-[16px] text-[20px] font-bold text-white">하지 않을 것</h2>
    <div className="mb-[56px] overflow-hidden rounded-[24px] border border-[#333]">
      <table className="w-full table-fixed text-left">
        <tbody className="divide-y divide-[#333]">{guardrails.map(([title, detail]) => <tr key={title} className="transition-colors hover:bg-[#292928]">
          <td className="w-[210px] border-r border-[#333] px-[24px] py-[15px] text-[14px] font-bold text-[#E5E5E5]">{title}</td>
          <td className="px-[24px] py-[15px] text-[14px] leading-[22px] text-[#bbb9af]">{detail}</td>
        </tr>)}</tbody>
      </table>
    </div>

    <h2 className="mb-[16px] text-[20px] font-bold text-white">MVP 투입 전 확인</h2>
    <div className="grid grid-cols-4 gap-[12px]">{readiness.map(([title, detail], index) => <div key={title} className="rounded-[18px] border border-[#3c3c3c] bg-[#1E1E1E] p-[20px] transition-colors hover:bg-[#292928]">
      <div className="mb-[12px] text-[12px] font-bold text-[#86868B]">0{index + 1}</div>
      <h3 className="mb-[8px] text-[15px] font-bold text-white">{title}</h3>
      <p className="text-[13px] leading-[21px] text-[#bbb9af]">{detail}</p>
    </div>)}</div>
  </div>;
}
