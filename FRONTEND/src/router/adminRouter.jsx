import React from "react";
import AdminDashboard from "../pages/admin/dashboard";
import AdminCourseTab from "../pages/admin/course";
import AdminPeopleTab from "../pages/admin/people";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";
import SettingsPage from "../pages/settings";

const adminRouter = [
  {
    path: "dashboard",
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>,
    meta: { label: "Dashboard", role: ROLES.ADMIN, icon: LuLayoutDashboard },
  },
  {
    path: "courses",
    meta: { label: "Courses", role: ROLES.ADMIN, icon: LuBookMarked },
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>,
  },
  {
    meta: { label: "Custom", role: ROLES.ADMIN, icon: FaUsers },
    children: [
      {
        path: "custom/sub1",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 1" },
      },
      {
        path: "custom/sub2",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 2" },
      },
      {
        path: "custom/sub3",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 3" },
      },
      {
        path: "custom/sub4",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 4" },
      },
    ],
  },
  {
    path: "people",
    element: (<ProtectedRoute role={ROLES.ADMIN}><AdminPeopleTab /></ProtectedRoute>),
    meta: { label: "People", role: ROLES.ADMIN, icon: FaUsers },
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];

export default adminRouter;
