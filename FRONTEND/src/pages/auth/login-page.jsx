import React from "react";
import styles from '../../styles/login.module.css';
import { LoginCard } from "../../components/Card";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const { login, loading, errors } = useAuth();

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

    return (
        <div className={styles.loginPage}>
            <LoginCard>
                <p className={styles.subtitle}>Please enter your details</p>
                <h2 className={styles.title}>Login to your account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email_address" value={credentials.email_address} onChange={handleChange} required />
                        {errors.email && <p className="error">{errors.email[0]}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
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
