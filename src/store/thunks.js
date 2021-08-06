// This major thunk will add the contribution to all the major slices to update the view inplace

import { contributorsActions } from "./contributorsSlice";
import { thisMonthActions } from "./thisMonthSlice";
import { recentsActions } from "./recentsSlice";
import donorDiffSlice, { donorDiffActions } from "./donorDiffSlice";
import { donorsActions } from "./donorSlice";
import { updateLocalStorage } from "./shared";

/*
  Following thunks are used to add contributions and contributor
*/
export function addContributionThnuk(userName, contObj, forRecents) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(contributorsActions.addContribution({ userName, contObj }));
    dispatch(
      recentsActions.insert({
        index: 0,
        items: [forRecents],
        moreAvailable: state.recents.data.moreAvailable,
      })
    );
    dispatch(
      thisMonthActions.increment({
        userName: userName,
        amount: contObj.amount,
      })
    );
  };
}

export function registerContributorThunk(userObj) {
  // userObj >>> { *id:String, *name:String}

  return (dispatch) => {
    dispatch(contributorsActions.addContributor({ userObj }));
    dispatch(thisMonthActions.addContributor(userObj.id));
  };
}

/*
Followint thunks are for donors, the C(R)UD thunks
*/

// the donor update thunk
export function updateDonor(newDonorObj, donorPrevName) {
  return (dispatch, getState) => {
    // first changing the diff slice
    dispatch(
      donorDiffActions.update({
        prevName: donorPrevName,
        newDonor: newDonorObj,
      })
    );
    // then changing the original slice
    dispatch(
      donorsActions.update({ prevName: donorPrevName, newDonor: newDonorObj })
    );
    updateLocalStorage(getState());
  };
}

// to add a new donor
export function addDonor(newDonor) {
  return (dispatch, getState) => {
    dispatch(donorDiffActions.add({ newDonor }));
    dispatch(donorsActions.add({ newDonor }));
    updateLocalStorage(getState());
  };
}

// deletes the donor
export function deleteDonor(donorName) {
  return (dispatch, getState) => {
    dispatch(donorDiffActions.delete({ donorName }));
    dispatch(donorsActions.delete({ donorName }));
    updateLocalStorage(getState());
  };
}

// loads donors from local storage
export function loadDonorsDataFromLS() {
  return (dispatch) => {
    const lsDonors = localStorage.getItem("donors");
    if (lsDonors !== null) {
      dispatch(donorsActions.replace({ new: JSON.parse(lsDonors) }));
    }
    const lsDonorsDiff = localStorage.getItem("donorsDiff");
    if (lsDonorsDiff !== null) {
      dispatch(donorDiffActions.replace({ new: JSON.parse(lsDonorsDiff) }));
    }
  };
}
