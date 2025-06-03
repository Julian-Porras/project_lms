import { LuCircleCheckBig, LuCircleDashed, LuEllipsisVertical } from "react-icons/lu";
import { FaCog } from "react-icons/fa";

export function NotPublishedContentStatus() {
    return (
        <LuCircleCheckBig size={16} className="text-green-500" />
    )
}

export function PublishedContentStatus() {
    return (
        <LuCircleDashed size={16} className="text-gray-500" />
    )
}

export function SettingsIcon() {
    return (
        <div className=" rounded-full hover:bg-gray-200 p-1">
            <LuEllipsisVertical className="text-gray-600" size={18} />
        </div>
    )
}