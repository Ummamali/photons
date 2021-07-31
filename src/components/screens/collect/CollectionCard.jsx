import React from "react";
import { truncate } from "../../../utilFuncs/basics";

const CollectionCard = React.memo(({ donorObj, mode }) => {
  let amountEl;
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

  return (
    <div className="border border-gray-300 p-3 rounded-sm flex items-center justify-between shadow-sm">
      <div>
        <p className="text-lg text-gray-800">{truncate(donorObj.name, 20)}</p>
        <p className="text-gray-700">{amountEl}</p>
      </div>
      {mode === "EDIT" && (
        <div className="flex flex-col justify-center border-l border-gray-300 pl-3 ml-2">
          <button>
            <i className="fas fa-pencil-alt text-yellow-700"></i>
          </button>
          <button>
            <i className="fas fa-trash text-red-600"></i>
          </button>
        </div>
      )}
    </div>
  );
});

export default CollectionCard;
