import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import NotefulContext from "../NotefulContext";

export default class AddNote extends React.Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      folderId: "",
      content: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const note = {
      id: Math.random(),
      name: this.state.name,
      modified: new Date(),
      folderId: this.state.folderId,
      content: this.state.content
    };

    fetch(`http://localhost:9090/notes/`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json"
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
        this.context.addNote(data);
      })
      .then(this.props.history.goBack());
  };

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return `Note's title cannot be blank`;
    }
  }

  validateFolderId() {
    const folderId = this.state.folderId.trim();
    if (folderId.length === 0) {
      return `Note's folder cannot be blank`;
    }
  }

  validateContent() {
    const content = this.state.content.trim();
    if (content.length === 0) {
      return `Note's content cannot be blank`;
    }
  }

  updateInput(value, input) {
    this.setState({
      [input]: value
    });
  }

  handleClickCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const folderOptions = this.context.noteStore.folders.map(folder => (
      <option value={folder.id} key={folder.id}>
        {folder.name}
      </option>
    ));

    return (
      <>
        <h2>Add a new note:</h2>
        <form className="AddNote__form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>{" "}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="ex: My New Note"
            onChange={e => this.updateInput(e.target.value, "name")}
            required
          />{" "}
          <label htmlFor="folder">Folder:</label>{" "}
          <select
            id="folder"
            name="folder"
            onChange={e => this.updateInput(e.target.value, "folderId")}
          >
            <option value="">Select a folder</option>
            {folderOptions}
          </select>
          <div className="AddNote__form-content">
            <label htmlFor="content">Content:</label>{" "}
            <textarea
              name="content"
              id="content"
              onChange={e => this.updateInput(e.target.value, "content")}
            />
          </div>{" "}
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>{" "}
          <button
            type="submit"
            disabled={
              this.validateName() ||
              this.validateFolderId() ||
              this.validateContent()
            }
          >
            Save
          </button>
        </form>
        <ValidationError message={this.validateName()} />
        <ValidationError message={this.validateFolderId()} />
        <ValidationError message={this.validateContent()} />
      </>
    );
  }
}
