import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, CalendarDays, Map, MapPinned, ListChecks, BarChart3,
  FolderOpen, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import SonghyeonPageViewTracker from './analytics/SonghyeonPageViewTracker';

const primaryItems = [
  { name: '홈', path: '/home', icon: Home },
  { name: '통합업무보드', path: '/tasks', icon: ListChecks },
  {
    name: 'Map & Activities',
    path: '/map-activities',
    icon: MapPinned,
    children: [
      { name: '통합지도', path: '/map-activities/integrated-map' },
      { name: '운영구역', path: '/map-activities/boundary' },
      { name: '자산·임차', path: '/map-activities/assets-leases' },
      { name: '이지스 리테일', path: '/map-activities/igis-retail' },
      { name: '상권·활동', path: '/map-activities/market-activities' },
      { name: '호텔', path: '/map-activities/hotel' },
      { name: '제도·공동체', path: '/map-activities/institutions-community' },
    ],
  },
  { name: '마일스톤 및 R&R', path: '/milestones', icon: CalendarDays },
  { name: '서비스·운영 가설', path: '/hypotheses', icon: Map },
  { name: 'Data Room', path: '/data', icon: FolderOpen },
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

function ExpandableMainMenu({ item, collapsed, active, onCollapsedOpen }) {
  const Icon = item.icon;
  const submenuId = 'map-activities-navigation';
  const [expanded, setExpanded] = useState(active);
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' && !expanded) {
      event.preventDefault();
      setExpanded(true);
    } else if (event.key === 'ArrowLeft' && expanded) {
      event.preventDefault();
      setExpanded(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        title={collapsed ? item.name : undefined}
        aria-expanded={collapsed ? undefined : expanded}
        aria-controls={collapsed ? undefined : submenuId}
        onClick={() => collapsed ? onCollapsedOpen() : setExpanded(!expanded)}
        onKeyDown={handleKeyDown}
        className={`flex w-full cursor-pointer items-center rounded-xl py-[7px] text-[16px] font-light text-white transition-colors ${collapsed ? 'justify-center px-2' : 'px-[7px]'} ${active ? 'bg-[#151515]' : 'hover:bg-[#151515]'}`}
      >
        <Icon size={18} strokeWidth={1.5} className={collapsed ? '' : 'mr-[10px]'} />
        {!collapsed && <><span className="min-w-0 flex-1 truncate text-left">{item.name}</span><ChevronRight size={14} aria-hidden="true" className={`shrink-0 text-[#86868B] transition-transform ${expanded ? 'rotate-90' : ''}`} /></>}
      </button>
      {!collapsed && expanded && (
        <div id={submenuId} className="mt-0.5 flex flex-col" aria-label="Map & Activities 하위 메뉴">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              className={({ isActive }) => `rounded-[10px] py-[6px] pl-[35px] pr-[7px] text-[15px] font-light transition-colors ${isActive ? 'bg-[#151515] font-medium text-[#9cc4e6]' : 'text-[#A1A1AA] hover:bg-[#151515] hover:text-white'}`}
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
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
  const navigate = useNavigate();
  const isDarkWorkspace = pathname === '/home' || pathname === '/milestones' || pathname === '/tasks' || pathname.startsWith('/map-activities') || pathname === '/hypotheses' || pathname === '/data' || pathname.startsWith('/governance') || pathname.startsWith('/admin');
  const { user, member, isGuest, isAdmin, exitGuestMode, signOut } = useSonghyeonAuth();
  const mainRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(pathname.startsWith('/assets'));
  const [casesOpen, setCasesOpen] = useState(pathname.startsWith('/cases'));
  const [governanceOpen, setGovernanceOpen] = useState(pathname.startsWith('/milestones') || pathname.startsWith('/governance'));
  const mapActivitiesActive = pathname.startsWith('/map-activities');

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    mainRef.current.scrollTop = 0;
    mainRef.current.scrollLeft = 0;
  }, [pathname]);

  const leaveGuestMode = () => {
    exitGuestMode();
    navigate('/login');
  };

  return (
    <div className={`${mapActivitiesActive ? 'min-w-0' : 'min-w-[1280px]'} flex h-screen overflow-hidden bg-[#1F1F1E] font-sans text-[#E5E5E5]`}>
      <SonghyeonPageViewTracker />
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
            {primaryItems.map((item) => item.children ? (
              <ExpandableMainMenu
                key={`${item.path}-${mapActivitiesActive ? 'active' : 'inactive'}`}
                item={item}
                collapsed={collapsed}
                active={mapActivitiesActive}
                onCollapsedOpen={() => navigate(item.children[0].path)}
              />
            ) : <MainLink key={item.path} item={item} collapsed={collapsed} />)}
          </div>

          <Section label="주요 자산" items={assetItems} open={assetsOpen} setOpen={setAssetsOpen} collapsed={collapsed} />
          <Section label="BID 구축사례" items={caseItems} open={casesOpen} setOpen={setCasesOpen} collapsed={collapsed} />
          <Section label="송현 BID 거버넌스" items={governanceItems} open={governanceOpen} setOpen={setGovernanceOpen} collapsed={collapsed} />
        </nav>

        {isAdmin && (
          <div data-admin-analytics-menu className={`${collapsed ? 'px-[9px] py-2' : 'px-[11px] py-2'} shrink-0 border-t border-[#3A3A3C]`}>
            <MainLink item={{ name: '이용 현황', path: '/admin/analytics', icon: BarChart3 }} collapsed={collapsed} />
          </div>
        )}

        <div className={`border-t border-[#3A3A3C] ${collapsed ? 'p-2' : 'px-[15px] py-3'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg p-1.5 hover:bg-white/5`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${isGuest ? 'border-[#6f9fc7]/35 bg-[#6f9fc7]/10 text-[#9cc4e6]' : 'border-[#3A3A3C] bg-[#2C2C2E] text-white'}`}>{isGuest ? 'G' : member?.staff_name?.slice(-2) || 'BID'}</span>
            {!collapsed && <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><div className="truncate text-[13px] font-semibold text-white">{isGuest ? '게스트' : member?.staff_name || '송현 BID TF'}</div>{isGuest && <span className="shrink-0 rounded-[4px] border border-[#6f9fc7]/30 bg-[#6f9fc7]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#9cc4e6]">읽기 전용</span>}</div><div className="mt-0.5 truncate text-[11px] text-[#86868B]">{isGuest ? '로그인 없이 둘러보는 중' : user?.email || '실행관리 Data Room'}</div></div>}
            {!collapsed && (isGuest ? <button type="button" onClick={leaveGuestMode} className="cursor-pointer text-[11px] font-bold text-[#9cc4e6] hover:text-white">로그인</button> : <button type="button" onClick={signOut} className="cursor-pointer text-[11px] text-[#86868B] hover:text-[#FF453A]">로그아웃</button>)}
          </div>
        </div>
      </aside>

      <main ref={mainRef} className={`min-w-0 flex-1 overflow-x-hidden ${mapActivitiesActive ? 'overflow-hidden' : 'overflow-y-auto'} ${isDarkWorkspace ? 'bg-[#1F1F1E]' : 'bg-[#F3F4F6]'}`}>
        {isDarkWorkspace ? (
          <div className={`${mapActivitiesActive ? 'h-full min-h-0' : 'min-h-full'} min-w-0 w-full ${pathname.startsWith('/governance') ? 'workspace-content px-[60px] pt-[8px]' : ''}`}><Outlet /></div>
        ) : (
          <div className="min-h-full w-full bg-white p-10 text-gray-900">
            <div className="mx-auto min-h-full w-full max-w-[1400px]"><Outlet /></div>
          </div>
        )}
      </main>
    </div>
  );
}
