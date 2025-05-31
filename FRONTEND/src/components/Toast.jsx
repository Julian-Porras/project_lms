import React, { useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Slide } from "@mui/material";

function SlideDownTransition(props) {
    return <Slide {...props} direction="down" />;
}

function ToastSuccessful({ message, show, setShow, duration = 2000 }) {
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

function ToastComponent({ message, show, setShow, duration = 3000, toastStatus = 200 }) {
    const getSeverity = (toastStatus) => {
        if (toastStatus >= 200 && toastStatus < 300) return "success";
        if (toastStatus >= 500) return "error";
        return "info";
    };

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, setShow]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={show}
            autoHideDuration={duration}
            onClose={() => setShow(false)}
            slots={{ transition: SlideDownTransition }}
        >
            <Alert
                onClose={() => setShow(false)}
                severity={getSeverity(toastStatus)}
                variant="outlined"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export { ToastSuccessful, ToastComponent }