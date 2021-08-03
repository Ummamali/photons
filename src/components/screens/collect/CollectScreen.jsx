import React from "react";
import { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import "./collect.css";
import { modeRadioData, collectRadioData } from "./radioButtonData";
import RadioButtons from "../../utils/RadioButtons";
import CollectionCard from "./CollectionCard";
import DonorEditModel from "./DonorEditModel";
import { useDispatch, useSelector } from "react-redux";
import LoadedScreen from "../../utils/LoadedScreen";
import { useEffect } from "react";
import { loadDonors } from "../../../store/donorSlice";
import AddMoreBtn from "./AddMoreBtn";
import AddDonorModel from "./AddDonorModel";

export default function CollectScreen() {
  // the results state which is the core functionality
  const [results, setResults] = useState([]);
  // radio button state
  // for mode radio button
  const [currModeRadio, setCurrModeRadio] = useState("VIEW");
  // for collectionStatus radio button
  const [currCollectRadio, setCurrCollectRadio] = useState("ALL");

  // the donors slice works with this screen
  const donors = useSelector((state) => state.donors);
  const dispatch = useDispatch();

  // requesting the server upon mount
  useEffect(() => {
    dispatch(loadDonors());
  }, []);

  // updating the results upon successful load
  useEffect(() => {
    if (donors.loadStatus === 2) {
      updateResults();
    }
  }, [donors.loadStatus]);

  // updating the results whenever collectionRadio changes
  useEffect(() => {
    updateResults();
  }, [currCollectRadio, donors]);

  function updateResults() {
    // when called, updates the results state depending on the radiobutton options
    const newResults = [];
    for (const donorObj of Object.values(donors.data)) {
      if (
        (donorObj.hasPaid && currCollectRadio === "SUCCESS") ||
        (!donorObj.hasPaid && currCollectRadio === "PENDING") ||
        currCollectRadio === "ALL"
      ) {
        newResults.push(donorObj);
      }
    }
    setResults(newResults);
  }

  return (
    <LoadedScreen loadStatus={donors.loadStatus}>
      <div id="collect">
        <Route exact path="/collect/edit">
          <DonorEditModel />
        </Route>
        <Route exact path="/collect/add">
          <AddDonorModel />
        </Route>
        <div className="collect-head flex justify-between py-6">
          <div>
            <h1 className="text-gray-700">
              <i className="fas fa-box-open mr-1"></i>Collections
            </h1>
            <p className="text-gray-600">Temporary Contributors: 20</p>
          </div>
          <div className="border-l border-gray-400 border-opacity-60 pl-6">
            <h2 className="leading-none mb-3">Total: 2,500/-</h2>
            <div className="text-gray-600">
              <p>Successful Contributions: 12</p>
              <p>Remaining Contributions: 8</p>
            </div>
          </div>
        </div>
        <div className="collect-main">
          <div className="flex justify-between py-4 mb-4">
            <h2 className="text-3xl text-gray-700">Temporary Contributors</h2>
            <div className="flex items-center">
              <RadioButtons
                idToCategory={modeRadioData.idToCategory}
                idToLabels={modeRadioData.idToLabels}
                className="flex items-center justify-center space-x-4 mode-radio mr-12 bg-gray-200 bg-opacity-80 rounded py-1 px-2"
                name="mode-radio"
                currentCategory={currModeRadio}
                onChange={(e) => setCurrModeRadio(e.target.dataset.category)}
              />
              <RadioButtons
                idToCategory={collectRadioData.idToCategory}
                idToLabels={collectRadioData.idToLabels}
                className="default-radios flex items-center justify-center space-x-4 text-sm text-gray-700 bg-gray-200 bg-opacity-70 rounded py-1 px-2"
                name="collect-radio"
                currentCategory={currCollectRadio}
                onChange={(e) => setCurrCollectRadio(e.target.dataset.category)}
              />
            </div>
          </div>
          {results.length > 0 ? (
            <div className="results">
              {results.map((donorObj) => (
                <CollectionCard
                  donorObj={donorObj}
                  mode={currModeRadio}
                  key={donorObj.name}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No temporary contributors to show
              <i className="far fa-frown ml-2 text-red-600"></i>
            </p>
          )}
          <AddMoreBtn />
        </div>
      </div>
    </LoadedScreen>
  );
}
