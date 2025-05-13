import styles from "../styles/input.module.css";

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

export { InputText };