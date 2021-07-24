import React from "react";
import { Route, useHistory } from "react-router-dom";

import LoadedScreen from "../../utils/LoadedScreen";

// dashboard
import Dashboard from "./dashboard/Dashboard";

// model and two forms
import Model from "../../utils/Model";
import AddContribution from "./AddContribution";
import RegisterContributor from "./RegisterContributor";

// importing classes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContributors } from "../../../store/contributorsSlice";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { loadRecents } from "../../../store/recentsSlice";
import { combineLoadStatus } from "../../../hooks/useRequest";

export default function Home() {
  const thisMonthLS = useSelector((state) => state.thisMonth.loadStatus);
  const contributorsLS = useSelector((state) => state.contributors.loadStatus);
  const recentsLS = useSelector((state) => state.recents.loadStatus);
  const loadStatus = combineLoadStatus([
    thisMonthLS,
    contributorsLS,
    recentsLS,
  ]);
  const dispatch = useDispatch();
  const historyObj = useHistory();

  useEffect(() => {
    dispatch(loadContributors());
    dispatch(loadThisMonth());
    dispatch(loadRecents());
  }, []);

  function closeModel() {
    historyObj.push("/home");
  }

  return (
    <div className="my-10">
      <Route exact path="/home/contribute">
        <Model onClose={closeModel}>
          <AddContribution />
        </Model>
      </Route>
      <Route path="/home/register">
        <Model onClose={closeModel}>
          <RegisterContributor />
        </Model>
      </Route>
      <LoadedScreen loadStatus={loadStatus}>
        <Dashboard />
      </LoadedScreen>
    </div>
  );
}
