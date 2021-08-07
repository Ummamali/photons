// the donor slice >>> asyc slice
import { createSlice } from "@reduxjs/toolkit";
import { routes, joinURL } from "../configs";
import { donorDiffActions, loadDonorDiffFromLS } from "./donorDiffSlice";
import { globalVariablesActions } from "./globalVariablesSlice";
import {
  asyncSliceReducers,
  asyncSliceInitial,
  getLS_Status,
  updateLocalStorage,
} from "./shared";
import { loadDonorsDataFromLS } from "./thunks";

const donorSlice = createSlice({
  name: "donors",
  initialState: asyncSliceInitial,
  reducers: {
    ...asyncSliceReducers,
    update: (state, action) => {
      // this is the UPDATE part of CRUD
      delete state.data[action.payload.prevName];
      state.data[action.payload.newDonor.name] = action.payload.newDonor;
    },
    delete: (state, action) => {
      // deletes the given name from the diff state, this is DELETE part of CRUD
      delete state.data[action.payload.donorName];
    },
    add: (state, action) => {
      // add a new donor to the slice its like CREATE
      state.data[action.payload.newDonor.name] = action.payload.newDonor;
    },
    isLoadedFromLS: (state, action) => {
      state.isLoadedFromLS = action.payload;
    },
  },
});

export const donorsActions = donorSlice.actions;

async function loadFromServer() {
  const response = await fetch(joinURL(routes.donorsGetter));
  const resObj = await response.json();
  if (resObj.status === 200) {
    return resObj.payload;
  } else {
    throw new Error("Server responded with a bad response status!");
  }
}

const sliceName = "donors";

// the re-written thunk, copy and pasted with some mutations
export function loadDonors() {
  return (dispatch, getState) => {
    const loadStatus = getState()[sliceName].loadStatus;
    if (loadStatus !== 2) {
      // it means that the data has not been loaded from the server
      console.log("loading " + sliceName + " from backend");
      dispatch(donorsActions.startLoading());
      loadFromServer()
        .then((newState) => {
          // the user is online, now the two major cases are given as
          const [LS_populated, LS_items] = getLS_Status();
          if (LS_populated) {
            // now have to check whether diff is empty or not
            if (Object.keys(LS_items.donorDiff).length === 0) {
              //donor diff is empty
              dispatch(donorsActions.replace({ new: newState }));
            } else {
              // we are merging the donor with donorDiff
              mergeDonors(newState, LS_items.donorDiff);
              dispatch(donorsActions.replace({ new: newState }));
              dispatch(donorDiffActions.replace({ new: LS_items.donorDiff }));
            }
          } else {
            // local storage is empty
            dispatch(donorsActions.replace({ new: newState }));
            updateLocalStorage(getState());
          }
        })
        .catch((errorObj) => {
          console.log(errorObj);
          // now we are trying to get data from local storage
          dispatch(loadDonorsDataFromLS());
        });
    } else {
      console.log("loadFromServer silenced for " + sliceName);
    }
  };
}

// inplace merge of donors to donor-diff
export function mergeDonors(fromServer, diff) {
  for (const [key, value] of Object.entries(diff)) {
    if (value === "DELETED") {
      delete fromServer[key];
    } else {
      fromServer[key] = value;
    }
  }
}
export default donorSlice;
