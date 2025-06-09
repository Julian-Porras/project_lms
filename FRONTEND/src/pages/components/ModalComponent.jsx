import { Modal } from "../../components/Modal"

export function ClassroomModal({
    isOpen,
    setIsOpen,
    courseData,
    credentials,
    setCredentials,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Create Classroom"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="classroom_name">Classroom name:</label>
                    <InputText
                        type={"text"}
                        name={"classroom_name"}
                        value={credentials.classroom_name}
                        onChange={handleChange}
                        placeholder={"type class name"}
                        errors={errors?.classroom_name}
                    />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="classroom_code">Classroom code:</label>
                    <InputText
                        type={"text"}
                        name={"classroom_code"}
                        value={credentials.classroom_code}
                        onChange={handleChange}
                        placeholder={"type class code"}
                        errors={errors?.classroom_code}
                    />
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
                        errors={errors?.course_id}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-end mt-10">
                    <ButtonCreate type="submit" isDisable={isSubmitting}
                        title={isSubmitting ? "Creating..." : "Create classroom"} />
                    <ButtonCancel type="button" method={() => setIsOpen(false)} />
                </div>
            </form>
        </Modal>
    )
}

export function CourseModal({
    isOpen,
    setIsOpen,
    credentials,
    setCredentials,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
}) {
    return (
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
    )
}

export function CreateModuleModal({
    isOpen,
    setIsOpen,
    credentials,
    setCredentials,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Create Module"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="module_name">Module name:</label>
                    <InputText
                        type={"text"}
                        name={"module_name"}
                        caps
                        value={credentials.module_name}
                        onChange={handleChange}
                        placeholder={"Type module name"}
                        errors={errors?.module_name}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="is_visible">Visibility:</label>
                    <SelectOptions
                        options={[{ id: true, name: "Visible" }, { id: false, name: "Hidden" }]}
                        getOptionLabel={(option => option.name)}
                        getOptionValue={(option => option.id)}
                        name="is_visible"
                        id="is_visible"
                        selected={credentials.is_visible}
                        setSelected={(e) => setCredentials({ ...credentials, is_visible: e })}
                        placeholder="Select visibility"
                        errors={errors?.is_visible}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-end mt-10">
                    <ButtonCreate type="submit" isDisable={isSubmitting}
                        title={isSubmitting ? "Creating..." : "Create module"} />
                    <ButtonCancel type="button" method={() => setIsOpen(false)} />
                </div>
            </form>
        </Modal>
    )
}

export function EditModuleModal({
    isOpenEdit,
    setOpenEdit,
    credentials,
    setCredentials,
    errors,
    handleEditSubmit,
    handleChange,
    isSubmitting
}) {
    return (
        <Modal
            isOpen={isOpenEdit}
            title="Edit Module"
            onClose={() => setOpenEdit(false)}
        >
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="module_name">Module name:</label>
                    <InputText
                        type={"text"}
                        name={"module_name"}
                        caps
                        value={credentials.module_name}
                        onChange={handleChange}
                        placeholder={"Type module name"}
                        errors={errors?.module_name}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="is_visible">Visibility:</label>
                    <SelectOptions
                        options={[{ id: true, name: "Visible" }, { id: false, name: "Hidden" }]}
                        getOptionLabel={(option => option.name)}
                        getOptionValue={(option => option.id)}
                        name="is_visible"
                        id="is_visible"
                        selected={credentials.is_visible}
                        setSelected={(e) => setCredentials({ ...credentials, is_visible: e })}
                        placeholder="Select visibility"
                        errors={errors?.is_visible}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-end mt-10">
                    <ButtonCreate type="submit" isDisable={isSubmitting}
                        title={isSubmitting ? "Saving..." : "Save"} />
                    <ButtonCancel type="button" method={() => setOpenEdit(false)} />
                </div>
            </form>
        </Modal>
    )
}

export function OrderModuleModal({
    isOpenOrder,
    setOpenOrder,
}) {
    return (
        <Modal
            isOpen={isOpenOrder}
            title="Reorder modules"
            onClose={() => setOpenOrder(false)}
        >
        </Modal>
    )
}