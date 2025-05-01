import StudentDashboard from "../pages/student/dashboard";
import StudentClassroomTab from "../pages/student/classroom";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";

const studentRouter = [
    {
        path: "/student/dashboard",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentDashboard /></ProtectedRoute>,
    },
    {
        path: "/student/classroom",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentClassroomTab /></ProtectedRoute>,
    },
];

export default studentRouter;
