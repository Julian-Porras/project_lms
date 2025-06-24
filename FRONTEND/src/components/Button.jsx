import styles from '../styles/button.module.css';

function ButtonGreen({ children }) {
    return <button className={`${styles.btn} ${styles.buttonGreen}`}>{children}</button>;
}

function ButtonRed({ children }) {
    return <button className={`${styles.btn} ${styles.buttonRed}`}>{children}</button>;
}

function ButtonAccent({ children }) {
    return <button className={`${styles.btn} ${styles.buttonAccent}`}>{children}</button>;
}

function ButtonCreate({ type, isDisable, title, method }) {
    return <button onClick={method} type={type} disabled={isDisable} className={`${styles.btn} ${styles.buttonCreate}`}>
        {title}
    </button>
}

function ButtonPrimary({ type, method, children, isDisable }) {
    return <button type={type} onClick={method} disabled={isDisable} className={`${styles.btn} ${styles.buttonPrimary}`}>{children}</button>;
}

function ButtonSecondary({ method, children }) {
    return <button onClick={method} className={`${styles.btn} ${styles.buttonSecondary}`}>{children}</button>;
}

function ButtonCancel({ method, title }) {
    return <button onClick={method} className={`${styles.btn} ${styles.buttonCancel}`}>{title || "Cancel"}</button>;
}

export {
    ButtonGreen,
    ButtonRed,
    ButtonAccent,
    ButtonCreate,
    ButtonPrimary,
    ButtonSecondary,
    ButtonCancel
};