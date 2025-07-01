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
const ClassLecturePage = lazy(() => import("../pages/developer/ClassLecturePage"));
const CourseLecturePage = lazy(() => import("../pages/developer/CourseLecturePage"));
const ClassPeoplePage = lazy(() => import("../pages/developer/ClassPeoplePage"));

const devClassContentRouter = [
  {
    path: ":lecture_id",
    element: <ClassLecturePage />,
  }
];
const devCourseContentRouter = [
  {
    path: ":lecture_id",
    element: <CourseLecturePage />,
  }
];

const devClassModuleRouter = [
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
    element: <ClassPeoplePage />,
    meta: { label: "People" },
  },
  {
    path: "classroom/:class_id/s",
    element: <ClassModulePage />,
    meta: { label: "Settings" },
  },
  {
    path: "classroom/:class_id/m",
    children: devClassContentRouter,
  },
];


const devCourseModuleRouter = [
  {
    path: "course/:course_id/m",
    element: <CourseModulePage />,
    meta: { label: "Modules" },
  },
  {
    path: "course/:course_id/a",
    element: <CourseModulePage />,
    meta: { label: "Assignments" },
  },
  {
    path: "course/:course_id/s",
    element: <CourseModulePage />,
    meta: { label: "Settings" },
  },
  {
    path: "course/:course_id/m",
    children: devCourseContentRouter,
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

export { developerRouter, devClassModuleRouter, devCourseModuleRouter , devClassContentRouter, devCourseContentRouter};
