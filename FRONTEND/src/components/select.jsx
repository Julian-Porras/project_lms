function SelectOptions({
  name,
  id,
  options = [],
  getOptionLabel,
  getOptionValue,
  selected,
  setSelected,
  placeholder,
  isLoading = false,
  errors,
}) {
  return (
    <div className="flex flex-col gap-2">
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
        disabled={isLoading}
        className="w-45 border border-[var(--light-gray-color)] text-sm rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
      >
        {(selected === "" || selected === null || selected === undefined) && (
          <option value="" disabled>
            {isLoading ? "Loading..." : (placeholder || "Select an option")}
          </option>
        )}
        {!isLoading && options.map((option, index) => (
          <option key={index} value={String(getOptionValue(option))}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
      {errors && (<p className="text-sm text-red-500 mt-1">&nbsp;{errors}</p>)}
    </div>
  );
}

export default SelectOptions;
