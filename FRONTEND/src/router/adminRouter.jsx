import AdminDashboard from "../pages/admin/dashboard";
import AdminCourseTab from "../pages/admin/course";
import AdminPeopleTab from "../pages/admin/people";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";

const adminRouter = [
  {
    path: "dashboard",
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>,
    meta: { label: "Dashboard", role: ROLES.ADMIN },
  },
  {
    path: "course",
    element: (<ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>),
    meta: { label: "Courses", role: ROLES.ADMIN },
  },
  {
    path: "people",
    element: (<ProtectedRoute role={ROLES.ADMIN}><AdminPeopleTab /></ProtectedRoute>),
    meta: { label: "People", role: ROLES.ADMIN },
  },
];

export default adminRouter;
