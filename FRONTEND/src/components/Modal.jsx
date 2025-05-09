import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
}

export { Modal };