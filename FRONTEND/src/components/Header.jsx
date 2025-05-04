import style from "../styles/header.module.css";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import { useAuth } from "../context/authContext";
import { useState, useRef, useEffect } from "react";

function Header() {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={style.header} >
            <div className={style.logoContainer}>
                <img src="/src/assets/images/react.svg" className="w-6" alt="" />
                <h2 className="text-md px-2">LMS</h2>
            </div>

            <div className="relative px-4" ref={dropdownRef}>
                {user && (
                    <div onClick={() => setDropdownOpen((prev) => !prev)} className="cursor-pointer">
                        <p>{user.last_name}, {user.first_name}</p>
                    </div>
                )}

                {dropdownOpen && user && (
                    <div className={style.dropdownNav}>
                        <div className={style.dropdownTab}>
                            <strong>{user.first_name} {user.last_name}</strong><br />
                            <span className="text-gray-600 text-xs">{user?.email_address}</span>
                        </div>
                        <div className={style.dropdownTab}>
                            <FaGear />
                            <span>Settings</span>
                        </div>
                        <div className={style.dropdownTab} onClick={handleLogout}>
                            <FaArrowRightFromBracket />
                            <span>Sign out</span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;