import { useEffect } from "react";
import { useUI } from "../../context/uiContext";
import style from "../../styles/page.module.css";

function InstructorDashboard() {
    const { resetBreadcrumbs } = useUI();
    useEffect(() => {
        resetBreadcrumbs();
    }, [resetBreadcrumbs]);
    return (
        <p className={style.title} >Dashboard</p>
    )
}
export default InstructorDashboard;