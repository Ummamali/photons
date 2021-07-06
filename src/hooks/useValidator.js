import { useReducer, useMemo } from "react";

// this hook is to be used with FormGroup components to invalidate the inputs

// actions
export const vActions = {
  SET: (payload) => ({ type: "SET", payload: payload }),
  RESET: (payload) => ({ type: "RESET", payload: payload }),
};

function validityReducer(state, action) {
  if (action.type === "SET") {
    const stateCp = { ...state };
    const groupObject = stateCp[action.payload.identity];
    stateCp[action.payload.identity] = {
      ...groupObject,
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
    for (const [identity, message] of Object.entries(identityList)) {
      answer[identity] = { vStatus: 0, msg: message };
    }
    return answer;
  }, []);

  const [validityStatuses, dispatchValidity] = useReducer(
    validityReducer,
    initialValue
  );

  // this is the majic function which will validate
  function validate(identity, value) {
    /* 
    The validate function returns a value if the validator is synchronous
    and will return a promise if the vaidator is asynchronous 

    Note: the vFunc will return an object {*isValid: boolean, msg: String | null}
    */
    const vFunc = validatorPredicates[identity];
    if (asyncList.includes(identity)) {
      return new Promise((resolve) => {
        // async validation
        dispatchValidity(
          vActions.SET({ identity: identity, new: { vStatus: 1 } })
        );
        vFunc(value)
          .then((validityResponse) => {
            const isValid = validityResponse.isValid;
            const newMessage =
              validityResponse.msg !== null
                ? validityResponse.msg
                : identityList[identity];
            const newStatus = isValid ? 2 : 3;
            dispatchValidity(
              vActions.SET({
                identity: identity,
                new: { vStatus: newStatus, msg: newMessage },
              })
            );
            resolve(isValid);
          })
          .catch((error) => {
            dispatchValidity(
              vActions.SET({
                identity: identity,
                new: { vStatus: 3, msg: "Network Error: Failed to validate" },
              })
            );
            // the rejection has been handled above so the returned value is false
            resolve(false);
          });
      });
    } else {
      // synchronous validation
      const validityResponse = vFunc(value);
      const isValid = validityResponse.isValid;
      const newMessage =
        validityResponse.msg !== null
          ? validityResponse.msg
          : identityList[identity];
      const newStatus = isValid ? 2 : 3;
      dispatchValidity(
        vActions.SET({
          identity: identity,
          new: { vStatus: newStatus, msg: newMessage },
        })
      );
      return isValid;
    }
  }
  return [validityStatuses, dispatchValidity, validate];
}

// // utility functions
// function overallFormIsValid(groupsStatuses, toIgnore) {
//   let answer = true;
//   for (const [identityName, { vStatus: currGroupStatus }] of Object.entries(
//     groupsStatuses
//   )) {
//     if (currGroupStatus !== 2 && identityName !== toIgnore) {
//       answer = false;
//     }
//   }
//   return answer;
// }
