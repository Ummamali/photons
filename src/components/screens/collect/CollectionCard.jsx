import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { truncate } from "../../../utilFuncs/basics";
import { deleteDonor } from "../../../store/thunks";

const CollectionCard = ({ donorObj, mode }) => {
  let amountEl;
  const historyObj = useHistory();
  const dispatchStore = useDispatch();
  const [confirm, setConfirm] = useState(false);
  if (donorObj.hasPaid) {
    amountEl = (
      <>
        <i className="fas fa-money-bill mr-0.5 text-rupee"></i>
        {donorObj.amount.toLocaleString("en-GB")}/-
      </>
    );
  } else {
    amountEl = (
      <>
        <i className="far fa-calendar-check mr-1 text-yellow-500"></i>
        {new Date(donorObj.amount).toLocaleDateString("en-GB")}
      </>
    );
  }

  let mainBody = null;
  if (confirm && mode === "EDIT") {
    mainBody = (
      <>
        <p className="text-sm text-gray-800">Delete this donor?</p>
        <div className="flex items-center">
          <button
            className="bg-red-500 text-sm text-white text-opacity-80 py-1 px-3 mr-2"
            onClick={() => dispatchStore(deleteDonor(donorObj.name))}
          >
            Delete
          </button>
          <button className="text-gray-700" onClick={() => setConfirm(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </>
    );
  } else {
    mainBody = (
      <>
        <div>
          <p className="text-lg text-gray-800">{truncate(donorObj.name, 20)}</p>
          <p className="text-gray-700">{amountEl}</p>
        </div>
        {mode === "EDIT" && (
          <div className="flex flex-col justify-center border-l border-gray-300 pl-3 ml-2">
            <button
              onClick={() =>
                historyObj.push(`/collect/edit?name=${donorObj.name}`)
              }
            >
              <i className="fas fa-pencil-alt text-yellow-700"></i>
            </button>
            <button onClick={() => setConfirm(true)}>
              <i className="fas fa-trash text-red-600"></i>
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="border border-gray-300 p-3 rounded-sm flex items-center justify-between shadow-sm">
      {mainBody}
    </div>
  );
};

export default CollectionCard;
