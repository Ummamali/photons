import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useValidator, {
  getDefaultResetValidator,
  getDefaultValidator,
  syncValidateAll,
} from "../../../hooks/useValidator";
import ControlledFormGroup from "../../utils/ControlledFormGroup";
import Model from "../../utils/Model";
import ReqButton from "../../utils/ReqButton";
import PaymentInput, { getPaymentChangeHandler } from "./PaymentInput";

// following are the validatorrs
const vIdentityList = {
  donorName: "Donor name must contain atleast 5 and atmost 20 characters",
  amount: "Invalid amount, must be greater than 0",
};

// Component -----------------------------
export default function AddDonorModel() {
  const historyObj = useHistory();

  // state of the inputs
  const [donorName, setDonorName] = useState("");
  const [donorMoney, setDonorMoney] = useState("");
  const [donorDate, setDonorDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("MONEY");

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

  const paymentChangeHandler = getPaymentChangeHandler(
    setDonorMoney,
    setDonorDate
  );

  //   the validator function
  const validateInput = getDefaultValidator(validateCore);
  const resetValidity = getDefaultResetValidator(dispatchValidator);

  // form submit handler
  function submitHandler(e) {
    e.preventDefault();
    const formIsValid = syncValidateAll(
      { donorName: donorName, amount: donorMoney },
      validateCore
    );
    console.log(formIsValid);
  }

  function closeIt() {
    historyObj.push("/collect");
  }

  return (
    <Model
      className="bg-white w-hard-small p-12 rounded shadow"
      onClose={closeIt}
    >
      <h2 className="text-2xl text-gray-800 mb-4">Add a new donor</h2>
      <form onSubmit={submitHandler}>
        <div className="space-y-3 mb-4">
          <ControlledFormGroup
            vData={vStatuses.donorName}
            id="donorName"
            label="Donor Name"
            type="text"
            placeholder="Name of the donor....."
            validate={validateInput}
            resetValidity={resetValidity}
            autoComplete="off"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
          <PaymentInput
            hasPaid={true}
            validate={validateInput}
            resetValidity={resetValidity}
            vData={vStatuses.amount}
            moneyValue={donorMoney}
            dateValue={donorDate}
            onChange={paymentChangeHandler}
            paymentMode={paymentMode}
            onPaymentModeChange={(e) =>
              setPaymentMode(e.target.dataset.category)
            }
          />
        </div>
        <ReqButton type="submit" className="px-12 text-sm" reqStatus={2}>
          Add New
        </ReqButton>
      </form>
    </Model>
  );
}
