import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/authContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}