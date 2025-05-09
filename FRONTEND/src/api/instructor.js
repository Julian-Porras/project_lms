import useAxios from '../hooks/useAxios'

const { AxiosAuth } = useAxios();

// ****************** course api ******************
export const fetchCoursesApi = async (search) => {
    const response = await AxiosAuth.get(`/api/i/course?search=${search}`);
    return response.data;
};

export const fetchCourseModulesApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/i/course/${class_id}`);
    return response.data;
};

export const fetchCourseModuleItemApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/i/course/${class_id}`);
    return response.data;
};

// ****************** class api ******************
export const fetchClassesApi = async (page, limit, search, status) => {
    const response = await AxiosAuth.get(`/api/i/class?page=${page}$limit=${limit}&search=${search}$status=${status}`);
    return response.data;
};

export const createClassApi = async (credentials) => {
    const response = await AxiosAuth.post(`/api/i/create-class`, credentials);
    return response.data;
};

export const editClassApi = async (class_id, credentials) => {
    const response = await AxiosAuth.post(`/api/i/edit-class/${class_id}`, credentials);
    return response.data;
};

export const activateClassApi = async (class_id) => {
    const response = await AxiosAuth.post(`/api/i/activate-class/${class_id}`);
    return response.data;
};

export const deActivateClassApi = async (class_id) => {
    const response = await AxiosAuth.post(`/api/i/deactivate-class/${class_id}`);
    return response.data;
};

// ****************** module api ******************
export const fetchClassModulesApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/i/class/${class_id}`);
    return response.data;
};

export const fetchClassModuleItemApi = async (module_id) => {
    const response = await AxiosAuth.get(`/api/i/class/module/${module_id}`);
    return response.data;
};

export const createModuleApi = async (class_id, credentials) => {
    const response = await AxiosAuth.post(`/api/i/class/create-module/${class_id}`, credentials);
    return response.data;
};

export const createModuleItemApi = async (module_id, credentials) => {
    const response = await AxiosAuth.post(`/api/i/class/module/create-item/${module_id}`, credentials);
    return response.data;
};

// ****************** student api ******************
export const fetchClassStudentsApi = async (class_id, page, search, status) => {
    const response = await AxiosAuth.get(`/api/i/class/student/${class_id}?page=${page}&search=${search}&status=${status}`);
    return response.data;
};

export const fetchStudentInfoApi = async (student_id) => {
    const response = await AxiosAuth.get(`/api/i/class/student/${student_id}`);
    return response.data;
};

export const acceptStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(`/api/i/accept-student/${student_id}`);
    return response.data;
};

export const rejectStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(`/api/i/reject-student/${student_id}`);
    return response.data;
};

export const addStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(`/api/i/add-student/${student_id}`);
    return response.data;
};

export const removeStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(`/api/i/remove-student/${student_id}`);
    return response.data;
};