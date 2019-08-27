import React from "react";
import ReactDOM from "react-dom";
import NotefulError from "./NotefulError";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NotefulError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
