import React, { useState, useRef, useReducer } from "react";
import useRequest from "../../../hooks/useRequest";
import RefFormGroup from "../../utils/RefFormGroup";
import { server } from "../../../configs";
import Button from "../../utils/Button";

import useValidator, { vActions } from "../../../hooks/useValidator";

const validators = {
  userName: async (value) => {
    const reponse = await fetch(`${server.routes.checkUser}?userName=${value}`);
    const resObj = await reponse.json();
    return resObj.payload.isRegistered;
  },
  amount: (value) => value >= 1,
};

const defaultErrors = {
  userName: "Invalid User Name has been given",
  amount: "Invalid amount has been given",
};

export default function AddContribution() {
  const references = {
    userName: useRef(),
    amount: useRef(),
  };

  // the validator
  const [validityStatuses, allValid, dispatchValidator, validate0] =
    useValidator(defaultErrors, validators, ["userName"]);

  console.log(allValid);
  function submitHandler(e) {
    e.preventDefault();
    for (const group in references) {
      validate({ target: references[group].current });
    }
    console.log("validation done");
  }

  function validate(event) {
    const target = event.target;
    const identity = target.dataset.identity;
    const value = target.value;
    validate0(identity, value);
  }

  function resetValidity(e) {
    const identity = e.target.dataset.identity;
    dispatchValidator(vActions.RESET({ identity }));
  }
  return (
    <div className="py-10">
      <div>
        <h2 className="text-center text-3xl text-gray-600 mb-4">
          Add Contribution
        </h2>
        <form className="block w-small mx-auto" onSubmit={submitHandler}>
          <div className="space-y-2.5 mb-4">
            <RefFormGroup
              id="userName"
              label="User Name"
              ref={references.userName}
              placeholder="Enter Username Here..."
              type="text"
              vData={validityStatuses.userName}
              resetValidity={resetValidity}
              validate={validate}
            />
            <RefFormGroup
              id="amount"
              label="Amount"
              ref={references.amount}
              placeholder="Enter amount here..."
              type="number"
              min={1}
              vData={validityStatuses.amount}
              resetValidity={resetValidity}
              validate={validate}
              hideIcons
            />
          </div>
          <Button addCls="w-40" type="submit">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
