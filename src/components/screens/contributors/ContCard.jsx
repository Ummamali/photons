import React from "react";
import { Link } from "react-router-dom";

export default function ContCard(props) {
  /*
    props >>> {
      name: String, ( user full name )
      id: String, ( username)
      thisMonthCont: int,  ( how much amount have been given in the current month)
      total: int, ( total amount that has been given )
      contCount: int,  ( number of contributions )
      lastCont: Object ( timestamp of last contribution and the amount )
      }
  */
  return (
    <div className="border border-gray-300 shadow-sm px-4 py-4 rounded cont-card">
      <div className="flex items-center justify-between py-4 head">
        <h3 className="text-xl text-gray-700 text-opacity-90">{props.name}</h3>
        <div className="text-gray-400 flex items-center text-sm">
          <i className="fas fa-check-circle text-success text-xl mr-1"></i>
          {props.thisMonthCont >= 200}
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between py-6">
          <div>
            <h2 className="text-lg leading-none text-gray-600">
              <i className="fas fa-money-bill text-rupee mr-2"></i>
              Contributed {props.total}/-
            </h2>
            <small className="text-gray-500">
              {props.contCount} contributions
            </small>
          </div>
          <h2 className="text-gray-600">
            <i className="fas fa-user mr-1 text-user"></i>
            {props.id}
          </h2>
        </div>
        <div className="flex items-end justify-between">
          <Link
            to="/test"
            className="inline-block text-white text-opacity-80 bg-primary py-1.5 px-4 rounded-sm"
          >
            Show Details
          </Link>
          <div className="text-right">
            <small className="text-gray-400">Last Contribution</small>
            <h2 className="text-gray-600 text-opacity-90">
              Rs. {props.lastCont.amount} on{" "}
              {new Date(props.lastCont.stamp).toLocaleDateString("en-GB")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
