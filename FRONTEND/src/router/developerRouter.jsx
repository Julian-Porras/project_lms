import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaTachometerAlt, FaBook, FaUsers, FaDesktop } from "react-icons/fa";
import { ROLES } from "../constants/role";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";

const InstructorDashboard = React.lazy(() => import("../pages/instructor/dashboard"));
const InstructorClassroomTab = React.lazy(() => import("../pages/instructor/classroom"));
const InstructorCourseTab = React.lazy(() => import("../pages/instructor/course"));
const ClassModulePage = React.lazy(() => import("../pages/instructor/class-modules"));
const CourseModulePage = React.lazy(() => import("../pages/instructor/course-modules"));
const SettingsPage = React.lazy(() => import("../pages/settings"));

const devModuleRouter = [
    {
        path: "classroom/:class_id/n",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "Announcements" },
    },
    {
        path: "classroom/:class_id/m",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "Modules" },
    },
    {
        path: "classroom/:class_id/a",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "Assignments" },
    },
    {
        path: "classroom/:class_id/p",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "People" },
    },
    {
        path: "classroom/:class_id/s",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><ClassModulePage /></ProtectedRoute>,
        meta: { label: "Settings" },
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
        children: devModuleRouter,
    },
    {
        path: "settings",
        element: <SettingsPage />,
    },
];
export { developerRouter, devModuleRouter };
