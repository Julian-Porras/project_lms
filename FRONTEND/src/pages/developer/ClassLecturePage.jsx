import ClassLectureComponent from "../components/ClassLectureComponent";
import { devClassModuleRouter } from "../../router/developerRouter";
import useDeveloperApi from "../../api/developer";
import { useParams,useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../../context/uiContext";
import { useEffect, useState } from "react";
import { ROLES } from "../../constants/role";
import ToastMessage from "../../util/toast-message";
import { LoadingPage } from "../../components/Loading";

function ClassLecturePage() {
    const { editModuleItem, fetchModuleItem } = useDeveloperApi();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { lecture_id } = useParams();
    const { showToast, setIsBlocking, newBreadcrumb, resetBreadcrumbs, classroom } = useUI();
    const location = useLocation();

    const param = lecture_id;
    const base = location.pathname.split("/")[1];
    let routes = [];

    const [errors, setErrors] = useState({});
    const [isDirty, setIsDirty] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [content, setContent] = useState({
        item_name: "",
        item_content: "",
        is_visible: false,
        isCourse: false,
    });

    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devClassModuleRouter;
    }

    const ModuleNavData = {
        base: base,
        routes: devClassModuleRouter,
        param: classroom.classId,
        paramName: 'class_id'
    }

    const { data: contentData, isLoading: isContentLoading } = useQuery({
        queryKey: ["content", param],
        queryFn: ({ signal }) => fetchModuleItem({ item_id: param, signal }),
        enabled: !!param, 
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const editModuleItemMutation = useMutation({
        mutationFn: ({ item_id, credentials }) => editModuleItem({ item_id, credentials }),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["content"] });
            showToast(ToastMessage("Changes saved successfully."), 200);
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
        setContent((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);
        editModuleItemMutation.mutate(
            { item_id: param, credentials: content },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    useEffect(() => {
        if (!contentData) return;

        setContent({
            item_name: contentData.item_name ?? "",
            item_content: contentData.item_content ?? "",
            is_visible: contentData.is_visible ?? false,
            isCourse: contentData.course_id ?? false,
        });

        resetBreadcrumbs();
        newBreadcrumb("Classroom", `/classroom`, false);
        newBreadcrumb(classroom.className, `/classroom/${classroom.classId}/m`, false);
        newBreadcrumb(contentData.item_name, `/classroom/${classroom.classId}/m/${param}`, true);
    }, [contentData, param]);

    return (
        <ClassLectureComponent
            errors={errors}
            isSubmitting={isSubmitting}
            isContentLoading={isContentLoading}
            content={content}
            setContent={setContent}
            ModuleNavData={ModuleNavData}
            handleChange={handleChange}
            handleEditSubmit={handleEditSubmit}
        />
    );
}
export default ClassLecturePage;