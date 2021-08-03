// the donor slice >>> asyc slice
import { createSlice } from "@reduxjs/toolkit";
import { routes, joinURL } from "../configs";
import {
  asyncSliceReducers,
  asyncSliceInitial,
  generateAsyncThunk,
} from "./shared";

const donorSlice = createSlice({
  name: "donors",
  initialState: asyncSliceInitial,
  reducers: {
    ...asyncSliceReducers,
    update: (state, action) => {
      // this is the UPDATE part of CRUD
      delete state.data[action.payload.prevName];
      state.data[action.payload.newDonor.name] = action.payload.newDonor;
    },
    delete: (state, action) => {
      // deletes the given name from the diff state, this is DELETE part of CRUD
      delete state.data[action.payload.name];
    },
  },
});

export const donorsActions = donorSlice.actions;

async function loadFromServer() {
  const response = await fetch(joinURL(routes.donorsGetter));
  const resObj = await response.json();
  if (resObj.status === 200) {
    return resObj.payload;
  } else {
    throw new Error("Server responded with a bad response status!");
  }
}

export const loadDonors = generateAsyncThunk(
  "donors",
  donorsActions,
  loadFromServer
);

export default donorSlice;
