import { ButtonCancel, ButtonSecondary, ButtonCreate } from "../../components/Button";
import { ClassCard } from "../../components/Card";
import { DividerThin } from "../../components/Divider";
import style from "../../styles/page.module.css";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { InputText } from "../../components/Input";
import { ToastSuccessful } from "../../components/Toast";
import SelectOptions from "../../components/select";
import { LoadingPage } from "../../components/Loading";
import PaginationBase from "../../components/Pagination";

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
    message,
    toastShow,
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
            <ToastSuccessful message={message} show={toastShow} setShow={setToastShow} />
            <div className="flex flex-row items-center justify-between " >
                <p className={style.title} >Classroom</p>
                <ButtonSecondary method={() => setIsOpen(true)}> <FaPlus />Create Classroom</ButtonSecondary>
            </div>
            <DividerThin />
            <div className={style.gridWrapper}>
                {isClassesLoading ? (
                    <LoadingPage />
                ) : classData?.data.length > 0 ? (
                    classData.data.map((classroom) => (
                        <ClassCard route={`${classroom.id}/m`} key={classroom.id}>
                            <p>{classroom.classroom_name}</p>
                        </ClassCard>
                    ))
                ) : (
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <p className="text-lg text-gray-500">No classroom found</p>
                    </div>
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
                title="Create Classroom"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="classroom_name">Classroom name:</label>
                        <InputText type={"text"} name={"classroom_name"} value={credentials.classroom_name} onChange={handleChange} placeholder={"type class name"} />
                        {errors?.classroom_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.classroom_name}</p>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="classroom_code">Classroom code:</label>
                        <InputText type={"text"} name={"classroom_code"} value={credentials.classroom_code} onChange={handleChange} placeholder={"type class code"} />
                        {errors?.classroom_code && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.classroom_code}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="course_id">Select course/subject:</label>
                        <SelectOptions
                            options={courseData || []}
                            getOptionLabel={(course) => course.course_name}
                            getOptionValue={(course) => course.id}
                            name="course_id"
                            id="course_id"
                            selected={credentials.course_id}
                            setSelected={(e) => setCredentials({ ...credentials, course_id: e })}
                            placeholder="Select course"
                        />
                        {errors?.course_id && (
                            <p className="text-sm text-red-500 mt-1">
                                &nbsp;{errors?.course_id}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-end mt-10">
                        <ButtonCreate type="submit" isDisable={isSubmitting}
                            title={isSubmitting ? "Creating..." : "Create classroom"} />
                        <ButtonCancel type="button" method={() => setIsOpen(false)} />
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default ClassroomComponent;