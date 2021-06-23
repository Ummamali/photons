import React from "react";

export default function Total() {
  // hardcoded
  const total = "15,543";
  return (
    <div className="flex items-center mr-24">
      <div className="total flex flex-col items-center justify-center mr-8">
        <p className="-mt-4 font-light">Rs</p>
        <h2 className="text-3xl">{total}</h2>
      </div>
      <div className="text-center">
        <h2 className="text-5xl text-gray-700">June</h2>
        <h2 className="text-2xl text-gray-600">2021</h2>
      </div>
    </div>
  );
}
