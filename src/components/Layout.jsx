import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Building2, Map, FolderOpen, GitMerge, Settings, ChevronDown, ChevronRight } from 'lucide-react';

export default function Layout() {
  const [isAssetsOpen, setIsAssetsOpen] = useState(true);

  const navItems = [
    { name: '홈', path: '/', icon: Home },
    { name: 'BID Execution Plan', path: '/execution', icon: GitMerge },
    { name: 'Membership & Placemaking', path: '/membership', icon: Map },
    { name: 'Data Room', path: '/data', icon: FolderOpen },
  ];

  const assetSubItems = [
    { name: '더케이트윈타워', path: '/assets/k-twin' },
    { name: '트윈트리 빌딩', path: '/assets/twin-tree' },
    { name: '쌈지길', path: '/assets/ssamzigil' },
    { name: '안녕인사동', path: '/assets/annyeong' },
    { name: '신규 매입 중소자산 2개', path: '/assets/new-assets' },
  ];

  return (
    <div className="flex h-screen bg-[#Fdfdfd] text-gray-900 font-sans overflow-hidden">
      {/* Sidebar - Minimalist, borderless */}
      <aside className="w-56 bg-white flex flex-col z-10 relative border-r border-gray-100 shadow-[2px_0_15px_-3px_rgba(0,0,0,0.05)]">
        <div className="p-6">
          <h1 className="text-base font-bold text-gray-900">Songhyeon BID</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Home size={16} />
                <span>홈</span>
              </NavLink>
            </li>
            
            {/* Assets Folder */}
            <li className="pt-2">
              <button 
                onClick={() => setIsAssetsOpen(!isAssetsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Building2 size={16} />
                  <span>Asset Portfolio</span>
                </div>
                {isAssetsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              
              {isAssetsOpen && (
                <ul className="mt-1 ml-4 pl-2 space-y-1">
                  {assetSubItems.map(sub => (
                    <li key={sub.name}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-1.5 text-xs transition-colors ${
                            isActive ? 'bg-gray-200 text-gray-900 font-semibold' : 'text-gray-500 hover:bg-gray-50'
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {navItems.slice(1).map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <a 
            href="/sbd-bid"
            className="flex items-center gap-2 px-3 py-2 mb-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-sm hover:bg-blue-100 transition-colors"
          >
            <FolderOpen size={14} />
            <span>SBD BID 전략안 (Archive)</span>
          </a>
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
            <Settings size={14} />
            <span>System Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white relative p-8 md:p-14">
        <div className="max-w-[1100px] mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
