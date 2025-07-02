import useAxios from "../hooks/useAxios.js";

export default function StudentService() {
    const { AxiosAuth } = useAxios();

    const fetchStudentClassesApi = async ({ page, limit, signal, path }) => {
        const response = await AxiosAuth.get(`/api/${path}/class?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    };

    const fetchClassStudentsApi = async ({ page, limit, signal, path }) => {
        const response = await AxiosAuth.get(`/api/${path}/class?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    };

    return {
        fetchStudentClassesApi,
        fetchClassStudentsApi,
    }
}