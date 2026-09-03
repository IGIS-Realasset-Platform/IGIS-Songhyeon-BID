import { useEffect } from 'react';
import { LockKeyhole, X } from 'lucide-react';

export default function MemberLoginPrompt({ open, onClose, onLogin, description }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[130000] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-login-prompt-title"
        className="relative w-[440px] max-w-full rounded-[22px] border border-[#454545] bg-[#202020] px-7 pb-7 pt-8 shadow-2xl"
      >
        <button
          type="button"
          aria-label="로그인 안내 닫기"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-[9px] text-[#86868B] transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={18} />
        </button>
        <div className="grid h-11 w-11 place-items-center rounded-full border border-[#6f9fc7]/35 bg-[#6f9fc7]/10 text-[#9cc4e6]">
          <LockKeyhole size={20} />
        </div>
        <h2 id="member-login-prompt-title" className="mt-5 text-[21px] font-bold tracking-tight text-white">로그인이 필요합니다</h2>
        <p className="mt-3 text-[14px] leading-6 text-[#A1A1AA]">
          {description || '상세 내용은 송현 BID 멤버 로그인 후 확인할 수 있습니다.'}
        </p>
        <div className="mt-7 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 cursor-pointer rounded-[10px] border border-[#454545] px-4 text-[13px] font-semibold text-[#A1A1AA] transition-colors hover:text-white">계속 둘러보기</button>
          <button type="button" onClick={onLogin} className="h-10 cursor-pointer rounded-[10px] bg-[#3279b4] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#3b87c7]">로그인</button>
        </div>
      </div>
    </div>
  );
}
