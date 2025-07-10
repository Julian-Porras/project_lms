import useAxios from "../hooks/useAxios";
import { useState } from "react";

export default function useInstructoApi() {
  const { AxiosAuth } = useAxios();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ****************** course api ******************
  const fetchCoursesApi = async (search) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await AxiosAuth.get(`/api/i/course?search=${search}`);
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

  const fetchCourseApi = async (course_id) => {
    const response = await AxiosAuth.get(`/api/i/course/${course_id}`);
    return response.data;
  };

  const fetchCourseModuleItemApi = async (item_id) => {
    const response = await AxiosAuth.get(`/api/i/course/module/${item_id}`);
    return response.data;
  };

  // ****************** class api ******************
  const fetchClassesApi = async (page, limit) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await AxiosAuth.get(
        `/api/i/class?page=${page}$limit=${limit}`
      );
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

  const fetchClassApi = async (class_id) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await AxiosAuth.get(`/api/i/class/${class_id}`);
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
      const response = await AxiosAuth.post(`/api/i/create-class`, credentials);
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

  const editClassApi = async (class_id, credentials) => {
    const response = await AxiosAuth.post(
      `/api/i/edit-class/${class_id}`,
      credentials
    );
    return response.data;
  };

  const editClassStatusApi = async (class_id) => {
    const response = await AxiosAuth.post(
      `/api/i/edit-status-class/${class_id}`
    );
    return response.data;
  };

  // ****************** module api ******************
  const fetchClassModuleItemApi = async (item_id) => {
    const response = await AxiosAuth.get(`/api/i/class/module/${item_id}`);
    return response.data;
  };

  const createModuleApi = async (credentials) => {
    const response = await AxiosAuth.post(
      `/api/i/class/create-module`,
      credentials
    );
    return response.data;
  };

  const editModuleApi = async (module_id, credentials) => {
    const response = await AxiosAuth.post(
      `/api/i/class/edit-module/${module_id}`,
      credentials
    );
    return response.data;
  };

  const deleteModuleApi = async (module_id) => {
    const response = await AxiosAuth.post(
      `/api/i/class/delete-module/${module_id}`
    );
    return response.data;
  };

  const createModuleItemApi = async (credentials) => {
    const response = await AxiosAuth.post(
      `/api/i/class/module/create-item`,
      credentials
    );
    return response.data;
  };

  // ****************** student api ******************
  const fetchClassStudentsApi = async (class_id, page, search, status) => {
    const response = await AxiosAuth.get(
      `/api/i/class/student/${class_id}?page=${page}&search=${search}&status=${status}`
    );
    return response.data;
  };

  const fetchStudentInfoApi = async (student_id) => {
    const response = await AxiosAuth.get(`/api/i/class/student/${student_id}`);
    return response.data;
  };

  const acceptStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(
      `/api/i/accept-student/${student_id}`
    );
    return response.data;
  };

  const rejectStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(
      `/api/i/reject-student/${student_id}`
    );
    return response.data;
  };

  const addStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(`/api/i/add-student/${student_id}`);
    return response.data;
  };

  const removeStudentApi = async (student_id) => {
    const response = await AxiosAuth.post(
      `/api/i/remove-student/${student_id}`
    );
    return response.data;
  };

  return {
    errors,
    loading,
    setErrors,
    setLoading,
    fetchClassesApi,
    fetchClassApi,
    createClassApi,
  };
}
