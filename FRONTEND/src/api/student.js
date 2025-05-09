import useAxios from '../hooks/useAxios'

const { AxiosAuth } = useAxios();

// ****************** class api ******************
export const fetchClassesApi = async () => {
    const response = await AxiosAuth.get(`/api/s/class`);
    return response.data;
};

export const fetchClassModulesApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/s/class/${class_id}`);
    return response.data;
};

export const fetchClassModuleItemsApi = async (module_id) => {
    const response = await AxiosAuth.get(`/api/s/class/module/${module_id}`);
    return response.data;
};