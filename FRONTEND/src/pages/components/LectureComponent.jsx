import { ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { devClassModuleRouter } from "../../router/developerRouter";
import { ModuleNavComponent, ModuleStatusComponent } from "./ModuleNavigationComponent";
import { FaPlus } from "react-icons/fa";
import style from "../../styles/page.module.css";
import TextEditor from "../../components/TextEditor";

function LectureComponent({
    content,
    setContent,
}) {

    const ModuleNavData = {
        base: "developer",
        routes: devClassModuleRouter,
        param: 1,
    }
    return (
        <div className="flex flex-row h-full">
            <ModuleNavComponent ModuleNavData={ModuleNavData} />
            <div className="flex flex-col w-full mx-5">
                <div className="flex flex-row items-center justify-between " >
                    <p className={style.title}>Lecture</p>
                    <ButtonSecondary > <FaPlus />SAVE</ButtonSecondary>
                </div>
                <DividerThin />

                <div className="flex flex-col flex-1 gap-2 py-3">
                    <TextEditor content={content} setContent={setContent} />
                </div>
            </div>
            <ModuleStatusComponent />
        </div>
    );
}

export default LectureComponent;