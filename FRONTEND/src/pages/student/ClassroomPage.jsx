import StudentClassroomComponent from "./components/Classroom.jsx";
import {useQuery} from "@tanstack/react-query";

function StudentClassroomTab() {

    // const { data: classData, isLoading: isClassesLoading, error: isClassError } = useQuery({
    //     queryKey: ["classes", page, limit],
    //     queryFn: ({ signal, queryKey }) => {
    //         const [, page, limit] = queryKey;
    //         return fetchClasses({ page, limit, signal });
    //     },
    //     // keepPreviousData: true,
    //     // staleTime: 300000, // 5 mins
    //     refetchOnWindowFocus: false,
    // });

    return (
        <StudentClassroomComponent />
    )
}
export default StudentClassroomTab;