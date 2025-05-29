import { useEffect, useState } from "react";
import style from "../../styles/page.module.css";
import useDeveloperApi from "../../api/developer";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ToastSuccessful } from "../../components/Toast";
import { ButtonCancel, ButtonCreate, ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { LoadingPage } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/select";
import { ClassModuleCard, ModuleNavCard } from "../../components/Card";
import ModuleNav from "../../components/ModuleNav";

function ClassModulePage() {
    const { createClassModuleApi, fetchClassApi, errors, loading, setErrors } = useDeveloperApi();
    const { class_id } = useParams();
    const [pageLoading, setPageLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [modules, setModules] = useState([]);
    const [classes, setClasses] = useState({});
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const param = class_id;
    const [credentials, setCredentials] = useState({
        classroom_id: param,
        module_name: "",
        is_visible: true,
    });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createClassModuleApi(credentials);
        if (res) {
            setIsOpen(false);
            setToastShow(true);
            setMessage(res.message);
            setModules((prev) => [...prev, res.module]);
        }
    };

    const fetchClassModules = async () => {
        const classroom = await fetchClassApi(class_id);
        if (classroom) {
            setClasses(classroom);
            setModules(classroom.modules);
        }
        setPageLoading(false);
    }

    useEffect(() => {
        if (isOpen && param) {
            setCredentials((prev) => ({
                ...prev, 
                classroom_id: param,
                module_name: "",
                is_visible: true,
            }));
        }
    }, [isOpen, param]);

    useEffect(() => {
        setPageLoading(true);
        setErrors({});
        fetchClassModules();
    }, []);

    return (
        <div className="flex flex-row h-full">
                <ToastSuccessful message={message} show={toastShow} setShow={setToastShow} />
                <ModuleNav />
                {pageLoading ? (<LoadingPage />) :
                    <div className="flex flex-col w-full h-full ml-4">
                        <div className="flex flex-row items-center justify-between " >
                            <p className={style.title} >{classes.classroom_name}</p>
                            <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Module</ButtonSecondary>
                        </div>
                        <DividerThin />
                        <div className="flex flex-col gap-4 pt-5">
                            {modules.length > 0 ? (
                                modules.map((module) => (
                                    <ClassModuleCard key={module.id} >
                                        <p className={style.moduleTitle}>{module.module_name}</p>
                                    </ClassModuleCard>
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
                                    <ButtonCreate type="submit" isDisable={loading} 
                                    title={loading ? "Creating..." : "Create module"} />
                                    <ButtonCancel type="button" method={() => setIsOpen(false)} />
                                </div>
                            </form>
                        </Modal>
                    </div>
                }
        </div>
    );
}

export default ClassModulePage;