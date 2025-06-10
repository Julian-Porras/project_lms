import { NavLink, useResolvedPath } from "react-router-dom";
import styles from "../styles/card.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

function ClassCard1({ route, name, year, students }) {
    const base = useResolvedPath(".").pathname;
    return (
        <Card sx={{ maxWidth: 220, width: "100%", ':hover': { boxShadow: 3 } }}>
            <NavLink to={`${base}/${route}`} className="flex flex-col justify-center">
                <div className="w-full h-24 bg-cyan-500">
                </div>
                <CardContent className="flex flex-col items-start justify-center">
                    <Typography gutterBottom variant="h5" component="div" className="uppercase" >
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Year Level: {year || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Students: {students || "N/A"}
                    </Typography>
                </CardContent>

            </NavLink>
        </Card>
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
        <NavLink className="flex flex-row items-center justify-between gap-2 p-3 pl-6 hover:bg-blue-50 " >
            {children}
        </NavLink>
    )
}
function ModuleHeaderItemCard({ children }) {
    return (
        <div className="flex flex-row items-center border-l-3 border-l-[var(--secondary-color)] border-b border-b-gray-200 justify-start text-[var(--secondary-color)] gap-4 p-3 pl-6 bg-gray-100 " >
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

function ButtonCard({ method, children }) {
    return (
        <div onClick={method} className=" bg-white p-2 rounded-sm shadow-sm text-gray-500 hover:bg-gray-100 cursor-pointer">
            {children}
        </div>
    )
}

export {
    LoginCard,
    RegisterCard,
    ContainerCard,
    ClassCard,
    ClassCard1,
    ClassModuleCard,
    ModuleHeaderItemCard,
    ModuleItemCard,
    ModuleNavCard,
    ModuleStatusCard,
    ButtonCard
};