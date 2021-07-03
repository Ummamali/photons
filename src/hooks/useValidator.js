import { useReducer, useMemo, useCallback } from "react";

// this hook is to be used with FormGroup components to invalidate the inputs

// actions
export const vActions = {
  SET: (payload) => ({ type: "SET", payload: payload }),
  RESET: (payload) => ({ type: "RESET", payload: payload }),
};

function validityReducer(state, action) {
  if (action.type === "SET") {
    const stateCp = { ...state };
    stateCp[action.payload.identity] = {
      ...stateCp[action.payload.identity],
      ...action.payload.new,
    };
    return stateCp;
  } else if (action.type === "RESET") {
    const stateCp = { ...state };
    stateCp[action.payload.identity].vStatus = 0;
    return stateCp;
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
    const answer = {};
    for (const identity in identityList) {
      answer[identity] = { vStatus: 0, msg: identityList[identity] };
    }
    return answer;
  }, []);
  const [validityStatuses, dispatchValidity] = useReducer(
    validityReducer,
    initialValue
  );

  let allValid = true;
  for (const groupObj of Object.values(validityStatuses)) {
    if (groupObj.vStatus !== 2) {
      allValid = false;
    }
  }

  // this is the majic function which will validate
  function validate(identity, value, msg = null) {
    const vFunc = validatorPredicates[identity];
    let newMessage = msg !== null ? msg : validityStatuses[identity].msg;
    if (asyncList.includes(identity)) {
      // async validation
      dispatchValidity(
        vActions.SET({ identity: identity, new: { vStatus: 1 } })
      );
      vFunc(value)
        .then((isValid) => {
          const newStatus = isValid ? 2 : 3;
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
        });
    } else {
      // synchronous validation
      const newStatus = vFunc(value) ? 2 : 3;
      dispatchValidity(
        vActions.SET({
          identity: identity,
          new: { vStatus: newStatus, msg: newMessage },
        })
      );
    }
  }
  return [validityStatuses, allValid, dispatchValidity, validate];
}
