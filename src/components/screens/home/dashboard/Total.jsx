import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Total() {
  const [month, setMonth] = useState([]);
  const [total, setTotal] = useState(0);
  const { data: contributorsData, loadStatus: contributorsLoadStatus } =
    useSelector((state) => state.contributors);

  useEffect(() => {
    const now = new Date();
    setMonth([monthArray[now.getMonth()], now.getDate()]);
  }, []);

  useEffect(() => {
    if (contributorsLoadStatus === 2) {
      let newTotal = 0;
      for (const userObj of Object.values(contributorsData)) {
        for (const cont of userObj.contributions) {
          newTotal += cont.amount;
        }
      }
      setTotal(newTotal);
    }
  }, [contributorsData, contributorsLoadStatus]);

  return (
    <div className="flex items-center mr-24 total-container">
      <div className="total flex flex-col items-center justify-center mr-8">
        <p className="-mt-4 font-light">Rs</p>
        <h2 className="text-3xl">{total.toLocaleString("en-US")}</h2>
      </div>
      <div className="text-center">
        <h2 className="text-5xl text-gray-700">{month[0]}</h2>
        <h2 className="text-2xl text-gray-600">{month[1]}</h2>
      </div>
    </div>
  );
}
