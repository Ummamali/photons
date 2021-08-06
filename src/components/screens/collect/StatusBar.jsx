import React from "react";

export default function StatusBar({ donors, donorDiff }) {
  let text = null;
  let addCls = " ";
  if (donors.loadStatus === 3) {
    text = <p>"You are offline"</p>;
  } else if (Object.keys(donorDiff).length === 0) {
    text = <p>Synced</p>;
    addCls += "bg-blue-600";
  }
  return (
    <div className={"fixed bottom-0 left-0 w-screen" + addCls}>
      <div className="w-main mx-auto">{text}</div>
    </div>
  );
}
