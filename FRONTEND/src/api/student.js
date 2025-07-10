import StudentService from "../services/StudentService.js";

export default function useStudentApi() {
  const { fetchClassStudentsApi, fetchStudentClassesApi } = StudentService();

  const fetchClassStudents = async ({ page, limit, signal, path }) => {
    return fetchClassStudentsApi({ page, limit, signal, path });
  };

  const fetchStudentClasses = async ({ page, limit, signal, path }) => {
    return fetchStudentClassesApi({ page, limit, signal, path });
  };

  return {
    fetchClassStudents,
    fetchStudentClasses,
  };
}
