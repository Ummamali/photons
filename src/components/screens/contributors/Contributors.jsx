import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadContributors } from "../../../store/contributorsSlice";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { combineLoadStatus } from "../../../hooks/useRequest";
import LoadedScreen from "../../utils/LoadedScreen";
import ContCard from "./ContCard";
import "./contributors.css";

export default function Contributors() {
  const [results, setResults] = useState([]);
  const thisMonth = useSelector((state) => state.thisMonth);
  const contributors = useSelector((state) => state.contributors);
  const loadStatus = combineLoadStatus([
    thisMonth.loadStatus,
    contributors.loadStatus,
  ]);
  const dispatch = useDispatch();

  // populating the store
  useEffect(() => {
    dispatch(loadContributors());
    dispatch(loadThisMonth());
  }, []);

  // when the data has been loaded
  useEffect(() => {
    if (loadStatus === 2) {
      const newResults = [];
      for (const [userId, userObj] of Object.entries(contributors.data)) {
        const forContCard = {
          userObj: userObj,
          thisMonth: thisMonth.data[userId],
        };
        newResults.push(forContCard);
      }
      setResults(newResults);
    }
  }, [loadStatus]);

  return (
    <LoadedScreen loadStatus={loadStatus}>
      <div id="contributors" className="mb-8">
        <div className="users-head flex items-center justify-between py-8">
          <div>
            <h1 className="text-3xl text-gray-700">
              <i className="fas fa-users text-user"></i> Registered Contributors
            </h1>
            <small className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              maxime!
            </small>
          </div>
          <div>
            <form className="bg-gray-200 bg-opacity-80 py-1 pl-3 pr-2 rounded-sm mb-3 w-80 flex">
              <input
                type="text"
                className="bg-transparent block w-full text-gray-600"
                placeholder="search contributor..."
              />
              <button type="submit" className="text-gray-700">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="statuses"
                  className="mr-1"
                  id="all-radio"
                />
                <div className="radio"></div>
                <label htmlFor="all-radio">All</label>
              </div>
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="statuses"
                  className="mr-1"
                  id="rem-radio"
                />
                <div className="radio"></div>
                <label htmlFor="rem-radio">Remaining</label>
              </div>
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="statuses"
                  className="mr-1"
                  id="done-radio"
                />
                <div className="radio"></div>
                <label htmlFor="done-radio">Done</label>
              </div>
            </div>
          </div>
        </div>
        <div className="results mt-8">
          {results.map((contCardProps) => (
            <ContCard {...contCardProps} key={contCardProps.userObj.id} />
          ))}
        </div>
      </div>
    </LoadedScreen>
  );
}
