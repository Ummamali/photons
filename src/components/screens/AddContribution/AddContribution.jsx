import React, { useRef, useState } from "react";
import useRequest, { mapFeedback } from "../../../hooks/useRequest";
import RefFormGroup from "../../utils/RefFormGroup";
import { server, joinURL } from "../../../configs";
import ReqButton from "../../utils/ReqButton";
import useValidator, { vActions } from "../../../hooks/useValidator";

const validators = {
  userName: async (value) => {
    const reponse = await fetch(
      `${joinURL(server.routes.checkUser)}?userName=${value}`
    );
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

  // the validator hook
  const [validityStatuses, dispatchValidator, validateCore] = useValidator(
    defaultErrors,
    validators,
    ["userName"]
  );

  // for submitting the form
  const [reqData, sendRequest] = useRequest();
  const [submissiobStatus, setSubmissionStatus] = useState(0);

  function submitHandler(e) {
    e.preventDefault();
    const validations = [];
    const formValues = {};
    for (const [idName, idRef] of Object.entries(references)) {
      validations.push(validateCore(idName, idRef.current.value));
      formValues[idName] = idRef.current.value;
    }
    Promise.all(validations).then((vResolved) => {
      const formIsValid = !vResolved.includes(false);
      if (formIsValid) {
        const body = {
          userName: formValues.userName,
          contObject: {
            stamp: Date.now(),
            amount: parseInt(formValues.amount),
          },
        };
        console.log("form is submitting...");
        console.log(server.routes.newContribution);
        sendRequest({
          method: "POST",
          route: server.routes.newContribution,
          body: body,
        });
      }
    });
  }

  function validate(event) {
    const target = event.target;
    const identity = target.dataset.identity;
    const value = target.value;
    validateCore(identity, value);
  }

  function resetValidity(e) {
    const identity = e.target.dataset.identity;
    dispatchValidator(vActions.RESET({ identity }));
  }
  const feedbackEl = mapFeedback(reqData, {
    2: (
      <p className="text-green-500 text-sm italic">
        <i className="fas fa-check"></i> Success! Your contribution has been
        added
      </p>
    ),
    3: (
      <p className="text-red-500 text-sm italic">
        <i className="fas fa-exclamation mr-1"></i>Failed to add contribution
      </p>
    ),
    4: 3,
  });
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
              autoComplete="off"
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
          <div className="flex items-center">
            <ReqButton addCls="w-40 mr-4" reqStatus={reqData.status}>
              Add
            </ReqButton>
            {feedbackEl}
          </div>
        </form>
      </div>
    </div>
  );
}
