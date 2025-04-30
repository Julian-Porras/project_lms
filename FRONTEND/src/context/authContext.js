import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, getUserInfoApi, logoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUser, setAuthUser] = useState(!!localStorage.getItem("__AuthUser"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (token && !user) {
            userInfo();
        }
    }, [token]);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await loginApi(credentials);
            const bearer = data.token;
            localStorage.setItem("token", bearer);
            setToken(bearer);
            setErrors({});
            await userInfo();
            navigate("/dashboard");
        } catch (err) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            );
        } finally {
            setLoading(false);
        }
    };

    const userInfo = async () => {
        try {
            const data = await getUserInfoApi();
            setUser(data);
            setAuthUser(true);
            localStorage.setItem("__AuthUser", "true");
            localStorage.setItem("code", data.role_name || "");
        } catch {
            logout(); // token invalid, force logout
        }
    };

    const logout = async () => {
        setLoggingOut(true);
        try {
            await logoutApi();
        } catch { }
        finally {
            localStorage.clear();
            setToken(null);
            setAuthUser(false);
            setUser(null);
            navigate("/login");
            setLoggingOut(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            authUser,
            loading,
            loggingOut,
            errors,
            login,
            logout,
            userInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
