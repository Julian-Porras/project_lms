import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { UIProvider } from "../context/uiContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <UIProvider>
        <Outlet />
      </UIProvider>
    </AuthProvider>
  );
}