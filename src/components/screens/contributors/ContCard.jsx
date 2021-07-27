import React, { memo } from "react";
import { Link } from "react-router-dom";

const ContCard = memo(({ userObj, thisMonth }) => {
  /*
    props >>> {
      userObj: { the object from the store},
      thisMonth: int 
    }
  */
  const contList = userObj.contributions;
  const contLength = contList.length;
  const lastCont = contList[contLength - 1];
  const lastContText =
    lastCont === undefined
      ? "No Contributions yet!"
      : `Rs. ${lastCont.amount} on ${new Date(
          lastCont.stamp
        ).toLocaleDateString("en-GB")}`;
  let thisMonthEl =
    thisMonth >= 200 ? (
      <>
        <i className="fas fa-check-circle text-success text-xl mr-1"></i>Done
      </>
    ) : (
      <>
        <i className="fas fa-exclamation-circle text-red-500 text-xl mr-1"></i>
        Not Yet
      </>
    );
  const total = contList.reduce(
    (accumulated, curr) => accumulated + curr.amount,
    0
  );

  return (
    <div className="bg-gray-50 bg-opacity-50 border border-gray-200 px-4 py-4 rounded cont-card">
      <div className="flex items-center justify-between py-4 head">
        <h3 className="text-gray-800 text-opacity-80">{userObj.name}</h3>
        <div className="text-gray-400 flex items-center text-sm">
          {thisMonthEl}
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between py-6">
          <div>
            <h4 className="leading-none text-gray-600">
              <i className="fas fa-money-bill text-rupee mr-2"></i>
              Contributed {total.toLocaleString("en-US")}/-
            </h4>
            <small className="text-gray-500">{contLength} contributions</small>
          </div>
          <h4 className="text-gray-600">
            <i className="fas fa-user mr-1 text-user"></i>
            {userObj.id}
          </h4>
        </div>
        <div className="flex items-end justify-between">
          <Link
            to={`/contributors/${userObj.id}`}
            className="inline-block text-white text-opacity-80 bg-primary py-1.5 px-4 rounded-sm text-sm"
          >
            Recents
          </Link>
          <div className="text-right">
            <small className="text-gray-400">Last Contribution</small>
            <p className="text-gray-600 text-opacity-90">{lastContText}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContCard;
