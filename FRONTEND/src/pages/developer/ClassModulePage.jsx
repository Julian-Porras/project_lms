import { useEffect, useState } from "react";
import useDeveloperApi from "../../api/developer";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassModuleComponent from "../components/ClassModule";
import ToastMessage from "../../util/toast-message";
import { devClassModuleRouter } from "../../router/developerRouter";
import { useAuth } from "../../context/authContext";
import { ROLES } from "../../constants/role";

function DevClassModulePage() {
    const { createClassModuleApi, editModuleApi, createModuleItemApi, fetchClassApi } = useDeveloperApi();
    const { user } = useAuth();
    const { class_id } = useParams();
    const queryClient = useQueryClient();
    const location = useLocation();

    const param = class_id;
    const base = location.pathname.split("/")[1];
    let routes = [];

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenContent, setOpenContent] = useState(false);
    const [isOpenEdit, setOpenEdit] = useState(false);
    const [isOpenOrder, setOpenOrder] = useState(false);
    const [groupView, setGroupView] = useState(false);
    const [moduleId, setModuleId] = useState();
    const [message, setMessage] = useState("");
    const [toastShow, setToastShow] = useState(false);
    const [toastStatus, setToastStatus] = useState(200);
    const [credentials, setCredentials] = useState({
        classroom_id: param,
        module_name: "",
        is_visible: "",
    });
    const [contentCredentials, setContentCredentials] = useState({
        classroom_id: param,
        module_id: null,
        item_name: "",
        item_type: "",
        is_visible: "",
    });
console.log(groupView);

    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devClassModuleRouter;
    }

    const ModuleNavData = {
        base: base,
        routes: routes,
        param: param,
    }

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
            setMessage(ToastMessage("Module created successfully."));
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

    const editModuleMutation = useMutation({
        mutationFn: ({ module_id, data }) => editModuleApi(module_id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
            setMessage(ToastMessage("Update module successfully."));
            setToastShow(true);
            setToastStatus(200);
            setOpenEdit(false);
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

    const createModuleContentMutation = useMutation({
        mutationFn: createModuleItemApi,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
            setMessage(ToastMessage("Content created successfully."));
            setToastShow(true);
            setToastStatus(200);
            setOpenContent(false);
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

    const handleViewChange = () => {
        setGroupView((prev) => (!prev));
    };

    const handleContentChange = (e) => {
        setContentCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        editModuleMutation.mutate(
            { module_id: moduleId, data: credentials },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const handleContentSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        createModuleContentMutation.mutate(contentCredentials, {
            onSettled: () => {
                setIsSubmitting(false);
            }
        });
    };

    useEffect(() => {
        if (moduleId !== null) {
            setContentCredentials(prev => ({
                ...prev, module_id: moduleId
            }));
        }

        if (isOpen && param) {
            setCredentials(prev => ({
                ...prev,
                classroom_id: param,
                module_name: "",
                is_visible: "",
            }));
            setErrors({});
            // createModuleMutation.reset();
        }

        if (isOpenEdit && param) {
            setCredentials(prev => ({
                ...prev,
                classroom_id: param,
            }));
            setErrors({});
            createModuleMutation.reset();
        }

        if (isOpenContent) {
            setErrors({});
            setContentCredentials(prev => ({
                ...prev,
                item_name: "",
                is_visible: "",
            }));
        }

    }, [moduleId, isOpen, isOpenContent, isOpenEdit, param]);

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
            ModuleNavData={ModuleNavData}
            isOpenContent={isOpenContent}
            setOpenContent={setOpenContent}
            contentCredentials={contentCredentials}
            setContentCredentials={setContentCredentials}
            handleContentChange={handleContentChange}
            handleContentSubmit={handleContentSubmit}
            isOpenOrder={isOpenOrder}
            setOpenOrder={setOpenOrder}
            isOpenEdit={isOpenEdit}
            setOpenEdit={setOpenEdit}
            setModuleId={setModuleId}
            handleEditSubmit={handleEditSubmit}
            groupView={groupView}
            handleViewChange={handleViewChange}
        />
    );
}

export default DevClassModulePage;