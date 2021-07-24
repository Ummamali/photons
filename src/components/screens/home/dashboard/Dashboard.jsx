import React from "react";
// total and summary in a row
import Total from "./Total";
import Summary from "./Summary";
import Recents from "./Recents";

// importing classes
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-center mb-10 showcase">
        <Total />
        <div className="line bg-gray-200 bg-opacity-70"></div>
        <Summary />
      </div>
      <Recents />
    </div>
  );
}
