import { useEffect } from "react";
/**
 * Custom hook to handle abortable side effects
 * @param {Function} asyncEffect - async function that accepts an AbortSignal
 * @param {Array} deps - dependency array
 */
const useAbortEffect = (asyncEffect, deps = []) => {
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        asyncEffect(signal);
        return () => {
            controller.abort();
        };
    }, deps);
};

export default useAbortEffect;