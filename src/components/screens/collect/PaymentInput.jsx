import React from "react";
import ControlledFormGroup from "../../utils/ControlledFormGroup";
import RadioButtons from "../../utils/RadioButtons";

// for the radio buttons
const modeIdtoCategories = {
  "radio-paid": "MONEY",
  "radio-not-paid": "DATE",
};
const modeIdToLabels = {
  "radio-paid": "Money",
  "radio-not-paid": "Date",
};

// Component --------------------------------------
export default function PaymentInput({
  vData,
  validate,
  resetValidity,
  moneyValue,
  dateValue,
  onChange,
  paymentMode,
  onPaymentModeChange,
}) {
  /*
    This component is common to the donor adder and editor model
  */
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-gray-500 mr-6">Payment</p>
        <RadioButtons
          idToCategory={modeIdtoCategories}
          idToLabels={modeIdToLabels}
          name="edit-payment-mode"
          onChange={onPaymentModeChange}
          currentCategory={paymentMode}
          className="default-radios flex items-center space-x-4 text-gray-500 text-sm"
        />
      </div>
      {paymentMode === "MONEY" ? (
        <ControlledFormGroup
          vData={vData}
          id="amount"
          type="number"
          placeholder="Enter amount here..."
          autoComplete="off"
          hideIcons={true}
          validate={validate}
          resetValidity={resetValidity}
          value={moneyValue}
          onChange={onChange}
        />
      ) : (
        <input
          type="date"
          className="border border-gray-400 border-opacity-60 block w-full focus:outline-none focus:border-gray-600 text-gray-500 rounded p-2 text-sm"
          value={dateValue}
          onChange={onChange}
        />
      )}
    </div>
  );
}

// the payment input changeHandler
export function getPaymentChangeHandler(moneySetter, dateSetter) {
  return (e) => {
    const target = e.target;
    if (target.type === "number") {
      moneySetter(target.value);
    } else if (target.type === "date") {
      dateSetter(target.value);
    }
  };
}
