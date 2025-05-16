function SelectOptions({name, id, options, values, selected, setSelected}) {
    return (
        <select
            name={name}
            id={id}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-45 border border-[var(--light-gray-color)] text-sm rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-[var(--secondary-color)]"
        >
            {options.map((option, index) => (
                <option key={index} value={values[index]}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default SelectOptions;