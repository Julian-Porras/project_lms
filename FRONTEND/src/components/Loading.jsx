import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function LoadingPage() {
    const [showSpinner, setShowSpinner] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 200); // 500ms delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-row items-center justify-center w-full">
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

function LoadingFallbackPage() {
    return (
        <div className="bg-[var(--bg-color)] w-full h-full flex"></div>
    );
}

function LoadingSkeleton() {
    return (
        <Stack spacing={2}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '2px' }} />
            <Skeleton variant="rounded" sx={{width: '100%', height: '8rem'}} />
        </Stack>
    )
}

export { LoadingPage, LoadingButton, LoadingFallbackPage, LoadingSkeleton }