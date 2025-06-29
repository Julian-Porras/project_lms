import { ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { ModuleNavComponent, ModuleStatusComponent } from "./ModuleNavigationComponent";
import TextEditor from "../../components/TextEditor";
import { InputText } from "../../components/Input";
import { LoadingPage, LoadingSkeleton } from "../../components/Loading";
import style from "../../styles/page.module.css";
import ActivityLog from "./ActivityLog";


function CourseLectureComponent({
    errors,
    isSubmitting,
    isContentLoading,
    content,
    ModuleNavData,
    handleChange,
    handleEditSubmit,
}) {

    const logs = [
        {
            user: "Julian",
            action: 'edited "Course Introduction"',
            timestamp: "2025-06-27T14:22:00Z",
            type: "edit",
        },
        {
            user: "Julian",
            action: 'edited "Course Introduction"',
            timestamp: "2025-06-27T14:22:00Z",
            type: "edit",
        },
        {
            user: "System",
            action: 'approved "Enrollment Request"',
            timestamp: "2025-06-28T08:45:00Z",
            type: "approve",
        },
        {
            user: "Admin",
            action: 'deleted "Module 3"',
            timestamp: "2025-06-27T09:12:00Z",
            type: "delete",
        },
        {
            user: "Admin",
            action: 'deleted "Module 3"',
            timestamp: "2025-06-27T09:12:00Z",
            type: "delete",
        },
    ];
    const isReady = !!content?.item_name || !!content?.item_content;
    return (
        <div className="flex flex-row h-full">
            <ModuleNavComponent ModuleNavData={ModuleNavData} />
            <div className="flex flex-col w-full mx-5">
                {isContentLoading ? <LoadingSkeleton /> :
                    isReady ? (
                        <>
                            <div className="flex flex-row items-center justify-between">
                                <InputText
                                    caps
                                    className={"bg-white"}
                                    type={"text"}
                                    name={"item_name"}
                                    value={content?.item_name}
                                    errors={errors?.item_name}
                                    onChange={handleChange}
                                />
                                <ButtonCreate
                                    method={handleEditSubmit}
                                    isDisable={isSubmitting}
                                    title={isSubmitting ? "Saving..." : "Save"}
                                />
                            </div>
                            <DividerThin />
                            <div className="flex flex-col flex-1 gap-2 py-3">
                                <TextEditor
                                    name={"item_content"}
                                    content={content?.item_content}
                                    handleChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (null)
                }
            </div>
            <ModuleStatusComponent >
                <ActivityLog logs={logs} />
            </ModuleStatusComponent>

        </div>
    );
}

export default CourseLectureComponent;