import classNames from "classnames";
import React, { useState } from "react";

export interface Props
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "type"> {
  label?: string;
  type?: "text" | "password" | "email";
  inputType?: "success" | "warning" | "error";
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const inputTypeClasses = {
  success: ".is-success",
  warning: ".is-warning",
  error: ".is-error",
  empty: ''
};

const Input: React.FC<Props> = ({
  label,
  inputType,
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      {label && (
        <label className="block text-sm font-medium leading-5 text-gray-700">
          {label}
        </label>
      )}
      <input
        className={classNames("nes-input", inputTypeClasses[inputType ?? 'empty'])}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Input;
