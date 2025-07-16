import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard, CourseCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { LoadingPage } from "../../components/Loading";
import PaginationBase from "../../components/Pagination";
import { CourseModal } from "./ModalComponent";

function CourseComponent({
    errors,
    isCoursesLoading,
    coursesData,
    handleChange,
    handleSubmit,
    credentials,
    setCredentials,
    isOpen,
    setIsOpen,
    isSubmitting,
    page,
    totalPages,
    setPage,
    totalRecords,
    pageSize,
    limit,
    setLimit,
}) {
    return (
        <>
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Course</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Course</ButtonSecondary>
            </div>
            <DividerThin />
            <div className={style.gridWrapper}>
                {isCoursesLoading ? (
                    <LoadingPage />
                ) : !isCoursesLoading && coursesData?.length === 0 ? (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No courses found</p>
                    </div>
                ) : (
                    coursesData?.map((course) => (
                        <CourseCard
                            route={`${course.id}/m`}
                            key={course.id}
                            name={course.course_name}
                        />
                    ))
                )}
                {totalPages > 0 && (
                    <PaginationBase
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                        totalRecords={totalRecords}
                        pageSize={pageSize}
                        limit={limit}
                        setLimit={setLimit}
                    />
                )}
            </div>
            <>
                <CourseModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    credentials={credentials}
                    setCredentials={setCredentials}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </>
        </>
    )
}
export default CourseComponent;