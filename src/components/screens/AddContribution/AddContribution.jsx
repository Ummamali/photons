import React from "react";
import { useState } from "react";
import { useRef } from "react";

import FormGroup from "../../utils/FormGroup";
export default function AddContribution() {
  const userNameRef = useRef();
  const amountRef = useRef();
  const [invalidInputs, setInvalidInputs] = useState({
    userName: false,
    amount: false,
  });
  return (
    <div className="py-10">
      <div>
        <h2 className="text-center text-3xl text-gray-600 mb-4">
          Add Contribution
        </h2>
        <form className="block w-sec mx-auto space-y-4">
          <FormGroup
            id="username"
            label="User Name"
            ref={userNameRef}
            placeholder="Enter Username Here..."
            type="text"
            isInvalid={invalidInputs.userName}
            invalidText="Invalid User Name has been given"
          />
          <FormGroup
            id="amount"
            label="Amount"
            ref={amountRef}
            placeholder="Enter amount here..."
            type="number"
            isInvalid={invalidInputs.amount}
            min={1}
            invalidText="Invalid amount given"
          />
          <button type="submit" className="py-2">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
