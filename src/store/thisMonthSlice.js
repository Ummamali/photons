import { createSlice } from "@reduxjs/toolkit";
import { joinURL, routes } from "../configs";
import {
  asyncSliceReducers,
  asyncSliceInitial,
  generateAsyncThunk,
} from "./shared";

const thisMonthSlice = createSlice({
  name: "month",
  initialState: asyncSliceInitial,
  reducers: asyncSliceReducers,
});

const thisMonthActions = thisMonthSlice.actions;

async function loadFromServer() {
  const response = await fetch(joinURL(routes.thismonth));
  const resObj = await response.json();
  return resObj.payload;
}

export const loadThisMonth = generateAsyncThunk(
  thisMonthActions,
  loadFromServer
);
export default thisMonthSlice;
