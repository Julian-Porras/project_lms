import InstructorDashboard from "../pages/instructor/dashboard";
import InstructorClassroomTab from "../pages/instructor/classroom";
import { ROLES } from "../constants/role";
import ProtectedRoute from "../components/ProtectedRoute";

const instructorRouter = [
  {
    path: "/instructor/dashboard",
    element: <ProtectedRoute role={ROLES.INSTRUCTOR}><InstructorDashboard /></ProtectedRoute>,
  },
  {
    path: "/instructor/classroom",
    element: <ProtectedRoute role={ROLES.INSTRUCTOR}><InstructorClassroomTab /></ProtectedRoute>,
  },
];

export default instructorRouter;
