import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { LoadingPage } from "../../components/Loading";
import PaginationBase from "../../components/Pagination";
import { ClassroomModal } from "./ModalComponent";

function ClassroomComponent({
    errors,
    isClassesLoading,
    classData,
    isCourseLoading,
    courseData,
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
                <p className={style.title} >Classroom</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className={style.gridWrapper}>
                {isClassesLoading ? (
                    <LoadingPage />
                ) : !isClassesLoading && classData?.length === 0 ? (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No classroom found</p>
                    </div>
                ) : (
                    classData?.map((classroom) => (
                        <ClassCard
                            route={`${classroom.id}/m`}
                            key={classroom.id}
                            name={classroom.classroom_name}
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
                <ClassroomModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    courseData={courseData}
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
export default ClassroomComponent;