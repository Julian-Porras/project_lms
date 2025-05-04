import AdminDashboard from "../pages/admin/dashboard";
import AdminCourseTab from "../pages/admin/course";
import AdminPeopleTab from "../pages/admin/people";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";
import { FaTachometerAlt, FaBook, FaUsers } from "react-icons/fa";

const adminRouter = [
  {
    path: "dashboard",
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>,
    meta: { label: "Dashboard", role: ROLES.ADMIN, icon: FaTachometerAlt },
  },
  {
    // path: "course",
    // element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
    meta: { label: "Courses", role: ROLES.ADMIN, icon: FaBook },
    children: [
      {
        path: "sub1",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 1" },
      },
      {
        path: "sub2",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 2" },
      },
      {
        path: "sub3",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 3" },
      },
      {
        path: "sub4",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 4" },
      },
      {
        path: "sub5",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 5" },
      },
      {
        path: "sub6",
        element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
        meta: { label: "Submenu 6" },
      },
    ],
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
];

export default adminRouter;
