import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function HoverImage({
 src,
 alt,
 id,
 width,
 height,
 className = "w-full h-auto block",
 wrapperClassName = "w-full relative overflow-hidden group bs-fade-up delay-200 cursor-pointer",
 style,
 containerStyle
}) {
 const [modalOpen, setModalOpen] = useState(false);
 const [isZoomed, setIsZoomed] = useState(false);

 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === 'Escape') setModalOpen(false);
 };
 if (modalOpen) {
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }
 }, [modalOpen]);

 return (
 <>
 <div
 className={wrapperClassName}
 onClick={() => setModalOpen(true)}
 id={id}
 style={containerStyle}
 >
 <img
 src={src}
 alt={alt}
 width={width}
 height={height}
 className={className}
 style={style}
 />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

 <div className="absolute top-6 right-6 md:top-[50px] md:right-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
 <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full border border-white/50 bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black hover:border-white text-white shadow-sm"
 onClick={(e) => {
 e.stopPropagation();
 setModalOpen(true);
 }}>
 <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
 </svg>
 </div>
 </div>
 </div>

 {modalOpen && createPortal(
 <div
 className={`fixed inset-0 z-[99999] flex ${isZoomed ? 'items-start justify-start overflow-auto p-0' : 'items-center justify-center p-4 md:p-10'} bg-black/95 cursor-zoom-out`}
 onClick={() => { setModalOpen(false); setIsZoomed(false); }}
 >
 <img
 src={src}
 alt="Enlarged view"
 className={`${isZoomed ? "max-w-none flex-shrink-0" : "max-w-full max-h-full object-contain"} ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} transition-all duration-300`}
 onClick={(e) => {
 e.stopPropagation();
 setIsZoomed(!isZoomed);
 }}
 title={isZoomed ? "축소하기" : "원본 크기로 확대하기"}
 />
 <button
 className="fixed top-6 right-6 text-white/50 hover:text-white transition-colors duration-300 z-[110]"
 onClick={() => { setModalOpen(false); setIsZoomed(false); }}
 aria-label="Close modal"
 >
 <svg className="w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-full p-2 bg-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 {!isZoomed && (
 <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light pointer-events-none">
 클릭 시 원본 해상도로 확대됩니다
 </div>
 )}
 </div>,
 document.body
 )}
 </>
 );
}
