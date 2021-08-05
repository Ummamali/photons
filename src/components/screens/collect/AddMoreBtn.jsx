import React from "react";
import { Link } from "react-router-dom";

export default function AddMoreBtn() {
  return (
    <Link
      to="/collect/add"
      className="block py-3 px-12 text-sm text-white text-opacity-80 shadow-sm bg-primary w-max mx-auto mt-4 rounded-sm"
    >
      <i className="fas fa-plus"></i> Add New
    </Link>
  );
}
