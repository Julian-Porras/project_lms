import { NavLink, useLocation } from "react-router-dom";
import { ROLES } from "../constants/role";
import { useAuth } from "../context/authContext";
import adminRouter from "../router/adminRouter";
import instructorRouter from "../router/instructorRouter";
import studentRouter from "../router/studentRouter";

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const base = location.pathname.split("/")[1];

    let routes = [];
    if (user?.role_id === ROLES.ADMIN) routes = adminRouter;
    else if (user?.role_id === ROLES.INSTRUCTOR) routes = instructorRouter;
    else if (user?.role_id === ROLES.STUDENT) routes = studentRouter;

    return (
        <aside className="w-64 h-screen bg-[#f9fafb] border-r border-gray-200 shadow-sm p-4 flex flex-col">
            <h2 className="text-xl font-bold text-[#2C3E50] mb-6 px-2">Dashboard</h2>
            <nav className="flex flex-col gap-1 overflow-y-auto px-1">
                {routes
                    .filter(route => route.meta?.label)
                    .map(route => (
                        <NavLink
                            key={route.path}
                            to={`/${base}/${route.path}`}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg 
                                ${isActive
                                    ? "bg-[#2C3E50] text-white font-medium shadow"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-[#2C3E50]"}`
                            }
                        >
                            {/* Optional icon here if you use one: */}
                            {/* <Icon className="w-5 h-5" /> */}
                            <span>{route.meta.label}</span>
                        </NavLink>
                    ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
