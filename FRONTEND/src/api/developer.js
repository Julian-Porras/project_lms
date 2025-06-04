import useAxios from '../hooks/useAxios';
import { useState } from 'react';

export default function useDeveloperApi() {
    const { AxiosAuth } = useAxios();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchCoursesApi = async ({ page, limit, signal }) => {
        const response = await AxiosAuth.get(`/api/d/course?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    };

    const getCoursesByStatusApi = async ({ signal }) => {
        const response = await AxiosAuth.get(`/api/d/course/status`, {
            signal,
        });
        return response.data;
    };

    const getCourseApi = async (course_id) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.get(`/api/d/course/${course_id}`);
            return response.data;
        } catch (err) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            );
        } finally {
            setLoading(false);
        }
    };

    const createCourseApi = async (credentials) => {
        const response = await AxiosAuth.post("/api/d/create-course", credentials);
        return response.data;
    }

    // ****************** class api ******************
    const fetchClassesApi = async ({ page, limit, signal }) => {
        const response = await AxiosAuth.get(`/api/d/class?page=${page}&limit=${limit}`, {
            signal,
        });
        return response.data;
    };

    const fetchClassApi = async (class_id, signal) => {
        const response = await AxiosAuth.get(`/api/d/class/${class_id}`, {
            signal,
        });
        return response.data;
    };

    const createClassApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/create-class`, credentials);
        return response.data;
    };

    // ****************** module api ******************

    const createClassModuleApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/create-module`, credentials);
        return response.data;
    };
    const editModuleApi = async (module_id, credentials) => {
        const response = await AxiosAuth.post(`/api/d/edit-module/${module_id}`, credentials);
        return response.data;
    }
    const deleteModuleApi = async (module_id) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.post(`/api/d/delete-module/${module_id}`);
            return response.data;
        } catch (err) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            );
        } finally {
            setLoading(false);
        }
    }
    const fetchModuleItemApi = async (item_id) => {
        const response = await AxiosAuth.get(`/api/d/module/${item_id}`);
        return response.data;
    };
    const createModuleItemApi = async (credentials) => {
        const response = await AxiosAuth.post(`/api/d/module/create-item`, credentials);
        return response.data;
    };
    const editModuleItemApi = async (item_id, credentials) => {
        const response = await AxiosAuth.post(`/api/d/module/edit-item/${item_id}`, credentials);
        return response.data;
    }
    const deleteModuleItemApi = async (item_id) => {
        const response = await AxiosAuth.post(`/api/d/module/delete-item/${item_id}`);
        return response.data;
    }

    // ****************** student api ******************
    return {
        errors,
        loading,
        setErrors,
        setLoading,
        createCourseApi,
        getCourseApi,
        getCoursesByStatusApi,
        fetchCoursesApi,
        fetchClassesApi,
        fetchClassApi,
        createClassApi,
        createClassModuleApi,
        editModuleApi,
        deleteModuleApi,
        fetchModuleItemApi,
        createModuleItemApi,
        editModuleItemApi,
        deleteModuleItemApi,
    };
}
