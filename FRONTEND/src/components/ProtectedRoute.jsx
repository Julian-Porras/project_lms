import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { LoadingPage } from "./Loading";
import { ROLES } from "../constants/role";

const ProtectedRoute = ({ children, role }) => {
  const { user, authUser, token, loading } = useAuth();

  if (!authUser || !token) return <Navigate to="/" replace />;
  if (loading || !user) return null;
  if (role && user.role_id !== role) {

    switch (user.role_id) {
      case ROLES.ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      case ROLES.INSTRUCTOR:
        return <Navigate to="/instructor/dashboard" replace />;
      case ROLES.DEVELOPER:
        return <Navigate to="/dev/dashboard" replace />;
      case ROLES.STUDENT:
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
