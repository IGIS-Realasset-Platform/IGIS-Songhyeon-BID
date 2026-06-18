import React, { useState, useEffect } from 'react';
import Section1 from './Section1';
import SectionExecutiveSummary from './SectionExecutiveSummary';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';
import Section8 from './Section8';
import Section9 from './Section9';
import Section10 from './Section10';
import Section11 from './Section11';
import Section12 from './Section12';
import Section13 from './Section13';
import Section14 from './Section14';
import Section15 from './Section15';
import Section16 from './Section16';
import Section17 from './Section17';
import Section18 from './Section18';
import Section19 from './Section19';
import Section20 from './Section20';
import Section21 from './Section21';
import Section22 from './Section22';
import Section23 from './Section23';
import Section24 from './Section24';
import Section25 from './Section25';
import Section26 from './Section26';
import Section27 from './Section27';
import Section28 from './Section28';
import Section29 from './Section29';
import Section30 from './Section30';
import Section31 from './Section31';
import Section32 from './Section32';
import Section33 from './Section33';
import Section34 from './Section34';
import Section35 from './Section35';
import Section36 from './Section36';
import Section37 from './Section37';
import Section38 from './Section38';
import Section39 from './Section39';
import Section40 from './Section40';
import Section41 from './Section41';
import Section42 from './Section42';
import Section43 from './Section43';
import Section44 from './Section44';
import Section45 from './Section45';
import Section46 from './Section46';
import Section47 from './Section47';
import Section48 from './Section48';
import Section49 from './Section49';
import Section50 from './Section50';
import Section51 from './Section51';
import Section52 from './Section52';
import Section53 from './Section53';
import Section54 from './Section54';
import Section55 from './Section55';
import Section56 from './Section56';
import Section57 from './Section57';
import Section58 from './Section58';
import Section59 from './Section59';
import Section60 from './Section60';
import Section61 from './Section61';
import Section62 from './Section62';
import Section63 from './Section63';
import Section64 from './Section64';
import Section65 from './Section65';
import Section66 from './Section66';
import Section67 from './Section67';
import Section68 from './Section68';
import Section69 from './Section69';
import Section70 from './Section70';
import Section71 from './Section71';
import Section72 from './Section72';
import Section73 from './Section73';
import Section74 from './Section74';
import Section75 from './Section75';
import Section76 from './Section76';
import Section77 from './Section77';
import Section78 from './Section78';
import Section79 from './Section79';
import Section80 from './Section80';
import Section81 from './Section81';
import Section82 from './Section82';
import Section83 from './Section83';
import Section84 from './Section84';
import Section85 from './Section85';
import Section86 from './Section86';
import Section87 from './Section87';
import Section88 from './Section88';
import Section89 from './Section89';
import Section90 from './Section90';
import Section91 from './Section91';
import Section92 from './Section92';
import Section93 from './Section93';
import Section94 from './Section94';
import Section95 from './Section95';
import Section96 from './Section96';
import Section97 from './Section97';
import Section98 from './Section98';
import Section99 from './Section99';
import Section100 from './Section100';
import Section101 from './Section101';
import Section102 from './Section102';
import Section103 from './Section103';
import Section104 from './Section104';
import Section105 from './Section105';
import Section106 from './Section106';
import Section107 from './Section107';
import Section108 from './Section108';
import Section109 from './Section109';
import Section110 from './Section110';
import Section111 from './Section111';
import Section112 from './Section112';
import Section113 from './Section113';
import Section114 from './Section114';
import Section115 from './Section115';
import Section116 from './Section116';
import Section117 from './Section117';
import Section118 from './Section118';
import Section119 from './Section119';
import Section120 from './Section120';
import Section121 from './Section121';
import Section122 from './Section122';
import Section123 from './Section123';
import Section124 from './Section124';
import Section125 from './Section125';
import Section126 from './Section126';
import Section127 from './Section127';
import Section128 from './Section128';
import Section129 from './Section129';
import Section130 from './Section130';
import Section131 from './Section131';
import Section132 from './Section132';
import Section133 from './Section133';
import Section134 from './Section134';
import Section135 from './Section135';
import Section136 from './Section136';
import Section137 from './Section137';
import Section138 from './Section138';
import Section139 from './Section139';
import Section140 from './Section140';
import Section141 from './Section141';

const SlideWrapper = React.memo(({ slide, isActive, transformStyle }) => {
    return (
        <div 
            className="absolute inset-0 w-full h-full transition-transform duration-[200ms]"
            style={{ 
                transform: transformStyle,
                transitionTimingFunction: "cubic-bezier(0.83, 0, 0.17, 1)"
            }}
        >
            {React.cloneElement(slide, { isActive })}
        </div>
    );
});

export default function MainLayout({ isNavOpen, setIsNavOpen, onNavigate }) {
    const slidesLength = 142; 
 const [currentSlide, setCurrentSlide] = useState(() => {
 // Initialize from URL hash if available (persistent reload mapping)
 const hash = window.location.hash;
 if (hash && hash.startsWith('#page-')) {
 const pageIndex = parseInt(hash.replace('#page-', ''), 10) - 1;
 if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < slidesLength) {
 return pageIndex;
 }
 }
 return 0;
 });

    const slides = React.useMemo(() => [<Section1 />, <SectionExecutiveSummary />, <Section2 />, <Section3 />, <Section4 />, <Section5 />, <Section6 />, <Section7 />, <Section8 />, <Section9 />, <Section10 />, <Section11 />, <Section12 />, <Section13 />, <Section14 />, <Section15 />, <Section16 />, <Section17 />, <Section18 />, <Section19 />, <Section20 />, <Section21 />, <Section22 />, <Section23 />, <Section24 />, <Section25 />, <Section26 />, <Section27 />, <Section28 />, <Section29 />, <Section30 />, <Section31 />, <Section32 />, <Section33 />, <Section34 />, <Section35 />, <Section36 />, <Section37 />, <Section38 />, <Section39 />, <Section40 />, <Section41 />, <Section42 />, <Section43 />, <Section44 />, <Section45 />, <Section46 />, <Section47 />, <Section48 />, <Section49 />, <Section50 />, <Section51 />, <Section52 />, <Section53 />, <Section54 />, <Section55 />, <Section56 />, <Section57 />, <Section58 />, <Section59 />, <Section60 />, <Section61 />, <Section62 />, <Section63 />, <Section64 />, <Section65 />, <Section66 />, <Section67 />, <Section68 />, <Section69 />, <Section70 />, <Section71 />, <Section72 />, <Section73 />, <Section74 />, <Section75 />, <Section76 />, <Section77 />, <Section78 />, <Section79 />, <Section80 />, <Section81 />, <Section82 />, <Section83 />, <Section84 />, <Section85 />, <Section86 />, <Section87 />, <Section88 />, <Section89 />, <Section90 />, <Section91 />, <Section92 />, <Section93 />, <Section94 />, <Section95 />, <Section96 />, <Section97 />, <Section98 />, <Section99 />, <Section100 />, <Section101 />, <Section102 />, <Section103 />, <Section104 />, <Section105 />, <Section106 />, <Section107 />, <Section108 />, <Section109 />, <Section110 />, <Section111 />, <Section112 />, <Section113 />, <Section114 />, <Section115 />, <Section116 />, <Section117 />, <Section118 />, <Section119 />, <Section120 />, <Section121 />, <Section122 />, <Section123 />, <Section124 />, <Section125 />, <Section126 />, <Section131 />, <Section132 />, <Section133 />, <Section127 />, <Section128 />, <Section129 />, <Section130 />, <Section137 />, <Section134 />, <Section135 />, <Section136 />, <Section138 />, <Section139 />, <Section140 />, <Section141 />], []);

    const [isActionDone, setIsActionDone] = useState(false);

    // Animation durations mapped closely to each page's visual completion timing
    const slideAnimationTimes = [1148, 2295, 2754, 3213, 1989, 3213, 1913, 2678, 2295, 2295, 2678, 2678, 2678, 2295, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 2295, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 1148, 2907, 2907, 2295, 2295, 2678, 2678, 2678, 2678, 2678, 1148, 2295, 2295, 2295, 2295, 2295, 2295, 2295, 2295, 1148, 2295, 2295, 2295, 2295, 1148, 2295, 2295, 2295, 2295, 2295, 1148, 2295, 2295, 2295, 2295, 1148, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 1148, 2295, 2295, 2678, 1148, 2678, 2678, 1148, 2678, 2678, 2678, 1148, 2678, 2678, 3060, 2907, 1148, 2678, 2678, 2678, 1148, 2678, 2678, 2678, 2295, 2295, 2678, 2678, 2678, 1148, 2678, 2678, 1148, 2295, 2678, 1148, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 2678, 600];

 useEffect(() => {
 setIsActionDone(false);
 const timer = setTimeout(() => {
 setIsActionDone(true);
 }, slideAnimationTimes[currentSlide] || 2295);

 // Subscribing to hash change to support external header menu navigation clicks
 const handleHashChange = () => {
 const hash = window.location.hash;
 if (hash && hash.startsWith('#page-')) {
 const pageIndex = parseInt(hash.replace('#page-', ''), 10) - 1;
 if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < slidesLength) {
 setCurrentSlide(pageIndex);
 }
 }
 };
 
 const handleGoto = (e) => {
 if (e.detail && typeof e.detail.slideIndex === 'number' && e.detail.slideIndex >= 0 && e.detail.slideIndex < slidesLength) {
 setCurrentSlide(e.detail.slideIndex);
 }
 };

 window.addEventListener('hashchange', handleHashChange);
 window.addEventListener('appSlideGoto', handleGoto);

 return () => {
 clearTimeout(timer);
 window.removeEventListener('hashchange', handleHashChange);
 window.removeEventListener('appSlideGoto', handleGoto);
 };
 }, [currentSlide, slidesLength]);

 const nextSlide = () => {
 const event = new CustomEvent('appSlideNext', { cancelable: true });
 window.dispatchEvent(event);
 if (!event.defaultPrevented) {
 setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
 }
 };
 const prevSlide = () => {
 const event = new CustomEvent('appSlidePrev', { cancelable: true });
 window.dispatchEvent(event);
 if (!event.defaultPrevented) {
 setCurrentSlide(prev => Math.max(prev - 1, 0));
 }
 };

 // Sync state changes -> URL Hash
 useEffect(() => {
 window.location.hash = `page-${currentSlide + 1}`;
 }, [currentSlide]);

 // Sync URL Hash changes (Browser Back/Forward) -> state
 useEffect(() => {
 const handleHashChange = () => {
 const hash = window.location.hash;
 if (hash && hash.startsWith('#page-')) {
 const pageIndex = parseInt(hash.replace('#page-', ''), 10) - 1;
 if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < slidesLength) {
 setCurrentSlide(pageIndex);
 }
 }
 };
 window.addEventListener('hashchange', handleHashChange);
 return () => window.removeEventListener('hashchange', handleHashChange);
 }, []);

 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
 nextSlide();
 } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
 prevSlide();
 }
 };

 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [slides.length]);

 // Touch swipe handling
 const [touchStart, setTouchStart] = useState(null);
 const [touchEnd, setTouchEnd] = useState(null);
 const minSwipeDistance = 50;

 const onTouchStart = (e) => {
 setTouchEnd(null);
 setTouchStart(e.targetTouches[0].clientX);
 };

 const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

 const onTouchEnd = () => {
 if (!touchStart || !touchEnd) return;
 const distance = touchStart - touchEnd;
 const isLeftSwipe = distance > minSwipeDistance;
 const isRightSwipe = distance < -minSwipeDistance;
 
 if (isLeftSwipe) {
 nextSlide();
 } else if (isRightSwipe) {
 prevSlide();
 }
 };

    const handleScreenClick = (e) => {
        // 웹사이트 좌우 클릭 이동 기능 비활성화 (텍스트 선택 및 드래그 편의를 위해 잠금)
        return;
        
        if (e.target.closest('button, a, input, [role="button"], .clickable')) {
            return;
        }
        const { clientX } = e;
        const screenWidth = window.innerWidth;
        if (clientX < screenWidth * 0.2) {
            prevSlide();
        } else if (clientX > screenWidth * 0.8) {
            nextSlide();
        }
    };

 return (
 <>
 <style>{`
 @keyframes pulseBlueInvert {
 0%, 100% {
 color: #ffffff;
 border-color: #ffffff;
 background-color: transparent;
 }
 50% {
 color: #eab308;
 border-color: #eab308;
 background-color: #281400;
 }
 }
 .action-done-pulse {
 animation: pulseBlueInvert 1.5s infinite ease-in-out;
 }
 `}</style>
 <div 
 className="w-full h-screen overflow-hidden relative bg-white"
 onTouchStart={onTouchStart}
 onTouchMove={onTouchMove}
 onTouchEnd={onTouchEnd}
 onClick={handleScreenClick}
 >
 {slides.map((slide, index) => {
 const isActive = index === currentSlide;
 
 let transformStyle = '';
 if (index < currentSlide) {
 transformStyle = 'translateX(-100%)';
 } else if (index > currentSlide) {
 transformStyle = 'translateX(100%)';
 } else {
 transformStyle = 'translateX(0)';
 }

 return (
 <SlideWrapper 
 key={index}
 slide={slide}
 isActive={isActive}
 transformStyle={transformStyle}
 />
 );
 })}
 </div>
 </>
 );
}
