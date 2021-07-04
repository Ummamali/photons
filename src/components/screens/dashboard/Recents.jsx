import React, { useEffect } from "react";
import Loader from "../../utils/Loader";
import { useState } from "react";
import { useSelector } from "react-redux";
import useRequest, {
  combineLoadStatus,
  mapFeedback,
} from "../../../hooks/useRequest";
import { routes } from "../../../configs";

export default function Recents() {
  const [recent, setRecent] = useState([]);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const contributors = useSelector((state) => state.contributors);
  const [reqData, sendReq] = useRequest();
  const loadStatus = combineLoadStatus([
    reqData.status,
    contributors.loadStatus,
  ]);

  function getRecents() {
    sendReq({
      method: "GET",
      route: routes.recents,
      params: "index=" + recent.length,
    });
  }

  useEffect(() => {
    getRecents();
  }, []);

  useEffect(() => {
    if (loadStatus === 2) {
      const recentsArray = reqData.resObj.payload;
      const newRecents = [];
      for (const item of recentsArray) {
        let [userId, contIndex] = item.split("/");
        contIndex = parseInt(contIndex);
        newRecents.push({
          name: contributors.data[userId].name,
          amount: contributors.data[userId].contributions[contIndex].amount,
          key: item,
        });
      }
      if (recentsArray.length < 10) {
        setMoreAvailable(false);
      }
      setRecent((prev) => [...prev, ...newRecents]);
    }
  }, [loadStatus]);
  console.log(reqData.status, loadStatus);

  const userFeedback = mapFeedback(
    { status: loadStatus },
    {
      1: (
        <div className="flex items-center justify-center">
          <Loader w={50} addCls="" />
          <p className="text-sm text-gray-700">Loading...</p>
        </div>
      ),
      3: (
        <p className="text-red-400 italic text-center">
          Unable to get data from the server!!!
        </p>
      ),
    }
  );

  return (
    <div>
      <h2 className="text-center text-2xl text-gray-700 mb-4">
        Recent Contributions
      </h2>
      <div className="recents mb-3 w-sec mx-auto">
        {recent.map((item) => (
          <div
            className="flex items-center justify-between px-28 py-2 recent-item"
            key={item.key}
          >
            <p className="text-gray-700">{item.name}</p>
            <p className="text-gray-700">{item.amount}/-</p>
          </div>
        ))}
      </div>
      {userFeedback}
      {moreAvailable && (
        <button
          className="block mx-auto text-primary text-sm"
          onClick={getRecents}
        >
          Show More
        </button>
      )}
    </div>
  );
}
