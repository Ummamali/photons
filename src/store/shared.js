// This is like a utility file to contain functionality for various slices

/*
  AsyncSlices are slices which depend upon data from the backend
  Signature >>> {*loadStatus: 0|1|2|3, data: Object (or other)}
  Use Thunks to load Data. Once the data has been loaded, subsequent mutations will be done directly without contacting the server. Therefore, it is important that state is updated after the GOOD response from the backend!

  Following are the methods for These type of slices      
*/
// reducers
export const asyncSliceReducers = {
  replace: (state, action) => {
    //   action.payload >>>>> {new: Object (will be replaced with state.data)}
    for (const key in action.payload.new) {
      state.data[key] = action.payload.new[key];
    }
    // just dispatch, state will update automatically
    state.loadStatus = 2;
  },
  startLoading: (state) => {
    state.loadStatus = 1;
  },
  failedLoading: (state) => {
    state.loadStatus = 3;
  },
};

// initial state
export const asyncSliceInitial = { loadStatus: 0, data: {} };

// asyncloaderThuns

export function generateAsyncThunk(actionsObj, asyncLoader) {
  /* Signature:
   *actionsObject: {*startLoading, *failedLoading, *replace} action creators
   *asyncLoader: an async function which loads the data and raises exceptions on failure and returns the new state upon success!!!!
   */
  return () => {
    return (dispatch) => {
      dispatch(actionsObj.startLoading());
      asyncLoader()
        .then((newState) => {
          // if no error is thrown, data will be replaced! So throw the error when data is not in good <state>
          dispatch(actionsObj.replace({ new: newState }));
        })
        .catch((errorObj) => {
          console.log(errorObj);
          dispatch(actionsObj.failedLoading());
        });
    };
  };
}