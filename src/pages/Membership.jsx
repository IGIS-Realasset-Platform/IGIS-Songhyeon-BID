import { ArrowRight, CheckSquare2 } from 'lucide-react';
import { organizationRoles, projectContext } from '../data/songhyeonTfData';

const environmentLayers = [
  {
    code: 'LAYER 01',
    title: '장소경험 기반',
    question: '사람은 어디에서 이동하고, 머물고, 불편을 경험하는가?',
    evidence: ['동선·체류·이용접점', '공용·공개공간 조건', '현재 프로그램·운영공백'],
    output: '장소별 문제·기회 기준선',
  },
  {
    code: 'LAYER 02',
    title: '입주사·기업 참여 기반',
    question: '누가 어떤 목적과 자원으로 지속적으로 참여할 수 있는가?',
    evidence: ['입주사·임직원 수요', '기업 네트워크·보유자원', '참여 동기·제약조건'],
    output: '참여자·자원·수요 관계 맵',
  },
  {
    code: 'LAYER 03',
    title: '콘텐츠·운영 연결',
    question: '장소와 참여자원을 어떤 운영주기와 파트너 역량으로 연결할 것인가?',
    evidence: ['서비스·콘텐츠 가설', '파트너 필요역량', '운영원가·현장영향'],
    output: '플레이스메이킹 실증 가설',
  },
  {
    code: 'LAYER 04',
    title: '에리어 운영 학습체계',
    question: '실증 결과를 다음 운영결정에 어떻게 연결할 것인가?',
    evidence: ['장소경험·재참여', '운영성·협업성과', '유지·보완·중단 조건'],
    output: '운영환경·정보흐름·학습구조',
  },
];

const hypothesisRules = [
  '멤버십·앱·패스·행사명은 현재 확정안이 아니라 Stage 2 이후 검증할 서비스 가설입니다.',
  'DMO·사무국·계약구조는 실행주체와 운영조건이 확인되는 Stage 4 이후 구체화합니다.',
  '서울시 협업은 기획추진실이 담당하며, TF의 장소·운영 가설에 필요한 조건을 지원합니다.',
  '송현 실증은 SBD 사업성의 축소판이 아니라 후속 적용에 필요한 운영·협업조건을 학습하는 과정입니다.',
];

export default function Membership() {
  return (
    <div className="pb-16 text-slate-900">
      <header className="mb-7 border-b-2 border-slate-950 pb-6">
        <p className="text-[13px] font-black text-[#0057b8]">PLACEMAKING & AREA MANAGEMENT</p>
        <div className="mt-3 flex items-end justify-between gap-12">
          <div className="max-w-[900px]">
            <h1 className="break-keep text-3xl font-black text-slate-950">플레이스메이킹·에리어매니지먼트</h1>
            <p className="mt-4 break-keep text-base font-semibold leading-7 text-slate-600">
              개별 시설이나 이벤트를 먼저 정하지 않고, 장소·이용자·입주사·기업·파트너가 지속적으로 연결될 수 있는 환경과 운영방식을 설계합니다.
            </p>
          </div>
          <div className="min-w-[420px] border border-slate-300 bg-slate-50 p-4">
            <p className="text-[12px] font-black text-slate-400">TF COMMON VALUE</p>
            <p className="mt-2 break-keep text-base font-black leading-7 text-slate-900">{projectContext.coreValue}</p>
          </div>
        </div>
      </header>

      <section className="mb-7">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-black text-[#0057b8]">OPERATING ENVIRONMENT</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">환경 구축의 네 개 층위</h2>
          </div>
          <p className="text-sm font-bold text-slate-500">관찰 → 참여 → 연결 → 학습</p>
        </div>

        <div className="grid grid-cols-4 border-l border-t border-slate-300">
          {environmentLayers.map((layer, index) => (
            <article key={layer.code} className="flex min-h-[420px] flex-col border-b border-r border-slate-300 bg-white">
              <div className={`${index === 3 ? 'bg-[#0057b8]' : 'bg-slate-950'} min-h-[146px] p-5 text-[#E5E5E5]`}>
                <p className="text-[12px] font-black text-blue-200">{layer.code}</p>
                <h3 className="mt-3 break-keep text-xl font-black leading-8">{layer.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="break-keep text-base font-bold leading-7 text-slate-900">{layer.question}</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-[12px] font-black text-slate-400">EVIDENCE</p>
                  <ul className="mt-3 space-y-2">
                    {layer.evidence.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-medium leading-6 text-slate-600">
                        <CheckSquare2 size={15} className="mt-1 shrink-0 text-[#0057b8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto border-t border-slate-200 pt-4">
                  <p className="text-[12px] font-black text-slate-400">OUTPUT</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-black text-[#0057b8]">
                    <ArrowRight size={15} />
                    {layer.output}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-7 grid grid-cols-[1fr_360px] border border-slate-300 bg-white">
        <div className="border-r border-slate-300 p-6">
          <p className="text-[13px] font-black text-[#0057b8]">HYPOTHESIS BOUNDARY</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">현재 확정하지 않는 것</h2>
          <div className="mt-5 grid grid-cols-2 border-l border-t border-slate-200">
            {hypothesisRules.map((rule) => (
              <div key={rule} className="border-b border-r border-slate-200 p-4 text-sm font-semibold leading-6 text-slate-600">
                {rule}
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-blue-50 p-6">
          <p className="text-[13px] font-black text-[#0057b8]">PLANNING OFFICE TRACK</p>
          <h3 className="mt-2 text-xl font-black text-slate-950">서울시 협업</h3>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-700">{projectContext.cityCollaboration.role}</p>
          <p className="mt-5 border-t border-blue-200 pt-4 text-sm font-bold leading-6 text-[#0057b8]">
            공동 목표가 아닌 기획추진실 전담 지원축
          </p>
        </aside>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-[13px] font-black text-[#0057b8]">TEAM CONTRIBUTION</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">조직별 실행 기여</h2>
        </div>
        <div className="grid grid-cols-4 border-l border-t border-slate-300">
          {organizationRoles.map((role) => (
            <article key={role.organization} className="border-b border-r border-slate-300 bg-white p-5">
              <h3 className="text-lg font-black text-slate-950">{role.organization}</h3>
              <p className="mt-2 text-sm font-black leading-6 text-[#0057b8]">{role.sharedContribution}</p>
              <ul className="mt-4 space-y-2">
                {role.responsibilities.map((item) => (
                  <li key={item} className="text-sm font-medium leading-6 text-slate-600">— {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

