import { NavLink, useLocation } from "react-router-dom";
import { ROLES } from "../constants/role";
import { useAuth } from "../context/authContext";
import { devModuleRouter } from "../router/developerRouter";
import { ModuleNavCard } from "./Card";
import style from "../styles/sidebar.module.css";
import { useParams } from "react-router-dom";

function ModuleNav() {
    const { class_id } = useParams();
    const location = useLocation();
    const { user } = useAuth();
    const base = location.pathname.split("/")[1];
    let routes = [];
    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devModuleRouter;
    }
    return (
        <ModuleNavCard>
            <nav className={style.moduleNavContainer}>
                {
                    routes.filter(route => route.meta?.label).map(route => {
                        return (
                            <div key={route.meta.label} className={style.navGroup}>
                                <NavLink
                                    to={`/${base}/${route.path.replace(":class_id", class_id)}`}
                                    className={({ isActive }) =>
                                        `${style.moduleNavLink} ${isActive ? style.moduleNavActive : style.moduleNavNotActive}`
                                    }
                                >
                                    <span>{route.meta.label}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </nav>
        </ModuleNavCard>
    )
}

export default ModuleNav;