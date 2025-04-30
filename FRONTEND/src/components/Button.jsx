import React from "react";
import styles from '../styles/button.module.css';

function ButtonGreen({ text }) {
    return <button className={`${styles.btn} ${styles.buttonGreen}`}>{text}</button>;
}

function ButtonRed({ text }) {
    return <button className={`${styles.btn} ${styles.buttonRed}`}>{text}</button>;
}

function ButtonAccent({ text }) {
    return <button className={`${styles.btn} ${styles.buttonAccent}`}>{text}</button>;
}

function ButtonPrimary({ text }) {
    return <button className={`${styles.btn} ${styles.buttonPrimary}`}>{text}</button>;
}

function ButtonCancel({ text }) {
    return <button className={`${styles.btn} ${styles.buttonCancel}`}>{text}</button>;
}

export {
    ButtonGreen,
    ButtonRed,
    ButtonAccent,
    ButtonPrimary,
    ButtonCancel
};