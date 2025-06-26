import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

function LoadingPage() {
    const [showSpinner, setShowSpinner] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 200); // 500ms delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-row items-center justify-center w-full h-full">
            {showSpinner && (
                <OrbitProgress
                    dense
                    color="#134B70"
                    speedPlus={1}
                    style={{ fontSize: "8px" }}
                    text=""
                    textColor=""
                />
            )}
        </div>
    );
}

function LoadingButton() {

}

function LoadingFallbackPage(){
    return(
        <div className="bg-[var(--bg-color)] w-full h-full flex"></div>
    );
}

export { LoadingPage, LoadingButton,LoadingFallbackPage }