import { lazy } from "react";
import { FaDesktop } from "react-icons/fa";
import { ROLES } from "../constants/role";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";

const Dashboard = lazy(() => import("../pages/instructor/dashboard"));
const ClassroomPage = lazy(() => import("../pages/developer/ClassroomPage"));
const CoursePage = lazy(() => import("../pages/developer/CoursePage"));
const ClassModulePage = lazy(() => import("../pages/developer/ClassModulePage"));
const CourseModulePage = lazy(() => import("../pages/developer/CourseModulePage"));
const SettingsPage = lazy(() => import("../pages/settings"));

const devClassModuleRouter = [
  {
    path: "classroom/:id/n",
    element: <ClassModulePage />,
    meta: { label: "Announcements" },
  },
  {
    path: "classroom/:id/m",
    element: <ClassModulePage />,
    meta: { label: "Modules" },
  },
  {
    path: "classroom/:id/a",
    element: <ClassModulePage />,
    meta: { label: "Assignments" },
  },
  {
    path: "classroom/:id/p",
    element: <ClassModulePage />,
    meta: { label: "People" },
  },
  {
    path: "classroom/:id/s",
    element: <ClassModulePage />,
    meta: { label: "Settings" },
  },
];

const devCourseModuleRouter = [
  {
    path: "course/:id/m",
    element: <CourseModulePage />,
    meta: { label: "Modules" },
  },
  {
    path: "course/:id/a",
    element: <CourseModulePage />,
    meta: { label: "Assignments" },
  },
  {
    path: "course/:id/s",
    element: <CourseModulePage />,
    meta: { label: "Settings" },
  },
];

const developerRouter = [
  {
    path: "dashboard",
    element: <Dashboard />,
    meta: { label: "Dashboard", role: ROLES.DEVELOPER, icon: LuLayoutDashboard },
  },
  {
    path: "course",
    element: <CoursePage />,
    meta: { label: "Course", role: ROLES.DEVELOPER, icon: LuBookMarked },
  },
  {
    path: "classroom",
    element: <ClassroomPage />,
    meta: { label: "Classroom", role: ROLES.DEVELOPER, icon: FaDesktop },
  },
  {
    children: devClassModuleRouter,
  },
  {
    children: devCourseModuleRouter,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];

export { developerRouter, devClassModuleRouter, devCourseModuleRouter };
