import React from "react";
import { NavLink } from "react-router-dom";
import "./Folders.css";

export default class Folders extends React.Component {
  render() {
    const folders = this.props.folders.map(folder => (
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
