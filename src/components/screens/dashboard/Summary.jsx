import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { combineLoadStatus, mapFeedback } from "../../../hooks/useRequest";
import Loader from "../../utils/Loader";

export default function Summary() {
  const [summary, setSummary] = useState([]);
  const dispatch = useDispatch();
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
          name: contributors.data[userId].name,
          hasCompleted: thisMonth.data[userId],
        });
      }
      setSummary(newSummary);
    }
  }, [loadStatus]);

  useEffect(() => {
    dispatch(loadThisMonth());
  }, []);

  const innerBody = mapFeedback(
    { status: loadStatus },
    {
      1: <Loader w={50} addCls="mx-auto" />,
      2: (
        <ul className="items-grid">
          {summary.map((item) => {
            const icon = item.hasCompleted ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            );
            return (
              <li key={item.name}>
                {icon}
                {item.name}
              </li>
            );
          })}
        </ul>
      ),
      3: (
        <p className="text-red-400 italic text-center">
          Unable to get data from the server!!!
        </p>
      ),
    }
  );

  return (
    <div className="ml-28">
      <div className="flex items-center mb-4">
        <h2 className="ml-auto text-2xl mr-4 text-gray-700">This Month</h2>
        {loadStatus === 2 && (
          <Link to="/more" className="mr-auto text-primary mt-1 text-sm">
            Show More
          </Link>
        )}
      </div>
      {innerBody}
    </div>
  );
}
