import React from "react";
import { Link } from "react-router-dom";

export default function Summary() {
  // hardcoded
  const contributions = {
    "Sakhi Baksh": true,
    "Sakhi Bash": true,
    "Sakhi Baksh": false,
    SakhiBaksh: false,
    "Sakhi aksh": true,
    "Sakhi aksh": false,
    "Sakh Baksh": true,
  };
  const items = [];
  for (const name in contributions) {
    const icon = contributions[name] ? (
      <i className="fas fa-check"></i>
    ) : (
      <i className="fas fa-times"></i>
    );
    items.push(
      <p>
        {icon}
        {name}
      </p>
    );
  }
  return (
    <div className="ml-28">
      <div className="flex items-center mb-4">
        <h2 className="ml-auto text-2xl mr-4 text-gray-700">This Month</h2>
        <Link to="/more" className="mr-auto text-primary mt-1 text-sm">
          Show More
        </Link>
      </div>
      <div className="items-grid">{items}</div>
    </div>
  );
}
