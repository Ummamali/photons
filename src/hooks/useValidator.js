import { useReducer, useMemo } from "react";

// this hook is to be used with FormGroup components to invalidate the inputs

// actions
export const vActions = {
  SET: (payload) => ({ type: "SET", payload: payload }),
  SET_FORM: (payload) => ({ type: "SET_FORM", payload: payload }),
  RESET: (payload) => ({ type: "RESET", payload: payload }),
  SUBMITTING: () => ({ type: "SUBMITTING" }),
  RESET_SUBMISSION: () => ({ type: "RESET_SUBMISSION" }),
};

function validityReducer(state, action) {
  if (action.type === "SET") {
    const stateCp = { ...state };
    const groupObject = stateCp.groups[action.payload.identity];
    stateCp.groups[action.payload.identity] = {
      ...groupObject,
      ...action.payload.new,
    };
    return stateCp;
  } else if (action.type === "RESET") {
    const stateCp = { ...state };
    stateCp.groups[action.payload.identity].vStatus = 0;
    return stateCp;
  } else if (action.type === "SET_FORM") {
    const stateCp = { ...state };
    stateCp.form = { ...stateCp.form, ...action.payload.new };
    return stateCp;
  } else if (action.type === "SUBMITTING") {
    const stateCp = { ...state };
    stateCp.form.submit = true;
    return state;
  } else if (action.type === "RESET_SUBMISSION") {
    const stateCp = { ...state };
    stateCp.form.submit = false;
    return state;
  } else {
    console.warn("Found invalid action for reducer");
    return state;
  }
}
export default function useValidator(
  identityList,
  validatorPredicates,
  asyncList = []
) {
  // identity list: object ---> {[identity]: [error-message]}
  // validatorPredicates: object ----> {[identity]: predicateFunc}
  // asyncList: [identity (String)] array for async functions
  // the validator will check if the predicate lies in async array to use then and catch accordingly. Make sure to make that function async

  // Initial value will be calculated only for the first time
  const initialValue = useMemo(() => {
    const answer = { groups: {}, form: { submit: false, isValid: false } };
    for (const [identity, message] of Object.entries(identityList)) {
      answer.groups[identity] = { vStatus: 0, msg: message };
    }
    return answer;
  }, []);
  const [validityStatuses, dispatchValidity] = useReducer(
    validityReducer,
    initialValue
  );

  // this is the majic function which will validate
  function validate(identity, value, msg = null) {
    const vFunc = validatorPredicates[identity];
    let newMessage = msg !== null ? msg : validityStatuses.groups[identity].msg;
    if (asyncList.includes(identity)) {
      // async validation
      dispatchValidity(
        vActions.SET({ identity: identity, new: { vStatus: 1 } })
      );
      vFunc(value)
        .then((isValid) => {
          const newStatus = isValid ? 2 : 3;
          let formIsValid = false;
          if (isValid) {
            formIsValid = overallFormIsValid(validityStatuses.groups, identity);
          }
          dispatchValidity(
            vActions.SET_FORM({ new: { isValid: formIsValid } })
          );
          dispatchValidity(
            vActions.SET({
              identity: identity,
              new: { vStatus: newStatus, msg: newMessage },
            })
          );
        })
        .catch((error) => {
          dispatchValidity(
            vActions.SET({
              identity: identity,
              new: { vStatus: 3, msg: "Network Error: Failed to validate" },
            })
          );
          dispatchValidity(vActions.SET_FORM({ isValid: false }));
        });
    } else {
      // synchronous validation
      const isValid = vFunc(value);
      const newStatus = isValid ? 2 : 3;
      let formIsValid = false;
      if (isValid) {
        formIsValid = overallFormIsValid(validityStatuses.groups, identity);
      }
      dispatchValidity(vActions.SET_FORM({ new: { isValid: formIsValid } }));
      dispatchValidity(
        vActions.SET({
          identity: identity,
          new: { vStatus: newStatus, msg: newMessage },
        })
      );
    }
  }
  return [validityStatuses, dispatchValidity, validate];
}

// utility functions
function overallFormIsValid(groupsStatuses, toIgnore) {
  let answer = true;
  for (const [identityName, { vStatus: currGroupStatus }] of Object.entries(
    groupsStatuses
  )) {
    if (currGroupStatus !== 2 && identityName !== toIgnore) {
      answer = false;
    }
  }
  return answer;
}
