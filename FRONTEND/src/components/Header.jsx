import style from "../styles/header.module.css";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaBars  } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header({ resetSubmenus, isOpenSidebar, setOpen }) {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const base = location.pathname.split("/")[1];

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    const handleLogout = async (e) => {
        setDropdownOpen(false);
        e.preventDefault();
        await logout();
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={style.header} >
            <div className="flex flex-row items-center" >
                <div className={style.logoContainer}>
                    <img src="/src/assets/images/react.svg" className="w-6" alt="" />
                    <p className={style.headerTitle}>LMS</p>
                </div>
                <FaBars className="text-lg cursor-pointer" onClick={ () =>
                    setOpen(isOpenSidebar ? false : true)
                } />
            </div>
            <div className="relative px-4" ref={dropdownRef}>
                {user && (
                    <div onClick={() => setDropdownOpen((prev) => !prev)} className="cursor-pointer">
                        <p className={style.profileNav} >{user.last_name}, {user.first_name}</p>
                    </div>
                )}

                {dropdownOpen && user && (
                    <div className={style.dropdownNav}>
                        <div className={style.dropdownTab}>
                            <strong>{user.first_name} {user.last_name}</strong>
                            <span className="text-gray-600 text-xs">{user?.email_address}</span>
                        </div>
                        <div className={style.dropdownTab}>
                            <NavLink
                                className="flex flex-row items-center gap-2"
                                to={`/${base}/settings`}
                                onClick={() => {
                                    setDropdownOpen(false);
                                    resetSubmenus();
                                }
                                }
                            >
                                <FaGear />
                                <span>Settings</span>
                            </NavLink>
                        </div>
                        <div className={style.dropdownTab} onClick={handleLogout}>
                            <div className="flex flex-row items-center gap-2" >
                                <FaArrowRightFromBracket />
                                <span>Sign out</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;