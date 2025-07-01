import { useParams } from "react-router-dom";
import useDeveloperApi from "../../api/developer";
import ClassPeopleComponent from "../components/PeopleComponent";
import { useQueryClient,useQuery } from "@tanstack/react-query";


function DevClassPeoplePage() {
    const { fetchClassInfo } = useDeveloperApi();
    const { class_id } = useParams();
    const queryClient = useQueryClient();


    const param = class_id;
    const { data: classData, isLoading: isClassLoading, error: isClassError } = useQuery({
        queryKey: ["class-info", param],
        queryFn: ({ signal, queryKey }) => {
            return fetchClassInfo({ class_id: param, signal });
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });


    return (
        <ClassPeopleComponent
            classData={classData}
            isClassLoading={isClassLoading}
        />
    )
}
export default DevClassPeoplePage;