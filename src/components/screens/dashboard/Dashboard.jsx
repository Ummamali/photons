import React from "react";

// total and summary in a row
import Total from "./Total";
import Summary from "./Summary";
import Recents from "./Recents";

// importing classes
import "./dashboard.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadContributors } from "../../../store/contributorsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadContributors());
  }, []);
  return (
    <div className="my-10">
      <div className="flex items-center justify-center mb-10">
        <Total />
        <div className="line bg-gray-200"></div>
        <Summary />
      </div>
      <Recents />
    </div>
  );
}
