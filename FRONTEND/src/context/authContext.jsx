import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi, userInfoApi, logoutApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../constants/role";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(
    !!localStorage.getItem("__AuthUser")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(() => true);
    setErrors(() => {});
    try {
      const data = await loginApi(credentials);
      const bearer = data.token;
      localStorage.setItem("token", bearer);
      setToken(() => bearer);
      setErrors(() => {});
      const userData = await userInfo();
      switch (userData.role_id) {
        case ROLES.ADMIN:
          navigate("/admin/dashboard");
          break;
        case ROLES.INSTRUCTOR || ROLES.DEVELOPER:
          navigate("/instructor/dashboard");
          break;
        case ROLES.STUDENT:
          navigate("/student/dashboard");
          break;
        default:
          navigate("/");
      }
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

  const register = async (credentials) => {
    setLoading(() => true);
    setErrors(() => {});
    try {
      const data = await registerApi(credentials);
      console.log(data);
      const bearer = data.token;
      localStorage.setItem("token", bearer);
      setToken(() => bearer);
      setErrors(() => {});
      const userData = await userInfo();
      switch (userData.role_id) {
        case ROLES.ADMIN:
          navigate("/admin/dashboard");
          break;
        case ROLES.INSTRUCTOR || ROLES.DEVELOPER:
          navigate("/instructor/dashboard");
          break;
        case ROLES.STUDENT:
          navigate("/student/dashboard");
          break;
        default:
          navigate("/");
      }
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
      const data = await userInfoApi();
      setUser(data);
      setAuthUser(true);
      localStorage.setItem("__AuthUser", "true");
      localStorage.setItem("code", data.role_id || "");
      return data;
    } catch {
      logout();
    }
  };

  const logout = async () => {
    setLoggingOut(() => true);
    try {
      await logoutApi();
    } catch (err) {
      const status = err.response?.status;
      setErrors(
        status === 422 || status === 401
          ? err.response.data.errors
          : { general: "Something went wrong" }
      );
    } finally {
      localStorage.clear();
      setLoggingOut(() => false);
      setToken(() => null);
      setAuthUser(() => false);
      setUser(() => null);
      navigate("/");
    }
  };

  useEffect(() => {
    if (token && !user) {
      userInfo();
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authUser,
        loading,
        loggingOut,
        errors,
        setErrors,
        login,
        register,
        logout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
