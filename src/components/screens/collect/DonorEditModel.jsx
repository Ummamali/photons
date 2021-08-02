import React, { useState } from "react";
import Model from "../../utils/Model";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useValidator, {
  getDefaultResetValidator,
  getDefaultValidator,
} from "../../../hooks/useValidator";
import RefFormGroup from "../../utils/RefFormGroup";
import PaymentInput, { getPaymentChangeHandler } from "./PaymentInput";
import ControlledFormGroup from "../../utils/ControlledFormGroup";

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

  // state of the inputs
  const [donorName, setDonorName] = useState(currDonor.name);
  const [donorMoney, setDonorMoney] = useState(
    currDonor.hasPaid ? currDonor.amount : ""
  );
  const [donorDate, setDonorDate] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("MONEY");

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
  const validateInputs = getDefaultValidator(validateCore);
  const resetValidity = getDefaultResetValidator(dispatchValidator);

  const paymentChangeHandler = getPaymentChangeHandler(
    setDonorMoney,
    setDonorDate
  );

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
          <ControlledFormGroup
            vData={validityStatuses.donorName}
            id="donorName"
            label="Donor Name"
            type="text"
            placeholder="Enter new name here..."
            autoComplete="off"
            validate={validateInputs}
            resetValidity={resetValidity}
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
          <PaymentInput
            validate={validateInputs}
            resetValidity={resetValidity}
            vData={validityStatuses.amount}
            moneyValue={donorMoney}
            dateValue={donorDate}
            onChange={paymentChangeHandler}
            paymentMode={paymentMode}
            onPaymentModeChange={(e) =>
              setPaymentMode(e.target.dataset.category)
            }
          />
        </div>
        <div className="border border-gray-400 border-opacity-70 px-4 py-4 bg-gray-50 flex items-center justify-between mb-6">
          <ControlledFormGroup
            vData={validityStatuses.addAmount}
            id="addAmount"
            label="Add Amount"
            type="text"
            placeholder="Add more amount to total..."
            autoComplete="off"
            validate={validateInputs}
            resetValidity={resetValidity}
            className="donor-add mr-3"
            hideIcons={true}
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
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
