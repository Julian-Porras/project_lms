import useAxios from '../hooks/useAxios';

export default function ModuleContentService() {
    const { AxiosAuth } = useAxios();

    const fetchModuleItemApi = async ({ item_id, signal }) => {
        const response = await AxiosAuth.get(`/api/d/module/${item_id}`, {
            signal,
        });
        return response.data;
    };

    const createModuleItemApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/module/create-item`, credentials);
        return response.data;
    };

    const editModuleItemApi = async ({ item_id, credentials }) => {
        const response = await AxiosAuth.post(`/api/d/module/edit-item/${item_id}`, credentials);
        return response.data;
    };

    const deleteModuleItemApi = async ({ item_id }) => {
        const response = await AxiosAuth.post(`/api/d/module/delete-item/${item_id}`);
        return response.data;
    };

    return {
        fetchModuleItemApi,
        createModuleItemApi,
        editModuleItemApi,
        deleteModuleItemApi,
    }
}