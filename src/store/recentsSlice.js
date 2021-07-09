import { createSlice } from "@reduxjs/toolkit";

import {
  asyncSliceInitial,
  asyncSliceReducers,
  generateAsyncThunk,
} from "./shared";

import { routes, joinURL } from "../configs";

const recentsSlice = createSlice({
  name: "recents",
  initialState: asyncSliceInitial,
  reducers: { ...asyncSliceReducers, insert: (state, action) => {} },
});

const recentsActions = recentsSlice.actions;

const recentsUrl = joinURL(routes.recents) + "?index=0";

async function loadFromServer() {
  const response = await fetch(recentsUrl);
  const resObj = await response.json();
  if (resObj.status === 200) {
    return { list: resObj.payload };
  } else {
    throw new Error("Server responded with a bad response!");
  }
}

export const loadRecents = generateAsyncThunk(recentsActions, loadFromServer);

export default recentsSlice;
