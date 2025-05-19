import { useEffect, useState } from "react";
import style from "../../styles/page.module.css";
import useDeveloperApi from "../../api/developer";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ToastSuccesful from "../../components/Toast";
import { ButtonSecondary } from "../../components/Button";
import { DividerThin } from "../../components/Divider";
import { LoadingPage } from "../../components/Loading";

function ClassModulePage() {
    const { fetchClassApi, errors, loading, setErrors } = useDeveloperApi();
    const [pageLoading, setPageLoading] = useState(true);
    const [modules, setModules] = useState([]);
    const [classes, setClasses] = useState({});
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const { class_id } = useParams();

    const fetchClassModules = async () => {
        const classroom = await fetchClassApi(class_id);
        if (classroom) {
            setClasses(classroom);
            setModules(classroom.modules);
        }
        setPageLoading(false);
    }

    useEffect(() => {
        setPageLoading(true);
        setErrors({});
        fetchClassModules();
    }, []);

    return (
        <>
            <ToastSuccesful message={message} show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >{classes.classroom_name}</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Module</ButtonSecondary>
            </div>
            <DividerThin />
            <div className="flex flex-col gap-4">
                {pageLoading ? 
                    <LoadingPage />
                : modules.length > 0 ? (
                    modules.map((module) => (
                        <div key={module.id} className="p-4 border rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">{module.module_name}</h2>
                            <p>{module.description}</p>
                        </div>
                    ))
                )
                : (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No modules found</p>
                    </div>
                )}
            </div>
            
        </>
    );
}

export default ClassModulePage;