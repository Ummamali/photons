import React from "react";

// The dashboard will be the main root screen
import Dashboard from "./screens/dashboard/Dashboard";
import { Switch, Route } from "react-router-dom";

// the navigation bar
import Nav from "./header/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main className="px-8">
        <div className="w-main mx-auto">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}
