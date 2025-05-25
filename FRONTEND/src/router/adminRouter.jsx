import { lazy } from "react";
import { ROLES } from "../constants/role";
import { FaUsers } from "react-icons/fa";
import { LuLayoutDashboard, LuBookMarked } from "react-icons/lu";

const AdminDashboard = lazy(() => import("../pages/admin/dashboard"));
const AdminCourseTab = lazy(() => import("../pages/admin/course"));
const AdminPeopleTab = lazy(() => import("../pages/admin/people"));
const SettingsPage = lazy(() => import("../pages/settings"));

const adminRouter = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
    meta: { label: "Dashboard", role: ROLES.ADMIN, icon: LuLayoutDashboard },
  },
  {
    path: "courses",
    meta: { label: "Courses", role: ROLES.ADMIN, icon: LuBookMarked },
    element: <AdminCourseTab />,
  },
  {
    meta: { label: "Custom", role: ROLES.ADMIN, icon: FaUsers },
    children: [
      {
        path: "custom/sub1",
        element: <AdminCourseTab />,
        meta: { label: "Submenu 1" },
      },
      {
        path: "custom/sub2",
        element: <AdminCourseTab />,
        meta: { label: "Submenu 2" },
      },
    ],
  },
  {
    path: "people",
    element: <AdminPeopleTab />,
    meta: { label: "People", role: ROLES.ADMIN, icon: FaUsers },
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];

export default adminRouter;
