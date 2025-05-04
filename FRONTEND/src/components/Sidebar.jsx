import { NavLink, useLocation } from "react-router-dom";
import { ROLES } from "../constants/role";
import { useAuth } from "../context/authContext";
import adminRouter from "../router/adminRouter";
import instructorRouter from "../router/instructorRouter";
import studentRouter from "../router/studentRouter";
import style from "../styles/sidebar.module.css"

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const base = location.pathname.split("/")[1];

    let routes = [];
    if (user?.role_id === ROLES.ADMIN) routes = adminRouter;
    else if (user?.role_id === ROLES.INSTRUCTOR) routes = instructorRouter;
    else if (user?.role_id === ROLES.STUDENT) routes = studentRouter;

    return (
        <aside className={style.sidebarAside}>
            <div className={style.logoContainer}>
                <img src="/src/assets/images/react.svg" alt="" />
                <h2 className="text-xl font-bold text-[#2C3E50]  px-2">Dashboard</h2>
            </div>
            <nav className={style.navContainer}>
                {routes
                    .filter(route => route.meta?.label)
                    .map(route => {
                        const Icon = route.meta?.icon;
                        return (
                            <NavLink
                                key={route.path}
                                to={`/${base}/${route.path}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-2 rounded-md 
                                        ${isActive
                                        ? "bg-[#2C3E50] text-white font-medium shadow"
                                        : "text-gray-700 hover:bg-gray-200 hover:text-[#2C3E50]"}`
                                }
                            >
                                {Icon && <Icon />}
                                <span>{route.meta.label}</span>
                            </NavLink>
                        );
                    })}
            </nav>
        </aside>
    );
};

export default Sidebar;
