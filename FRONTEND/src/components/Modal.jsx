import { useEffect, useRef } from "react";
import { OrbitProgress } from "react-loading-indicators";

function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null);
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-5 flex items-center justify-center transition-opacity backdrop-blur-[2px] bg-black/10">
            <div className="bg-white rounded-sm shadow-xl w-full max-w-lg p-6 relative animate-fadeIn" ref={modalRef}>
                <button
                    className="absolute top-6 right-4 px-2 py-0 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer rounded-full hover:bg-gray-100"
                    onClick={onClose}>&times;</button>
                {title && <h2 className="text-2xl font-medium mb-8">{title}</h2>}
                {children}
            </div>
        </div>
    );
}

function LogoutModal({isOpen}){
    const modalRef = useRef(null);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-5 flex items-center justify-center transition-opacity backdrop-blur-[2px] bg-black/10">
            <div className="bg-white rounded-sm shadow-xl w-fit max-w-md p-6 relative animate-fadeIn flex flex-row items-center gap-4" ref={modalRef}>
                <OrbitProgress dense color="#134B70" speedPlus={1} style={{ fontSize: "6px" }}/><p>Signing off...</p>
            </div>
        </div>
    );
}

export { Modal, LogoutModal };