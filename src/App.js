import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Folders from "./Folders/Folders";
import Notes from "./Notes/Notes";
import "./dummy-store.js";
import dummyStore from "./dummy-store.js";

import { Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...dummyStore };
  }

  render() {
    return (
      <main className="App">
        <Route path="/" component={Header} />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Folders {...this.state} />
              <Notes {...this.state} />
            </>
          )}
        />

        <Route
          path="/folders"
          render={() => (
            <>
              <Folders {...this.state} />
            </>
          )}
        />
         <Route
            path="/folders/:folderId"
            component={Notes}

            />
      </main>
    );
  }
}
