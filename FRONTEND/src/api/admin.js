import useAxios from "../hooks/useAxios"

const { AxiosAuth } = useAxios();

export const adminDashboardApi = async () => {
    const response = await AxiosAuth.get("/api/admin/dashboard");
    return response.data;
};