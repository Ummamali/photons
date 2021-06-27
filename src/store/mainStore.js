import { configureStore } from "@reduxjs/toolkit";

// contributors slice
import contributorsSlice from "./contributorsSlice";
import thisMonthSlice from "./thisMonthSlice";

const mainStore = configureStore({
  reducer: {
    contributors: contributorsSlice.reducer,
    thisMonth: thisMonthSlice.reducer,
  },
});

export default mainStore;
