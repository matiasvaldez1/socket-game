import React, { useState } from "react";

interface Props extends Omit<JSX.IntrinsicElements['select'], 'ref' | 'type'> {
  label?: string;
  selectType?: "success" | "warning" | "error";
  options: { value: string; label: string }[];
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
}

const selectTypeClasses = {
  success: ".is-success",
  warning: ".is-warning",
  error: ".is-error",
  empty: ''
};

const selectTypeClassesForElements = {
  success: "success_select",
  warning: "warning_select",
  error: "error_select",
  empty: ''
};

const Select: React.FC<Props> = ({
  label,
  selectType,
  options,
  className = "",
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`relative rounded-md shadow-sm nes-select ${selectTypeClasses[selectType ?? 'empty']} ${className}`}>
      {label && (
        <label htmlFor={selectTypeClassesForElements[selectType ?? 'empty']} className="block text-sm font-medium leading-5 text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectTypeClassesForElements[selectType ?? 'empty']}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
