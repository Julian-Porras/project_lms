import { useEffect, useState } from "react";
import useDeveloperApi from "../../api/developer";
import { useLocation, useResolvedPath, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassModuleComponent from "../components/ClassModule";
import ToastMessage from "../../util/toast-message";
import { devClassModuleRouter } from "../../router/developerRouter";
import { useAuth } from "../../context/authContext";
import { ROLES } from "../../constants/role";
import { useUI } from "../../context/uiContext";

function DevClassModulePage() {
    const { createModule, editModule, createModuleItem, fetchClass } = useDeveloperApi();
    const { showToast, newBreadcrumb, resetBreadcrumbs, setClassroom } = useUI();
    const { user } = useAuth();
    const { class_id } = useParams();
    const queryClient = useQueryClient();
    const location = useLocation();

    const param = class_id;
    const base = location.pathname.split("/")[1];
    const baseBread = useResolvedPath(".").pathname;
    let routes = [];

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenContent, setOpenContent] = useState(false);
    const [isOpenEdit, setOpenEdit] = useState(false);
    const [isOpenOrder, setOpenOrder] = useState(false);
    const [groupView, setGroupView] = useState(false);
    const [moduleId, setModuleId] = useState();
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

    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devClassModuleRouter;
    }

    const ModuleNavData = {
        base: base,
        routes: routes,
        param: param,
        paramName: 'class_id',
    }

    const { data: classData, isLoading: isClassLoading, error: isClassError } = useQuery({
        queryKey: ["class-module", param],
        queryFn: ({ signal, queryKey }) => {
            return fetchClass({ class_id: param, signal });
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const createModuleMutation = useMutation({
        mutationFn: createModule,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
            showToast(ToastMessage(res, "Module created successfully."), 200);
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

    const editModuleMutation = useMutation({
        mutationFn: ({ module_id, credentials }) => editModule({ module_id, credentials }),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
            showToast(ToastMessage(res, "Update module successfully."), 200);
            setOpenEdit(false);
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

    const createModuleContentMutation = useMutation({
        mutationFn: createModuleItem,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["class-module"] });
            showToast(ToastMessage(res, "Content created successfully."), 200);
            setOpenContent(false);
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
            { module_id: moduleId, credentials: credentials },
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
                item_type: "",
                is_visible: "",
            }));
        }

        if (classData && param) {
            setClassroom(prev => ({ ...prev,className: classData.classroom_name, classId: param}));
            resetBreadcrumbs();
            newBreadcrumb("Classroom", `/classroom`, false);
            newBreadcrumb(classData.classroom_name, `/classroom/${param}/m`, true);
        }

    }, [moduleId, isOpen, isOpenContent, isOpenEdit, param, classData]);


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