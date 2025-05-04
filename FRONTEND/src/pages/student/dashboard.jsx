import { ContainerCard } from "../../components/Card";
import style from "../../styles/page.module.css";

function StudentDashboard() {
    return (
        <div className="flex flex-col gap-4" > 
            <p className={style.title} >DASHBOARD</p>
            <ContainerCard>
                sample
            </ContainerCard>
            <ContainerCard>
                sample
            </ContainerCard>
        </div>
    )
}
export default StudentDashboard;