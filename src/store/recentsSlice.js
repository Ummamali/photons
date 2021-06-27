import { createSlice } from "@reduxjs/toolkit";

const recentsSlice = createSlice({
  name: "month",
  initialState: ["ummamAli", "sakhiBaksh"],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});
