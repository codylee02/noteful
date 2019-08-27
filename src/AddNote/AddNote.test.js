import React from "react";
import ReactDOM from "react-dom";
import AddNote from "./AddNote";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});
