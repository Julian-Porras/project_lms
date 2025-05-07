import { useState } from "react";

export default function useSubmenu(initial = {}) {
    const [openSubmenus, setOpenSubmenus] = useState(initial);
    const toggleSubmenu = (key) => {
        setOpenSubmenus(prev => {
            const isCurrentlyOpen = !!prev[key];
            return isCurrentlyOpen ? {} : { [key]: true }; // close all others
        });
    };
    const resetSubmenus = () => setOpenSubmenus({});
    return [openSubmenus, toggleSubmenu, resetSubmenus];
}