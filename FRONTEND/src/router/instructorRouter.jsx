import React from "react";
import InstructorDashboard from "../pages/instructor/dashboard";
import InstructorClassroomTab from "../pages/instructor/classroom";
import { ROLES } from "../constants/role";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaTachometerAlt, FaBook, FaUsers, FaDesktop } from "react-icons/fa";
import SettingsPage from "../pages/settings";

const instructorRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.INSTRUCTOR}><InstructorDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.INSTRUCTOR, icon: FaTachometerAlt },
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
