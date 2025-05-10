import React from "react";
import styles from '../../styles/login.module.css';
import { RegisterCard } from "../../components/Card";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/role";
import { NavLink } from "react-router-dom";

function RegisterPage() {
    const { register, loading, errors, user, token } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email_address: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
    });
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(credentials);
    };

    useEffect(() => {
        if (token && user) {
            switch (user.role_id) {
                case ROLES.ADMIN:
                    navigate("/admin/dashboard");
                    break;
                case ROLES.INSTRUCTOR:
                    navigate("/instructor/dashboard");
                    break;
                case ROLES.DEVELOPER:
                    navigate("/dev/dashboard");
                    break;
                case ROLES.STUDENT:
                    navigate("/student/dashboard");
                    break;
                default:
                    navigate("/");
            }
        }
    }, [token, user]);

    return (!token && !user &&
        <div className={`${styles.loginPage}`}>
            <RegisterCard >
                <p className={styles.subtitle}>Please fill in this form to create an account</p>
                <h2 className={styles.title}>Sign up</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center gap-4">
                        <div className={styles.formGroup}>
                            <label htmlFor="first_name">Firstname</label>
                            <input type="text" name="first_name" value={credentials.first_name} onChange={handleChange} placeholder="firstname" />
                            {errors?.first_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.first_name}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="last_name">Lastname</label>
                            <input type="text" name="last_name" value={credentials.last_name} onChange={handleChange} placeholder="lastname" />
                            {errors?.last_name && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.last_name}</p>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email_address">Email</label>
                        <input type="email" name="email_address" value={credentials.email_address} onChange={handleChange} placeholder="email address" />
                        {errors?.email_address && <p className="text-sm text-red-500 mt-1">&nbsp;{errors.email_address}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="password" />
                        {errors?.password && <p className="text-sm text-red-500 mt-2">&nbsp;{errors.password}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password_confirmation">Confirm password</label>
                        <input type="password" name="password_confirmation" value={credentials.password_confirmation} onChange={handleChange} placeholder="confirm password" />
                        {errors?.password_confirmation && <p className="text-sm text-red-500 mt-2">&nbsp;{errors.password_confirmation}</p>}
                    </div>
                    <div className={styles.actions}>
                        <button type="submit" className={styles.btnPrimary} disabled={loading} >
                            {loading ? "Please wait..." : "Sign Up"}
                        </button>
                    </div>
                    <p className={styles.registerText} >Already have an account?
                        <NavLink className={styles.forgotLink} to={`/`}> Login</NavLink>
                    </p>
                </form>
            </RegisterCard>
        </div>
    );
}
export default RegisterPage;
