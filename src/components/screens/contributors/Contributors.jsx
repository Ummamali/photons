import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { loadContributors } from "../../../store/contributorsSlice";
import { loadThisMonth } from "../../../store/thisMonthSlice";
import { combineLoadStatus } from "../../../hooks/useRequest";
import LoadedScreen from "../../utils/LoadedScreen";
import ContCard from "./ContCard";
import "./contributors.css";
import ContRecents from "./ContRecents";

export default function Contributors() {
  const [results, setResults] = useState([]);
  // category can be ALL, DONE OR REMAINING
  const [category, setCategory] = useState("ALL");
  // the state which keeps track of search string
  const [searchQ, setSearchQ] = useState("");

  // from the store
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
  }, [dispatch]);

  // when the data has been loaded
  useEffect(() => {
    if (loadStatus === 2) {
      updateResults();
    }
  }, [loadStatus]);

  // whenever category or search query chanages, resulta will be updated
  useEffect(() => {
    updateResults();
  }, [category, searchQ]);

  function updateResults() {
    const newResults = [];
    for (const [userId, userObj] of Object.entries(contributors.data)) {
      const forContCard = {
        userObj: userObj,
        thisMonth: thisMonth.data[userId],
      };
      if (
        (forContCard.thisMonth >= 200 && category === "DONE") ||
        (forContCard.thisMonth < 200 && category === "REMAINING") ||
        category === "ALL"
      ) {
        if (
          userObj.name.toLowerCase().includes(searchQ.toLowerCase()) ||
          userObj.id.toLowerCase().includes(searchQ.toLowerCase()) ||
          searchQ === ""
        ) {
          newResults.push(forContCard);
        }
      }
    }
    setResults(newResults);
  }

  function radioChangeHandler(e) {
    setCategory(e.target.dataset.category);
  }

  return (
    <LoadedScreen loadStatus={loadStatus}>
      <Route path="/contributors/:userId">
        <ContRecents />
      </Route>
      <div id="contributors" className="mb-8">
        <div className="users-head flex items-center justify-between py-8">
          <div className="title">
            <h1 className="text-3xl text-gray-700">
              <i className="fas fa-users text-user"></i> Registered Contributors
            </h1>
            <small className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              maxime!
            </small>
          </div>
          <div>
            <div className="bg-gray-200 bg-opacity-80 py-1 px-3 rounded-sm mb-3 w-80 flex items-center">
              <i className="fas fa-search block mr-2 -mb-0.5 text-gray-400"></i>
              <input
                type="text"
                className="bg-transparent block w-full text-gray-500 search"
                placeholder="search contributor..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 categories">
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="category"
                  id="all-radio"
                  data-category="ALL"
                  onChange={radioChangeHandler}
                  checked={category === "ALL"}
                />
                <div className="radio"></div>
                <label htmlFor="all-radio">All</label>
              </div>
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="category"
                  id="rem-radio"
                  data-category="REMAINING"
                  onChange={radioChangeHandler}
                  checked={category === "REMAINING"}
                />
                <div className="radio"></div>
                <label htmlFor="rem-radio">Remaining</label>
              </div>
              <div className="checkbox-contain">
                <input
                  type="radio"
                  name="category"
                  id="done-radio"
                  data-category="DONE"
                  onChange={radioChangeHandler}
                  checked={category === "DONE"}
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
        {results.length === 0 && (
          <p className="text-center text-gray-500">
            No contributor to show
            <i className="far fa-frown ml-2 text-red-600"></i>
          </p>
        )}
      </div>
    </LoadedScreen>
  );
}
