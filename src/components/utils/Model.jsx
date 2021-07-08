import React from "react";
import { createPortal } from "react-dom";

export default function Model(props) {
  const addCls = props.className !== undefined ? props.className : "";
  const mainBody = (
    <>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className={"model-card " + addCls}>{props.children}</div>
    </>
  );
  return createPortal(mainBody, document.getElementById("model"));
}
