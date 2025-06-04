import styles from "../styles/input.module.css";
import TextField from '@mui/material/TextField';

export const handleKeyUp = (e) => {
  e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
};

function InputText({
  type,
  name,
  value,
  onChange,
  placeholder,
  caps = false,
  errors
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className={styles.textInput}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyUp={caps ? handleKeyUp : null}
        autoComplete="off"
      />
      {errors && <p className="text-sm text-red-500 mt-1">&nbsp;{errors}</p>}
    </div>
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