import React from "react";
import ContCard from "./ContCard";
import "./contributors.css";

export default function Contributors() {
  return (
    <div id="contributors">
      <div className="users-head flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl text-gray-700">
            <i className="fas fa-users text-user"></i> Registered Contributors
          </h1>
          <small className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            maxime!
          </small>
        </div>
        <div>
          <form className="bg-gray-200 bg-opacity-80 py-1 pl-3 pr-2 rounded-sm mb-3 w-80 flex">
            <input
              type="text"
              className="bg-transparent block w-full text-gray-600"
              placeholder="search contributor..."
            />
            <button type="submit" className="text-gray-700">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="checkbox-contain">
              <input
                type="radio"
                name="statuses"
                className="mr-1"
                id="all-radio"
              />
              <div className="radio"></div>
              <label htmlFor="all-radio">All</label>
            </div>
            <div className="checkbox-contain">
              <input
                type="radio"
                name="statuses"
                className="mr-1"
                id="rem-radio"
              />
              <div className="radio"></div>
              <label htmlFor="rem-radio">Remaining</label>
            </div>
            <div className="checkbox-contain">
              <input
                type="radio"
                name="statuses"
                className="mr-1"
                id="done-radio"
              />
              <div className="radio"></div>
              <label htmlFor="done-radio">Done</label>
            </div>
          </div>
        </div>
      </div>
      <div className="results mt-8">
        <ContCard />
        <ContCard />
      </div>
    </div>
  );
}
