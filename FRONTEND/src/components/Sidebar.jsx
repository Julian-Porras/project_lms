import { NavLink, useLocation } from "react-router-dom";
import { ROLES } from "../constants/role";
import { useAuth } from "../context/authContext";
import adminRouter from "../router/adminRouter";
import instructorRouter from "../router/instructorRouter";
import studentRouter from "../router/studentRouter";
import style from "../styles/sidebar.module.css"
import { useState } from "react";
import { FaAngleDown,FaAngleUp  } from "react-icons/fa";

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const base = location.pathname.split("/")[1];
    const [openSubmenus, setOpenSubmenus] = useState({});

    let routes = [];
    if (user?.role_id === ROLES.ADMIN) routes = adminRouter;
    else if (user?.role_id === ROLES.INSTRUCTOR) routes = instructorRouter;
    else if (user?.role_id === ROLES.STUDENT) routes = studentRouter;

    const toggleSubmenu = (path) => {
        setOpenSubmenus(prev => ({...prev, [path]: !prev[path], }));
    };

    return (
        <aside className={style.sidebarAside}>
            <nav className={style.navContainer}>
                {routes
                    .filter(route => route.meta?.label)
                    .map(route => {
                        const Icon = route.meta?.icon;
                        const hasChildren = Array.isArray(route.children);
                        const isOpen = openSubmenus[route.path];

                        return (
                            <div key={route.path}
                                className={style.navGroup}>
                                <NavLink
                                    onClick={() => hasChildren && toggleSubmenu(route.path)}
                                    to={hasChildren ? `` : `/${base}/${route.path}`}
                                    className={`${style.navLink} ${location.pathname.includes(route.path) ? style.navActive : style.navNotActive}`}
                                >
                                    {Icon && <Icon />}
                                    <span>{route.meta.label}</span>&emsp;
                                    {hasChildren ? ( isOpen ? <FaAngleUp /> : <FaAngleDown/>) : ""}
                                </NavLink>

                                {hasChildren && isOpen && (
                                    <div className={style.navGroup}>
                                        {route.children.map((child) => (
                                            <NavLink
                                                key={child.path}
                                                to={`/${base}/${child.path}`}
                                                className={({ isActive }) =>
                                                    `${style.navLink} ${isActive ? style.navActive : style.navNotActive}`
                                                }
                                            >
                                                <span>&emsp;{child.meta?.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </nav>
        </aside>
    );
};

export default Sidebar;
