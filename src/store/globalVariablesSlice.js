import { createSlice } from "@reduxjs/toolkit";

const globalVariablesSlice = createSlice({
  name: "globalVariables",
  initialState: {
    donorConflict: false,
  },
  reducers: {
    set: (state, action) => {
      // updates the state with the new action.payload object
      for (const [key, value] of Object.entries(action.payload)) {
        state[key] = value;
      }
    },
  },
});

export const globalVariablesActions = globalVariablesSlice.actions;

export default globalVariablesSlice;
