import { NavLink, useResolvedPath } from "react-router-dom";
import styles from "../styles/card.module.css";

function LoginCard({ children }) {
    return (
        <div className={styles.loginCard}>
            <div>{children}</div>
        </div>
    )
}

function RegisterCard({ children }) {
    return (
        <div className={styles.registerCard}>
            <div>{children}</div>
        </div>
    )
}

function ContainerCard({ children }) {
    return (
        <div className={styles.containerCard}>
            <div>{children}</div>
        </div>
    )
}

function ClassCard({ route, children }) {
    const base = useResolvedPath(".").pathname;
    return (
        <NavLink to={`${base}/${route}`} className={styles.containerCard}>
            <div>{children}</div>
        </NavLink>
    )
}

function ClassModuleCard({ children }) {
    return (
        <div className={styles.ModuleCard}>
            <div>{children}</div>
        </div>
    )
}
export { LoginCard, RegisterCard, ContainerCard, ClassCard, ClassModuleCard };