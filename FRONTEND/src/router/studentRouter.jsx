import StudentDashboard from "../pages/student/dashboard";
import StudentClassroomTab from "../pages/student/classroom";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";

const studentRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.STUDENT },
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentClassroomTab /></ProtectedRoute>,
        meta: { label: "Classroom", role: ROLES.STUDENT },
    },
];

export default studentRouter;
