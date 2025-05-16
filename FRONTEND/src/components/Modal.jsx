import { useEffect, useRef } from "react";

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
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn" ref={modalRef}>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
                    onClick={onClose}>&times;</button>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
}

export { Modal };