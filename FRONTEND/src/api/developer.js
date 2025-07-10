import ClassroomService from "../services/ClassroomService";
import CourseService from "../services/CourseService";
import ModuleContentService from "../services/ModuleContentService";
import ModuleService from "../services/ModuleService";

export default function useDeveloperApi() {
  const {
    fetchCoursesApi,
    fetchCourseApi,
    fetchCoursesByStatusApi,
    createCourseApi,
    editCourseApi,
  } = CourseService();
  const {
    fetchClassesApi,
    fetchClassApi,
    createClassApi,
    editClassApi,
    fetchClassInfoApi,
  } = ClassroomService();
  const { createModuleApi, editModuleApi, deleteModuleApi } = ModuleService();
  const {
    fetchModuleItemApi,
    createModuleItemApi,
    editModuleItemApi,
    deleteModuleItemApi,
  } = ModuleContentService();

  // ****************** course api ******************
  const fetchCourses = async ({ page, limit, signal }) => {
    return fetchCoursesApi({ page, limit, signal });
  };

  const fetchCoursesByStatus = async ({ signal }) => {
    return fetchCoursesByStatusApi({ signal });
  };

  const fetchCourse = async ({ course_id, signal }) => {
    return fetchCourseApi({ course_id, signal });
  };

  const createCourse = async (credentials) => {
    return createCourseApi(credentials);
  };

  const editCourse = async ({ course_id, credentials }) => {
    return editCourseApi({ course_id, credentials });
  };

  // ****************** class api ******************
  const fetchClasses = async ({ page, limit, signal }) => {
    return fetchClassesApi({ page, limit, signal });
  };

  const fetchClass = async ({ class_id, signal }) => {
    return fetchClassApi({ class_id, signal });
  };

  const fetchClassInfo = async ({ class_id, signal }) => {
    return fetchClassInfoApi({ class_id, signal });
  };

  const createClass = async (credentials) => {
    return createClassApi(credentials);
  };

  const editClass = async ({ class_id, credentials }) => {
    return editClassApi({ class_id, credentials });
  };

  // ****************** module api ******************
  const createModule = async (credentials) => {
    return createModuleApi(credentials);
  };

  const editModule = async ({ module_id, credentials }) => {
    return editModuleApi({ module_id, credentials });
  };

  const deleteModule = async ({ module_id }) => {
    return deleteModuleApi({ module_id });
  };

  // ****************** module content/item api ******************
  const fetchModuleItem = async ({ item_id }) => {
    return fetchModuleItemApi({ item_id });
  };

  const createModuleItem = async (credentials) => {
    return createModuleItemApi(credentials);
  };

  const editModuleItem = async ({ item_id, credentials }) => {
    return editModuleItemApi({ item_id, credentials });
  };

  const deleteModuleItem = async ({ item_id }) => {
    return deleteModuleItemApi({ item_id });
  };

  return {
    fetchCourses,
    fetchCoursesByStatus,
    fetchCourse,
    createCourse,
    editCourse,
    fetchClasses,
    fetchClass,
    fetchClassInfo,
    createClass,
    editClass,
    createModule,
    editModule,
    deleteModule,
    fetchModuleItem,
    createModuleItem,
    editModuleItem,
    deleteModuleItem,
  };
}
