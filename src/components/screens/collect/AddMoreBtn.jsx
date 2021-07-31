import React from "react";
import { Link } from "react-router-dom";

export default function AddMoreBtn() {
  return (
    <Link
      to="/collect/add"
      className="block py-3 px-12 text border border-gray-400 rounded shadow-sm w-max mx-auto mt-4"
    >
      <i className="fas fa-plus"></i> Add New
    </Link>
  );
}
