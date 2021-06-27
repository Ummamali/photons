import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadStatus } from "../../../store/thisMonthSlice";

export default function Summary() {
  const thisMonthStatus = useSelector((state) => state.thisMonth);
  const contributors = useSelector((state) => state.contributors);
  const dispatch = useDispatch();
  const items = [];
  for (const userId in thisMonthStatus) {
    const icon = thisMonthStatus[userId] ? (
      <i className="fas fa-check"></i>
    ) : (
      <i className="fas fa-times"></i>
    );
    items.push(
      <p key={userId}>
        {icon}
        {contributors[userId].name}
      </p>
    );
  }

  useEffect(() => {
    dispatch(loadStatus());
  }, []);
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
