import { ContainerCard } from "../../components/Card";
import style from "../../styles/page.module.css";
import {DividerThin} from "../../components/Divider.jsx";

function StudentDashboard() {
    return (
        <>
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Dashboard</p>
            </div>
            <DividerThin />
            <div className="flex flex-row items-center justify-center w-full">
                <p className="text-lg text-gray-500">Empty dashboard</p>
            </div>
        </>
    )
}
export default StudentDashboard;