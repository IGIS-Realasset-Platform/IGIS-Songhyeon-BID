import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { menuDataEn, menuDataKr } from '../data/NavigationData';

// We import a few key slides for thumbnails if possible, but to prevent performance issues
// with rendering 27 heavy slides twice, we'll create lightweight thumbnail representations
// based on the menuData, acting as a visual table of contents with thumbnail-like cards.

export default function LeftNavigator({ currentPage, isOpen, setIsOpen }) {
 const { lang } = useLanguage();
 const [activeHash, setActiveHash] = useState(window.location.hash || '#page-1');
 const menuData = lang === 'kr' ? menuDataKr : menuDataEn;
 const scrollContainerRef = useRef(null);

 useEffect(() => {
     if (scrollContainerRef.current) {
         const savedScroll = sessionStorage.getItem('navigatorScrollPos');
         if (savedScroll) {
             scrollContainerRef.current.scrollTop = parseInt(savedScroll, 10);
         }
     }
 }, []);

 const handleScroll = (e) => {
     sessionStorage.setItem('navigatorScrollPos', e.target.scrollTop);
 };

 useEffect(() => {
 const handleHashChange = () => setActiveHash(window.location.hash || '#page-1');
 window.addEventListener('hashchange', handleHashChange);
 
 const handleGoto = (e) => {
 if (e.detail && typeof e.detail.slideIndex === 'number') {
 setActiveHash(`#page-${e.detail.slideIndex + 1}`);
 }
 };
 window.addEventListener('appSlideGoto', handleGoto);

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('appSlideGoto', handleGoto);
    };
    }, []);

    // Auto-scroll active item into view
    useEffect(() => {
        if (isOpen && scrollContainerRef.current) {
            setTimeout(() => {
                const activeEl = scrollContainerRef.current.querySelector('.nav-item-active');
                if (activeEl) {
                    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 150); // slight delay to allow rendering and layout
        }
    }, [activeHash, isOpen]);

 const handleNavigate = (e, item) => {
 e.preventDefault();
 
 if (item.type === 'system-core') {
 window.history.pushState(null, '', `${import.meta.env.BASE_URL}system-core`);
 window.dispatchEvent(new Event('popstate'));
 if (window.innerWidth < 1024) setIsOpen(false);
 return;
 }
 if (item.type === 'alert') {
 alert(item.message);
 return;
 }
 
 const targetId = item.id;
 if (!targetId) return;

 if (currentPage !== 'home') {
 // Navigate to home first
 try {
     window.history.pushState(null, '', window.location.pathname + `#${targetId}`);
 } catch (e) {
     console.warn('pushState not supported on this origin');
 }
 window.dispatchEvent(new Event('popstate')); // trigger App to change currentPage
 window.location.hash = targetId;
 
 setTimeout(() => {
 const pageIndex = parseInt(targetId.replace('page-', ''), 10) - 1;
 if (!isNaN(pageIndex)) {
 window.dispatchEvent(new CustomEvent('appSlideGoto', { detail: { slideIndex: pageIndex } }));
 }
 }, 100);
 } else {
 window.location.hash = targetId;
 const pageIndex = parseInt(targetId.replace('page-', ''), 10) - 1;
 if (!isNaN(pageIndex)) {
 window.dispatchEvent(new CustomEvent('appSlideGoto', { detail: { slideIndex: pageIndex } }));
 }
 }
 
 // Auto-close on mobile
 if (window.innerWidth < 1024) setIsOpen(false);
 };

 return (
 <>
 {/* Toggle Button */}
 <button 
 onClick={() => setIsOpen(!isOpen)}
 className={`fixed top-1/2 -translate-y-1/2 z-[101] p-1 transition-all duration-300 ease-in-out flex items-center justify-center rounded-r-md border group backdrop-blur-sm before:content-[''] before:absolute before:-top-6 before:-bottom-6 before:-right-6 before:-left-2
 ${isOpen ? 'left-[240px] border-l-0 bg-white border-gray-200' : 'left-0 bg-white/20 border-gray-200/30 hover:bg-white hover:border-gray-200'}`}
 style={{ width: '24px', height: '40px' }}
 aria-label="Toggle Navigator"
 >
 <svg 
 className={`w-5 h-5 transition-transform transition-colors duration-300 ${isOpen ? 'rotate-180 text-gray-600' : 'text-gray-800 drop-shadow-sm group-hover:text-gray-600'}`} 
 fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </button>

 {/* Sidebar Overlay Layer (Backdrop for mobile) */}
 {isOpen && (
 <div 
 className="fixed inset-0 bg-black/20 z-[99] lg:hidden transition-opacity"
 onClick={() => setIsOpen(false)}
 />
 )}

 {/* Sidebar Navigator */}
 <div 
 className={`fixed top-0 left-0 h-full w-[240px] bg-[#f8f9fa] z-[100] transition-transform duration-300 ease-in-out flex flex-col border-r border-gray-200
 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
 >
 <div className="flex items-center justify-between px-4 pt-[12px] pb-[10px] border-b border-gray-200 bg-white shrink-0">
 <h2 className="text-[16px] font-bold text-gray-800 font-guardian">
 Navigator
 </h2>
 </div>

 <div 
     ref={scrollContainerRef}
     onScroll={handleScroll}
     className="flex-1 overflow-y-auto px-3 py-6 scroll-smooth"
 >
 {menuData.map((section, idx) => {
    const isSectionActive = section.id === (activeHash || '').replace('#', '');
    
    return (
        <div key={idx} className="mb-4 last:mb-0">
            {idx > 0 && <div className="w-full h-[1px] bg-gray-200 mb-4 mt-2"></div>}
            <h3 
                onClick={(e) => section.id && handleNavigate(e, { id: section.id })}
                className={`text-[13px] font-bold mb-2 px-1 uppercase font-guardian transition-colors ${isSectionActive ? 'text-blue-600' : (section.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-400')}`}
            >
                {section.title}
            </h3>
            {section.chapters?.map((chapter, chapIdx) => {
                const isChapterActive = chapter.id === (activeHash || '').replace('#', '');
                
                return (
                    <div key={chapIdx} className="mb-3 last:mb-0">
                        {chapter.title && <h4 
                            onClick={(e) => chapter.id && handleNavigate(e, { id: chapter.id })}
                            className={`text-[11px] font-bold mb-1 px-1 transition-colors ${isChapterActive ? 'text-blue-500' : (chapter.id ? 'text-gray-600 hover:text-black cursor-pointer' : 'text-gray-500')}`}
                        >{chapter.title}</h4>}

 <div className="flex flex-col gap-0">
 {chapter.items.map((item, itemIdx) => {
 const isActive = activeHash === `#${item.id}`;
 
 // Extract slide number for visual thumbnail
 let slideNumber = '';
 if (item.id && item.id.startsWith('page-')) {
 slideNumber = item.id.replace('page-', '');
 }

 return (
 <div 
 key={itemIdx}
 onClick={(e) => handleNavigate(e, item)}
 className={`group relative flex items-center gap-2 p-1 rounded-md cursor-pointer transition-all duration-200 border scroll-my-8
 ${isActive ? 'bg-white border-black shadow-sm nav-item-active' : 'bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}
 >
 {/* Thumbnail Representation */}
 <div className={`shrink-0 w-10 h-6 rounded border flex items-center justify-center transition-colors
 ${isActive ? 'bg-black border-black text-white' : 'bg-gray-100 border-gray-200 text-gray-400 group-hover:bg-gray-50'}`}
 >
 <span className="text-[9px] font-bold">
 {slideNumber ? `P.${slideNumber}` : '앱'}
 </span>
 </div>
 
 {/* Text Content */}
 <div className="flex-1 min-w-0">
 <p className={`text-[12px] truncate transition-colors ${isActive ? 'font-bold text-black' : 'font-medium text-gray-600 group-hover:text-gray-900'}`}>
 {item.label}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
 })}
 </div>
 );
 })}
 <div className="w-full h-[80px] shrink-0" />
 </div>
 </div>
 </>
 );
}
