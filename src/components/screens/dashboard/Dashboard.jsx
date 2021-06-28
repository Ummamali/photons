import React from "react";

// total and summary in a row
import Total from "./Total";
import Summary from "./Summary";
import Recents from "./Recents";
import Loader from "../../utils/Loader";

// importing classes
import "./dashboard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContributors } from "../../../store/contributorsSlice";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { combineLoadStatus, mapFeedback } from "../../../hooks/useRequest";

export default function Dashboard() {
  const thisMonthLS = useSelector((state) => state.thisMonth.loadStatus);
  const contributorsLS = useSelector((state) => state.contributors.loadStatus);
  const loadStatus = combineLoadStatus([thisMonthLS, contributorsLS]);
  const dispatch = useDispatch();

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
      2: (
        <>
          <div className="flex items-center justify-center mb-10">
            <Total />
            <div className="line bg-gray-200"></div>
            <Summary />
          </div>
          <Recents />
        </>
      ),
      3: <p className="text-red-500 text-center italic">Unable to load Data</p>,
    }
  );

  return <div className="my-10">{mainBody}</div>;
}
