import React from "react";

const NotefulContext = React.createContext({
  noteStore: {},
  addNote: () => {},
  deleteNote: () => {}
});

export default NotefulContext;
