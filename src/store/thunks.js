// This major thunk will add the contribution to all the major slices to update the view inplace

import { contributorsActions } from "./contributorsSlice";
import { thisMonthActions } from "./thisMonthSlice";
import { recentsActions } from "./recentsSlice";

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
