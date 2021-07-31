import React from "react";
import { useRef } from "react";
import { joinURL, routes } from "../../../configs";
import useValidator, { vActions } from "../../../hooks/useValidator";
import Model from "../../utils/Model";
import RefFormGroup from "../../utils/RefFormGroup";
import ReqButton from "../../utils/ReqButton";

// following are the validatorrs
const vIdentityList = {
  donorName: "Donor name must contain atleast 5 and atmost 20 characters",
  amount: "Invalid amount, must be greater than 0",
};
const validators = {
  donorName: async (value) => {
    if (value.length >= 5 && value.length < 20) {
      const response = await fetch(
        joinURL(routes.checkDonor + `?name=${value}`)
      );
      const { payload } = await response.json();
      const msg = payload.available
        ? null
        : "This name already exists, try another";
      return { isValid: payload.available, msg };
    } else {
      return { isValid: false };
    }
  },
  amount: (value) => ({ isValid: value > 0 }),
};
const asyncValidators = ["donorName"];

// Component -----------------------------
export default function AddDonorModel() {
  // references to input elements
  const inputRefs = {
    donorName: useRef(),
    amount: useRef(),
  };
  // validity statuses
  const [vStatuses, dispatchValidator, validateCore] = useValidator(
    vIdentityList,
    validators,
    asyncValidators
  );

  //   the validator function
  function validateInput(e) {
    const value = e.target.value;
    const identity = e.target.dataset.identity;
    validateCore(identity, value);
  }

  //   to reset the validity
  function resetValidity(e) {
    const identity = e.target.dataset.identity;
    dispatchValidator(vActions.RESET({ identity }));
  }

  // form submit handler
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <Model className="bg-white w-hard-small p-12 rounded shadow">
      <h2 className="text-2xl text-gray-800 mb-4">Add a new Donor</h2>
      <form onSubmit={submitHandler}>
        <div className="space-y-3 mb-4">
          <RefFormGroup
            vData={vStatuses.donorName}
            id="donorName"
            label="Donor Name"
            type="text"
            ref={inputRefs.donorName}
            placeholder="Name of the donor....."
            validate={validateInput}
            resetValidity={resetValidity}
            autoComplete="off"
          />
          <RefFormGroup
            vData={vStatuses.amount}
            id="amount"
            label="Amount"
            type="text"
            ref={inputRefs.amount}
            placeholder="Amount..."
            validate={validateInput}
            resetValidity={resetValidity}
            hideIcons={true}
          />
        </div>
        <ReqButton type="submit" className="px-12 text-sm" reqStatus={2}>
          Add New
        </ReqButton>
      </form>
    </Model>
  );
}
