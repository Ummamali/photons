import React, { useRef } from "react";
import Model from "../../utils/Model";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useValidator, { vActions } from "../../../hooks/useValidator";
import { useEffect } from "react";
import { useState } from "react";
import RefFormGroup from "../../utils/RefFormGroup";
import RadioButtons from "../../utils/RadioButtons";
import PaymentInput from "./PaymentInput";

// following are the validatorrs
const vErrorMessages = {
  donorName: "Donor name must contain atleast 5 and atmost 20 characters",
  amount: "Invalid amount, must be greater than 0",
  addAmount: "Invalid amount, must be greater than 0",
};

// Wrapper Component which should be imported
export default function DonorEditModel() {
  const locationObj = useLocation();
  const searchParams = new URLSearchParams(locationObj.search);
  const name = searchParams.get("name");

  // getting donors from redux
  const donors = useSelector((state) => state.donors);

  // current donor object
  const currDonor = donors.data[name];
  return currDonor === undefined ? (
    <Redirect to="/collect" />
  ) : (
    <InternalEditModel donors={donors} currDonor={currDonor} />
  );
}

// Internal component which will load if name is valid --------------------------------
function InternalEditModel({ donors, currDonor }) {
  // history object to close
  const historyObj = useHistory();
  // references
  const inputRefs = {
    donorName: useRef(),
    amount: useRef(),
    addAmount: useRef(),
  };

  // VALIDATIONS
  // as the validators require the state therefore, they must be inside of the component
  const validators = {
    donorName: (value) => {
      if (value.length >= 5 && value.length < 20) {
        let available = !(value in donors.data);
        available = value === currDonor.name ? true : available;
        const msg = available ? null : "This name already exists, use another!";
        return { isValid: available, msg };
      } else {
        return { isValid: false };
      }
    },
    amount: (value) => ({ isValid: value > 0 }),
    addAmount: (value) => ({ isValid: value > 0 }),
  };
  const [validityStatuses, dispatchValidator, validateCore] = useValidator(
    vErrorMessages,
    validators
  );

  // to validate the inpute
  function validateInputs(e) {
    const target = e.target;
    validateCore(target.dataset.identity, target.value);
  }
  // to reset the validity
  function resetValidity(e) {
    const identity = e.target.dataset.identity;
    dispatchValidator(vActions.RESET({ identity }));
  }

  // to populate the fields upon load
  useEffect(() => {
    inputRefs.donorName.current.value = currDonor.name;
    let amountInputValue = currDonor.amount;
    if (!currDonor.hasPaid) {
      const dateObj = new Date(amountInputValue);
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      console.log(month);
      const date = dateObj.getDate().toString().padStart(2, "0");
      amountInputValue = `${dateObj.getFullYear()}-${month}-${date}`;
    }
    inputRefs.amount.current.value = amountInputValue;
  }, []);

  // close the model
  function closeIt() {
    historyObj.replace("/collect");
  }
  return (
    <Model className="bg-white donor-edit-modal py-12 px-8" onClose={closeIt}>
      <h2 className="text-3xl mb-4 text-gray-700">
        <i className="fas fa-pencil-alt mr-2"></i>Edit Donor
      </h2>
      <div>
        <div className="space-y-4 mb-4">
          <RefFormGroup
            vData={validityStatuses.donorName}
            id="donorName"
            label="Donor Name"
            type="text"
            placeholder="Enter new name here..."
            autoComplete="off"
            validate={validateInputs}
            resetValidity={resetValidity}
            ref={inputRefs.donorName}
          />
          <PaymentInput
            hasPaid={currDonor.hasPaid}
            validate={validateInputs}
            resetValidity={resetValidity}
            vData={validityStatuses.amount}
            ref={inputRefs.amount}
          />
        </div>
        <div className="border border-gray-400 px-4 py-4 bg-gray-50 flex items-center justify-between mb-6">
          <RefFormGroup
            vData={validityStatuses.addAmount}
            id="addAmount"
            label="Add Amount"
            type="text"
            placeholder="Add more amount to total..."
            autoComplete="off"
            validate={validateInputs}
            resetValidity={resetValidity}
            ref={inputRefs.addAmount}
            className="donor-add mr-3"
            hideIcons={true}
          />
          <button className="py-1 px-4 bg-gray-700 text-gray-300 text-sm rounded">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div>
          <button className="bg-primary py-2 px-16 text-white text-opacity-80 mr-4">
            Save
          </button>
          <button className="text-gray-700" onClick={closeIt}>
            Cancel
          </button>
        </div>
      </div>
    </Model>
  );
}
