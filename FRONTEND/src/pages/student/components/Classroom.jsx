import style from "../../../styles/page.module.css";
import {DividerThin} from "../../../components/Divider.jsx";

function StudentClassroomComponent(){
    return (
        <>
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Classroom</p>
            </div>
            <DividerThin />

            <div className="flex flex-row items-center justify-center w-full">
                <p className="text-lg text-gray-500">No classroom found</p>
            </div>
        </>
    )
}

export default StudentClassroomComponent;