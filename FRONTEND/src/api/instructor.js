import useAxios from '../hooks/useAxios'

const { AxiosAuth } = useAxios();

// ****************** course api ******************
export const fetchCoursesApi = async (search) => {
    const response = await AxiosAuth.get(`/api/i/course?search=${search}`);
    return response.data;
};

export const fetchCourseApi = async (course_id) => {
    const response = await AxiosAuth.get(`/api/i/course/${course_id}`);
    return response.data;
};

export const fetchCourseModuleItemApi = async (item_id) => {
    const response = await AxiosAuth.get(`/api/i/course/module/${item_id}`);
    return response.data;
};

// ****************** class api ******************
export const fetchClassesApi = async (page, limit, search, status) => {
    const response = await AxiosAuth.get(`/api/i/class?page=${page}$limit=${limit}&search=${search}$status=${status}`);
    return response.data;
};

export const fetchClassApi = async (class_id) => {
    const response = await AxiosAuth.get(`/api/i/class/${class_id}`);
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

export const editClassStatusApi = async (class_id) => {
    const response = await AxiosAuth.post(`/api/i/edit-status-class/${class_id}`);
    return response.data;
};

// ****************** module api ******************
export const fetchClassModuleItemApi = async (item_id) => {
    const response = await AxiosAuth.get(`/api/i/class/module/${item_id}`);
    return response.data;
};

export const createModuleApi = async (credentials) => {
    const response = await AxiosAuth.post(`/api/i/class/create-module`, credentials);
    return response.data;
};

export const editModuleApi = async (module_id, credentials) => {
    const response = await AxiosAuth.post(`/api/i/class/edit-module/${module_id}`, credentials);
    return response.data;
}

export const deleteModuleApi = async (module_id) => {
    const response = await AxiosAuth.post(`/api/i/class/delete-module/${module_id}`);
    return response.data;
}

export const createModuleItemApi = async (credentials) => {
    const response = await AxiosAuth.post(`/api/i/class/module/create-item`, credentials);
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