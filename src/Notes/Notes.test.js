import React from "react";
import ReactDOM from "react-dom";
import Notes from "./Notes";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Notes />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
