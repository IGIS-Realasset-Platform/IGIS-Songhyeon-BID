import React, { useState, useEffect } from 'react';
import CoverSection from './CoverSection';
import SectionExecutiveSummary from './SectionExecutiveSummary';
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
import Section12_Formula from './Section12_Formula';
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
import Section27_NewContent1 from './Section27_NewContent1';
import Section27_NewContent2 from './Section27_NewContent2';
import Section27_NewContent3 from './Section27_NewContent3';
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
import Section38_Newschool from './Section38_Newschool';
import Section38_Part4Cover from './Section38_Part4Cover';
import Section38_1 from './Section38_1';
import Section38_2 from './Section38_2';
import Section38_3 from './Section38_3';
import Section38_4 from './Section38_4';
import Section38_5 from './Section38_5';
import Section39 from './Section39';
import Section40 from './Section40';
import Section41 from './Section41';
import Section42 from './Section42';
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
import ChapterCover from './ChapterCover';

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
    const slidesLength = 116; 
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
        <CoverSection />, // Page 1 (Title Cover)
        <SectionExecutiveSummary />, // Page 2 (Executive Summary)
        <Section1 />, // Page 3 (Part 1 Cover)
        <ChapterCover chapterNum="1" title={<>뉴욕시 BID 가치 분석<br />브라이언 파크의 부활</>} />, // Page 4
        <Section2 />, // Page 5
        <Section3 />, // Page 6
        <Section4 />, // Page 7
        <ChapterCover chapterNum="2" title={<>뉴욕시 BID 가치 분석<br />타임스퀘어 재생</>} />, // Page 8
        <Section5 />, // Page 9
        <Section6 />, // Page 10
        <Section7 />, // Page 11
        <ChapterCover chapterNum="3" title="플레이스메이킹과 에리어매니지먼트" />, // Page 12
        <Section8 />, // Page 10
        <Section9 />, // Page 11
        <Section10 />, // Page 12
        <Section11 />, // Page 13
        <Section12 />, // Page 17
        <Section12_Formula />, // Page 18 (Key Formula)
        <Section13 />, // Page 19 (Part 2 Cover)
        <ChapterCover chapterNum="1" title="BIA/BID 기원과 역사" />, // Page 16
        <Section14 />, // Page 17
        <Section15 />, // Page 18
        <Section16 />, // Page 19
        <Section17 />, // Page 20
        <ChapterCover chapterNum="2" title="BID 제도적 작동 메커니즘" />, // Page 21
        <Section18 />, // Page 22
        <Section19 />, // Page 23
        <Section20 />, // Page 24
        <Section21 />, // Page 25
        <Section22 />, // Page 26
        <Section23 />, // Page 27
        <Section24 />, // Page 28
        <ChapterCover chapterNum="3" title="법적 판례와 실패/비판론" />, // Page 29
        <Section25 />, // Page 30
        <Section26 />, // Page 31
        <Section27 />, // Page 32
        <ChapterCover chapterNum="4" title={<>뉴욕 현황<br />72개 BID의 생태계</>} />, // Page 33
        <Section27_NewContent1 />, // Page 34
        <Section27_NewContent2 />, // Page 35
        <Section27_NewContent3 />, // Page 36
        <Section28 />, // Page 37 (Part 3 Cover)
        <ChapterCover chapterNum="1" title="메가 PPP 개발과 파이낸싱" />, // Page 38
        <Section29 />, // Page 39
        <Section30 />, // Page 40
        <Section31 />, // Page 41
        <ChapterCover chapterNum="2" title="공간 운영 관리 체계" />, // Page 42
        <Section32 />, // Page 43
        <Section33 />, // Page 44
        <Section34 />, // Page 45
        <ChapterCover chapterNum="3" title="플레이스메이킹 실무와 갈등" />, // Page 46
        <Section35 />, // Page 47
        <Section36 />, // Page 48
        <Section37 />, // Page 53
        <Section38 />, // Page 54
        <Section38_Newschool />, // Page 55
        <Section38_Part4Cover />, // Page 56 (Part 4 Cover)
        <ChapterCover chapterNum="1" title="타운 매니지먼트 철학과 디벨로퍼" />, // Page 57
        <Section38_1 />, // Page 58
        <Section38_2 />, // Page 59
        <ChapterCover chapterNum="2" title="일본판 BID 제도와 오사카 모델" />, // Page 60
        <Section38_3 />, // Page 61
        <ChapterCover chapterNum="3" title="미·일 비교 및 SBD 전략 적용" />, // Page 62
        <Section38_4 />, // Page 63
        <Section38_5 />, // Page 64
        <Section39 />, // Page 65 (Part 5 Cover)
        <ChapterCover chapterNum="1" title="SBD 핵심 자산과 공공 기여" />, // Page 66
        <Section40 />, // Page 67
        <Section41 />, // Page 68
        <Section42 />, // Page 69
        <ChapterCover chapterNum="2" title="서울형 BID 커스터마이징 전략" />, // Page 70
        <Section44 />, // Page 71
        <Section45 />, // Page 72
        <Section46 />, // Page 73
        <Section47 />, // Page 74
        <ChapterCover chapterNum="3" title="서울역-남산 SBD화 명분" />, // Page 75
        <Section48 />, // Page 76
        <Section49 />, // Page 77
        <Section50 />, // Page 78
        <Section51 />, // Page 79
        <Section52 />, // Page 80
        <Section53 />, // Page 81
        <ChapterCover chapterNum="4" title="서울역-남산 SBD 공간 실행 전략" />, // Page 82
        <Section54 />, // Page 83
        <Section55 />, // Page 84
        <Section56 />, // Page 85
        <Section57 />, // Page 86
        <ChapterCover chapterNum="5" title="SBD의 구조적 차별성과 진화 모델" />, // Page 87
        <Section58 />, // Page 88
        <Section59 />, // Page 89
        <ChapterCover chapterNum="6" title="증거 1. 디벨로퍼와 자산 소유자를 위한 재무적 실익 입증" />, // Page 90
        <Section60 />, // Page 91
        <Section61 />, // Page 92
        <Section62 />, // Page 93
        <ChapterCover chapterNum="7" title="증거 2. 도시·정부(서울시)에게 무엇이 좋은가" />, // Page 94
        <Section63 />, // Page 95
        <Section64 />, // Page 96
        <Section65 />, // Page 97
        <ChapterCover chapterNum="8" title="증거 3. 그 안에서 일하는 사람(직장인)에게 무엇이 좋은가" />, // Page 98
        <Section66 />, // Page 99
        <Section67 />, // Page 100
        <ChapterCover chapterNum="9" title="증거 4. 주변 거주자·지역사회에게 무엇이 좋은가" />, // Page 101
        <Section68 />, // Page 102
        <Section69 />, // Page 103
        <ChapterCover chapterNum="10" title="결정적 비교: 자연발생 CBD vs 오피스집합 GBD·YBD vs 설계·운영형 SBD" />, // Page 104
        <Section70 />, // Page 105
        <Section71 />, // Page 106
        <ChapterCover chapterNum="11" title="결론: SBD가 되면 무엇이 좋아지는가 — 이오타서울 + 남산이라는 무기" />, // Page 107
        <Section72 />, // Page 108
        <Section73 />, // Page 109
        <Section74 />, // Page 110
        <Section75 />, // Page 111 (Part 6 Cover)
        <ChapterCover chapterNum="12" title="IGIS 관점의 전략적 의미와 SBD 자산 가치 극대화" />, // Page 112
        <Section76 />, // Page 113
        <ChapterCover chapterNum="13" title="SBD 운영 OS의 용산국제업무지구 전이(Transfer) 전략" />, // Page 114
        <Section77 />, // Page 115
        <Section78 /> // Page 116
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
