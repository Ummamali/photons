import { createSlice } from "@reduxjs/toolkit";
import { server } from "../configs";

const thisMonthSlice = createSlice({
  name: "month",
  initialState: {
    loadStatus: 0,
    data: {},
  },
  reducers: {
    replace: (state, action) => {
      for (const key in action.payload.new) {
        state.data[key] = action.payload.new[key];
      }
      state.loadStatus = 2;
    },
    startLoading: (state) => {
      state.loadStatus = 1;
    },
    failedLoading: (state) => {
      state.loadStatus = 3;
    },
  },
});

const thisMonthActions = thisMonthSlice.actions;

async function loadFromServer() {
  const response = await fetch(server.routes.thismonth);
  const resObj = await response.json();
  return resObj.payload;
}

export function loadThisMonth() {
  return (dispatch) => {
    dispatch(thisMonthActions.startLoading());
    loadFromServer()
      .then((usersList) => {
        for (const userId in usersList) {
          usersList[userId] = usersList[userId] >= 200;
        }
        dispatch(thisMonthActions.replace({ new: usersList }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(thisMonthActions.failedLoading());
      });
  };
}
export default thisMonthSlice;
