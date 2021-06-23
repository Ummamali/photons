import React from "react";

export default function Total() {
  // hardcoded
  const total = "15,543";
  return (
    <div className="flex items-center mr-8">
      <div className="total flex flex-col items-center justify-center mr-4">
        <p className="-mt-4 font-light">Rs</p>
        <h2 className="text-4xl">{total}</h2>
      </div>
      <div className="text-center">
        <h2 className="text-4xl text-gray-800">June</h2>
        <h2 className="text-2xl text-gray-600">2021</h2>
      </div>
    </div>
  );
}
