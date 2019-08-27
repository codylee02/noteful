import React from "react";
import ReactDOM from "react-dom";
import SpecificNote from "./SpecificNote";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SpecificNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});
