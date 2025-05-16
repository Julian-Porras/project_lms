import { useEffect } from "react";

export default function ToastSuccesful({ message, show, setShow, duration = 2000 }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, setShow]);

    return (
        <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white bg-green-600 transition-all duration-500 z-50
            ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
        `}
        >
            {message}
        </div>
    );
}