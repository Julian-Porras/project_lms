import styles from "../styles/card.module.css";

function card1({ title, children }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '2px 2px 8px #eee'
        }}>
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
    );
}

function card2({ title, children }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '2px 2px 8px #eee'
        }}>
            <div>{children}</div>
        </div>
    );
}

function LoginCard({ title, children }) {
    return (
        <div className={styles.loginCard}>
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

export { card1, card2, LoginCard, ContainerCard };