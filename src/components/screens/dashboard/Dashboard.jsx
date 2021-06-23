import React from "react";

// total and summary in a row
import Total from "./Total";
import Summary from "./Summary";

// importing classes
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="mt-8">
      <div>
        <div className="flex items-center justify-center">
          <Total />
          <div className="line bg-gray-200"></div>
          <Summary />
        </div>
      </div>
      <div></div>
    </div>
  );
}
