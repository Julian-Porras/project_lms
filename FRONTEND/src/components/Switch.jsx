import React from "react";
import styles from "../Styles/Toggle.module.css";

function ToggleTheme({ toggleTheme }) {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switchTheme}>
        <input type="checkbox" onChange={toggleTheme} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export {ToggleTheme};