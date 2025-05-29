import { useEffect, useState } from "react";
import useDeveloperApi from "../../api/developer";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassModuleComponent from "../components/ClassModule";
import ToastMessage from "../../util/toast-message";

function DevClassModulePage() {
    const { createClassModuleApi, fetchClassApi } = useDeveloperApi();
    const queryClient = useQueryClient();
    const { course_id } = useParams();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const [toastStatus, setToastStatus] = useState(200);
    const param = course_id;
    const [credentials, setCredentials] = useState({
        classroom_id: param,
        module_name: "",
        is_visible: true,
    });

    const { data: classData, isLoading: isClassLoading, error: isClassError } = useQuery({
        queryKey: ["class-module", param],
        queryFn: ({ signal, queryKey }) => {
            return fetchClassApi(param, signal);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createModuleMutation = useMutation({
        mutationFn: createClassModuleApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
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
        <ClassModuleComponent
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
        />
    );
}

export default DevClassModulePage;