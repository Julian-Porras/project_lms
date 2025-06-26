import { NavLink, useLocation } from "react-router-dom";
import { ModuleNavCard, ModuleStatusCard } from "../../components/Card";
import style from "../../styles/sidebar.module.css";
import ReplaceRouteParams from "../../util/route-param";

function ModuleNavComponent({ ModuleNavData }) {
    return (
        <ModuleNavCard>
            <nav className={style.moduleNavContainer}>
                {
                    ModuleNavData.routes.filter(route => route.meta?.label).map(route => {
                        const filledPath = ReplaceRouteParams(route.path, { [ModuleNavData.paramName]: ModuleNavData.param });
                        return (
                            <div key={route.meta.label} className={style.navGroup}>
                                <NavLink
                                    to={`/${ModuleNavData.base}/${filledPath}`}
                                    className={({ isActive }) => `${style.moduleNavLink} ${isActive ? style.moduleNavActive : style.moduleNavNotActive}`}
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
function ModuleStatusComponent({  }) {
    return (
        <ModuleStatusCard>
            <p className="text-lg">Classroom status</p>
        </ModuleStatusCard>
    )
}

export {ModuleNavComponent, ModuleStatusComponent};