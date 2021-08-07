// This major thunk will add the contribution to all the major slices to update the view inplace

import { contributorsActions } from "./contributorsSlice";
import { thisMonthActions } from "./thisMonthSlice";
import { recentsActions } from "./recentsSlice";
import { donorDiffActions } from "./donorDiffSlice";
import { donorsActions } from "./donorSlice";
import { getLS_Status, updateLocalStorage } from "./shared";

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

/* 
loads donors and donorDiff from local storage. Remember that if donors is in local storage, donorDiff must also be in local storage. There is no check for donorDiff presence!!! 
*/
export function loadDonorsDataFromLS() {
  return (dispatch) => {
    const [LS_populated, LS_items] = getLS_Status();
    if (LS_populated) {
      // local storage contains state, now we are loading it in
      // populating donor state
      dispatch(
        donorsActions.replace({
          new: LS_items.donors,
          isLoadedFromLS: true,
        })
      );
      dispatch(donorDiffActions.replace({ new: LS_items.donorDiff }));
    } else {
      dispatch(donorsActions.failedLoading());
    }
  };
}
