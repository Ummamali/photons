import React from "react";
import Loader from "../utils/Loader";
import "./utils.css";

export default function ReqButton(props) {
  let addCls = props.addCls ? props.addCls : "";
  let innerBody = props.children;
  if (props.reqStatus === 1) {
    addCls += " loading";
    innerBody = (
      <>
        <Loader w={30} addCls="inline mr-2" />
        Loading...
      </>
    );
  }
  return (
    <button
      type={props.type}
      className={
        "req-button py-2 px-4 bg-primary rounded text-white text-opacity-80 shadow-sm focus:outline-none hover:opacity-90 " +
        addCls
      }
      disabled={props.reqStatus === 1}
      {...props.attributes}
    >
      {innerBody}
    </button>
  );
}
