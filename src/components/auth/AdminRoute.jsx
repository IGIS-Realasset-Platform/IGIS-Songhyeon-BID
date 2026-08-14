import { Navigate } from 'react-router-dom';
import { useSonghyeonAuth } from '../../context/SonghyeonAuthContext';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useSonghyeonAuth();
  if (loading) return <div className="grid min-h-[320px] place-items-center text-[#86868B]">관리자 권한을 확인하고 있습니다...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
