import useAxios from '../hooks/useAxios';
import { useState } from 'react';

export default function useDeveloperApi() {
    const { AxiosAuth } = useAxios();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const getCoursesApi = async (page, limit, stats) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.get(`/api/d/course?page=${page}&limit=${limit}&status=${stats}`);
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

    const getCoursesByStatusApi = async () => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.get(`/api/d/course/status`);
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
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.post("/api/d/create-course", credentials);
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



    // ****************** class api ******************
    const fetchClassesApi = async (page, limit) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.get(`/api/d/class?page=${page}$limit=${limit}`);
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

    const fetchClassApi = async (class_id) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.get(`/api/d/class/${class_id}`);
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


    const createClassApi = async (credentials) => {
        setLoading(true);
        setErrors({});
        try {
            const response = await AxiosAuth.post(`/api/d/create-class`, credentials);
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


    return {
        errors,
        loading,
        setErrors,
        setLoading,
        createCourseApi,
        getCourseApi,
        getCoursesByStatusApi,
        getCoursesApi,
        fetchClassesApi,
        fetchClassApi,
        createClassApi,
    };
}
