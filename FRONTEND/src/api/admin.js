import useAxios from '../hooks/useAxios'

const { AxiosAuth } = useAxios();

// ****************** course api ******************
export const fetchCoursesApi = async () => {
    const response = await AxiosAuth.get(`/api/a/course`);
    return response.data;
};

export const fetchCourseModulesApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/a/course/${class_id}`);
    return response.data;
};

export const fetchCourseModuleItemsApi = async (module_id) => {
    const response = await AxiosAuth.get(`/api/a/course/module/${module_id}`);
    return response.data;
};

// ****************** class api ******************
export const fetchClassesApi = async () => {
    const response = await AxiosAuth.get(`/api/a/class`);
    return response.data;
};

export const fetchClassStudentsApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/a/class/student/${class_id}`);
    return response.data;
};

export const fetchClassModulesApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/a/class/${class_id}`);
    return response.data;
};

export const fetchClassModuleItemsApi = async (module_id) => {
    const response = await AxiosAuth.get(`/api/a/class/module/${module_id}`);
    return response.data;
};