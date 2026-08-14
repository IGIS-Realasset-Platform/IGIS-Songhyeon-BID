import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordSonghyeonPageView } from '../../lib/songhyeonAnalyticsRepository';

export default function SonghyeonPageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    void recordSonghyeonPageView(pathname === '/home' ? '/' : pathname);
  }, [pathname]);

  return null;
}
