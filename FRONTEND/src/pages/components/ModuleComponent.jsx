import { ClassModuleCard, ModuleItemCard } from "../../components/Card";
import { LuBookMarked, LuPlus, LuSquarePen, LuEye, LuEyeOff, LuFilePen, LuFileText, LuFileArchive, LuSettings, } from "react-icons/lu";
import Divider from '@mui/material/Divider';
import { NotPublishedContentStatus, PublishedContentStatus, SettingsIcon } from "../../components/Icon";
import styles from "../../styles/content.module.css";
import { CONTENT } from "../../constants/content";

export function ModuleComponent({ title, isVisible, setOpenContent, setOpenEdit, contentData }) {
    return (
        <ClassModuleCard >
            <div className="flex flex-row justify-between items-center p-4 rounded-t-md" >
                <div className="flex flex-row items-center text-xl font-semibold gap-3 uppercase text-[var(--secondary-color)] ">
                    <LuBookMarked size={22} /><p className={styles.moduleTitle} >{title}</p>
                </div>
                <div className="flex flex-row items-center gap-4 ">
                    {isVisible ? <LuEye size={19} color="var(--gray-color)" /> : <LuEyeOff size={19} color="var(--gray-color)" />}
                    <div className="flex flex-row items-center justify-center gap-1 border-green-400 border-1 text-green-500 rounded-sm px-2 py-1 hover:bg-blue-50 cursor-pointer" onClick={() => setOpenEdit(true)} >
                        <LuSquarePen /><p>EDIT</p>
                    </div>
                </div>
            </div>
            <Divider />
            <ContentComponent contentData={contentData} />
            <div className="flex flex-row items-center text-gray-600 justify-center cursor-pointer gap-2 p-3 hover:bg-blue-50 rounded-b-md" onClick={() => setOpenContent(true)}>
                <LuPlus size={18} /><p>ADD CONTENT</p>
            </div>
        </ClassModuleCard>
    );
}

export function ContentComponent({ contentData }) {
    return (
        <div className="flex flex-col text-base">
            {
                contentData?.map((item) => (
                    <>
                        <ModuleItemCard key={item.id}>
                            <div className={styles.contentItemWrapper}>
                                {item.item_type === CONTENT.LECTURE &&
                                    <LuFileText size={18} />
                                }
                                {item.item_type === CONTENT.ASSIGNMENT &&
                                    <LuFilePen size={18} />
                                }
                                {item.item_type === CONTENT.QUIZ &&
                                    <LuFileArchive size={18} />
                                }
                                <p className=" hover:underline cursor-pointer" >{item.item_name}</p>
                            </div>
                            <div className={styles.contentItemWrapper}>
                                {item.is_visible ? <PublishedContentStatus /> : <NotPublishedContentStatus />}
                                <SettingsIcon />
                            </div>
                        </ModuleItemCard>
                        <Divider />
                    </>
                )
                )
            }
            {/* <ModuleItemCard>
                <div className={styles.contentItemWrapper}>
                    <LuFilePen size={18} /><p>ASSIGNMENTS</p>
                </div>
                <div className={styles.contentItemWrapper}>
                    <PublishedContentStatus />
                    <SettingsIcon />
                </div>
            </ModuleItemCard>
            <Divider />
            <ModuleItemCard>
                <div className={styles.contentItemWrapper}>
                    <LuFileArchive size={18} /><p>QUIZZES</p>
                </div>
                <div className={styles.contentItemWrapper}>
                    <PublishedContentStatus />
                    <SettingsIcon />
                </div>
            </ModuleItemCard>
            <Divider /> */}
        </div>
    );
}
