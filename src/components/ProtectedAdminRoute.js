// components/ProtectedAdminRoute.js
import { useAdmin } from './AdminContext';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/app/groups" replace />;
};

export default ProtectedAdminRoute;