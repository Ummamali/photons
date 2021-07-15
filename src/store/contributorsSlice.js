import { createSlice } from "@reduxjs/toolkit";
import { routes, joinURL } from "../configs";
import {
  asyncSliceReducers,
  asyncSliceInitial,
  generateAsyncThunk,
} from "./shared";

/*
 every contributor will have userName (id) as key >>> {id[string], name[string], contributions[{timestapn, amount}[]]}*/

const contributorsSlice = createSlice({
  name: "contributors",
  initialState: asyncSliceInitial,
  reducers: {
    ...asyncSliceReducers,
    addContributor: (state, action) => {
      /*
       action.payload >>> 
        {
          *userObj: { *id:String, *name:String}
       }
      */
      const user = action.payload.userObj;
      user.contributions = [];
      state.data[user.id] = user;
    },
    addContribution: (state, action) => {
      // action.payload >>> {*userName: String, *contObj: object}
      state.data[action.payload.userName].contributions.push(
        action.payload.contObj
      );
    },
  },
});

export const contributorsActions = contributorsSlice.actions;

async function loadFromServer() {
  const response = await fetch(joinURL(routes.contributors));
  const resObj = await response.json();
  return resObj.payload;
}

export const loadContributors = generateAsyncThunk(
  "contributors",
  contributorsActions,
  loadFromServer
);
export default contributorsSlice;
