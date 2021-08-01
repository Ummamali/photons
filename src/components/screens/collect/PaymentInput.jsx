import React, { useState } from "react";
import RadioButtons from "../../utils/RadioButtons";
import RefFormGroup from "../../utils/RefFormGroup";

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
const PaymentInput = React.forwardRef(
  ({ hasPaid, vData, validate, resetValidity }, ref) => {
    /*
    This component is common to the donor adder and editor model
  */

    // keeping track of the mode of collection
    const [paymentMode, setPaymentMode] = useState(hasPaid ? "MONEY" : "DATE");
    return (
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
            vData={vData}
            id="amount"
            type="number"
            placeholder="Enter new amount here..."
            autoComplete="off"
            validate={validate}
            resetValidity={resetValidity}
            ref={ref}
          />
        ) : (
          <input
            type="date"
            className="border border-gray-400 border-opacity-60 block w-full focus:outline-none focus:border-gray-600 text-gray-500 rounded p-2 text-sm"
            ref={ref}
          />
        )}
      </div>
    );
  }
);

export default PaymentInput;
