// This major thunk will add the contribution to all the major slices to update the view inplace

import { contributorsActions } from "./contributorsSlice";
import { thisMonthActions } from "./thisMonthSlice";
import { recentsActions } from "./recentsSlice";
import { donorDiffActions } from "./donorDiffSlice";
import { donorsActions } from "./donorSlice";

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
  return (dispatch) => {
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
  };
}
