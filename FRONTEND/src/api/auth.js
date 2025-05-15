import useAxios from '../hooks/useAxios'

const { AxiosAuth, GuestAxios } = useAxios();

export const loginApi = async (credentials) => {
    await GuestAxios.get("/sanctum/csrf-cookie");
    const response = await GuestAxios.post("/api/login", credentials);
    return response.data;
};

export const registerApi = async (credentials) => {
    await GuestAxios.get("/sanctum/csrf-cookie");
    const response = await GuestAxios.post("/api/register", credentials);
    return response.data;
};

export const userInfoApi = async () => {
    const response = await AxiosAuth.get("/api/user-info");
    return response.data;
};

export const logoutApi = async () => {
    await AxiosAuth.post("/api/logout");
};
