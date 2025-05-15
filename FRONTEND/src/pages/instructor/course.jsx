import { ButtonSecondary } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "../../components/Modal";

function InstructorCourseTab() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Course</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className="flex flex-row flex-wrap gap-4 pt-5">
                <ClassCard>

                </ClassCard>
                
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Modal Title"
            >
                <p>This is modal content.</p>
            </Modal>
        </>
    )
}
export default InstructorCourseTab;