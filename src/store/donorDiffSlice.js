import { createSlice } from "@reduxjs/toolkit";

const donorDiffSlice = createSlice({
  name: "donorDiff",
  initialState: {},
  reducers: {
    update: (state, action) => {
      // UPDATE
      const prev = state[action.payload.donorId];
      state[action.payload.donorId] = {
        ...prev,
        ...action.payload.newDonorObj,
      };
    },
    delete: (state, action) => {
      // deletes the given key from the diff state, this is DELETE
      state[action.payload.donorId] = "DELETED";
    },
    deletePermanent: (state, action) => {
      // deletes the given key from the diff state, this is DELETE
      delete state[action.payload.donorId];
    },
    add: (state, action) => {
      // add a new user to the slice, its like CREATE
      const newDonor = { ...action.payload.newDonor };
      newDonor.added = true;
      state[action.payload.id] = newDonor;
    },
    reset: (state) => {
      // sets the state back to {}
      for (const key in state) {
        delete state[key];
      }
    },
    replace: (state, action) => {
      for (const [key, value] of Object.entries(action.payload.new)) {
        state[key] = value;
      }
    },
  },
});

export function deleteFromDonorDiff(donorId) {
  return (dispatch, getState) => {
    const deletingDonor = getState().donorDiff[donorId];
    if (deletingDonor === undefined) {
      dispatch(donorDiffActions.delete({ donorId }));
    } else if (deletingDonor.added === true) {
      dispatch(donorDiffActions.deletePermanent({ donorId }));
    } else {
      dispatch(donorDiffActions.delete({ donorId }));
    }
  };
}

export const donorDiffActions = donorDiffSlice.actions;

export default donorDiffSlice;
