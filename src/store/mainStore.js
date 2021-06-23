import { configureStore } from "@reduxjs/toolkit";

// contributors slice
import contributorsSlice from "./contributorsSlice";

const mainStore = configureStore({
  reducer: {
    contributors: contributorsSlice.reducer,
  },
});

export default mainStore;
