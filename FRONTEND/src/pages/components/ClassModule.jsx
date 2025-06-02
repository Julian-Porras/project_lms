import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { ToastComponent } from "../../components/Toast";
import { ButtonCancel, ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { LoadingPage } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/select";
import { ButtonCard } from "../../components/Card";
import ModuleNavComponent from "../../components/ModuleNav";
import { ModuleComponent } from "./ModuleComponent";
import { LuListStart } from "react-icons/lu";

function ClassModuleComponent({
    errors,
    isClassLoading,
    classData,
    handleChange,
    handleSubmit,
    credentials,
    setCredentials,
    isOpen,
    setIsOpen,
    message,
    toastShow,
    toastStatus,
    setToastShow,
    isSubmitting,
    ModuleNavData,
}) {
    return (
        <div className="flex flex-row ">
            <ToastComponent
                message={message}
                show={toastShow}
                setShow={setToastShow}
                toastStatus={toastStatus}
            />
            <ModuleNavComponent ModuleNavData={ModuleNavData} />
            {isClassLoading ? (<LoadingPage />) :
                <div className="flex flex-col w-full h-full ml-4">
                    <div className="flex flex-row items-center justify-between " >
                        <p className={style.title} >{classData?.classroom_name}</p>
                        <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Module</ButtonSecondary>
                    </div>
                    <DividerThin />
                    <div className="flex flex-row items-center justify-end">
                        <ButtonCard>
                            <LuListStart size={20} />
                        </ButtonCard>
                    </div>
                    <div className="flex flex-col gap-4 pt-4">
                        {classData?.modules?.length > 0 ? (
                            classData?.modules?.map((module) => (
                                <ModuleComponent key={module.id} title={module.module_name} />
                            ))
                        ) : (
                            <div className="flex flex-row items-center justify-center w-full h-full">
                                <p className="text-lg text-gray-500">No modules found</p>
                            </div>
                        )}
                    </div>
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Create Module"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="module_name">Module name:</label>
                                <InputText type={"text"} name={"module_name"} value={credentials.module_name} onChange={handleChange} placeholder={"type module name"} />
                                {errors?.module_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.module_name}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="is_visible">Visibility:</label>
                                <SelectOptions
                                    options={[{ id: true, name: "Visible" }, { id: false, name: "Hidden" }]}
                                    getOptionLabel={(option => option.name)}
                                    getOptionValue={(option => option.id)}
                                    name="is_visible"
                                    id="is_visible"
                                    selected={credentials.is_visible}
                                    setSelected={(e) => setCredentials({ ...credentials, is_visible: e })}
                                    placeholder="Select visibility"
                                />
                                {errors?.is_visible && (
                                    <p className="text-sm text-red-500 mt-1">
                                        &nbsp;{errors?.is_visible}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row gap-4 items-center justify-end mt-10">
                                <ButtonCreate type="submit" isDisable={isSubmitting}
                                    title={isSubmitting ? "Creating..." : "Create module"} />
                                <ButtonCancel type="button" method={() => setIsOpen(false)} />
                            </div>
                        </form>
                    </Modal>
                </div>
            }
        </div>
    );
}

export default ClassModuleComponent;