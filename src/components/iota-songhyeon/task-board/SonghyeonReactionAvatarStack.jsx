import React from 'react';

const withBaseUrl = (path) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl.replace(/\/?$/, '/')}${String(path || '').replace(/^\/+/, '')}`;
};

const reactorName = (reactor) => reactor?.name?.trim() || reactor?.email?.split('@')[0] || '사용자';

const avatarSource = (reactor) => {
  const photoPath = reactor?.photoPath?.trim();
  if (photoPath) {
    if (/^(?:https?:|data:|blob:)/i.test(photoPath)) return photoPath;
    return withBaseUrl(photoPath);
  }

  return withBaseUrl(`songhyeon-members/${encodeURIComponent(reactorName(reactor))}.webp`);
};

export default function SonghyeonReactionAvatarStack({
  reactors = [],
  label = '반응',
  sizeClass = 'w-[20px] h-[20px]',
  maxVisible = 3,
}) {
  if (!reactors.length) return null;

  const displayedReactors = reactors.slice(0, maxVisible);
  const extraCount = reactors.length - displayedReactors.length;

  return (
    <div className="flex items-center ml-[2px]" role="list" aria-label={`${label} 반응자 ${reactors.length}명`}>
      {displayedReactors.map((reactor, index) => {
        const name = reactorName(reactor);
        const group = reactor?.group?.trim() || '팀원';
        const key = reactor?.userId || reactor?.email || `${name}-${index}`;

        return (
          <div
            key={key}
            role="listitem"
            tabIndex={0}
            aria-label={`${name}, ${group}`}
            className={`relative ${sizeClass} rounded-full border-[1.5px] border-[#222] bg-[#333] group overflow-visible focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#86868B] ${index > 0 ? '-ml-[6px]' : ''}`}
            style={{ zIndex: 10 - index }}
          >
            <img
              src={avatarSource(reactor)}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = withBaseUrl('default_avatar.svg');
              }}
            />
            <div
              role="tooltip"
              className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-[6px] hidden group-hover:flex group-focus-within:flex bg-[#222] border border-[#333] px-[8px] py-[4px] rounded-[6px] whitespace-nowrap text-[11px] text-[#E5E5E5] shadow-xl z-[99] pointer-events-none flex-col items-center leading-tight"
            >
              <span className="font-bold">{name}</span>
              <span className="text-[#86868B] text-[10px]">{group}</span>
            </div>
          </div>
        );
      })}

      {extraCount > 0 && (
        <div
          role="listitem"
          aria-label={`${extraCount}명 더 있음`}
          className={`${sizeClass} rounded-full border-[1.5px] border-[#222] bg-[#333] flex items-center justify-center -ml-[6px] relative z-0`}
        >
          <span aria-hidden="true" className="text-[9px] text-[#A1A1AA] font-bold">+{extraCount}</span>
        </div>
      )}
    </div>
  );
}
