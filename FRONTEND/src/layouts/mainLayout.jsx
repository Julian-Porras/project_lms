import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useSubmenu from "../hooks/useSubmmenu";

const MainLayout = () => {
    const [isOpenSubmenu, toggleSubmenu, resetSubmenus] = useSubmenu(); {
        return (
            <div className="flex h-screen">
                <Header resetSubmenus={resetSubmenus} />
                <Sidebar
                    isOpenSubmenu={isOpenSubmenu}
                    toggleSubmenu={toggleSubmenu}
                    resetSubmenus={resetSubmenus}
                />
                <main className="flex-1 p-4 overflow-y-scroll mt-14">
                    <Outlet />
                </main>
            </div>
        );
    };
}

export default MainLayout;