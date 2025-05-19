import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/select";
import useDeveloperApi from "../../api/developer";
import ToastSuccesful from "../../components/Toast";
import { LoadingPage } from "../../components/Loading";


function InstructorCourseTab() {
    const [isOpen, setIsOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [toastShow, setToastShow] = useState(false);
    const { createCourseApi, errors, loading, setErrors, getCoursesApi } = useDeveloperApi();
    const [credentials, setCredentials] = useState({
        course_name: "",
        status: "",
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createCourseApi(credentials);
        if (res) {
            setIsOpen(false);
            setToastShow(true);
            
        }
    };

    const fetchCourses = async () => {
        const res = await getCoursesApi(1, 10, 'all'); // page, limit, status
        if (res) setCourses(res.data); 
        setPageLoading(false);
    };
    useEffect(() => {
        setPageLoading(true);
        setErrors({});
        fetchCourses();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setCredentials({
                course_name: "",
                status: "active",
            });
        }
    }, [isOpen]);

    return (
        <>
            <ToastSuccesful message="Course created successfully!" show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Course</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Course</ButtonSecondary>
            </div>
            <DividerThin />
            <div className="flex flex-row flex-wrap gap-4 pt-5">
                {pageLoading ? 
                    <LoadingPage />
                : courses.length > 0 ? (
                    courses.map((course) => (
                        <ClassCard route={course.id} key={course.id}>
                            <p>{course.course_name}</p>
                        </ClassCard>
                    ))
                ) : (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No courses found</p>
                    </div>
                )}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Course"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="course_name">Course name:</label>
                        <InputText type={"text"} name={"course_name"} value={credentials.course_name} onChange={handleChange} placeholder={"type course name"} />
                        {errors?.course_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.course_name}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="status">Status:</label>
                        <SelectOptions
                            id="status"
                            options={[{ id: 'active', name: "Open" }, { id: 'not-active', name: "Close" }]}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            name="status"
                            selected={credentials.status}
                            setSelected={(value) => setCredentials({ ...credentials, status: value })}
                        />
                        {errors?.status && <p className="text-sm text-red-500 mt-1">&nbsp;{errors?.status}</p>}
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-end mt-10">
                        <ButtonCreate type="submit" disabled={loading} >
                            {loading ? "Creating..." : "Create course"}
                        </ButtonCreate>
                        <ButtonCancel method={() => setIsOpen(false)} >
                            {"Cancel"}
                        </ButtonCancel>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default InstructorCourseTab;