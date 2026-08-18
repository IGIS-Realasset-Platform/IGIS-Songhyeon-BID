import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { normalizeSonghyeonAnalyticsPath, recordSonghyeonPageView } from '../../lib/songhyeonAnalyticsRepository';

export default function SonghyeonPageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    void recordSonghyeonPageView(normalizeSonghyeonAnalyticsPath(pathname));
  }, [pathname]);

  return null;
}
