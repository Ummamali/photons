import React, { useRef } from "react";
import useRequest, { mapFeedback } from "../../../hooks/useRequest";
import RefFormGroup from "../../utils/RefFormGroup";
import { server, joinURL } from "../../../configs";
import ReqButton from "../../utils/ReqButton";
import useValidator, { vActions } from "../../../hooks/useValidator";
import { useDispatch } from "react-redux";
import { addContributionThnuk } from "../../../store/thunks";
import { clearFields } from "../../../utilFuncs/basics";

const validators = {
  userName: async (value) => {
    const reponse = await fetch(
      `${joinURL(server.routes.checkUser)}?userName=${value}`
    );
    const resObj = await reponse.json();
    const isValid = resObj.payload.isRegistered;
    const msg = isValid ? null : "This user name does not exists!";
    return { isValid, msg };
  },
  amount: (value) => {
    const isValid = value > 0;
    const msg = isValid ? null : "Amount must be greater than zero";
    return { isValid, msg };
  },
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
  const [reqData, sendRequest, resetStatus, startLoading] = useRequest();

  // for dispatching
  const dispatchGlobal = useDispatch();

  // for submitting the form
  function submitHandler(e) {
    e.preventDefault();
    const validations = [];
    const formValues = {};
    for (const [idName, idRef] of Object.entries(references)) {
      validations.push(validateCore(idName, idRef.current.value));
      formValues[idName] = idRef.current.value;
    }
    startLoading();
    Promise.all(validations).then((vResolved) => {
      const formIsValid = !vResolved.includes(false);
      if (formIsValid) {
        // the contribution object to be added to users list
        const contObj = {
          stamp: Date.now(),
          amount: parseInt(formValues.amount),
        };
        const body = {
          userName: formValues.userName,
          contObject: contObj,
        };
        // console.log("form is submitting...");
        sendRequest({
          method: "POST",
          route: server.routes.newContribution,
          body: body,
        }).then((resObj) => {
          if (resObj.status === 200) {
            dispatchGlobal(
              addContributionThnuk(
                formValues.userName,
                contObj,
                resObj.payload.recentString
              )
            );
            // here we have to reset the form
            references.userName.current.focus();
            clearFields(references);
            dispatchValidator(vActions.RESETALL());
          }
        });
      } else {
        // console.log("form is not valid");
        resetStatus(true);
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
      <p className="text-green-500 text-sm italic leading-none">
        <i className="fas fa-check"></i> Success! Your contribution has been
        added.
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
    <div className="bg-white px-8 py-12 w-hard-small rounded-lg">
      <h2 className="text-center text-3xl text-gray-700 mb-4">
        Add Contribution
      </h2>
      <form className="block mx-auto" onSubmit={submitHandler}>
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
          <ReqButton addCls="w-36 mr-4" reqStatus={reqData.status}>
            Add
          </ReqButton>
          {feedbackEl}
        </div>
      </form>
    </div>
  );
}
