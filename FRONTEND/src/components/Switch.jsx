import React from "react";
import styles from "../Styles/Toggle.module.css";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

function ToggleTheme({ toggleTheme, label }) {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switchTheme}>
        <input type="checkbox" onChange={toggleTheme} />
        <span className={styles.slider}>{label}</span>
      </label>
    </div>
  );
}

function SwitchComponent({ onChange, checked, name, label }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Switch name={name} checked={checked} onChange={onChange} size="medium" />
      }
      labelPlacement="start"
    />
  )
}

export { ToggleTheme, SwitchComponent };