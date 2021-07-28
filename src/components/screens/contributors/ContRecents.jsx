import React from "react";
import Model from "../../utils/Model";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ContRecents() {
  const historyObj = useHistory();
  const { userId } = useParams("userId");
  const contributors = useSelector((state) => state.contributors);
  const userObj = contributors.data[userId];
  const userConts = userObj.contributions;

  let recentItems = [];

  if (userConts.length > 0) {
    for (let i = userConts.length - 1; i >= 0; i--) {
      const cont = userConts[i];
      const stampDate = new Date(cont.stamp);
      recentItems.push(
        <li className="flex items-center py-1">
          <i className="fas fa-money-bill text-sm -mb-0.5 text-rupee mr-1"></i>
          <p className="text-gray-700">{cont.amount}/-</p>
          <small className="text-gray-600 ml-auto">
            {stampDate.toLocaleDateString("en-GB") +
              ", " +
              stampDate.toLocaleTimeString("en-US")}
          </small>
        </li>
      );
    }
  } else {
    recentItems = (
      <p className="text-center text-gray-500">
        No contributions yet
        <i className="far fa-frown ml-2 text-red-600"></i>
      </p>
    );
  }
  // to close the main model
  function closeIt() {
    historyObj.push("/contributors");
  }
  return userObj !== undefined ? (
    <Model
      className="bg-white w-hard-small rounded cont-recents"
      onClose={closeIt}
    >
      <button
        className="absolute top-1.5 left-3 text-gray-600"
        onClick={closeIt}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="head text-center bg-gray-300 bg-opacity-80 rounded-tl rounded-tr py-4">
        <h2 className="text-lg text-gray-800 font-medium leading-none">
          {userObj.name}
        </h2>
        <small className="text-gray-700">
          <i className="fas fa-user text-primary mr-1"></i>
          {userObj.id}
        </small>
      </div>
      <div className="main px-2 py-4">
        <h3 className="text-center text-gray-700 mb-3 text-xl">
          Recent Contributons
        </h3>
        <ul className="px-5">{recentItems}</ul>
      </div>
    </Model>
  ) : (
    <Redirect to="/contributors" />
  );
}
