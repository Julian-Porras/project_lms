import React from "react";
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

function ButtonCreate({ children }) {
    return <button className={`${styles.btn} ${styles.buttonCreate}`}>{children}</button>;
}

function ButtonPrimary({ children }) {
    return <button className={`${styles.btn} ${styles.buttonPrimary}`}>{children}</button>;
}

function ButtonSecondary({ method, children }) {
    return <button onClick={method} className={`${styles.btn} ${styles.buttonSecondary}`}>{children}</button>;
}

function ButtonCancel({ method, children }) {
    return <button onClick={method} className={`${styles.btn} ${styles.buttonCancel}`}>{children}</button>;
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