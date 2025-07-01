import useAxios from '../hooks/useAxios';

export default function ClassroomService() {
    const { AxiosAuth } = useAxios();

    const fetchClassesApi = async ({ page, limit, signal }) => {
        const response = await AxiosAuth.get(`/api/d/class?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    };

    const fetchClassApi = async ({ class_id, signal }) => {
        const response = await AxiosAuth.get(`/api/d/class/${class_id}`, {
            signal,
        });
        return response.data;
    };

    const fetchClassInfoApi = async ({ class_id, signal }) => {
        const response = await AxiosAuth.get(`/api/d/class/${class_id}/info`, {
            signal,
        });
        return response.data;
    };

    const createClassApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/create-class`, credentials);
        return response.data;
    };

    const editClassApi = async ({ class_id, credentials }) => {
        const response = await AxiosAuth.post(`/api/d/edit-class/${class_id}`, credentials);
        return response.data;
    }

    return {
        fetchClassesApi,
        fetchClassApi,
        fetchClassInfoApi,
        createClassApi,
        editClassApi,
    }
}