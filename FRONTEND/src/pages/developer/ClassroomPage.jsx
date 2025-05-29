import { useState, useEffect } from "react";
import useDeveloperApi from "../../api/developer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassroomComponent from "../components/classroom";
import { useSearchParams } from "react-router-dom";
import ToastMessage from "../../util/toast-message";

function DevClassroomPage() {
    const queryClient = useQueryClient();
    const { fetchClassesApi, getCoursesByStatusApi, createClassApi } = useDeveloperApi();
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const [toastStatus, setToastStatus] = useState(200);
    const [searchParams, setSearchParams] = useSearchParams();
    const [limit, setLimit] = useState(5);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        totalRecords: 0,
        pageSize: 0,
    });
    const page = parseInt(searchParams.get("page")) || 1;
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };
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
        // staleTime: 300000, // 5 mins
        refetchOnWindowFocus: false,
    });

    const { data: courseData, isLoading: isCoursesLoading, error: isCourseError } = useQuery({
        queryKey: ["status", page, limit],
        queryFn: ({ signal, queryKey }) => {
            return getCoursesByStatusApi({ signal });
        },
        keepPreviousData: true,
        // staleTime: 300000, // 5 mins
        // cacheTime: 600000, // 10 mins
        refetchOnWindowFocus: false,
    });

    const createClassMutation = useMutation({
        mutationFn: createClassApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            setMessage(ToastMessage(res, "Class created successfully."));
            setToastShow(true);
            setToastStatus(200);
            setIsOpen(false);
        },
        onError: (err) => {
            if (err.response?.status >= 500) {
                setMessage(ToastMessage(err));
                setToastShow(true);
                setToastStatus(err.response?.status || 500);
            }
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
        setErrors({});
        setIsSubmitting(true);
        createClassMutation.mutate(credentials, {
            onSettled: () => {
                setIsSubmitting(false);
            }
        });
    };

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    useEffect(() => {
        if (classData?.last_page) {
            setPageInfo({
                totalPages: classData.last_page,
                totalRecords: classData.total,
                pageSize: classData.per_page,
            });
        }
    }, [classData]);

    return (
        <>
            <ClassroomComponent
                errors={errors}
                isClassesLoading={isClassesLoading}
                classData={classData?.data}
                isCoursesLoading={isCoursesLoading}
                courseData={courseData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                credentials={credentials}
                setCredentials={setCredentials}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message={message}
                toastShow={toastShow}
                toastStatus={toastStatus}
                setToastShow={setToastShow}
                isSubmitting={isSubmitting}
                page={page}
                setPage={handlePageChange}
                totalPages={pageInfo.totalPages}
                totalRecords={pageInfo.totalRecords}
                pageSize={pageInfo.pageSize}
            />
        </>
    )
}
export default DevClassroomPage;