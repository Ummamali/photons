import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="bg-primary px-8 shadow-sm">
      <nav className="w-main mx-auto flex items-center justify-between py-3">
        <div className="logo text-3xl font-light text-white text-opacity-90">
          <Link to="/">PHOTONS</Link>
        </div>
        <ul className="flex items-center font-light space-x-8 text-white text-opacity-80">
          <NavLink exact to="/">
            Dashboard
          </NavLink>
          <NavLink exact to="/add">
            Contribute
          </NavLink>
          <NavLink exact to="/register">
            Register
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}