import { NavLink, useLocation } from "react-router-dom";
import { ROLES } from "../constants/role";
import { useAuth } from "../context/authContext";
import adminRouter from "../router/adminRouter";
import instructorRouter from "../router/instructorRouter";
import studentRouter from "../router/studentRouter";
import style from "../styles/sidebar.module.css"
import { FaAngleDown } from "react-icons/fa";

function Sidebar({ isOpenSubmenu, toggleSubmenu, resetSubmenus, isOpenSidebar }) {
    let sidebarHeader = null;
    const { user } = useAuth();
    const location = useLocation();
    const base = location.pathname.split("/")[1];

    let routes = [];
    if (user?.role_id === ROLES.ADMIN) {
        routes = adminRouter;
        sidebarHeader = 'Administrator account';
    }
    else if (user?.role_id === ROLES.DEVELOPER) {
        routes = instructorRouter;
        sidebarHeader = 'Developer account';
    }
    else if (user?.role_id === ROLES.INSTRUCTOR) {
        routes = instructorRouter;
        sidebarHeader = 'Instructor account';
    }
    else if (user?.role_id === ROLES.STUDENT) { 
        routes = studentRouter; 
        sidebarHeader = 'Student account';
    }

    return (
        <aside className={`${style.sidebarAside} ${isOpenSidebar ? style.sidebarOpen : style.sidebarClosed}`}>
            <p className={style.sidebarHead} >{sidebarHeader}</p>
            <nav className={style.navContainer}>
                {routes.filter(route => route.meta?.label).map(route => {
                    const Icon = route.meta?.icon;
                    const hasChildren = Array.isArray(route.children);
                    const isOpen = isOpenSubmenu[route.meta.label];

                    return (
                        <div key={route.meta.label} className={style.navGroup}>
                            {hasChildren ? (
                                <div
                                    className={`${style.navLink} ${style.navNotActive}`}
                                    onClick={() => toggleSubmenu(route.meta.label)}
                                >
                                    {Icon && <Icon />}
                                    <span>{route.meta.label}</span>
                                    <FaAngleDown className={`
                                        ${style.dropdownIcon} ${isOpen ? style.rotateIcon : ""}`
                                    }
                                    />
                                </div>
                            ) : (
                                <NavLink
                                    to={`/${base}/${route.path}`}
                                    onClick={resetSubmenus}
                                    className={({ isActive }) => `${style.navLink} ${isActive ? style.navActive : style.navNotActive}`}
                                >
                                    {Icon && <Icon />}
                                    <span>{route.meta.label}</span>
                                </NavLink>
                            )}

                            {hasChildren && (
                                <div className={`${style.subMenu} ${isOpen ? style.subMenuOpen : ""}`}>
                                    {route.children.map(child => (
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
