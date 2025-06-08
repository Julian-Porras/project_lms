import useAxios from '../hooks/useAxios';

export default function CourseService() {
    const { AxiosAuth } = useAxios();

    const fetchCoursesApi = async ({ page, limit, signal }) => {
        const response = await AxiosAuth.get(`/api/d/course?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    }

    const fetchCoursesByStatusApi = async ({ signal }) => {
        const response = await AxiosAuth.get(`/api/d/course/status`, {
            signal,
        });
        return response.data;
    }

    const fetchCourseApi = async ({ course_id, signal }) => {
        const response = await AxiosAuth.get(`/api/d/course/${course_id}`, {
            signal,
        });
        return response.data;
    }

    const createCourseApi = async (credentials) => {
        const response = await AxiosAuth.post("/api/d/create-course", credentials);
        return response.data;
    }

    const editCourseApi = async ({ course_id, credentials }) => {
        const response = await AxiosAuth.post(`/api/d/edit-course/${course_id}`, credentials);
        return response.data;
    }

    return {
        fetchCoursesApi,
        fetchCoursesByStatusApi,
        fetchCourseApi,
        createCourseApi,
        editCourseApi,
    }
}