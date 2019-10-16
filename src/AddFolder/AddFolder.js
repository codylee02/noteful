import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import NotefulContext from "../NotefulContext";
import config from "../config";

export default class AddFolder extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      newFolder: ""
    };
  }
  updateFolder(folder) {
    this.setState({ newFolder: folder });
  }

  validateFolderName() {
    const newFolderName = this.state.newFolder.trim();
    const existingFoldersArr = this.context.noteStore.folders;

    if (newFolderName.length === 0) {
      return `Folder's title cannot be blank.`;
    }

    for (let i = 0; i < existingFoldersArr.length; i++) {
      if (existingFoldersArr[i].name === newFolderName) {
        return `Folder's name already exists. Please choose another one`;
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const newFolder = {
      id: this.state.newFolder,
      name: this.state.newFolder
    };
    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: "POST",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.context.addFolder(data);
        this.props.history.goBack();
      });
  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <>
        <h2>Add a new Folder</h2>
        <form className="AddFolder__form" onSubmit={this.handleSubmit}>
          <label htmlFor="folder">Folder Name: </label>
          <input
            type="text"
            name="folder"
            id="folder"
            placeholder="ex: New Folder 123"
            onChange={e => this.updateFolder(e.target.value)}
            required
          />{" "}
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>{" "}
          <button type="submit" disabled={this.validateFolderName()}>
            Save
          </button>
        </form>
        <ValidationError message={this.validateFolderName()} />
      </>
    );
  }
}
