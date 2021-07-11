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
    <div className="ml-28">
      <div className="flex items-center mb-4">
        <h2 className="ml-auto text-2xl mr-4 text-gray-700">This Month</h2>
        <Link to="/more" className="mr-auto text-primary mt-1 text-sm">
          Show More
        </Link>
      </div>
      <ul className="items-grid">
        {summary.map((item) => {
          const icon = item.hasCompleted ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times"></i>
          );
          return (
            <li key={item.key}>
              {icon}
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
