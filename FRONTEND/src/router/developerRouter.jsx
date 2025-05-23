import InstructorDashboard from "../pages/instructor/dashboard";
import InstructorClassroomTab from "../pages/instructor/classroom";
import { ROLES } from "../constants/role";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaTachometerAlt, FaBook, FaUsers, FaDesktop } from "react-icons/fa";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";
import SettingsPage from "../pages/settings";
import InstructorCourseTab from "../pages/instructor/course";
import ClassModulePage from "../pages/instructor/class-modules";
import CourseModulePage from "../pages/instructor/course-modules";

// const InstructorCourseTab = React.lazy(() => import("../pages/instructor/course"));
const devModulerouter = [
    {
        path: "classroom/:class_id/m",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "Modules" },
    },
    {
        path: "classroom/:class_id/p",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "People" },
    },
];

const developerRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><InstructorDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.DEVELOPER, icon: LuLayoutDashboard },
    },
    {
        path: "course",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><InstructorCourseTab /></ProtectedRoute>,
        meta: { label: "Course", role: ROLES.DEVELOPER, icon: LuBookMarked },
    },
    {
        path: "course/:course_id",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><CourseModulePage /></ProtectedRoute>
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><InstructorClassroomTab /></ProtectedRoute>,
        meta: { label: "Classroom", role: ROLES.DEVELOPER, icon: FaDesktop },
    },
    {
        children: devModulerouter,
    },
    {
        path: "settings",
        element: <SettingsPage />,
    },
];
export { developerRouter, devModulerouter };
