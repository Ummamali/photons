import React, { forwardRef } from "react";

const FormGroup = forwardRef((props, ref) => {
  const invalidClasses = props.isInvalid
    ? " bg-red-50 border-red-500 placeholder-red-400"
    : "";
  return (
    <div className={props.className}>
      <label htmlFor={props.id} className="block text-gray-500 mb-1">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        className={
          "border border-gray-400 border-opacity-60 block w-full focus:outline-none focus:border-gray-600 py-1 px-2 text-gray-700 rounded" +
          invalidClasses
        }
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        ref={ref}
      />
      {props.isInvalid && (
        <p className="text-red-500 text-opacity-90 text-sm italic mt-1">
          * {props.invalidText}
        </p>
      )}
    </div>
  );
});

export default FormGroup;
