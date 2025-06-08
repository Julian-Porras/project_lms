import { useState, useEffect } from "react";
import useDeveloperApi from "../../api/developer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CourseComponent from "../components/Course";
import { useSearchParams } from "react-router-dom";
import ToastMessage from "../../util/toast-message";

function DevCoursePage() {
    const queryClient = useQueryClient();
    const { fetchCourses, createCourse } = useDeveloperApi();
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
        course_name: "",
        status: "",
    });

    const { data: coursesData, isLoading: isCoursesLoading, error: isCourseError } = useQuery({
        queryKey: ["courses", page, limit],
        queryFn: ({ signal, queryKey }) => {
            const [, page, limit] = queryKey;
            return fetchCourses({ page, limit, signal });
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createCourseMutation = useMutation({
        mutationFn: createCourse,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            setMessage(ToastMessage(res, "Module created successfully."));
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
        createCourseMutation.mutate(credentials, {
            onSettled: () => {
                setIsSubmitting(false);
            }
        });
    };

    useEffect(() => {
        if (isOpen) {
            setCredentials({
                course_name: "",
                status: "active",
            });
            setErrors({});
            createCourseMutation.reset();
        }
    }, [isOpen]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    useEffect(() => {
        if (coursesData?.last_page) {
            setPageInfo({
                totalPages: coursesData.last_page,
                totalRecords: coursesData.total,
                pageSize: coursesData.per_page,
            });
        }
    }, [coursesData]);

    return (
        <>
            <CourseComponent
                errors={errors}
                isCoursesLoading={isCoursesLoading}
                coursesData={coursesData?.data}
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
export default DevCoursePage;