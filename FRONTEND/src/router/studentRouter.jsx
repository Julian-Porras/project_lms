import React, { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";
import { FaDesktop } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

const StudentDashboard = lazy(() => import("../pages/student/DashboardPage.jsx"));
const StudentClassroomTab = lazy(() => import("../pages/student/ClassroomPage.jsx"));
const SettingsPage = lazy(() => import("../pages/settings"));

const studentRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.STUDENT, icon: LuLayoutDashboard },
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentClassroomTab /></ProtectedRoute>,
        meta: { label: "Classes", role: ROLES.STUDENT, icon: FaDesktop },
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
];

export default studentRouter;
