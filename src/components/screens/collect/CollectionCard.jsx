import React from "react";

const CollectionCard = React.memo(({ payerObj, mode }) => {
  let amountEl;
  if (payerObj.hasPaid) {
    amountEl = (
      <>
        <i className="fas fa-money-bill mr-0.5 text-rupee"></i>
        {payerObj.amount.toLocaleString("en-GB")}/-
      </>
    );
  } else {
    amountEl = (
      <>
        <i className="far fa-calendar-check mr-1 text-yellow-500"></i>
        {new Date(payerObj.amount).toLocaleDateString("en-GB")}
      </>
    );
  }

  return (
    <div className="border border-gray-300 p-3 rounded-sm cCard flex items-center justify-between">
      <div>
        <p className="text-lg">{payerObj.name}</p>
        <p>{amountEl}</p>
      </div>
      {mode === "EDIT" && (
        <div className="flex flex-col justify-center border-l border-gray-300 pl-2 ml-1">
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
