import { useEffect, useMemo, useState } from 'react';
import { songhyeonSupabase } from '../../lib/songhyeonSupabase';
import { songhyeonMemberFallback } from '../../data/songhyeonMembers';

const GROUP_ORDER = ['공간솔루션센터', '기업마케팅', '기획추진센터'];

const DISPLAY_TITLES = {
  김현수: '센터장',
  이시정: '센터장',
  김민지: '리더',
  정수명: '매니저',
  임수빈: '매니저',
  방채미: '매니저',
  이지원: '매니저',
};

const GROUP_META = {
  공간솔루션센터: {
    affiliation: 'SSC',
    responsibilities: [
      ['서비스 오너', '송현 공간·서비스 방향, 이용자 경험 및 운영모델을 통합 설계함'],
      ['파트너 협의', '기업 파트너 단일 협의창구로서 참여조건·원가·운영요건과 실행 가능성을 조율함'],
      ['현장 실행', '서비스 가설을 현장 실행안으로 전환하고 운영 준비·이용자 동선·실증 운영을 관리함'],
      ['성과관리', '운영기록과 이용자 반응을 수집하고 성과지표·개선과제·후속 실행안을 관리함'],
    ],
  },
  기업마케팅: {
    affiliation: 'EMC',
    responsibilities: [
      ['기업 발굴', '기업 네트워크를 활용해 송현 서비스와 연계 가능한 기업·브랜드 후보군을 발굴함'],
      ['최초 접점', '참여 가능성·관심영역·의사결정 구조를 확인하고 초기 커뮤니케이션을 지원함'],
      ['관계 인계', '기업 관계정보와 미팅 결과를 구조화해 공간솔루션센터에 정확히 인계함'],
      ['협의 지원', '인계 이후 주요 기업 관계를 지원하고 파트너 협의의 연속성을 유지함'],
    ],
  },
  기획추진센터: {
    affiliation: '부문직속',
    responsibilities: [
      ['전략·우선순위', '사업방향과 단계별 우선순위를 설정하고 TF 주요 현안과 의사결정 안건을 관리함'],
      ['사업구조', '공공–민간 역할, 파트너 선정기준, 제안조건과 단계별 실행계획의 정합성을 관리함'],
      ['서울시 협력', '서울시 협력 의제와 대외 커뮤니케이션을 총괄하고 공공성·실행조건을 조율함'],
      ['단계게이트', '각 단계의 완료근거를 검토하고 단계전환·보완·중단에 관한 TF 의사결정을 지원함'],
    ],
  },
};

const normalize = (row) => ({
  id: row.profile_id || row.id || `${row.group}-${row.name}`,
  group: row.group_name || row.group,
  name: row.staff_name || row.name,
  title: DISPLAY_TITLES[row.staff_name || row.name] || row.title || '',
  roles: row.roles || [],
  responsibility: row.responsibility || '',
  photoPath: row.photo_path || row.photoPath || `/songhyeon-members/${row.staff_name || row.name}.webp`,
  gateScope: row.gate_scope || row.gateScope || [],
  order: row.display_order ?? row.order ?? 999,
});

function Person({ member, onPreview, onPreviewEnd }) {
  const [failed, setFailed] = useState(false);
  return <div
    className="group flex cursor-pointer items-center gap-[12px]"
    onMouseEnter={() => !failed && onPreview(member)}
    onMouseLeave={onPreviewEnd}
  >
    <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3c3c3c]">
      <span className="text-[11px] font-bold text-[#86868B]">{member.name.slice(-2)}</span>
      {!failed && member.photoPath && <img src={member.photoPath} alt={member.name} onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
    </div>
    <div className="flex flex-col text-left">
      <span className="text-[14px] font-bold leading-tight text-white transition-colors group-hover:text-[#fbf167]">{member.name}</span>
      <span className="mt-[2px] text-[12px] leading-tight text-[#A1A1AA]">{member.title}</span>
    </div>
  </div>;
}

export default function SonghyeonInternal() {
  const [members, setMembers] = useState(songhyeonMemberFallback.map(normalize));
  const [query, setQuery] = useState('');
  const [tableCollapsed, setTableCollapsed] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!songhyeonSupabase) return;
    let active = true;
    songhyeonSupabase.from('songhyeon_public_profiles').select('profile_id,group_name,staff_name,title,roles,responsibility,photo_path,gate_scope,display_order').order('display_order')
      .then(({ data, error }) => {
        if (active && !error && data?.length) {
          setMembers(data.map(normalize));
        }
      });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return members;
    return members.filter((member) => [member.group, member.name, member.title, member.responsibility, ...member.roles, ...member.gateScope].join(' ').toLowerCase().includes(needle));
  }, [members, query]);

  const rows = useMemo(() => GROUP_ORDER.map((group) => ({
    group,
    members: filtered.filter((member) => member.group === group).sort((a, b) => a.order - b.order),
    ...GROUP_META[group],
  })).filter((row) => row.members.length), [filtered]);

  return <div className="mx-auto flex min-w-0 w-full max-w-[1112px] flex-1 flex-col pb-[100px] pt-[28px] text-[#E5E5E5]" onMouseMove={(event) => setMousePos({ x: event.clientX, y: event.clientY })}>
    <div className="mb-[8px] flex h-[36px] items-center justify-between">
      <h1 className="font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">송현 BID Member</h1>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-[14px] flex items-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <input aria-label="송현 BID Member 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름, 직무, 활동 등 자유롭게 검색하세요" className="w-[280px] rounded-[12px] border border-[#545451] bg-[#272726] py-[8px] pl-[36px] pr-[16px] text-[13px] text-white transition-colors hover:border-[#666] focus:border-[#2997ff] focus:outline-none" />
      </div>
    </div>
    <p className="mb-[24px] text-[16px] leading-[26px] text-[#86868B]">송현 BID TF의 의사결정·서비스 설계·관계지원·현장실행 인력 명단입니다.</p>

    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="text-[18px] font-bold tracking-tight text-white">조직도 요약표</h2>
      <button type="button" onClick={() => setTableCollapsed(!tableCollapsed)} className="flex cursor-pointer items-center gap-[4px] text-[13px] text-[#86868B] transition-colors hover:text-white">{tableCollapsed ? '표 펼치기 ↓' : '표 접기 ↑'}</button>
    </div>

    {!tableCollapsed && <div className="w-full overflow-hidden rounded-[24px] border border-[#333] bg-[#242424] transition-all">
      <table className="w-full table-fixed border-collapse bg-transparent text-left">
        <thead><tr>
          <th className="w-[140px] border-b border-r border-[#333] bg-transparent px-[24px] py-[16px] text-[13px] font-normal text-[#86868B]">기능셀</th>
          <th className="w-[230px] border-b border-[#333] bg-transparent px-[14px] py-[16px] text-[13px] font-normal text-[#86868B]">인력</th>
          <th className="border-b border-r border-[#333] bg-transparent px-[14px] py-[16px] text-[13px] font-normal text-[#86868B]">핵심 책임</th>
          <th className="w-[130px] border-b border-[#333] bg-transparent px-[14px] py-[16px] text-[13px] font-normal text-[#86868B]">부문 내 소속</th>
        </tr></thead>
        <tbody>{rows.map((row) => <tr
          key={row.group}
          className={`cursor-default border-b border-[#333] transition-colors last:border-b-0 ${row.group !== '공간솔루션센터' ? 'h-[220px]' : ''} ${hoveredRow === row.group ? 'bg-white/5' : ''}`}
          onMouseEnter={() => setHoveredRow(row.group)}
          onMouseLeave={() => { setHoveredRow(null); setHoveredMember(null); }}
        >
          <td className="border-r border-[#333] px-[24px] py-[16px] align-middle text-[14px] font-normal text-[#E5E5E5]">{row.group}</td>
          <td className="px-[14px] py-[16px] align-middle"><div className="flex flex-col gap-[16px]">{row.members.map((member) => <Person key={member.id} member={member} onPreview={setHoveredMember} onPreviewEnd={() => setHoveredMember(null)} />)}</div></td>
          <td className="border-r border-[#333] px-[14px] py-[16px] align-middle text-[13px] leading-[22px] text-[#bbb9af]">
            <div className="flex flex-col gap-[10px]">{row.responsibilities.map(([label, detail]) => <div key={label} className="grid grid-cols-[78px_1fr] gap-[12px]"><span className="font-medium text-[#86868B]">{label}</span><span>{detail}</span></div>)}</div>
          </td>
          <td className="px-[14px] py-[16px] align-middle text-[13px] leading-[22px] text-[#bbb9af]">{row.affiliation}</td>
        </tr>)}</tbody>
      </table>
    </div>}

    {hoveredMember && <div
      className="pointer-events-none fixed z-[110] h-[128px] w-[128px] overflow-hidden rounded-full border border-[#333] bg-[#222] shadow-2xl"
      style={{ left: mousePos.x + 10, top: mousePos.y - 50 }}
    >
      <img src={hoveredMember.photoPath} alt={`${hoveredMember.name} 확대`} className="h-full w-full object-cover" />
    </div>}
  </div>;
}
