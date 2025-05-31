import styles from "../styles/input.module.css";
import TextField from '@mui/material/TextField';

function InputText({ type, name, value, onChange, placeholder }) {
  return (
    <input
      className={styles.textInput}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function InputComponent({
  error,
  name,
  value,
  type,
  label,
  onChange,
  placeholder,
  helperText,
  hiddenLabel,
  variant = "outlined" || "filled" || "standard",
}) {
  return (
    <TextField
      error={error || false}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      label={hiddenLabel ? null : label}
      placeholder={placeholder}
      helperText={helperText}
      variant={variant}
      size="medium"
      sx={{
        input:
        {
          fontSize: ".9rem",
          padding: "13px 14px",
          borderColor: 'var(--secondary-hover-color, #0f3a58)',
        },
      }}
      hiddenLabel={hiddenLabel || false}
    />
  );
}


export { InputText, InputComponent };