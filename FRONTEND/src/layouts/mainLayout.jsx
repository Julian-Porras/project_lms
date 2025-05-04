import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            <Header /> 
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-scroll mt-12">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;