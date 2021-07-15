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
  reducers: {
    ...asyncSliceReducers,
    insert: (state, action) => {
      // action.payload >>> {*index: int, *items: array, *moreAvailable: boolean}
      state.data.list.splice(action.payload.index, 0, ...action.payload.items);
      state.data.moreAvailable = action.payload.moreAvailable;
    },
  },
});

export const recentsActions = recentsSlice.actions;

const recentsUrl = joinURL(routes.recents);

async function loadFromServer() {
  const response = await fetch(recentsUrl + "?index=0");
  const resObj = await response.json();
  if (resObj.status === 200) {
    return { ...resObj.payload };
  } else {
    throw new Error("Server responded with a bad response!");
  }
}

export function loadMoreRecents() {
  return async (dispatch, getState) => {
    const indexAt = getState().recents.data.list.length;
    const response = await fetch(recentsUrl + "?index=" + indexAt);
    const resObj = await response.json();
    dispatch(
      recentsActions.insert({
        index: indexAt,
        items: resObj.payload.list,
        moreAvailable: resObj.payload.moreAvailable,
      })
    );
  };
}

export const loadRecents = generateAsyncThunk(
  "recents",
  recentsActions,
  loadFromServer
);

export default recentsSlice;
