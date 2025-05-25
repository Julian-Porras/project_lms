import React, { lazy } from "react";
import { ROLES } from "../constants/role";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaDesktop } from "react-icons/fa";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";

const InstructorDashboard = lazy(() => import("../pages/instructor/dashboard"));
const InstructorClassroomTab = lazy(() => import("../pages/instructor/classroom"));
const SettingsPage = lazy(() => import("../pages/settings"));

const instructorRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.INSTRUCTOR}><InstructorDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.INSTRUCTOR, icon: LuLayoutDashboard },
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.INSTRUCTOR}><InstructorClassroomTab /></ProtectedRoute>,
        meta: { label: "Classroom", role: ROLES.INSTRUCTOR, icon: FaDesktop },
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
];

export default instructorRouter;
