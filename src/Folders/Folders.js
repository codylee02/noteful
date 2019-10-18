import React from "react";
import { NavLink, Link } from "react-router-dom";

import NotefulContext from "../NotefulContext";

import "./Folders.css";

export default class Folders extends React.Component {
  static contextType = NotefulContext;

  render() {
    const noteCount = folderId => {
      let count = 0;
      for (let i = 0; i < this.context.noteStore.notes.length; i++) {
        if (folderId === this.context.noteStore.notes[i].folder_id) {
          count++;
        }
      }
      return count;
    };

    const folders = this.context.noteStore.folders
      ? this.context.noteStore.folders.map(folder => (
          <li key={folder.id}>
            <NavLink className="Nav__folder-link" to={`/folders/${folder.id}/`}>
              {folder.name}
            </NavLink>
            <span className="folder-count">{noteCount(folder.id)}</span>
          </li>
        ))
      : "";

    return (
      <nav className="nav-side">
        <ul>
          {folders}
          <li key="newFolder">
            <Link to={"/new-folder"} className="Nav__folder-link">
              Add New Folder
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
