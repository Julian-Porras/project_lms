import axios from "axios";

const useAxios = () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    const timeout = 1000 * 20; 
    const AxiosAuth = axios.create({ timeout, withCredentials: true, });
    AxiosAuth.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const GuestAxios = axios.create({
        baseURL: backend,
        timeout,
        withCredentials: true,
    });

    return { AxiosAuth, GuestAxios, };
};

export default useAxios;