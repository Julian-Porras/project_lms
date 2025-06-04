import { NavLink, useResolvedPath } from "react-router-dom";
import styles from "../styles/card.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function LoginCard({ children }) {
    return (
        <div className={styles.loginCard}>
            {children}
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
            {children}
        </div>
    )
}

function ModuleItemCard({ children }) {
    return (
        <div className="flex flex-row items-center justify-between gap-2 p-3 pl-8 hover:bg-blue-50 " >
            {children}
        </div>
    )
}

function ModuleNavCard({ children }) {
    return (
        <div className={styles.moduleNav}>
            {children}
        </div>
    )
}

function ModuleStatusCard({ children }) {
    return (
        <div className={styles.moduleStatus}>
            {children}
        </div>
    )
}

function ButtonCard({ children }) {
    return (
        <div className=" bg-white p-2 rounded-sm shadow-sm text-gray-500 hover:bg-gray-100 cursor-pointer">
            {children}
        </div>
    )
}

export { LoginCard, RegisterCard, ContainerCard, ClassCard, ClassModuleCard, ModuleItemCard, ModuleNavCard, ModuleStatusCard, ButtonCard };