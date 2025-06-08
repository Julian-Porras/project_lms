import { useEffect, useState } from "react";
import useDeveloperApi from "../../api/developer";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ToastMessage from "../../util/toast-message";
import CourseModuleComponent from "../components/CourseModule";
import { useAuth } from "../../context/authContext";
import { ROLES } from "../../constants/role";
import { devCourseModuleRouter } from "../../router/developerRouter";

function DevCourseModulePage() {
    const { createClassModuleApi, fetchClassApi } = useDeveloperApi();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { course_id } = useParams();
    const location = useLocation();

    const param = course_id;
    const base = location.pathname.split("/")[1];
    let routes = [];

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const [toastStatus, setToastStatus] = useState(200);
    const [credentials, setCredentials] = useState({
        course_id: param,
        module_name: "",
        is_visible: true,
    });
    const [contentCredentials, setContentCredentials] = useState({
        classroom_id: param,
        module_id: null,
        item_name: "",
        item_type: "",
        is_visible: "",
    });

    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devCourseModuleRouter;
    }

    const ModuleNavData = {
        base: base,
        routes: routes,
        param: param,
    }

    const { data: classData, isLoading: isClassLoading, error: isClassError } = useQuery({
        queryKey: ["course-module", param],
        queryFn: ({ signal, queryKey }) => {
            return fetchClassApi(param, signal);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createModuleMutation = useMutation({
        mutationFn: createClassModuleApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["course-module"] });
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
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        createModuleMutation.mutate(credentials, {
            onSettled: () => {
                setIsSubmitting(false);
            }
        });
    };

    useEffect(() => {
        if (isOpen && param) {
            setCredentials((prev) => ({
                ...prev,
                classroom_id: param,
                module_name: "",
                is_visible: true,
            }));
            setErrors({});
            createModuleMutation.reset();
        }
    }, [isOpen, param]);

    return (
        <CourseModuleComponent
            errors={errors}
            isClassLoading={isClassLoading}
            classData={classData}
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
            ModuleNavData={ModuleNavData}
        />
    );
}

export default DevCourseModulePage;