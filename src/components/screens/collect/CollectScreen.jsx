import React from "react";
import { useState } from "react";
import RadioButtons from "../../utils/RadioButtons";
import { modeRadioData, collectRadioData } from "./radioButtonData";
import "./collect.css";
import CollcetionCard from "./CollectionCard";

export default function CollectScreen() {
  // radio button state
  // for mode radio button
  const [currModeRadio, setCurrModeRadio] = useState("VIEW");
  // for collectionStatus radio button
  const [currCollectRadio, setCurrCollectRadio] = useState("SUCCESS");
  return (
    <div id="collect">
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
        <div className="flex justify-between py-4">
          <h2 className="text-3xl text-gray-700">Temporary Contributors</h2>
          <div className="flex items-center">
            <RadioButtons
              idToCategory={modeRadioData.idToCategory}
              idToLabels={modeRadioData.idToLabels}
              className="flex items-center justify-center space-x-3 mode-radio mr-12"
              name="mode-radio"
              currentCategory={currModeRadio}
              onChange={(e) => setCurrModeRadio(e.target.dataset.category)}
            />
            <RadioButtons
              idToCategory={collectRadioData.idToCategory}
              idToLabels={collectRadioData.idToLabels}
              className="default-radios flex items-center justify-center space-x-3 text-sm text-gray-700"
              name="collect-radio"
              currentCategory={currCollectRadio}
              onChange={(e) => setCurrCollectRadio(e.target.dataset.category)}
            />
          </div>
        </div>
        <div className={"results " + currModeRadio}>
          {/* this is the results grid */}
          <CollcetionCard
            mode={currModeRadio}
            payerObj={{ name: "test Name", amount: Date.now(), hasPaid: false }}
          />
        </div>
      </div>
    </div>
  );
}
