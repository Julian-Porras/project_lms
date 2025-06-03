import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { ToastComponent } from "../../components/Toast";
import { ButtonCancel, ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerDashed, DividerThin } from "../../components/Divider";
import { LoadingPage } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/select";
import { ButtonCard } from "../../components/Card";
import { ModuleNavComponent, ModuleStatusComponent } from "./ModuleNav";
import { ModuleComponent } from "./ModuleComponent";
import { LuListStart } from "react-icons/lu";
import { SwitchComponent } from "../../components/Switch";
import { CONTENT } from "../../constants/content";

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
    isOpenContent,
    setOpenContent,
    isOpenOrder,
    setOpenOrder,
    isOpenEdit,
    setOpenEdit,
    contentCredentials,
    setContentCredentials,
    handleContentChange,
    handleContentSubmit,
    setModuleId,
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
                <div className="flex flex-col w-full h-full mx-5">
                    <div className="flex flex-row items-center justify-between " >
                        <p className={style.title} >{classData?.classroom_name}</p>
                        <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Module</ButtonSecondary>
                    </div>
                    <DividerThin />
                    <div className="flex flex-row items-center justify-end gap-4">
                        <SwitchComponent label={"Grouped View"} />
                        <ButtonCard>
                            <LuListStart size={20} />
                        </ButtonCard>
                    </div>
                    <div className="flex flex-col gap-2 py-3">
                        {classData?.modules?.length > 0 ? (
                            classData?.modules?.map((module, index) => (
                                <>
                                    <ModuleComponent
                                        key={module.id}
                                        isVisible={module.is_visible}
                                        title={module.module_name}
                                        setOpenContent={setOpenContent}
                                        setOpenEdit={setOpenEdit}
                                        contentData={module.module_items}
                                        module_id={module.id}
                                        setModuleId={setModuleId}
                                    />
                                    {index !== classData.modules.length - 1 && <DividerDashed />}
                                </>
                            ))
                        ) : (
                            <div className="flex flex-row items-center justify-center w-full h-full">
                                <p className="text-lg text-gray-500">No modules found</p>
                            </div>
                        )}
                    </div>
                </div>
            }
            <ModuleStatusComponent />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Module"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="module_name">Module name:</label>
                        <InputText type={"text"} name={"module_name"} value={credentials.module_name} onChange={handleChange} placeholder={"Type module name"} />
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
            <Modal
                isOpen={isOpenContent}
                title="Add Content"
                onClose={() => setOpenContent(false)}
            >
                <form onSubmit={handleContentSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="item_name">Content name:</label>
                        <InputText type={"text"} name={"item_name"} value={contentCredentials.item_name} onChange={handleContentChange} placeholder={"Type module name"} />
                        {errors?.item_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.item_name}</p>}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="is_visible">Type:</label>
                        <SelectOptions
                            options={
                                Object.entries(CONTENT).map(([key, value]) => ({
                                    id: value,
                                    name: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
                                }))
                            }
                            getOptionLabel={(option => option.name)}
                            getOptionValue={(option => option.id)}
                            name="is_visible"
                            id="is_visible"
                            selected={contentCredentials.item_type}
                            setSelected={(e) => setContentCredentials({ ...contentCredentials, item_type: e })}
                            placeholder="Select content type"
                        />
                        {errors?.is_visible && (
                            <p className="text-sm text-red-500 mt-1">
                                &nbsp;{errors?.is_visible}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="is_visible">Visibility:</label>
                        <SelectOptions
                            options={[{ id: true, name: "Visible" }, { id: false, name: "Hidden" }]}
                            getOptionLabel={(option => option.name)}
                            getOptionValue={(option => option.id)}
                            name="is_visible"
                            id="is_visible"
                            selected={contentCredentials.is_visible}
                            setSelected={(e) => setContentCredentials({ ...contentCredentials, is_visible: e })}
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
                            title={isSubmitting ? "Creating..." : "Create content"} />
                        <ButtonCancel type="button" method={() => setOpenContent(false)} />
                    </div>
                </form>

            </Modal>
            <Modal
                isOpen={isOpenEdit}
                title="Edit Module"
                onClose={() => setOpenEdit(false)}
            >

            </Modal>
            <Modal
                isOpen={isOpenOrder}
                title="Reorder modules"
                onClose={() => setOpenOrder(false)}
            >

            </Modal>
        </div>
    );
}

export default ClassModuleComponent;