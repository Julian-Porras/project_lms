import AdminDashboard from "../pages/admin/dashboard";
import AdminCourseTab from "../pages/admin/course";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";

const adminRouter = [
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/course",
    element: <ProtectedRoute role={ROLES.ADMIN}><AdminCourseTab /></ProtectedRoute>,
  },
];

export default adminRouter;
