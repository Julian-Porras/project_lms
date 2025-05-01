import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { LoadingPage } from "./Loading";
import { useEffect } from "react";

const ProtectedRoute = ({ children, role }) => {
  const { user, authUser, loading } = useAuth();

  if (!authUser) return <Navigate to="/" replace />;

  if (loading || !user) {
    return <LoadingPage />;
  }

  if (role && user.role_id !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
