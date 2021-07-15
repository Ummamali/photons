import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { combineLoadStatus } from "../../../../hooks/useRequest";
import { truncate } from "../../../../utilFuncs/basics";

export default function Summary() {
  const [summary, setSummary] = useState([]);
  const thisMonth = useSelector((state) => state.thisMonth);
  const contributors = useSelector((state) => state.contributors);
  const loadStatus = combineLoadStatus([
    thisMonth.loadStatus,
    contributors.loadStatus,
  ]);

  useEffect(() => {
    if (loadStatus === 2) {
      const newSummary = [];
      for (const userId in thisMonth.data) {
        newSummary.push({
          key: userId,
          name: truncate(contributors.data[userId].name, 15),
          hasCompleted: thisMonth.data[userId] >= 200,
        });
        if (newSummary.length >= 9) {
          break;
        }
      }
      setSummary(newSummary);
    }
  }, [loadStatus, thisMonth.data]);

  return (
    <div className="ml-28 summary rounded px-8 py-4 border border-gray-200 shadow-sm bg-gray-50">
      <h2 className="ml-auto text-2xl mr-4 text-gray-700 mb-3 text-center">
        This Month
      </h2>
      <ul className="items-grid mb-4">
        {summary.map((item) => {
          const icon = item.hasCompleted ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times"></i>
          );
          return (
            <li key={item.key} className="text-gray-600">
              {icon}
              {item.name}
            </li>
          );
        })}
      </ul>
      <Link to="/more" className="block text-center text-primary text-sm">
        Show More
      </Link>
    </div>
  );
}
