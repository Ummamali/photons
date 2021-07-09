import { createSlice } from "@reduxjs/toolkit";
import { routes, joinURL } from "../configs";
import {
  asyncSliceReducers,
  asyncSliceInitial,
  generateAsyncThunk,
} from "./shared";

// every contributor will have userName as key ====> {userName[string], name[string], contributions[{timestapn, amount}[]]}

const contributorsSlice = createSlice({
  name: "contributors",
  initialState: asyncSliceInitial,
  reducers: asyncSliceReducers,
});

const contributorsActions = contributorsSlice.actions;

async function loadFromServer() {
  const response = await fetch(joinURL(routes.contributors));
  const resObj = await response.json();
  return resObj.payload;
}

export const loadContributors = generateAsyncThunk(
  contributorsActions,
  loadFromServer
);
export default contributorsSlice;
