import { createSlice } from "@reduxjs/toolkit";

const donorDiffSlice = createSlice({
  name: "donorDiff",
  initialState: {},
  reducers: {
    update: (state, action) => {
      // UPDATE
      delete state[action.payload.prevName];
      state[action.payload.newDonor.name] = action.payload.newDonor;
    },
    delete: (state, action) => {
      // deletes the given key from the diff state, this is DELETE
      delete state[action.payload.name];
    },
    reset: (state) => {
      // sets the state back to {}
      for (const key in state) {
        delete state[key];
      }
    },
  },
});

export const donorDiffActions = donorDiffSlice.actions;

export default donorDiffSlice;
