import React from "react";
import RadioButtons from "../../utils/RadioButtons";
import "./collect.css";

// we have two radio buttons
// the mode which is
const modeRadioIdToCategory = {
  "mode-radio-view": "VIEW",
  "mode-radio-edit": "EDIT",
};
const modeRadioIdToLabels = {
  "mode-radio-view": (
    <>
      <i className="fas fa-eye"></i> View
    </>
  ),
  "mode-radio-edit": (
    <>
      <i className="fas fa-edit"></i> Edit
    </>
  ),
};

export default function CollectScreen() {
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
        <div className="flex justify-between">
          <h2>Temporary Contributors</h2>
          <div>
            <RadioButtons
              idToCategory={modeRadioIdToCategory}
              idToLabels={modeRadioIdToLabels}
              className="flex items-center mode-radio"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
