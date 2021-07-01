import React from "react";
import { useState } from "react";
import { useRef } from "react";
import useRequest from "../../../hooks/useRequest";
import RefFormGroup from "../../utils/RefFormGroup";
import { server } from "../../../configs";
import Button from "../../utils/Button";

const validators = {
  userName: async (value) => {
    const reponse = await fetch(`${server.routes.checkUser}?userName=${value}`);
    const resObj = await reponse.json();
    return resObj.payload.isRegistered;
  },
  amount: (value) => value >= 1,
};

export default function AddContribution() {
  const references = {
    userName: useRef(),
    amount: useRef(),
  };
  const [reqData, sendRequest] = useRequest();
  const [validityStatus, setvalidityStatus] = useState({
    userName: 0,
    amount: 0,
  });

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
    if (identity === "userName") {
      setvalidityStatus((prev) => ({ ...prev, [identity]: 1 }));
      validators[identity](value)
        .then((isRegistered) => {
          if (isRegistered) {
            setvalidityStatus((prev) => ({ ...prev, [identity]: 2 }));
          } else {
            setvalidityStatus((prev) => ({ ...prev, [identity]: 3 }));
          }
        })
        .catch((error) => {
          console.log(error);
          setvalidityStatus((prev) => ({ ...prev, [identity]: 3 }));
        });
    } else {
      const inputValidStatus = validators[identity](value) ? 2 : 3;
      setvalidityStatus((prev) => ({ ...prev, [identity]: inputValidStatus }));
    }
  }

  function resetValidity(e) {
    const identity = e.target.dataset.identity;
    setvalidityStatus((prev) => {
      const state = { ...prev };
      state[identity] = 0;
      return state;
    });
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
              status={validityStatus.userName}
              invalidText="Invalid User Name has been given"
              resetValidity={resetValidity}
              validate={validate}
            />
            <RefFormGroup
              id="amount"
              label="Amount"
              ref={references.amount}
              placeholder="Enter amount here..."
              type="number"
              status={validityStatus.amount}
              min={1}
              invalidText="Invalid amount given"
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
