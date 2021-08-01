import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import useValidator, { vActions } from "../../../hooks/useValidator";
import Model from "../../utils/Model";
import RefFormGroup from "../../utils/RefFormGroup";
import ReqButton from "../../utils/ReqButton";
import PaymentInput from "./PaymentInput";

// following are the validatorrs
const vIdentityList = {
  donorName: "Donor name must contain atleast 5 and atmost 20 characters",
  amount: "Invalid amount, must be greater than 0",
};

// Component -----------------------------
export default function AddDonorModel() {
  // references to input elements
  const inputRefs = {
    donorName: useRef(),
    amount: useRef(),
  };

  // getting the donors for validations, as collectScreen is a LoadScreen, this donors stte will be populated already
  const donors = useSelector((state) => state.donors);

  // as the validators require the state therefore, they must be inside of the component
  const validators = {
    donorName: (value) => {
      if (value.length >= 5 && value.length < 20) {
        const available = !(value in donors.data);
        const msg = available ? null : "This name already exists, use another!";
        return { isValid: available, msg };
      } else {
        return { isValid: false };
      }
    },
    amount: (value) => ({ isValid: value > 0 }),
  };
  // validity statuses
  const [vStatuses, dispatchValidator, validateCore] = useValidator(
    vIdentityList,
    validators
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
    const formValues = {};
    const validations = [];
    for (const [identity, ref] of Object.entries(inputRefs)) {
      formValues[identity] = ref.current.value;
      validations.push(validateCore(identity, ref.current.value));
    }
    const formIsValid = !validations.includes(false);
    if (formIsValid) {
      console.log("submitting the donors add form");
    }
  }

  return (
    <Model className="bg-white w-hard-small p-12 rounded shadow">
      <h2 className="text-2xl text-gray-800 mb-4">Add a new donor</h2>
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
          <PaymentInput
            hasPaid={true}
            validate={validateInput}
            resetValidity={resetValidity}
            vData={vStatuses.amount}
            ref={inputRefs.amount}
          />
        </div>
        <ReqButton type="submit" className="px-12 text-sm" reqStatus={2}>
          Add New
        </ReqButton>
      </form>
    </Model>
  );
}
