const meetings = [
  { meeting: '주간 TF 실무회의', cadence: '주 1회', lead: '기획추진센터', attendees: '3개 조직 실무진', output: '진척·이슈·차주 액션·결정 필요사항' },
  { meeting: '파트너 실무협의', cadence: '필요 시', lead: '공간솔루션센터', attendees: '운영·기업·콘텐츠·지역 파트너', output: '참여조건·운영범위·원가·책임 경계' },
  { meeting: '서울시 실무협의', cadence: '주요 단계 전', lead: '기획추진센터', attendees: '서울시·공공기관·관련 TF', output: '공공가치·공간사용·행정조건·후속조치' },
  { meeting: 'Gate 판단', cadence: '단계 종료 시', lead: '송현 BID TF', attendees: '3개 조직 책임자', output: '다음 단계 진입·보완·보류 결정과 근거' },
];

const escalation = [
  { trigger: '실증 범위·가설 또는 파트너 변경', response: '영향과 대안을 정리해 TF 판단 안건으로 상향' },
  { trigger: '예산·참여조건·계약조건 변경', response: '비용·책임·일정 영향을 확인한 뒤 TF가 결정' },
  { trigger: '서울시·공공기관의 조건 변경', response: '기획추진센터가 공식 내용을 기록하고 TF 및 관련 조직에 공유' },
  { trigger: '안전·민원·인허가·시설 제약 발생', response: '현장 실행을 보류하고 책임주체·대응안·재개조건을 먼저 확정' },
  { trigger: 'KPI 측정 불가 또는 중단 기준 도달', response: '가설을 보완하거나 실증 범위를 축소·종료하는 판단 실시' },
];

const recordRules = [
  '회의 종료 시 결정사항·미결사항·담당조직·기한을 한 번에 기록',
  '외부 협의 내용은 공식 창구가 사실관계와 조건 변경을 원장에 남김',
  '구두 합의는 파트너 선정·예산·참여조건·현장 투입의 근거로 사용하지 않음',
  'Gate 판단은 마일스톤의 완료 기준과 핵심 산출물을 근거로 기록',
];

export default function SonghyeonOperations() {
  return <div className="mx-auto flex min-w-0 w-full max-w-[1112px] flex-1 flex-col pb-[100px] pt-[28px]">
    <div className="mb-[8px] flex h-[36px] items-center justify-between">
      <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">회의·이슈관리</h1>
    </div>
    <p className="mb-[24px] text-[16px] leading-[26px] text-[#86868B]">별도 위원회를 늘리지 않고 현재 TF가 실행·협의·Gate 판단을 기록하는 최소 운영체계입니다.</p>

    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="text-[18px] font-bold tracking-tight text-white">최소 회의체</h2>
    </div>
    <div className="mb-[56px] overflow-hidden rounded-[24px] border border-[#333]">
      <table className="w-full table-fixed text-left">
        <thead><tr>
          <th className="w-[200px] border-b border-r border-[#333] px-[22px] py-[14px] text-[14px] font-bold text-[#86868B]">회의</th>
          <th className="w-[120px] border-b border-r border-[#333] px-[18px] py-[14px] text-[14px] font-bold text-[#86868B]">주기</th>
          <th className="w-[170px] border-b border-r border-[#333] px-[18px] py-[14px] text-[14px] font-bold text-[#86868B]">주관</th>
          <th className="w-[220px] border-b border-r border-[#333] px-[18px] py-[14px] text-[14px] font-bold text-[#86868B]">참석</th>
          <th className="border-b border-[#333] px-[18px] py-[14px] text-[14px] font-bold text-[#86868B]">필수 결과</th>
        </tr></thead>
        <tbody className="divide-y divide-[#333]">{meetings.map((row) => <tr key={row.meeting} className="transition-colors hover:bg-[#292928]">
          <td className="border-r border-[#333] px-[22px] py-[15px] align-middle text-[14px] font-bold text-white">{row.meeting}</td>
          <td className="border-r border-[#333] px-[18px] py-[15px] align-middle text-[13px] text-[#bbb9af]">{row.cadence}</td>
          <td className="border-r border-[#333] px-[18px] py-[15px] align-middle text-[13px] font-bold text-[#E5E5E5]">{row.lead}</td>
          <td className="border-r border-[#333] px-[18px] py-[15px] align-middle text-[13px] leading-[21px] text-[#bbb9af]">{row.attendees}</td>
          <td className="px-[18px] py-[15px] align-middle text-[13px] leading-[21px] text-[#bbb9af]">{row.output}</td>
        </tr>)}</tbody>
      </table>
    </div>

    <h2 className="mb-[16px] text-[20px] font-bold text-white">TF 판단으로 올릴 사안</h2>
    <div className="mb-[56px] flex flex-col gap-[10px]">{escalation.map((item) => <div key={item.trigger} className="group flex items-stretch gap-[8px]">
      <div className="flex flex-1 items-center rounded-[16px] border border-[#3c3c3c] bg-[#1E1E1E] p-[18px] transition-colors group-hover:bg-[#292928]">
        <span className="mr-[12px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#e11d48]" /><span className="text-[14px] font-medium text-[#E5E5E5]">{item.trigger}</span>
      </div>
      <div className="flex items-center px-[5px] text-[#666]">→</div>
      <div className="flex flex-1 items-center rounded-[16px] border border-[#3c3c3c] bg-[#1E1E1E] p-[18px] transition-colors group-hover:bg-[#292928]">
        <span className="mr-[12px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#2997FF]" /><span className="text-[14px] font-bold leading-[22px] text-[#5da0e7]">{item.response}</span>
      </div>
    </div>)}</div>

    <h2 className="mb-[16px] text-[20px] font-bold text-white">기록 원칙</h2>
    <div className="rounded-[24px] border border-[#333] bg-[#1A1A1A] p-[28px]">
      <ul className="flex flex-col gap-[14px]">{recordRules.map((rule) => <li key={rule} className="flex items-start">
        <span className="mr-[14px] mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#86868B]" /><span className="text-[15px] leading-[24px] text-[#E5E5E5]">{rule}</span>
      </li>)}</ul>
    </div>
  </div>;
}
