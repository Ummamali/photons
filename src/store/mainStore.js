import { configureStore } from "@reduxjs/toolkit";

// contributors slice
import contributorsSlice from "./contributorsSlice";
import thisMonthSlice from "./thisMonthSlice";
import recentsSlice from "./recentsSlice";

const mainStore = configureStore({
  reducer: {
    contributors: contributorsSlice.reducer,
    thisMonth: thisMonthSlice.reducer,
    recents: recentsSlice.reducer,
  },
});

export default mainStore;
