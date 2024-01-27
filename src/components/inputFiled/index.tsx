// import React from "react";

// interface DeliveryInputProps {
//   label: string;
//   id: string;
//   dataTestId: string;
//   value: string;
//   name: string; // Add the 'name' prop
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: "text" | "number" | "datetime-local";
// }

// const DeliveryInput: React.FC<DeliveryInputProps> = ({
//   label,
//   id,
//   dataTestId,
//   value,
//   name, // Use the 'name' prop for the input name
//   onChange,
//   type = "text",
// }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       {type === "datetime-local" ? (
//         <input
//           type={type}
//           id={id}
//           data-test-id={dataTestId}
//           name={name} // Use the 'name' prop for the input name
//           className="mt-1 p-2 border border-gray-300 rounded-md"
//           value={value}
//           onChange={onChange}
//         />
//       ) : (
//         <input
//           type={type}
//           id={id}
//           data-test-id={dataTestId}
//           name={name} // Use the 'name' prop for the input name
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           value={value}
//           onChange={onChange}
//         />
//       )}
//     </div>
//   );
// };

// export default DeliveryInput;

import React from "react";
// import useIsMount from "../../utils/useIsMount";

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

const Input: React.FunctionComponent<InputProps> = ({
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

  //   const isMount = useIsMount();

  //   React.useEffect(() => {
  // Skip on mount
  //     if (value && !isMount) {
  //       setLocalValue(value);
  //       isValidInput(Number(value), Number(min), Number(max));
  //     }
  //   }, [value]);

  const getBorderColor = () => {
    if (error) {
      return `border-red-500`;
    }
    if (valid) {
      return `border-green-500`;
    }
    return `border-gray-300`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);

    //TODO:  Update parent component if the data is valid
    isValidInput(Number(e.target.value), Number(min), Number(max));
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
    // validate error
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
      />
      {supportingText && (
        <h6 className={"inline-block ml-3"}>{supportingText}</h6>
      )}
    </div>
  );
};

export default Input;
