import { createSlice } from "@reduxjs/toolkit";
import { server } from "../configs";

const thisMonthSlice = createSlice({
  name: "month",
  initialState: {},
  reducers: {
    replace: (state, action) => {
      for (const key in action.payload.new) {
        state[key] = action.payload.new[key];
      }
    },
  },
});

const thisMonthActions = thisMonthSlice.actions;

export function loadStatus() {
  return async (dispatch) => {
    const response = await fetch(server.routes.thismonth);
    const resObj = await response.json();
    const usersList = resObj.payload;
    for (const userId in usersList) {
      usersList[userId] = usersList[userId] > 200;
    }
    dispatch(thisMonthActions.replace({ new: usersList }));
  };
}

export default thisMonthSlice;
