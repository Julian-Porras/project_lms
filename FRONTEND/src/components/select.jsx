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
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="w-45 border border-[var(--light-gray-color)] text-sm rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
    >
      <option value="" disabled>
        {placeholder || "Select an option"}
      </option>
      {options.map((option, index) => (
        <option key={index} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
}

export default SelectOptions;
