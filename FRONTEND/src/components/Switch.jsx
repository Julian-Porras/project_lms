import React from "react";
import styles from "../Styles/Toggle.module.css";
import Switch from '@mui/material/Switch';

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

function SwitchComponent({handleChange, checked}){
  <Switch checked={checked} onChange={handleChange} />
}

export {ToggleTheme, SwitchComponent};