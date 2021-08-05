import React, { useState } from "react";
import Model from "../../utils/Model";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useValidator, {
  getDefaultResetValidator,
  getDefaultValidator,
  syncValidateAll,
} from "../../../hooks/useValidator";
import PaymentInput, { getPaymentChangeHandler } from "./PaymentInput";
import ControlledFormGroup from "../../utils/ControlledFormGroup";
import {
  dateValueToStamp,
  getDonorFromFields,
  stamptoDateValue,
} from "../../../utilFuncs/basics";
import { updateDonor } from "../../../store/thunks";

// following are the validatorrs
const vErrorMessages = {
  donorName: "Donor name must contain atleast 5 and atmost 34 characters",
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

  const hasPaid = currDonor.hasPaid;

  // state of the inputs
  const [donorName, setDonorName] = useState(currDonor.name);
  const [donorMoney, setDonorMoney] = useState(hasPaid ? currDonor.amount : 0);
  const [donorDate, setDonorDate] = useState(
    hasPaid ? "" : stamptoDateValue(currDonor.amount)
  );
  const [addAmount, setAddAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState(hasPaid ? "MONEY" : "DATE");

  // dispatching the main store
  const dispatchStore = useDispatch();

  // VALIDATIONS
  // as the validators require the state therefore, they must be inside of the component
  const validators = {
    donorName: (value) => {
      if (value.length >= 5 && value.length < 34) {
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

  // add the addAmount to the total if mode is Money
  function addMoneyFromField(e) {
    e.preventDefault();
    const isValid = validateCore("addAmount", addAmount);
    if (isValid && paymentMode === "MONEY") {
      setDonorMoney((prev) => parseInt(prev) + parseInt(addAmount));
      setAddAmount("");
    }
  }

  function saveData(e) {
    const formValues = { donorName };
    if (paymentMode === "MONEY") {
      formValues.amount = donorMoney;
    }
    const formIsValid = syncValidateAll(formValues, validateCore);
    if (formIsValid) {
      dispatchStore(
        updateDonor(
          getDonorFromFields({ donorName, donorDate, donorMoney }, paymentMode),
          currDonor.name
        )
      );
      historyObj.replace(`/collect`);
    }
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
        <form
          className="border border-gray-400 px-4 py-4 flex items-center justify-between mb-6"
          onSubmit={addMoneyFromField}
        >
          <ControlledFormGroup
            vData={validityStatuses.addAmount}
            id="addAmount"
            label="Add Amount"
            type="number"
            placeholder="Add more amount to total..."
            autoComplete="off"
            resetValidity={resetValidity}
            className="donor-add mr-3"
            hideIcons={true}
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
          />
          <button
            className="py-1 px-4 bg-gray-700 text-gray-300 text-sm rounded"
            type="submit"
          >
            <i className="fas fa-plus"></i>
          </button>
        </form>
        <div>
          <button
            className="bg-primary py-2 px-16 text-white text-opacity-80 mr-4"
            onClick={saveData}
          >
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
