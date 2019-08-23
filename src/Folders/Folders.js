import React from "react";
import { NavLink } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Folders.css";

export default class Folders extends React.Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.noteStore.folders.map(folder => (
      <li key={folder.id}>
        <NavLink className="Nav__folder-link" to={`/folders/${folder.id}/`}>
          {folder.name}
        </NavLink>
      </li>
    ));

    return (
      <nav className="nav-side">
        <ul>
          {folders}
          <li key="newFolder">+ New Folder</li>
        </ul>
      </nav>
    );
  }
}
