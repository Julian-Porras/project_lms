import { ClassModuleCard, ModuleHeaderItemCard, ModuleItemCard } from "../../components/Card";
import { LuAlbum, LuLink2, LuPlus, LuSquarePen, LuEye, LuEyeOff, LuNotebookPen, LuNewspaper, LuRocket, } from "react-icons/lu";
import Divider from '@mui/material/Divider';
import { NotPublishedContentStatus, PublishedContentStatus, SettingsIcon } from "../../components/Icon";
import styles from "../../styles/content.module.css";
import { CONTENT } from "../../constants/content";
import { Fragment } from "react";

export function ModuleComponent({
    isCourse,
    title,
    isVisible,
    setOpenContent,
    setOpenEdit,
    contentData,
    module_id,
    setModuleId,
    setCredentials,
    groupView,
    base,
}) {
    return (
        <ClassModuleCard >
            <div className="flex flex-row justify-between items-center p-4 rounded-t-md" >
                <div className="flex flex-row items-center text-xl font-semibold gap-3 uppercase text-[var(--secondary-color)] ">
                    <LuAlbum size={22} /><p className={styles.moduleTitle} >{title}</p>
                    {isCourse &&
                        <div className="flex flex-row items-center justify-center gap-2 text-gray-500">
                            <LuLink2 size={16} />
                            <p className="text-xs text-gray-500">from course</p>
                        </div>
                    }
                </div>
                <div className="flex flex-row items-center gap-4 ">
                    {isVisible ? <LuEye size={19} color="var(--gray-color)" /> : <LuEyeOff size={19} color="var(--gray-color)" />}
                    <div className="flex flex-row items-center justify-center gap-1 border-green-400 border-1 text-green-500 rounded-sm px-2 py-1 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                            setOpenEdit(true);
                            setModuleId(module_id);
                            setCredentials(prev => ({
                                ...prev,
                                module_name: title,
                                is_visible: isVisible ? true : false,
                            }));
                        }}>
                        <LuSquarePen /><p>EDIT</p>
                    </div>
                </div>
            </div>
            <Divider />
            <ContentComponent groupView={groupView} contentData={contentData} base={base}/>
            <div className="flex flex-row items-center text-gray-600 justify-center cursor-pointer gap-2 p-3 hover:bg-blue-50 rounded-b-md"
                onClick={() => { setOpenContent(true); setModuleId(module_id); }}
            >
                <LuPlus size={18} /><p>ADD CONTENT</p>
            </div>
        </ClassModuleCard>
    );
}

export function ContentComponent({ groupView, contentData, base }) {
    const lectures = [];
    const assignments = [];
    const quizzes = [];
    contentData?.forEach((item) => {
        if (item.item_type === CONTENT.LECTURE) {
            lectures.push({
                id: item.id,
                type: item.item_type,
                name: item.item_name,
                visible: item.is_visible,
            });
        }
        else if (item.item_type === CONTENT.ASSIGNMENT) {
            assignments.push({
                id: item.id,
                type: item.item_type,
                name: item.item_name,
                visible: item.is_visible,
            });
        }
        else if (item.item_type === CONTENT.QUIZ) {
            quizzes.push({
                id: item.id,
                type: item.item_type,
                name: item.item_name,
                visible: item.is_visible,
            });
        }
    });
    return (
        <div className="flex flex-col text-base">
            {groupView ?
                <GroupContentLayout
                    lectures={lectures}
                    assignments={assignments}
                    quizzes={quizzes}
                    base={base}
                />
                :
                <ListContentLayout
                    contentData={contentData}
                    base={base}
                />
            }
        </div>
    );
}

export function ListContentLayout({
    contentData,
    base,
}) {
    return (
        contentData?.map((item) => (
            <Fragment key={item.id}>
                <ModuleItemCard route={item.id} base={base} >
                    <div className={styles.contentItemWrapper}>
                        {item.item_type === CONTENT.LECTURE &&
                            <LuNewspaper color="#168f56" size={18} />
                        }
                        {item.item_type === CONTENT.ASSIGNMENT &&
                            <LuNotebookPen color="#168f56" size={18} />
                        }
                        {item.item_type === CONTENT.QUIZ &&
                            <LuRocket color="#168f56" size={18} />
                        }
                        <p className=" hover:underline cursor-pointer" >{item.item_name}</p>
                    </div>
                    <div className={styles.contentItemWrapper}>
                        {item.is_visible ? <PublishedContentStatus /> : <NotPublishedContentStatus />}
                        <SettingsIcon />
                    </div>
                </ModuleItemCard>
                <Divider />
            </Fragment>
        ))
    )
}

export function GroupContentLayout({
    lectures,
    assignments,
    quizzes,
    base,
}) {
    return (
        <>
            {lectures.length > 0 &&
                <>
                    <ModuleHeaderItemCard>
                        <LuNewspaper size={18} /><p>LECTURES</p>
                    </ModuleHeaderItemCard>
                    {
                        lectures?.map((lecture) => (
                            <Fragment key={lecture.id}>
                                <ModuleItemCard route={lecture.id} base={base}>
                                    <div className={styles.contentItemWrapperGroup}>
                                        <p key={lecture.id} className="hover:underline cursor-pointer" >{lecture.name}</p>
                                    </div>
                                    <div className={styles.contentItemWrapper}>
                                        {lecture.visible ? <PublishedContentStatus /> : <NotPublishedContentStatus />}
                                        <SettingsIcon />
                                    </div>
                                </ModuleItemCard>
                                <Divider />
                            </Fragment>
                        ))
                    }
                </>
            }
            {assignments.length > 0 &&
                <>
                    <ModuleHeaderItemCard>
                        <LuNotebookPen size={18} /> <p>ASSIGNMENTS</p>
                    </ModuleHeaderItemCard>
                    {
                        assignments?.map((assignment) => (
                            <Fragment key={assignment.id}>
                                <ModuleItemCard>
                                    <div className={styles.contentItemWrapperGroup}>
                                        <p key={assignment.id} className=" hover:underline cursor-pointer" >{assignment.name}</p>
                                    </div>
                                    <div className={styles.contentItemWrapper}>
                                        {assignment.visible ? <PublishedContentStatus /> : <NotPublishedContentStatus />}
                                        <SettingsIcon />
                                    </div>
                                </ModuleItemCard>
                                <Divider />
                            </Fragment>
                        ))
                    }
                </>
            }
            {quizzes.length > 0 &&
                <>
                    <ModuleHeaderItemCard>
                        <LuRocket size={18} /><p>QUIZZES</p>
                    </ModuleHeaderItemCard>
                    {
                        quizzes?.map((quiz) => (
                            <Fragment key={quiz.id}>
                                <ModuleItemCard>
                                    <div className={styles.contentItemWrapperGroup}>
                                        <p key={quiz.id} className=" hover:underline cursor-pointer" >{quiz.name}</p>
                                    </div>
                                    <div className={styles.contentItemWrapper}>
                                        {quiz.visible ? <PublishedContentStatus /> : <NotPublishedContentStatus />}
                                        <SettingsIcon />
                                    </div>
                                </ModuleItemCard>
                                <Divider />
                            </Fragment>
                        ))
                    }
                </>
            }
        </>
    )
}