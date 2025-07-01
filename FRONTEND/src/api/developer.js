import ClassroomService from '../services/ClassroomService';
import CourseService from '../services/CourseService';
import ModuleContentService from '../services/ModuleContentService';
import ModuleService from '../services/ModuleService';

export default function useDeveloperApi() {
    const { fetchCoursesApi, fetchCourseApi, fetchCoursesByStatusApi, createCourseApi, editCourseApi } = CourseService();
    const { fetchClassesApi, fetchClassApi, createClassApi, editClassApi, fetchClassInfoApi } = ClassroomService();
    const { createModuleApi, editModuleApi, deleteModuleApi } = ModuleService();
    const { fetchModuleItemApi, createModuleItemApi, editModuleItemApi, deleteModuleItemApi } = ModuleContentService();

    // ****************** course api ******************
    const fetchCourses = async ({ page, limit, signal }) => {
        return await fetchCoursesApi({ page, limit, signal });
    };

    const fetchCoursesByStatus = async ({ signal }) => {
        return await fetchCoursesByStatusApi({ signal });
    };

    const fetchCourse = async ({ course_id, signal }) => {
        return await fetchCourseApi({ course_id, signal })
    };

    const createCourse = async (credentials) => {
        return await createCourseApi(credentials);
    }

    const editCourse = async ({ course_id, credentials }) => {
        return await editCourseApi({ course_id, credentials });
    }

    // ****************** class api ******************
    const fetchClasses = async ({ page, limit, signal }) => {
        return await fetchClassesApi({ page, limit, signal });
    };

    const fetchClass = async ({ class_id, signal }) => {
        return await fetchClassApi({ class_id, signal });
    };

    const fetchClassInfo = async ({ class_id, signal }) => {
        return await fetchClassInfoApi({ class_id, signal });
    };

    const createClass = async (credentials) => {
        return await createClassApi(credentials);
    };

    const editClass = async ({ class_id, credentials }) => {
        return await editClassApi({ class_id, credentials });
    }

    // ****************** module api ******************
    const createModule = async (credentials) => {
        return await createModuleApi(credentials);
    };

    const editModule = async ({ module_id, credentials }) => {
        return await editModuleApi({ module_id, credentials });
    };

    const deleteModule = async ({ module_id }) => {
        return await deleteModuleApi({ module_id });
    };

    // ****************** module content/item api ******************
    const fetchModuleItem = async ({ item_id }) => {
        return await fetchModuleItemApi({ item_id });
    };

    const createModuleItem = async (credentials) => {
        return await createModuleItemApi(credentials);
    };

    const editModuleItem = async ({ item_id, credentials }) => {
        return await editModuleItemApi({ item_id, credentials });
    };

    const deleteModuleItem = async ({ item_id }) => {
        return await deleteModuleItemApi({ item_id });
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
        deleteModuleItem
    };
}
