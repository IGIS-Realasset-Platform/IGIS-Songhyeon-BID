import React, { useState, useEffect } from 'react';
import Section1 from './Section1';
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

const SlideWrapper = React.memo(({ slide, isActive, transformStyle }) => {
    return (
        <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
                transform: transformStyle
            }}
        >
            {React.cloneElement(slide, { isActive })}
        </div>
    );
});

export default function MainLayout({ isNavOpen, setIsNavOpen, onNavigate }) {
    const slidesLength = 48; 
    const [currentSlide, setCurrentSlide] = useState(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#page-')) {
            const pageIndex = parseInt(hash.replace('#page-', ''), 10) - 1;
            if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < slidesLength) {
                return pageIndex;
            }
        }
        return 0;
    });

    const slides = React.useMemo(() => [
        <Section1 />, 
        <Section2 />, 
        <Section3 />, 
        <Section4 />, 
        <Section5 />, 
        <Section6 />, 
        <Section7 />, 
        <Section8 />, 
        <Section9 />, 
        <Section10 />, 
        <Section11 />, 
        <Section12 />,
        <Section13 />,
        <Section14 />,
        <Section15 />,
        <Section16 />,
        <Section17 />,
        <Section18 />,
        <Section19 />,
        <Section20 />,
        <Section21 />,
        <Section22 />,
        <Section23 />,
        <Section24 />,
        <Section25 />,
        <Section26 />,
        <Section27 />,
        <Section28 />,
        <Section29 />,
        <Section30 />,
        <Section31 />,
        <Section32 />,
        <Section33 />,
        <Section34 />,
        <Section35 />,
        <Section36 />,
        <Section37 />,
        <Section38 />,
        <Section39 />,
        <Section40 />,
        <Section41 />,
        <Section42 />,
        <Section43 />,
        <Section44 />,
        <Section45 />,
        <Section46 />,
        <Section47 />,
        <Section48 />
    ], []);

    const [isActionDone, setIsActionDone] = useState(false);

    useEffect(() => {
        setIsActionDone(false);
        const timer = setTimeout(() => {
            setIsActionDone(true);
        }, 0);

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
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    };
    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
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
    }, [slidesLength]);

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
        return;
    };

    return (
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
    );
}
