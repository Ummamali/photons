import React from "react";
import Loader from "../utils/Loader";
import loadingSrc from "../../media/loader_bars.gif";

/* Following are the validity states (vStatuses)
      0 =====> Not sure whether valid or invalid
      1 =========> Loading......
      2 =====> Good (tick will be shown)
      3 ====> Invalid (cross will be shown) 
*/

export default function ControlledFormGroup(props) {
  /*
    Controlled Form Group:
    A form group to easily get data from the user, update the state on change and giving feedback on validation

    This component is similar to RefFormGroup with two differences:
      --- it requires a value prop 
      --- it requires an onChange handler
  
    Props:
      {
        >>>> value: The value will be given to input element
        >>>> onChange: function(e)
          (this handler will get the same input element and you have to change the state by yourself)
        >>>> vData: {vStatus: 0|1|2|3, msg: String}
         (This object is present in first element of the useValidator Hook returned List )
        >>>> hideIcons: hides the icons on input element if true
        >>>> className: the class names to be applied on the parent div
        >>>> id: the id of the input element for label and also for data-identity prop
        NOTE: id should be same as you are using for the validator hook 
        >>>> label: Label
        >>>> type: The type for the input element
        >>>> forInputEl: Object (the props that you want to give directly to the input element)
        You can give following props to the refComponent and it will forward to the input el
          placeholder, autoComplete, min, max
      
        >>>> validate: function(e)
          (this should be an event handler, and will be called upon blur)
        >>>>  resetValidity function(e)
          (this should be an event handler, and will be called upon focus)
        NOTE: Above two handler will have input element as targets, with a special dataset value of 'identity', use this to know which input is the point of interest

      }
  
  */
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
          value={props.value}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          min={props.min}
          max={props.max}
          data-identity={props.id}
          onFocus={props.resetValidity}
          onBlur={props.validate}
          onChange={props.onChange}
          {...props.forInputEl}
        />
        {icon}
      </div>
      {isInvalid && (
        <p className="text-red-500 text-opacity-90 text-sm italic mt-1 invalid-msg">
          {props.vData.msg}
        </p>
      )}
    </div>
  );
}
