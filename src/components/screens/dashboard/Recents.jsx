import React from "react";

export default function Recents() {
  const recent = [
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
    { name: "Usman Khan", amount: 200 },
  ];
  return (
    <div>
      <h2 className="text-center text-2xl text-gray-700 mb-4">
        Recent Contributions
      </h2>
      <div className="recents mb-3 w-sec mx-auto">
        {recent.map((item) => (
          <div className="flex items-center justify-between px-28 py-2 recent-item">
            <p className="text-gray-700">{item.name}</p>
            <p className="text-gray-700">{item.amount}/-</p>
          </div>
        ))}
      </div>
      <button className="block mx-auto text-primary text-sm">Show More</button>
    </div>
  );
}
