import { useState, useEffect } from "react";
import useDeveloperApi from "../../api/developer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassroomComponent from "../components/classroom";
import { useNavigate, useSearchParams } from "react-router-dom";
import ToastMessage from "../../util/toast-message";
import { ToastComponent } from "../../components/Toast";
import { useUI } from "../../context/uiContext";

function DevClassroomPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast, newBreadcrumb, resetBreadcrumbs } = useUI();
    const { fetchClasses, fetchCoursesByStatus, createClass } = useDeveloperApi();

    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [limit, setLimit] = useState(10);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        totalRecords: 0,
        pageSize: 0,
    });
    const [credentials, setCredentials] = useState({
        course_id: "",
        classroom_name: "",
        classroom_code: "",
        status: "active",
    });
    const page = parseInt(searchParams.get("page")) || 1;
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const { data: classData, isLoading: isClassesLoading, error: isClassError } = useQuery({
        queryKey: ["classes", page, limit],
        queryFn: ({ signal, queryKey }) => {
            const [, page, limit] = queryKey;
            return fetchClasses({ page, limit, signal });
        },
        // keepPreviousData: true,
        // staleTime: 300000, // 5 mins
        refetchOnWindowFocus: false,
    });

    const { data: courseData, isLoading: isCoursesLoading, error: isCourseError } = useQuery({
        queryKey: ["status"],
        queryFn: ({ signal, queryKey }) => {
            return fetchCoursesByStatus({ signal });
        },
        keepPreviousData: true,
        // staleTime: 300000, // 5 mins
        // cacheTime: 600000, // 10 mins
        refetchOnWindowFocus: false,
    });

    const createClassMutation = useMutation({
        mutationFn: createClass,
        onSuccess: (res) => {
            // queryClient.invalidateQueries({ queryKey: ["classes"] });
            showToast(ToastMessage(res, "Class created successfully."), 200);
            setIsOpen(false);
        },
        onError: (err) => {
            if (err.response?.status >= 500) {
                showToast(ToastMessage(err), err.response?.status || 500);
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
            onSettled: (res) => {
                setIsSubmitting(false);
                navigate(`${res.class.id}/m`);
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

        if (page !== undefined) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (classData?.last_page) {
            setPageInfo({
                totalPages: classData.last_page,
                totalRecords: classData.total,
                pageSize: classData.per_page,
            });
        }
    }, [isOpen, page, classData]);

    useEffect(() => {
        resetBreadcrumbs();
        newBreadcrumb("Classroom", "/classroom", true);
    }, [newBreadcrumb, resetBreadcrumbs]);

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
                isSubmitting={isSubmitting}
                page={page}
                setPage={handlePageChange}
                totalPages={pageInfo.totalPages}
                totalRecords={pageInfo.totalRecords}
                pageSize={pageInfo.pageSize}
                limit={limit}
                setLimit={setLimit}
            />
        </>
    )
}
export default DevClassroomPage;