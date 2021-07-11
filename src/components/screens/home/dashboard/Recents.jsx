import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineLoadStatus } from "../../../../hooks/useRequest";
import { useState } from "react";
import { loadMoreRecents } from "../../../../store/recentsSlice";

export default function Recents() {
  const [recentList, setRecentList] = useState([]);
  const contributors = useSelector((state) => state.contributors);
  const recentsGlobal = useSelector((state) => state.recents);
  const loadStatus = combineLoadStatus([
    recentsGlobal.loadStatus,
    contributors.loadStatus,
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadStatus === 2) {
      const newRecentList = [];
      for (const item of recentsGlobal.data.list) {
        let [userId, index] = item.split("/");
        index = parseInt(index);
        const userObj = contributors.data[userId];
        newRecentList.push({
          key: item,
          name: userObj.name,
          amount: userObj.contributions[index].amount,
        });
      }
      setRecentList(newRecentList);
    }
  }, [loadStatus, recentsGlobal.data.list, contributors.data]);

  return (
    <div>
      <h2 className="text-center text-2xl text-gray-700 mb-4">
        Recent Contributions
      </h2>
      <div className="recents mb-3 w-sec mx-auto">
        {recentList.map((item) => (
          <div
            className="flex items-center justify-between px-28 py-2 recent-item"
            key={item.key}
          >
            <p className="text-gray-700">{item.name}</p>
            <p className="text-gray-700">{item.amount}/-</p>
          </div>
        ))}
      </div>
      {recentsGlobal.data.moreAvailable && (
        <button
          className="block mx-auto text-primary text-sm"
          onClick={() => dispatch(loadMoreRecents())}
        >
          Show More
        </button>
      )}
    </div>
  );
}
