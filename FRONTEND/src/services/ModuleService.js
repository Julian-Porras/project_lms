import useAxios from '../hooks/useAxios';

export default function ModuleService() {
    const { AxiosAuth } = useAxios();

    const createClassModuleApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/create-module`, credentials);
        return response.data;
    };

    const editModuleApi = async ({ module_id, credentials }) => {
        const response = await AxiosAuth.post(`/api/d/edit-module/${module_id}`, credentials);
        return response.data;
    };

    const deleteModuleApi = async ({ module_id }) => {
        const response = await AxiosAuth.post(`/api/d/delete-module/${module_id}`);
        return response.data;
    };

    return {
        createClassModuleApi,
        editModuleApi,
        deleteModuleApi,
    }
}