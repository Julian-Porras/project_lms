import LectureComponent from "../components/LectureComponent";
import { devClassModuleRouter } from "../../router/developerRouter";
import useDeveloperApi from "../../api/developer";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUI } from "../../context/uiContext";

function LecturePage() {
    const { editModuleItem } = useDeveloperApi();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { id } = useParams();

    const param = id;

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [content, setContent] = useState({
        item_name: "",
        item_content: "",
        is_visible: false,
    });

    if (user?.role_id === ROLES.DEVELOPER) {
        routes = devClassModuleRouter;
    }

    const ModuleNavData = {
        base: "developer",
        routes: devClassModuleRouter,
        param: param,
    }

    const editModuleItemMutation = useMutation({
        mutationFn: ({ item_id, credentials }) => editModuleItem({ item_id, credentials }),
        onSuccess: (res) => {
            // queryClient.invalidateQueries({ queryKey: ["class-module"] });
            showToast(ToastMessage(res, "Updated successfully."), 200);
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

    return (
        <LectureComponent
            errors={errors}
            isSubmitting={isSubmitting}
            content={content}
            setContent={setContent}
            ModuleNavData={ModuleNavData}
            handleChange={handleChange}
            handleEditSubmit={handleEditSubmit}
        />
    );
}
export default LecturePage;