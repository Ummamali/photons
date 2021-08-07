import { configureStore } from "@reduxjs/toolkit";

// contributors slice
import contributorsSlice from "./contributorsSlice";
import thisMonthSlice from "./thisMonthSlice";
import recentsSlice from "./recentsSlice";
import donorSlice from "./donorSlice";
import donorDiffSlice from "./donorDiffSlice";
import globalVariablesSlice from "./globalVariablesSlice";

const mainStore = configureStore({
  reducer: {
    contributors: contributorsSlice.reducer,
    thisMonth: thisMonthSlice.reducer,
    recents: recentsSlice.reducer,
    donors: donorSlice.reducer,
    donorDiff: donorDiffSlice.reducer,
    globalVariables: globalVariablesSlice.reducer,
  },
});

export default mainStore;
