import React from "react";
import { Route, useHistory } from "react-router-dom";

import Loader from "../../utils/Loader";

// dashboard
import Dashboard from "./Dashboard";

// model and two forms
import Model from "../../utils/Model";
import AddContribution from "./AddContribution";
import RegisterContributor from "./RegisterContributor";

// importing classes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContributors } from "../../../store/contributorsSlice";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { combineLoadStatus, mapFeedback } from "../../../hooks/useRequest";

export default function Home() {
  const thisMonthLS = useSelector((state) => state.thisMonth.loadStatus);
  const contributorsLS = useSelector((state) => state.contributors.loadStatus);
  const loadStatus = combineLoadStatus([thisMonthLS, contributorsLS]);
  const dispatch = useDispatch();

  const historyObj = useHistory();

  useEffect(() => {
    dispatch(loadContributors());
    dispatch(loadThisMonth());
  }, []);

  const mainBody = mapFeedback(
    { status: loadStatus },
    {
      1: (
        <div className="mt-20">
          <Loader w={100} addCls="mx-auto" />
          <p className="text-center text-gray-500 italic text-sm">
            Loading, Please Wait....
          </p>
        </div>
      ),
      2: <Dashboard />,
      3: <p className="text-red-500 text-center italic">Unable to load Data</p>,
    }
  );

  function closeModel() {
    historyObj.push("/");
  }

  return (
    <div className="my-10">
      <Route exact path="/contribute">
        <Model onClose={closeModel}>
          <AddContribution />
        </Model>
      </Route>
      <Route path="/register">
        <Model onClose={closeModel}>
          <RegisterContributor />
        </Model>
      </Route>
      {mainBody}
    </div>
  );
}
