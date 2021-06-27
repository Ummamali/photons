import { createSlice } from "@reduxjs/toolkit";
import { server } from "../configs";

// every contributor will have userName as key ====> {userName[string], name[string], contributions[{timestapn, amount}[]]}

const contributorsSlice = createSlice({
  name: "contributors",
  initialState: {},
  reducers: {
    replace: (state, action) => {
      for (const key in action.payload.new) {
        state[key] = action.payload.new[key];
      }
    },
  },
});

const contributorsActions = contributorsSlice.actions;

export function loadContributors() {
  return async (dispatch) => {
    try {
      const response = await fetch(server.routes.contributors);
      const resObj = await response.json();
      const usersList = resObj.payload;
      dispatch(contributorsActions.replace({ new: usersList }));
    } catch {
      throw new Error("Some error occured while loading");
    }
  };
}

export default contributorsSlice;
