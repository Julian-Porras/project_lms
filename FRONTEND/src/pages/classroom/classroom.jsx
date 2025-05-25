import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import { ToastSuccessful } from "../../components/Toast";
import useDeveloperApi from "../../api/developer";
import SelectOptions from "../../components/select";
import { LoadingPage } from "../../components/Loading";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function InstructorClassroomTab() {
    const queryClient = useQueryClient();
    // const { fetchClassesApi, getCoursesByStatusApi, createClassApi, errors, loading, setErrors } = useDeveloperApi();
    const [isOpen, setIsOpen] = useState(false);
    // const [classes, setClasses] = useState([]);
    // const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    // const [pageLoading, setPageLoading] = useState(true);
    const [toastShow, setToastShow] = useState(false);

    const [credentials, setCredentials] = useState({
        course_id: "",
        classroom_name: "",
        classroom_code: "",
        status: "active",
    });

    const {
        data: classesData,
        isLoading: classesLoading,
        error: classesError,
    } = useQuery({
        queryKey: ['classes', 1, 10],
        queryFn: fetchClassesApi,
    });
    
    const {
        data: courses,
        isLoading: coursesLoading,
        error: coursesError,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });

    const createClassMutation = useMutation({
        mutationFn: createClassApi,
        onSuccess: (res) => {
            setToastShow(true);
            setMessage(res.message);
            setIsOpen(false);
            queryClient.invalidateQueries(['classes']); // Refetch class list
        },
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createClassMutation.mutate(credentials);
    };

    // const handleChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const res = await createClassApi(credentials);
    //     if (res) {
    //         setIsOpen(false);
    //         setToastShow(true);
    //         setMessage(res.message);
    //         setClasses((prevclass) => [...prevclass, res.class]);
    //     }
    // };

    // const fetchClasses = async (signal) => {
    //     try {
    //         const classroom = await fetchClassesApi(signal, 1, 10);
    //         if (classroom) setClasses(classroom.data);
    //         const courses = await getCoursesByStatusApi(signal);
    //         if (courses) setCourses(courses);
    //     } finally {
    //         if (!signal.aborted) {
    //             setPageLoading(false);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     setPageLoading(true);
    //     setErrors({});
    //     fetchClasses(signal);

    //     return () => {
    //         controller.abort();
    //     };
    // }, []);

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

    if (classesLoading || coursesLoading) return <div>Loading...</div>;
    if (classesError || coursesError) return <div>Error loading data.</div>;
    const classes = classesData?.data ?? [];

    return (
        <>
            <ToastSuccessful message={message} show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Classroom</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className={style.gridWrapper}>
                {pageLoading ? <LoadingPage />
                    : classes.length > 0 ? (
                        classes.map((classroom) => (
                            <ClassCard route={`${classroom.id}/m`} key={classroom.id}>
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
                        <ButtonCreate type="submit" isDisable={loading} title={"Create classroom"} />
                        <ButtonCancel type="button" method={() => setIsOpen(false)} />
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default InstructorClassroomTab;