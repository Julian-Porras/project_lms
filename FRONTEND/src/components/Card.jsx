import styles from "../styles/card.module.css";

function LoginCard({ children }) {
    return (
        <div className={styles.loginCard}>
                <div>{children}</div>
        </div>
    )
}

function RegisterCard({ children }) {
    return (
        <div className={styles.registerCard}>
                <div>{children}</div>
        </div>
    )
}

function ContainerCard({ children }) {
    return (
        <div className={styles.containerCard}>
                <div>{children}</div>
        </div>
    )
}

function ClassCard({ children }) {
    return (
        <div className={styles.containerCard}>
                <div>{children}</div>
        </div>
    )
}

export { LoginCard, RegisterCard, ContainerCard, ClassCard };