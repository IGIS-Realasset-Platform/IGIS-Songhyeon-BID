import React from 'react';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import LeftNavigator from './components/LeftNavigator';
import { useAnimations } from './hooks/useAnimations';
import { useLanguage } from './context/LanguageContext';
import SystemLogin from './components/system/SystemLogin';

export default function App() {
 // BASE_URL: '/' in dev, '/IGIS-Fund-Production-DP/' in GitHub Pages production
 const BASE = import.meta.env.BASE_URL;
 const getPage = () => {
 const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
 let path = window.location.pathname.replace(base, '').replace(/^\//, '');
 if (path.endsWith('/')) path = path.slice(0, -1);
 // Allow local access via /IOTA-Stratey to resolve to home
 if (path === 'IOTA-Stratey' || path === 'iota-stratey' || path === '') return 'home';
 // default route is home
 return path || 'home';
 };
 const toUrl = (page) => page === 'home' ? BASE : `${BASE}${page}`;

 const [currentPage, setCurrentPage] = React.useState(() => getPage());
 const [isNavOpen, setIsNavOpen] = React.useState(() => {
     const saved = sessionStorage.getItem('isNavOpen');
     return saved !== null ? JSON.parse(saved) : false;
 });

 React.useEffect(() => {
     sessionStorage.setItem('isNavOpen', JSON.stringify(isNavOpen));
 }, [isNavOpen]);

 // Handle URL syncing and global left/right key navigation sequences
 React.useEffect(() => {
 const handlePopState = () => {
 setCurrentPage(getPage());
 };

 const handleGlobalKeyDown = (e) => {
 if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

 const flow = ['home', 'system-plan', 'system-bridge', 'system-chat', 'system-detail', 'action-plan', 'system-core'];
 const currentIndex = flow.indexOf(currentPage);
 
 if (e.key === 'ArrowLeft' && currentIndex > 0) {
 // system-plan(로그인 화면)에서는 왼쪽 버튼으로 메인 홈으로 튕기지 않도록 방어
 if (currentPage === 'system-plan') return;
 const prev = flow[currentIndex - 1];
 window.history.pushState(null, '', toUrl(prev));
 setCurrentPage(prev);
 }
 };

 window.addEventListener('popstate', handlePopState);
 window.addEventListener('keydown', handleGlobalKeyDown);
 return () => {
 window.removeEventListener('popstate', handlePopState);
 window.removeEventListener('keydown', handleGlobalKeyDown);
 };
 }, [currentPage]);

 const navigateTo = (page) => {
 try {
 window.history.pushState(null, '', toUrl(page));
 } catch (e) {
 console.warn('pushState not supported on this origin');
 }
 setCurrentPage(page);
 };

 useAnimations(currentPage);

 React.useEffect(() => {
 window.isNewsPage = false;
 window.isLeasePage = false;
 }, [currentPage]);

 const { lang } = useLanguage();

 React.useEffect(() => {
 const applyLanguage = () => {
 const krTargetTexts = document.querySelectorAll(".kr-target-text");
 const enOnlyTexts = document.querySelectorAll(".en-only-text");
 const dualTexts = document.querySelectorAll("[data-en][data-kr]");

 dualTexts.forEach(el => {
 el.innerHTML = el.getAttribute(`data-${lang}`);
 });

 if (lang === 'kr') {
 krTargetTexts.forEach(el => {
 el.classList.add('font-normal');
 el.classList.remove('font-light');
 });
 enOnlyTexts.forEach(el => {
 el.style.display = 'none';
 });
 } else {
 krTargetTexts.forEach(el => {
 el.classList.add('font-light');
 el.classList.remove('font-normal');
 });
 enOnlyTexts.forEach(el => {
 el.style.display = 'block';
 });
 }
 };
 setTimeout(applyLanguage, 50);
 }, [currentPage, lang]);

  return (
  <>
  <LeftNavigator currentPage={currentPage} isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

  <div className={`transition-all duration-300 ease-in-out ${isNavOpen ? 'lg:ml-[240px]' : 'ml-0'}`}>
  <div className={(['system-plan', 'system-bridge', 'system-chat', 'system-detail', 'system-core'].includes(currentPage)) ? "w-full h-screen overflow-hidden" : "scroll-container font-sans"} id="scroll-container">
  {currentPage === 'home' && <MainLayout isNavOpen={isNavOpen} />}
  {currentPage === 'action-plan' && <Notes />}
  
  {/* Navigation Handlers overriding the inline SystemPlan internal stage logic */}
  {currentPage === 'system-plan' && <SystemLogin onLogin={() => navigateTo('system-bridge')} />}
  {['system-bridge', 'system-chat', 'system-detail'].includes(currentPage) && (
  <SystemPlan 
  externalStage={
  currentPage === 'system-bridge' ? 0 : 
  currentPage === 'system-chat' ? 1 : 2
  } 
  onNext={() => {
  if (currentPage === 'system-bridge') navigateTo('system-chat');
  if (currentPage === 'system-chat') navigateTo('system-detail');
  }} 
  />
  )}
  {currentPage === 'system-core' && <SystemCore isPlatform={false} />}
  </div>
  </div>
  </>
  );
}
