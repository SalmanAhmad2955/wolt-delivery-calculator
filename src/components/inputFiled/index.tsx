import React from "react";

interface InputProps {
  label: string;
  htmlFor: string;
  type: string;
  step: string;
  id: string;
  dataTestId: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  supportingText?: string;
  min?: string;
  max?: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  label,
  htmlFor,
  type,
  step,
  id,
  dataTestId,
  name,
  onChange,
  value,
  supportingText,
  min,
  max,
}) => {
  const [localValue, setLocalValue] = React.useState<string>(value || "");
  const [error, setError] = React.useState<boolean>(false);
  const [valid, setValid] = React.useState<boolean>(false);

  const getBorderColor = () => {
    if (error) {
      return `border-red-500`;
    }
    if (valid) {
      return `border-blue-300`;
    }
    return `border-gray-300`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    const numericValue = parseFloat(e.target.value);
    isValidInput(numericValue, Number(min), Number(max));
    onChange && onChange(e);
  };

  const isValidInput = (value: number, min: number, max: number) => {
    if (value === 0) {
      setError(true);
      setValid(false);
      return false;
    }
    if (value < min || value > max) {
      setError(true);
      setValid(false);
      return false;
    }
    setError(false);
    setValid(true);
    return true;
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.patternMismatch) {
      setValid(false);
      setError(true);
    }
  };

  return (
    <div className={"py-1"}>
      <label className={"pr-3 w-36 inline-block text-right"} htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className={`${getBorderColor()} border-2 w-64 rounded-md px-2 py-1 inline-block focus:ring-4 focus:outline-0`}
        onBlur={handleBlur}
        type={type}
        id={id}
        data-test-id={dataTestId}
        name={name}
        step={step}
        onChange={handleChange}
        value={localValue}
        min={min}
        max={max}
        pattern="[-]?[0-9]*[.,]?[0-9]+"
        inputMode="decimal"
        aria-invalid={error}
        aria-describedby={error ? `${id}-error-message` : undefined}
      />
      {supportingText && (
        <h6 className={"inline-block ml-3"}>{supportingText}</h6>
      )}
      {error && (
        <div
          id={`${id}-error-message`}
          className={"py-1 text-red-500 ml-36 text-sm"}
          role="alert"
        >
          Invalid input. Please enter a valid Value.
        </div>
      )}
    </div>
  );
};
