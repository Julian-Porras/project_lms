import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import ToastSuccesful from "../../components/Toast";
import useDeveloperApi from "../../api/developer";
import SelectOptions from "../../components/select";
import { LoadingPage } from "../../components/Loading";


function InstructorClassroomTab() {
    const { fetchClassesApi, getCoursesByStatusApi, createClassApi, errors, loading, setErrors } = useDeveloperApi();
    const [isOpen, setIsOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [toastShow, setToastShow] = useState(false);

    const [credentials, setCredentials] = useState({
        course_id: "",
        classroom_name: "",
        classroom_code: "",
        status: "active",
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createClassApi(credentials);
        if (res) {
            setIsOpen(false);
            setToastShow(true);
            setMessage(res.message);
            setClasses((prevclass) => [...prevclass, res.class]);
        }
    };

    const fetchClasses = async () => {
        const classroom = await fetchClassesApi(1, 10);
        if (classroom) setClasses(classroom.data);
        setPageLoading(false);
    };

    const fetchCourses = async () => {
        const courses = await getCoursesByStatusApi();
        if (courses) setCourses(courses);
    }

    useEffect(() => {
        setPageLoading(true);
        setErrors({});
        fetchClasses();
        fetchCourses();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setCredentials({
                course_id: "",
                classroom_name: "",
                classroom_code: "",
                status: "active",
            });
        }
    }, [isOpen]);

    return (
        <>
            <ToastSuccesful message={message} show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Classroom</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className="flex flex-row flex-wrap gap-4 pt-5">
                {pageLoading ? <LoadingPage />
                : classes.length > 0 ? (
                    classes.map((classroom) => (
                        <ClassCard route={classroom.id} key={classroom.id}>
                            <p>{classroom.classroom_name}</p>
                        </ClassCard>
                    ))
                ) : (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No classroom found</p>
                    </div>
                )}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Classroom"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="classroom_name">Classroom name:</label>
                        <InputText type={"text"} name={"classroom_name"} value={credentials.classroom_name} onChange={handleChange} placeholder={"type class name"} />
                        {errors?.classroom_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.classroom_name}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="classroom_code">Classroom code:</label>
                        <InputText type={"text"} name={"classroom_code"} value={credentials.classroom_code} onChange={handleChange} placeholder={"type class code"} />
                        {errors?.classroom_code && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.classroom_code}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="course_id">Select course/subject:</label>
                        <SelectOptions
                            options={courses || []}
                            getOptionLabel={(course) => course.course_name}
                            getOptionValue={(course) => course.id}
                            name="course_id"
                            id="course_id"
                            selected={credentials.course_id}
                            setSelected={(e) => setCredentials({ ...credentials, course_id: e })}
                            placeholder="Select course"
                        />
                        {errors?.course_id && (
                            <p className="text-sm text-red-500 mt-1">
                                &nbsp;{errors?.course_id}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-end mt-10">
                        <ButtonCreate type="submit" disabled={loading} >
                            {loading ? "Creating..." : "Create classroom"}
                        </ButtonCreate>
                        <ButtonCancel type="button" method={() => setIsOpen(false)} >
                            {"Cancel"}
                        </ButtonCancel>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default InstructorClassroomTab;