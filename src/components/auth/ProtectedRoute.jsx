import { Navigate, useLocation } from 'react-router-dom';
import { useSonghyeonAuth } from '../../context/SonghyeonAuthContext';

export default function ProtectedRoute({ children }) {
  const { user, member, loading, isGuest } = useSonghyeonAuth();
  const location = useLocation();
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#111] text-[#A1A1AA]">데이터를 불러오고 있습니다...</div>;
  if ((!user || !member) && !isGuest) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}
