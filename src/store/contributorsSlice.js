import { createSlice } from "@reduxjs/toolkit";

// every contributor will have userName as key ====> {userName[string], name[string], contributions[{timestapn, amount}[]]}

const dummy_data = {
  ummamAli: {
    userName: "ummamAli",
    name: "Ummam Ali",
    contrubutions: [{ timestamp: new Date().getTime(), amount: 200 }],
  },
};

const contributorsSlice = createSlice({
  name: "contributors",
  initialState: dummy_data,
});

export default contributorsSlice;
