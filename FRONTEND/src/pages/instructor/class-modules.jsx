import { useEffect, useState } from "react";
import useDeveloperApi from "../../api/developer";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassModuleComponent from "../components/ClassModule";

function ClassModulePage() {
    const { createClassModuleApi, fetchClassApi } = useDeveloperApi();
    const queryClient = useQueryClient();
    const { class_id } = useParams();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const param = class_id;
    const [credentials, setCredentials] = useState({
        classroom_id: param,
        module_name: "",
        is_visible: true,
    });

    const { data: classData, isLoading: isClassLoading, error: isClassError } = useQuery({
        queryKey: ["class-module", class_id],
        queryFn: ({ signal, queryKey }) => {
            return fetchClassApi(class_id, signal);
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createModuleMutation = useMutation({
        mutationFn: createClassModuleApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
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
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            setToastShow={setToastShow}
            isSubmitting={isSubmitting}
        />
    );
}

export default ClassModulePage;