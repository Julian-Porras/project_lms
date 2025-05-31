import styles from '../../styles/login.module.css';
import { LoginCard } from "../../components/Card";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/role";
import { NavLink } from "react-router-dom";
import { InputComponent, InputText } from "../../components/Input";

function LoginPage() {
    const { login, loading, errors, setErrors, authUser, user } = useAuth();
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
        setErrors({});
        if (authUser && user) {
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
    }, [authUser, user]);

    return (!authUser && !user &&
        <div className={styles.loginPage}>
            <LoginCard>
                <p className={styles.subtitle}>Please enter your details</p>
                <h2 className={styles.title}>Login to your account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email_address">Email address</label>
                        <InputComponent
                            hiddenLabel={true}
                            type={"email"}
                            name={"email_address"}
                            value={credentials.email_address}
                            onChange={handleChange}
                            placeholder={"Type your email address"}
                            label={"Email address"}
                            error={errors?.email_address}
                            helperText={errors?.email_address}
                            variant={"outlined"}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <InputComponent
                            hiddenLabel={true}
                            type={"password"}
                            name={"password"}
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder={"Type your password"}
                            label={"Password"}
                            error={errors?.password}
                            helperText={errors?.password}
                            variant={"outlined"}
                        />
                    </div>
                    <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                    <div className={styles.actions}>
                        <button type="submit" className={`${styles.btnPrimary} ${loading && styles.btnPrimaryLoading}`} disabled={loading} >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    <p className={styles.registerText} >Don't have an account?
                        <NavLink className={styles.forgotLink} to={`/signup`}> Sign up</NavLink>
                    </p>
                </form>
            </LoginCard>
        </div>
    );
}
export default LoginPage;
