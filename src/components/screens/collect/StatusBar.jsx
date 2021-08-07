import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const statusStates = {
  loadingFromServer: "loadingFromServer",
  offline: "offline", // when loading, this means data has been loaded from server. when saving this means data has noot been saved because user is offline. it will then change to dataModifies after few seconds
  dataModified: "dataModified",
  dataSaving: "dataSaving",
  dataSaved: "dataSaved",
};

const statuses = {
  loadingFromServer: (
    <>
      <i className="fas fa-sync mr-1 saving-icon"></i>Loading...
    </>
  ),
  offline: (
    <>
      <i className="fas fa-ban mr-0.5"></i>Offline
    </>
  ),
  dataModified: (
    <>
      <i className="fas fa-pencil-alt mr-1"></i>Modified
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
  loadingFromServer: true,
  offline: false,
  dataModified: false,
  dataSaving: true,
  dataSaved: true,
};

const statusClasses = {
  loadingFromServer: "text-yellow-600 text-opacity-90",
  offline: "text-red-500 text-opacity-80",
  dataModified: "text-yellow-500 text-opacity-70",
  dataSaving: "text-yellow-600",
  dataSaved: "text-green-500 text-opacity-90",
};

export default function StatusBar() {
  const donors = useSelector((state) => state.donors);
  const donorDiff = useSelector((state) => state.donorDiff);

  const donorDiffEmpty = Object.keys(donorDiff).length === 0;

  let [currentStatus, setCurrentStatus] = useState(
    statusStates.loadingFromServer
  );

  useEffect(() => {
    if (donors.loadStatus === 2) {
      if (donors.isLoadedFromLS) {
        setCurrentStatus(statusStates.offline);
        setTimeout(() => {
          if (!donorDiffEmpty) {
            setCurrentStatus(statusStates.dataModified);
          } else {
            setCurrentStatus(statusStates.dataSaved);
          }
        }, 1500);
      } else {
        if (!donorDiffEmpty) {
          setCurrentStatus(statusStates.dataModified);
        } else {
          setCurrentStatus(statusStates.dataSaved);
        }
      }
    } else if (donors.loadStatus === 3) {
      setCurrentStatus(statusStates.offline);
    }
  }, [donorDiff, donors]);

  if (donors.loadStatus === 2 && !donors.isLoadedFromLS && donorDiffEmpty) {
  }

  return (
    <div className="fixed bottom-0 left-0 w-screen py-1 px-2 collect-status-bar bg-gray-800">
      <div className="w-main mx-auto flex items-center justify-center ">
        <p className="text-gray-400 mr-2">Current Status: </p>
        <p className={statusClasses[currentStatus]}>
          {statuses[currentStatus]}
        </p>
        <button
          className="px-8 py-0.5 ml-32 bg-gray-400 text-gray-800 text-opacity-90 save-btn"
          disabled={btnDisability[currentStatus]}
        >
          Save
        </button>
      </div>
    </div>
  );
}
