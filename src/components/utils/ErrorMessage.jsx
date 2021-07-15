import React from "react";
import { Link } from "react-router-dom";

export default function ErrorMessage(props) {
  return (
    <div className="w-small mx-auto mt-8 text-center  py-8 px-6 rounded-xl">
      <div className="mb-8">
        <i className="fas fa-exclamation-circle text-3xl text-red-500"></i>
        <h2 className="text-gray-700 text-3xl font-medium mb-3">
          {props.title !== undefined ? props.title : "Error"}
        </h2>
        <p className="text-gray-700 text-opacity-80 text-sm">
          {props.children}
        </p>
      </div>
      <div className="text-blue-500 space-x-8">
        <Link to="/home">
          <i className="fas fa-home text-sm"></i> Go Home
        </Link>
        {/*eslint-disable-next-line no-restricted-globals*/}
        <button className="inline" onClick={() => location.reload()}>
          <i className="fas fa-redo text-sm"></i> Reload
        </button>
      </div>
    </div>
  );
}
