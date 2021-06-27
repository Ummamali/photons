import React, { useEffect } from "react";
import Loader from "../../utils/Loader";
import { useState } from "react";
import { useSelector } from "react-redux";
import useRequest, {
  combineLoadStatus,
  mapFeedback,
} from "../../../hooks/useRequest";

export default function Recents() {
  const [recent, setRecent] = useState([]);
  const contributors = useSelector((state) => state.contributors);
  const [reqData, sendReq] = useRequest();
  const loadStatus = combineLoadStatus([
    reqData.status,
    contributors.loadStatus,
  ]);

  useEffect(() => {
    sendReq({ method: "GET", route: "/recents", params: "index=0" });
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
      setRecent(newRecents);
    }
  }, [loadStatus]);

  const innerBody = mapFeedback(
    { status: loadStatus },
    {
      1: <Loader w={80} addCls="mx-auto" />,
      2: (
        <>
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
          <button className="block mx-auto text-primary text-sm">
            Show More
          </button>
        </>
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
      {innerBody}
    </div>
  );
}
