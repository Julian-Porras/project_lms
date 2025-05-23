function SelectOptions({
  name,
  id,
  options = [],
  getOptionLabel,
  getOptionValue,
  selected,
  setSelected,
  placeholder,
}) {
  return (
    <select
      name={name}
      id={id}
      value={String(selected)}
      onChange={(e) => {
        const value = e.target.value;
        if (value === "true") setSelected(true);
        else if (value === "false") setSelected(false);
        else setSelected(value);
      }}
      className="w-45 border border-[var(--light-gray-color)] text-sm rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
    >
      <option value="" disabled>
        {placeholder || "Select an option"}
      </option>
      {options.map((option, index) => (
        <option key={index} value={String(getOptionValue(option))}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
}

export default SelectOptions;
