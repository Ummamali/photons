import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// The dashboard will be the main root screen
import Home from "./screens/home/Home";
import Contributors from "./screens/contributors/Contributors";
import ErrorMessage from "./utils/ErrorMessage";

// the navigation bar
import Nav from "./header/Nav";
import CollectScreen from "./screens/collect/CollectScreen";

export default function App() {
  return (
    <>
      <Nav />
      <main className="px-8">
        <div className="w-main mx-auto">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/contributors">
              <Contributors />
            </Route>
            <Route path="/collect">
              <CollectScreen />
            </Route>
            <Route path="*">
              <ErrorMessage title="This Route Doesn't Exists">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora quasi nulla sunt. Quod beatae id sunt ratione error,
                doloremque, animi nulla repellendus nesciunt inventore eligendi.
                Nobis dolore suscipit, blanditiis minus itaque qui ullam culpa
                facilis aliquid fuga tempora amet esse!
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                animi dolorem a culpa corrupti odit veniam, quibusdam vel! Non,
                odio?
              </ErrorMessage>
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}
