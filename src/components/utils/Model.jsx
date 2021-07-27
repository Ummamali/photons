import React from "react";
import { createPortal } from "react-dom";

export default function Model(props) {
  /*
  props >>> {
    className: String (the classes will be applied to model-card)
    children: The internals of the model-card
    onClose: function() will be executed if backdrop gets clicked
      }
  */
  const addCls = props.className !== undefined ? props.className : "";
  const mainBody = (
    <>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className={"model-card " + addCls}>{props.children}</div>
    </>
  );
  return createPortal(mainBody, document.getElementById("model"));
}
