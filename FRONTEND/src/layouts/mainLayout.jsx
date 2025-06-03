import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useSubmenu from "../hooks/useSubmenu";
import useToggle from "../hooks/useToggle";

const MainLayout = () => {
    const [isOpenSubmenu, toggleSubmenu, resetSubmenus] = useSubmenu();
    const [isOpenSidebar, setOpen] = useToggle(true);
    return (
        <div className="flex h-screen">
            <Header resetSubmenus={resetSubmenus} 
                    isOpenSidebar={isOpenSidebar} 
                    setOpen={setOpen} 
            />
            <Sidebar
                isOpenSubmenu={isOpenSubmenu}
                toggleSubmenu={toggleSubmenu}
                resetSubmenus={resetSubmenus}
                isOpenSidebar={isOpenSidebar}
            />
            <main className={`flex-1 p-5 overflow-y-scroll mt-12 `}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;