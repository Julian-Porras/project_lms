import StudentDashboard from "../pages/student/dashboard";
import StudentClassroomTab from "../pages/student/classroom";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROLES } from "../constants/role";
import { FaTachometerAlt, FaBook, FaDesktop } from "react-icons/fa";
const studentRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.STUDENT, icon: FaTachometerAlt },
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.STUDENT}><StudentClassroomTab /></ProtectedRoute>,
        meta: { label: "Classes", role: ROLES.STUDENT, icon: FaDesktop },
    },
];

export default studentRouter;
