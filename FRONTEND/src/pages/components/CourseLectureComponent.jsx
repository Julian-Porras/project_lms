import { ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { ModuleNavComponent, ModuleStatusComponent } from "./ModuleNavigationComponent";
import TextEditor from "../../components/TextEditor";
import { InputText } from "../../components/Input";
import { LoadingPage } from "../../components/Loading";
import style from "../../styles/page.module.css";

function CourseLectureComponent({
    errors,
    isSubmitting,
    isContentLoading,
    content,
    ModuleNavData,
    handleChange,
    handleEditSubmit,
}) {
    const isReady = !!content?.item_name || !!content?.item_content;
    return (
        <div className="flex flex-row h-full">
            <ModuleNavComponent ModuleNavData={ModuleNavData} />
            <div className="flex flex-col w-full mx-5">
                {isContentLoading ? <LoadingPage /> :
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
            <ModuleStatusComponent />
        </div>
    );
}

export default CourseLectureComponent;