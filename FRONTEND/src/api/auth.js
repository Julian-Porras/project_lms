import axios from "axios";
import { createAxiosInstances } from "../hooks/useAxios";

const { AxiosAuth, GuestAxios } = createAxiosInstances();

export const loginApi = async (credentials) => {
    await GuestAxios.get("/sanctum/csrf-cookie");
    const response = await GuestAxios.post("/api/login", credentials);
    return response.data;
};

export const getUserInfoApi = async () => {
    const response = await AxiosAuth.post("/api/user-info");
    return response.data;
};

export const logoutApi = async () => {
    await AxiosAuth.post("/api/logout");
};
