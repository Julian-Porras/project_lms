import React from "react";
import styles from '../../styles/login.module.css';
import { LoginCard } from "../../components/Card";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/role";

function LoginPage() {
    const { login, loading, errors, authUser, user } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email_address: "",
        password: "",
    });
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
    };

    useEffect(() => {
        if (authUser && user) {
          switch (user.role_id) {
            case ROLES.ADMIN:
              navigate("/admin/dashboard");
              break;
            case ROLES.INSTRUCTOR:
              navigate("/instructor/dashboard");
              break;
            case ROLES.STUDENT:
              navigate("/student/dashboard");
              break;
            default:
              navigate("/");
          }
        }
      }, [authUser, user]);

    return ( !authUser && !user &&
        <div className={styles.loginPage}>
            <LoginCard>
                <p className={styles.subtitle}>Please enter your details</p>
                <h2 className={styles.title}>Login to your account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email_address">Email address</label>
                        <input type="email" name="email_address" value={credentials.email_address} onChange={handleChange} />
                        {errors?.email_address && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.email_address}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                        {errors?.password && <p className="text-sm text-red-500 mt-2">&nbsp;{errors.password}</p>}
                    </div>
                    <div className={styles.actions}>
                        <button type="submit" className={styles.btnPrimary} disabled={loading} >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                    </div>
                </form>
            </LoginCard>
        </div>
    );
}
export default LoginPage;
