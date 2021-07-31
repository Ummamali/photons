import React from "react";
import Model from "../../utils/Model";
import { Redirect, useLocation } from "react-router-dom";

export default function DonorEditModel() {
  const locationObj = useLocation();
  const searchParams = new URLSearchParams(locationObj.search);
  const name = searchParams.get("name");
  if (name === null) {
    return <Redirect to="/collect" />;
  }
  return <Model>This is a test</Model>;
}
