import React from "react";

export default function Button(props) {
  const addCls = props.addCls ? props.addCls : "";
  return (
    <button
      type={props.type}
      className={
        "py-2 px-4 bg-primary rounded text-white text-opacity-80 shadow-sm focus:outline-none hover:opacity-90 " +
        addCls
      }
      {...props.attributes}
    >
      {props.children}
    </button>
  );
}
