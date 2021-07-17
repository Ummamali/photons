import React, { useRef } from "react";
import { useDispatch } from "react-redux";

// the form and its party
import RefFormGroup from "../../utils/RefFormGroup";
import useValidator, { vActions } from "../../../hooks/useValidator";

import { routes, joinURL } from "../../../configs";

// useRequest hook for submission of form
import useRequest, { mapFeedback } from "../../../hooks/useRequest";
import ReqButton from "../../utils/ReqButton";
import { registerContributorThunk } from "../../../store/thunks";
import { clearFields } from "../../../utilFuncs/basics";

function containsAlphabets(value) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  for (const character of value) {
    if (alphabets.includes(character)) {
      return true;
    }
  }
  return false;
}

// default error messages
const defaultErrors = {
  userName: "User Name must contain one alphabet",
  userFullName: "Please provide a valid full name",
};

const validators = {
  userFullName: (value) => {
    const isValid = containsAlphabets(value);
    const msg = isValid
      ? null
      : "User Full Name must contain atleast one alphabet";
    return { isValid, msg };
  },
  userName: async (value) => {
    if (containsAlphabets(value)) {
      const reponse = await fetch(
        `${joinURL(routes.checkUser)}?userName=${value}`
      );
      const resObj = await reponse.json();
      const isValid = !resObj.payload.isRegistered;
      const msg = isValid ? null : "User already exists, use another name";
      return { isValid, msg };
    } else {
      return {
        isValid: false,
        msg: "User Id must contain atleast one alphabet",
      };
    }
  },
};

const asyncValidators = ["userName"];

export default function RegisterContributor() {
  const references = {
    userName: useRef(),
    userFullName: useRef(),
  };

  // the main hook
  const [validityStatuses, dispatchValidator, validateCore] = useValidator(
    defaultErrors,
    validators,
    asyncValidators
  );

  // form submission hook
  const [reqData, sendRequest, resetStatus, startLoading] = useRequest();

  // dispatching the store
  const dispatchGlobal = useDispatch();

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
        const body = {
          name: formValues.userFullName,
          id: formValues.userName,
        };
        console.log("form is submitting...");
        sendRequest({
          method: "POST",
          route: routes.newContributor,
          body: body,
        }).then((resObj) => {
          if (resObj.status === 200) {
            dispatchGlobal(registerContributorThunk(body));
            // here we have to reset the form
            references.userName.current.focus();
            clearFields(references);
            dispatchValidator(vActions.RESETALL());
            setTimeout(() => {
              resetStatus();
            }, 1800);
          }
        });
      } else {
        resetStatus();
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
        <i className="fas fa-check"></i> Success! User has been registered
      </p>
    ),
    3: (
      <p className="text-red-500 text-sm italic">
        <i className="fas fa-exclamation mr-1"></i>Registration Failed
      </p>
    ),
    4: 3,
  });
  return (
    <div className="w-hard-small py-12 px-8 mx-auto rounded-lg shadow-lg bg-white reg-contr">
      <div className="text-center mb-6">
        <h2 className="text-3xl text-gray-600 mb-3">Register Contributor</h2>
        <p className="leading-none text-gray-500 text-opacity-90 text-sm">
          More contributors, more contributions
        </p>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="space-y-3 mb-5">
            <RefFormGroup
              label="User Name"
              id="userName"
              ref={references.userName}
              placeholder="Enter user name (id)...."
              type="text"
              vData={validityStatuses.userName}
              validate={validate}
              resetValidity={resetValidity}
              autoComplete="off"
            />
            <RefFormGroup
              label="User Full Name"
              id="userFullName"
              ref={references.userFullName}
              placeholder="Enter user full name...."
              type="text"
              vData={validityStatuses.userFullName}
              validate={validate}
              resetValidity={resetValidity}
              autoComplete="off"
              hideIcons
            />
          </div>
          <div className="flex items-center space-x-4 form-feet">
            <ReqButton reqStatus={reqData.status}>Register</ReqButton>
            {feedbackEl}
          </div>
        </form>
      </div>
    </div>
  );
}
