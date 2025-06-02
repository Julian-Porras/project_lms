import { ClassModuleCard, ModuleItemCard } from "../../components/Card";
import { LuBookMarked, LuPlus, LuSquarePen, LuEye, LuEyeOff, LuFilePen, LuFileText, LuFileArchive } from "react-icons/lu";
import Divider from '@mui/material/Divider';

export function ModuleComponent({ title, isVisible, openAdd, openEdit }) {
    return (
        <ClassModuleCard >
            <div className="flex flex-row justify-between items-center p-4" >
                <div className="flex flex-row items-center text-lg gap-3 uppercase">
                    <LuBookMarked size={22} /><p>{title}</p>
                </div>
                <div className="flex flex-row items-center gap-4 ">
                    {isVisible ? <LuEye size={19} color="var(--gray-color)" /> : <LuEyeOff size={19} color="var(--gray-color)" />}
                    <div className="flex flex-row items-center justify-center gap-1 border-green-400 border-1 text-green-500 rounded-sm px-2 py-1 hover:bg-[var(--bg-color)] cursor-pointer" onClick={openEdit} >
                        <LuSquarePen /><p>EDIT</p>
                    </div>
                </div>
            </div>
            <Divider />
            <ContentComponent />
            <div className="flex flex-row items-center text-gray-600 justify-center cursor-pointer gap-2 p-2 hover:bg-gray-50 rounded-b-md" onClick={openAdd}>
                <LuPlus size={18} /><p>ADD CONTENT</p>
            </div>
        </ClassModuleCard>
    );
}

export function ContentComponent({ }) {
    return (
        <div className="flex flex-col text-base">
            <ModuleItemCard>
                <LuFileText size={18} /><p>LECTURE</p>
            </ModuleItemCard>
            <Divider />
            <ModuleItemCard>
                <LuFilePen size={18} /><p>ASSIGN</p>
            </ModuleItemCard>
            <Divider />
            <ModuleItemCard>
                <LuFileArchive size={18} /><p>ACT</p>
            </ModuleItemCard>
            <Divider />
        </div>
    );
}