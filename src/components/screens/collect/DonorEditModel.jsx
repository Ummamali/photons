import React, { useRef } from "react";
import Model from "../../utils/Model";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useValidator, { vActions } from "../../../hooks/useValidator";
import { useEffect } from "react";
import { useState } from "react";
import RefFormGroup from "../../utils/RefFormGroup";
import RadioButtons from "../../utils/RadioButtons";

// following are the validatorrs
const vErrorMessages = {
  donorName: "Donor name must contain atleast 5 and atmost 20 characters",
  amount: "Invalid amount, must be greater than 0",
};

// for the radio buttons
const modeIdtoCategories = {
  "radio-paid": "MONEY",
  "radio-not-paid": "DATE",
};
const modeIdToLabels = {
  "radio-paid": "Money",
  "radio-not-paid": "Date",
};

// Component --------------------------------
export default function DonorEditModel() {
  const locationObj = useLocation();
  const searchParams = new URLSearchParams(locationObj.search);
  const name = searchParams.get("name");

  // getting donors from redux
  const donors = useSelector((state) => state.donors);

  // current donor object
  const currDonor = donors.data[name];

  // keeping track of the mode of collection PAID NOTPAID
  const [paymentMode, setPaymentMode] = useState(
    currDonor.hasPaid ? "MONEY" : "DATE"
  );

  // references
  const inputRefs = {
    donorName: useRef(),
    amount: useRef(),
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
  return (
    <Model className="bg-white p-12 w-hard-small">
      <h2 className="text-2xl mb-4 text-gray-700">Edit Donor</h2>
      <form>
        <div className="space-y-4">
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
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 mr-6">Payment</p>
              <RadioButtons
                idToCategory={modeIdtoCategories}
                idToLabels={modeIdToLabels}
                name="edit-payment-mode"
                onChange={(e) => setPaymentMode(e.target.dataset.category)}
                currentCategory={paymentMode}
                className="default-radios flex items-center space-x-4 text-gray-500 text-sm"
              />
            </div>
            {paymentMode === "MONEY" ? (
              <RefFormGroup
                vData={validityStatuses.amount}
                id="amount"
                type="number"
                placeholder="Enter new amount here..."
                autoComplete="off"
                validate={validateInputs}
                resetValidity={resetValidity}
                ref={inputRefs.amount}
              />
            ) : (
              <input
                type="date"
                className="border border-gray-400 border-opacity-60 block w-full focus:outline-none focus:border-gray-600 text-gray-500 rounded p-2 text-sm"
                ref={inputRefs.amount}
              />
            )}
          </div>
        </div>
      </form>
    </Model>
  );
}
