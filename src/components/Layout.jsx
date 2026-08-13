import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home, CalendarDays, ClipboardList, Building2, BookOpen, Map, ListChecks,
  FolderOpen, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';

const primaryItems = [
  { name: '홈', path: '/', icon: Home },
  { name: '통합업무보드', path: '/tasks', icon: ListChecks },
  { name: '마일스톤 및 R&R', path: '/milestones', icon: CalendarDays },
  { name: '업무실행계획', path: '/execution', icon: ClipboardList },
  { name: '서비스·운영 가설', path: '/hypotheses', icon: Map },
  { name: '자료실', path: '/data', icon: FolderOpen },
];

const assetItems = [
  { name: '더케이트윈타워', path: '/assets/k-twin' },
  { name: '트윈트리 빌딩', path: '/assets/twin-tree' },
  { name: '쌈지길', path: '/assets/ssamzigil' },
  { name: '안녕인사동', path: '/assets/annyeong' },
  { name: '신규 중소자산', path: '/assets/new-assets' },
  { name: '시장 데이터', path: '/assets/market-data' },
];

const caseItems = [
  { name: '미국 BID', path: '/cases/us' },
  { name: '일본 에리어매니지먼트', path: '/cases/japan' },
];

const governanceItems = [
  { name: '송현 BID Member', path: '/governance/internal' },
  { name: '운영 원칙', path: '/governance/principles' },
  { name: '협의 창구', path: '/governance/interfaces' },
  { name: '회의·이슈관리', path: '/governance/operations' },
];

function MainLink({ item, collapsed }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.name : undefined}
      className={({ isActive }) => `flex items-center rounded-xl py-[7px] text-[14px] font-light transition-colors ${
        collapsed ? 'justify-center px-2' : 'px-[7px]'
      } ${isActive ? 'bg-[#151515] text-white' : 'text-white hover:bg-[#151515]'}`}
    >
      <Icon size={18} strokeWidth={1.5} className={collapsed ? '' : 'mr-[10px]'} />
      {!collapsed && <span className="truncate">{item.name}</span>}
    </NavLink>
  );
}

function Section({ label, items, open, setOpen, collapsed }) {
  if (collapsed) return null;
  return (
    <div className="mt-6 mb-2">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between px-[7px] text-[13px] font-semibold text-[#86868B] transition-colors hover:text-white">
        <span>{label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-0">
          {items.map((item) => (
            <NavLink
              key={item.path + item.name}
              to={item.path}
              className={({ isActive }) => `flex items-center justify-between rounded-xl px-[7px] py-[7px] text-[14px] font-light transition-colors ${isActive ? 'bg-[#151515] text-white' : 'text-white hover:bg-[#151515]'}`}
            >
              <span className="truncate">{item.name}</span>
              <ChevronRight size={13} className="hidden text-[#86868B]" />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const isDarkWorkspace = pathname === '/milestones' || pathname === '/tasks' || pathname === '/hypotheses' || pathname === '/data' || pathname.startsWith('/governance');
  const { user, member, signOut } = useSonghyeonAuth();
  const mainRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(pathname.startsWith('/assets'));
  const [casesOpen, setCasesOpen] = useState(pathname.startsWith('/cases'));
  const [governanceOpen, setGovernanceOpen] = useState(pathname.startsWith('/milestones') || pathname.startsWith('/governance'));

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    mainRef.current.scrollTop = 0;
    mainRef.current.scrollLeft = 0;
  }, [pathname]);

  return (
    <div className="flex h-screen min-w-[1280px] overflow-hidden bg-[#1F1F1E] font-sans text-[#E5E5E5]">
      <aside className={`${collapsed ? 'w-[56px]' : 'w-[275px]'} flex h-full shrink-0 flex-col overflow-hidden border-r border-[#2C2C2E] bg-transparent transition-[width] duration-300`}>
        <div className="relative h-[58px] shrink-0">
          {!collapsed && <span className="absolute left-[20px] top-[16px] whitespace-nowrap text-[18px] font-bold tracking-tight text-white">송현 BID TF</span>}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? '좌측 메뉴 펼치기' : '좌측 메뉴 접기'}
            className={`absolute top-[10px] grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] text-[#86868B] transition-colors hover:bg-[#2A2A2A] hover:text-white ${collapsed ? 'left-[10px]' : 'left-[224px]'}`}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className={`${collapsed ? 'px-[9px]' : 'w-[275px] px-[11px]'} hide-scrollbar min-h-0 flex-1 overflow-y-auto pb-5`}>
          <div className="flex flex-col gap-0">
            {primaryItems.map((item) => <MainLink key={item.path} item={item} collapsed={collapsed} />)}
          </div>

          <Section label="주요 자산" items={assetItems} open={assetsOpen} setOpen={setAssetsOpen} collapsed={collapsed} />
          <Section label="BID 구축사례" items={caseItems} open={casesOpen} setOpen={setCasesOpen} collapsed={collapsed} />
          <Section label="송현 BID 거버넌스" items={governanceItems} open={governanceOpen} setOpen={setGovernanceOpen} collapsed={collapsed} />
        </nav>

        <div className={`border-t border-[#3A3A3C] ${collapsed ? 'p-2' : 'px-[15px] py-3'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg p-1.5 hover:bg-white/5`}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3A3A3C] bg-[#2C2C2E] text-[11px] font-bold text-white">{member?.staff_name?.slice(-2) || 'BID'}</span>
            {!collapsed && <div className="min-w-0 flex-1"><div className="truncate text-[13px] font-semibold text-white">{member?.staff_name || '송현 BID TF'}</div><div className="mt-0.5 truncate text-[11px] text-[#86868B]">{user?.email || '실행관리 Data Room'}</div></div>}
            {!collapsed && <button type="button" onClick={signOut} className="cursor-pointer text-[11px] text-[#86868B] hover:text-[#FF453A]">로그아웃</button>}
          </div>
        </div>
      </aside>

      <main ref={mainRef} className={`min-w-0 flex-1 overflow-y-auto overflow-x-hidden ${isDarkWorkspace ? 'bg-[#1F1F1E]' : 'bg-[#F3F4F6]'}`}>
        {isDarkWorkspace ? (
          <div className={`min-h-full min-w-0 w-full ${pathname.startsWith('/governance') ? 'workspace-content px-[60px] pt-[8px]' : ''}`}><Outlet /></div>
        ) : (
          <div className={`min-h-full w-full p-10 text-gray-900 ${pathname === '/' ? 'bg-[#F3F4F6]' : 'bg-white'}`}>
            <div className="mx-auto min-h-full w-full max-w-[1400px]"><Outlet /></div>
          </div>
        )}
      </main>
    </div>
  );
}
