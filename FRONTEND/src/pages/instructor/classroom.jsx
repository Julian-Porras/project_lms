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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function InstructorClassroomTab() {
    const queryClient = useQueryClient();
    const { fetchClassesApi, getCoursesByStatusApi, createClassApi } = useDeveloperApi();
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);

    const page = 1;
    const limit = 10;

    const [credentials, setCredentials] = useState({
        course_id: "",
        classroom_name: "",
        classroom_code: "",
        status: "active",
    });

    const { data: classData, isLoading: isClassesLoading, error: isClassError } = useQuery({
        queryKey: ["classes", page, limit],
        queryFn: ({ signal, queryKey }) => {
            const [, page, limit] = queryKey;
            return fetchClassesApi({ page, limit, signal });
        },
        keepPreviousData: true,
        staleTime: 300000, // 5 mins
        cacheTime: 600000, // 10 mins
        refetchOnWindowFocus: false,
    });

    const { data: courseData, isLoading: isCoursesLoading, error: isCourseError } = useQuery({
        queryKey: ["courses", page, limit],
        queryFn: ({ signal, queryKey }) => {
            return getCoursesByStatusApi({ signal });
        },
        keepPreviousData: true,
        staleTime: 300000, // 5 mins
        cacheTime: 600000, // 10 mins
        refetchOnWindowFocus: false,
    });

    const createClassMutation = useMutation({
        mutationFn: createClassApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            setMessage(res.message);
            setToastShow(true);
            setIsOpen(false);
        },
        onError: (err) => {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
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

    useEffect(() => {
        if (isOpen) {
            setCredentials({
                course_id: "",
                classroom_name: "",
                classroom_code: "",
                status: "active",
            });
            setErrors({});
            createClassMutation.reset();
        }
    }, [isOpen]);
    // useAbortEffect(async (signal) => {
    //     setPageLoading(true);
    //     fetchClasses(signal);
    // }, []);

    return (
        <>
            <ToastSuccessful message={message} show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Classroom</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className={style.gridWrapper}>
                {isClassesLoading ? <LoadingPage />
                    : classData?.data.length > 0 ? (
                        classData.data.map((classroom) => (
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
                            options={courseData || []}
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
                        <ButtonCreate type="submit" isDisable={createClassMutation.isPending}
                            title={createClassMutation.isPending ? "Creating..." : "Create classroom"} />
                        <ButtonCancel type="button" method={() => setIsOpen(false)} />
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default InstructorClassroomTab;