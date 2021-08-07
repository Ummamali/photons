import React from "react";

export const statusStates = {
  loadedFromServer: "loadedFromServer",
  offline: "offline", // when loading, this means data has been loaded from server. when saving this means data has noot been saved because user is offline. it will then change to dataModifies after few seconds
  dataModified: "dataModified",
  dataSaving: "dataSaving",
  dataSaved: "dataSaved",
};

const statuses = {
  loadedFromServer: (
    <>
      <i class="fas fa-wifi mr-0.5"></i>Successfully Loaded
    </>
  ),
  offline: (
    <>
      <i class="fas fa-ban mr-0.5"></i>Offline
    </>
  ),
  dataModified: (
    <>
      <i class="fas fa-pencil-alt mr-1"></i>Modified
    </>
  ),
  dataSaving: (
    <>
      <i className="fas fa-sync mr-1 saving-icon"></i>Saving...
    </>
  ),
  dataSaved: (
    <>
      <i className="fas fa-check mr-0.5"></i>Saved
    </>
  ),
};

const btnDisability = {
  loadedFromServer: true,
  offline: false,
  dataModified: false,
  dataSaving: true,
  dataSaved: true,
};

const statusClasses = {
  loadedFromServer: "text-green-500 text-opacity-90",
  offline: "text-red-500 text-opacity-80",
  dataModified: "text-yellow-500 text-opacity-70",
  dataSaving: "text-yellow-600",
  dataSaved: "text-green-500 text-opacity-90",
};

export default function StatusBar({ currentStatus }) {
  return (
    <div className="fixed bottom-0 left-0 w-screen py-1 px-2 text-sm bg-gray-800">
      <div className="w-main mx-auto flex items-center justify-center ">
        <p className="text-gray-400 mr-2">Current Status: </p>
        <p className={statusClasses[currentStatus]}>
          {statuses[currentStatus]}
        </p>
        <button
          className="px-4 py-0.5 ml-32 bg-gray-400 text-gray-800 text-opacity-90 save-btn"
          disabled={btnDisability[currentStatus]}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function mapToStatus() {}
