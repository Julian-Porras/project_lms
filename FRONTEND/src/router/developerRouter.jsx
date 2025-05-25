import { lazy } from "react";
import { FaDesktop } from "react-icons/fa";
import { ROLES } from "../constants/role";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";

const InstructorDashboard = lazy(() => import("../pages/instructor/dashboard"));
const InstructorClassroomTab = lazy(() => import("../pages/instructor/classroom"));
const InstructorCourseTab = lazy(() => import("../pages/instructor/course"));
const ClassModulePage = lazy(() => import("../pages/instructor/class-modules"));
const CourseModulePage = lazy(() => import("../pages/instructor/course-modules"));
const SettingsPage = lazy(() => import("../pages/settings"));

const devModuleRouter = [
  {
    path: "classroom/:class_id/n",
    element: <ClassModulePage />,
    meta: { label: "Announcements" },
  },
  {
    path: "classroom/:class_id/m",
    element: <ClassModulePage />,
    meta: { label: "Modules" },
  },
  {
    path: "classroom/:class_id/a",
    element: <ClassModulePage />,
    meta: { label: "Assignments" },
  },
  {
    path: "classroom/:class_id/p",
    element: <ClassModulePage />,
    meta: { label: "People" },
  },
  {
    path: "classroom/:class_id/s",
    element: <ClassModulePage />,
    meta: { label: "Settings" },
  },
];

const developerRouter = [
  {
    path: "dashboard",
    element: <InstructorDashboard />,
    meta: { label: "Dashboard", role: ROLES.DEVELOPER, icon: LuLayoutDashboard },
  },
  {
    path: "course",
    element: <InstructorCourseTab />,
    meta: { label: "Course", role: ROLES.DEVELOPER, icon: LuBookMarked },
  },
  {
    path: "course/:course_id",
    element: <CourseModulePage />,
  },
  {
    path: "classroom",
    element: <InstructorClassroomTab />,
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
