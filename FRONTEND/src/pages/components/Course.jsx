import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import SelectOptions from "../../components/select";
import { LoadingPage } from "../../components/Loading";
import { ToastComponent } from "../../components/Toast";
import PaginationBase from "../../components/Pagination";

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
    message,
    toastShow,
    toastStatus,
    setToastShow,
    isSubmitting,
    page,
    totalPages,
    setPage,
    totalRecords,
    pageSize,
}) {
    return (
        <>
            <ToastComponent
                message={message}
                show={toastShow}
                setShow={setToastShow}
                toastStatus={toastStatus}
            />
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
                        <ClassCard route={course.id} key={course.id}>
                            <p>{course.course_name}</p>
                        </ClassCard>
                    ))
                )}
            </div>
            {totalPages > 0 && (
                <PaginationBase
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    totalRecords={totalRecords}
                    pageSize={pageSize}
                />
            )}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Course"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="course_name">Course name:</label>
                        <InputText
                            type={"text"}
                            name={"course_name"}
                            value={credentials.course_name}
                            onChange={handleChange}
                            placeholder={"type course name"}
                            errors={errors?.course_name}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="status">Status:</label>
                        <SelectOptions
                            id="status"
                            options={[{ id: 'active', name: "Open" }, { id: 'not-active', name: "Close" }]}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            name="status"
                            selected={credentials.status}
                            setSelected={(value) => setCredentials({ ...credentials, status: value })}
                            errors={errors?.status}
                        />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-end mt-10">
                        <ButtonCreate type="submit" isDisable={isSubmitting}
                            title={isSubmitting ? "Creating..." : "Create course"} />
                        <ButtonCancel type="button" method={() => setIsOpen(false)} />
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default CourseComponent;