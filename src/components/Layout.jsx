import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, CalendarDays, Map, MapPinned, ListChecks, BarChart3,
  FolderOpen, MessageSquareText, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen,
  KeyRound, Mail, LogOut,
} from 'lucide-react';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import SonghyeonPageViewTracker from './analytics/SonghyeonPageViewTracker';
import SonghyeonMemberAvatar from './iota-songhyeon/SonghyeonMemberAvatar';

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
  { name: '업무 피드', path: '/feed', icon: MessageSquareText },
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
  const isDarkWorkspace = pathname === '/home' || pathname === '/milestones' || pathname === '/tasks' || pathname.startsWith('/map-activities') || pathname === '/hypotheses' || pathname === '/feed' || pathname.startsWith('/feed/') || pathname === '/data' || pathname.startsWith('/data/') || pathname.startsWith('/governance') || pathname.startsWith('/admin');
  const { user, member, isGuest, isAdmin, exitGuestMode, signOut, updatePassword } = useSonghyeonAuth();
  const mainRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(pathname.startsWith('/assets'));
  const [casesOpen, setCasesOpen] = useState(pathname.startsWith('/cases'));
  const [governanceOpen, setGovernanceOpen] = useState(pathname.startsWith('/milestones') || pathname.startsWith('/governance'));
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
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

  const handlePasswordChange = async () => {
    try {
      const { error } = await updatePassword(newPassword);
      if (error) throw error;
      window.alert('비밀번호가 성공적으로 변경되었습니다.');
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (error) {
      window.alert(`비밀번호 변경 실패: ${error?.message || '다시 시도해 주세요.'}`);
    }
  };

  const profileTitle = member?.staff_name
    ? `${member.staff_name}${member.title ? ` ${member.title}` : ''}`
    : '로그인 필요';

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

        {isGuest ? (
          <div className={`border-t border-[#3A3A3C] ${collapsed ? 'p-2' : 'px-[15px] py-3'}`}>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg p-1.5 hover:bg-white/5`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#6f9fc7]/35 bg-[#6f9fc7]/10 text-[11px] font-bold text-[#9cc4e6]">G</span>
              {!collapsed && <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><div className="truncate text-[13px] font-semibold text-white">게스트</div><span className="shrink-0 rounded-[4px] border border-[#6f9fc7]/30 bg-[#6f9fc7]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#9cc4e6]">읽기 전용</span></div><div className="mt-0.5 truncate text-[11px] text-[#86868B]">로그인 없이 둘러보는 중</div></div>}
              {!collapsed && <button type="button" onClick={leaveGuestMode} className="cursor-pointer text-[11px] font-bold text-[#9cc4e6] hover:text-white">로그인</button>}
            </div>
          </div>
        ) : (
          <div className="relative mt-auto shrink-0">
            {showProfileMenu && (
              <>
                <button type="button" aria-label="프로필 메뉴 닫기" className="fixed inset-0 z-40 cursor-default" onClick={() => setShowProfileMenu(false)} />
                <div className={`absolute bottom-full z-50 mb-2 w-[258px] rounded-[16px] border border-[#3A3A3C] bg-[#2C2C2E] py-2 shadow-lg ${collapsed ? 'left-[8px]' : 'left-1/2 -translate-x-1/2'}`}>
                  <button type="button" onClick={() => { setShowProfileMenu(false); setShowPasswordModal(true); }} className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium text-[#E5E5E5] transition-colors hover:bg-[#3A3A3C]">
                    <KeyRound size={16} className="text-[#A1A1AA]" />비밀번호 변경
                  </button>
                  <button type="button" onClick={() => { setShowProfileMenu(false); setShowContactModal(true); }} className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium text-[#E5E5E5] transition-colors hover:bg-[#3A3A3C]">
                    <Mail size={16} className="text-[#A1A1AA]" />플랫폼 이용 문의
                  </button>
                  <div className="my-1 border-t border-white/5" />
                  <button type="button" onClick={() => { setShowProfileMenu(false); setShowLogoutModal(true); }} className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[14px] font-medium text-[#FF453A] transition-colors hover:bg-red-500/10">
                    <LogOut size={16} />로그아웃
                  </button>
                </div>
              </>
            )}

            <div className={`relative transition-[height] duration-300 ease-out ${collapsed ? 'h-[64px]' : 'h-[74px]'}`}>
              {collapsed ? (
                <button type="button" onClick={() => setShowProfileMenu(!showProfileMenu)} aria-label="프로필 메뉴 열기" title={profileTitle} className="absolute inset-x-0 bottom-0 flex w-full cursor-pointer items-center justify-center border-t border-[#3A3A3C] py-3 transition-colors hover:bg-white/5">
                  <SonghyeonMemberAvatar name={member?.staff_name} photoPath={member?.photo_path} className="h-10 w-10 border border-white/10" />
                </button>
              ) : (
                <button type="button" onClick={() => setShowProfileMenu(!showProfileMenu)} className="absolute bottom-0 left-0 flex w-[275px] cursor-pointer items-center justify-between border-t border-[#3A3A3C] py-3 pl-[15px] pr-[17px] text-left transition-colors hover:bg-white/5">
                  <span className="flex min-w-0 items-center gap-3 rounded-lg p-1.5 -ml-1.5">
                    <SonghyeonMemberAvatar name={member?.staff_name} photoPath={member?.photo_path} className="h-10 w-10 border border-white/10" />
                    <span className="flex min-w-0 max-w-[160px] flex-col">
                      <span className="mb-0.5 truncate text-[14px] font-semibold leading-tight tracking-tight text-white">{profileTitle}</span>
                      <span className="truncate text-[12px] font-normal leading-none text-[#86868B]">{user?.email || '권한 없음'}</span>
                    </span>
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-[#86868B]" />
                </button>
              )}
            </div>
          </div>
        )}

        {showContactModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex w-[400px] flex-col items-center rounded-[24px] bg-[#1C1C1E] p-8 shadow-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C2C2E]"><Mail size={24} className="text-white" /></div>
              <h3 className="mb-2 text-[22px] font-bold tracking-tight text-white">플랫폼 이용 문의</h3>
              <p className="mb-8 text-center text-[15px] font-medium leading-relaxed text-[#A1A1AA]">jk.jeon@igisam.com<br />010-9076-5369<br />전기영 매니저에게 연락해주세요.</p>
              <button type="button" onClick={() => setShowContactModal(false)} className="w-full cursor-pointer rounded-[16px] bg-[#2C2C2E] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#3A3A3C]">닫기</button>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex w-[400px] flex-col items-center rounded-[24px] bg-[#1C1C1E] p-8 shadow-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C2C2E]"><KeyRound size={24} className="text-white" /></div>
              <h3 className="mb-2 text-[22px] font-bold tracking-tight text-white">비밀번호 변경</h3>
              <p className="mb-6 text-center text-[15px] font-medium leading-relaxed text-[#A1A1AA]">새로운 비밀번호를 입력해주세요.</p>
              <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="새 비밀번호" className="mb-4 h-[52px] w-full rounded-[16px] border border-[#333333] bg-[#1C1C1E] px-5 text-[17px] text-white outline-none transition-all placeholder:text-[#86868B] focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3]" />
              <div className="flex w-full gap-3">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 cursor-pointer rounded-[16px] bg-[#2C2C2E] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#3A3A3C]">취소</button>
                <button type="button" onClick={handlePasswordChange} disabled={!newPassword} className="flex-1 cursor-pointer rounded-[16px] bg-[#0071E3] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:opacity-50">변경하기</button>
              </div>
            </div>
          </div>
        )}

        {showLogoutModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex w-[400px] flex-col items-center rounded-[24px] bg-[#1C1C1E] p-8 shadow-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10"><LogOut size={24} className="text-[#FF453A]" /></div>
              <h3 className="mb-2 text-[22px] font-bold tracking-tight text-white">로그아웃</h3>
              <p className="mb-6 text-center text-[15px] font-medium leading-relaxed text-[#A1A1AA]">정말 로그아웃 하시겠습니까?</p>
              <div className="flex w-full gap-3">
                <button type="button" onClick={() => setShowLogoutModal(false)} className="flex-1 cursor-pointer rounded-[16px] bg-[#2C2C2E] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#3A3A3C]">취소</button>
                <button type="button" onClick={async () => { setShowLogoutModal(false); await signOut(); }} className="flex-1 cursor-pointer rounded-[16px] bg-[#FF453A] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#FF3B30]">확인</button>
              </div>
            </div>
          </div>
        )}
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
