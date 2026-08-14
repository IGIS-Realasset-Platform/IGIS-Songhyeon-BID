export const SONGHYEON_IMPORTANCE_BADGE_CLASSES = {
  '핵심': 'border border-[#bd5f5a]/[0.22] bg-[#bd5f5a]/[0.055] text-[#d47670]',
  '중간': 'border border-[#bd8b42]/[0.22] bg-[#bd8b42]/[0.055] text-[#cba267]',
  '낮음': 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#939398]',
};

export const importanceBadgeClass = (value) => SONGHYEON_IMPORTANCE_BADGE_CLASSES[value]
  || 'border border-[#636366]/[0.22] bg-[#636366]/[0.055] text-[#97979c]';
