import { createSlice } from "@reduxjs/toolkit";
import { server } from "../configs";

// every contributor will have userName as key ====> {userName[string], name[string], contributions[{timestapn, amount}[]]}

const contributorsSlice = createSlice({
  name: "contributors",
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

const contributorsActions = contributorsSlice.actions;

async function loadFromServer() {
  const response = await fetch(server.routes.contributors);
  const resObj = await response.json();
  return resObj.payload;
}

export function loadContributors() {
  return (dispatch) => {
    dispatch(contributorsActions.startLoading());
    loadFromServer()
      .then((usersList) => {
        dispatch(contributorsActions.replace({ new: usersList }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(contributorsActions.failedLoading());
      });
  };
}

export default contributorsSlice;
