import React from "react";

const NotefulContext = React.createContext({
  noteStore: {},
  addNote: () => {},
  deleteNote: () => {},
  addFolder: () => {}
});

export default NotefulContext;
