import React from "react";
import { Switch, Route } from "react-router-dom";

// The dashboard will be the main root screen
import Dashboard from "./screens/dashboard/Dashboard";
import AddContribution from "./screens/AddContribution/AddContribution";

// the navigation bar
import Nav from "./header/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="px-8">
        <div className="w-main mx-auto">
          <Switch>
            <Route path="/add">
              <AddContribution />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}
