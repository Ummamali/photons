import React, { forwardRef } from "react";
import Loader from "../utils/Loader";
import loadingSrc from "../../media/loader_bars.gif";

// following are the validity states
// 0 =====> Not sure whether valid or invalid
// 1 =========> Loading......
// 2 =====> Good (tick will be shown)
//  3 ====> Invalid (cross will be shown)

const RefFormGroup = forwardRef((props, ref) => {
  const isInvalid = props.vData.vStatus === 3;
  let additionalCls = isInvalid
    ? " bg-red-50 border-red-500 placeholder-red-400 text-red-500"
    : "";
  let icon = null;
  if (!props.hideIcons) {
    if (props.vData.vStatus === 1) {
      icon = <Loader addCls="absolute top-1 right-2" w={25} src={loadingSrc} />;
    } else if (props.vData.vStatus === 2) {
      icon = (
        <i className="fas fa-check-circle absolute top-2.5 right-3 text-green-500"></i>
      );
    } else if (isInvalid) {
      icon = (
        <i className="fas fa-exclamation-circle absolute top-2.5 right-3 text-red-500"></i>
      );
    }
  }
  return (
    <div className={"form-group " + (props.className ? props.className : "")}>
      <label htmlFor={props.id} className="block text-gray-500 mb-1">
        {props.label}
      </label>
      <div className="relative">
        <input
          type={props.type}
          id={props.id}
          className={
            "border border-gray-400 border-opacity-60 block w-full focus:outline-none focus:border-gray-600 py-1 pl-2 pr-10 text-gray-700 rounded" +
            additionalCls
          }
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          min={props.min}
          max={props.max}
          ref={ref}
          data-identity={props.id}
          onFocus={props.resetValidity}
          onBlur={props.validate}
        />
        {icon}
      </div>
      {isInvalid && (
        <p className="text-red-500 text-opacity-90 text-sm italic mt-1">
          {props.vData.msg}
        </p>
      )}
    </div>
  );
});

export default RefFormGroup;
