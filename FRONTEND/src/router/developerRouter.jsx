import InstructorDashboard from "../pages/instructor/dashboard";
import InstructorClassroomTab from "../pages/instructor/classroom";
import { ROLES } from "../constants/role";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaTachometerAlt, FaBook, FaUsers, FaDesktop } from "react-icons/fa";
import SettingsPage from "../pages/settings";

const developerRouter = [
    {
        path: "dashboard",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><InstructorDashboard /></ProtectedRoute>,
        meta: { label: "Dashboard", role: ROLES.DEVELOPER, icon: FaTachometerAlt },
    },
    {
        path: "classroom",
        element: <ProtectedRoute role={ROLES.DEVELOPER}><InstructorClassroomTab /></ProtectedRoute>,
        meta: { label: "Classroom", role: ROLES.DEVELOPER, icon: FaDesktop },
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
];

export default developerRouter;
