import React from "react";
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from '../NotefulContext';

export default class AddNote extends React.Component {

    static contextType = NotefulContext;
    
    
    
    constructor(props) {
        super(props);
        this.newNoteTitleInput = React.createRef()
        this.newNoteContentInput = React.createRef()
        this.newNoteFolderInput = React.createRef()
        this.state = {
            newNoteTitle: '',
            newNoteFolder: '',
            newNoteContent: ''
        }
    }
  //get name, content, and select a folder
  //validation to make sure that note is note blank
  //folder selected from a list of existing folders (get it from state?)
  //proper error handling...
  handleSubmit = event => {
    event.preventDefault();
    
    const newNote = {
        "id": 7,
        "name": this.state.newNoteTitle,
        "modified": new Date(),
        "folderId": this.state.newNoteFolder,
        "content": this.state.newNoteContent
    }

    fetch(`http://localhost:9090/notes/`, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res => {
        if(!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
            return res.json()
        
    })
    .then(data => {
        this.context.addNote(data)
    })
    .then(this.props.history.goBack())
    
  };

  validateNewNoteTitle(){
      //validation stuff
      const newNoteTitle = this.state.newNoteTitle.trim();
      if (newNoteTitle.length === 0) {
          return `Note's title cannot be blank`
      }
  }

  validateNewNoteContent() {
      const newNoteFolder = this.state.newNoteFolder.trim()
      if(newNoteFolder.length === 0) {
          return `Note's folder cannot be blank`
      }

  }

  validateNewNoteFolder() {
    const newNoteContent = this.state.newNoteContent.trim()
    if(newNoteContent.length === 0) {
        return `Note's content cannot be blank`
    }
  }

  updateNewNoteTitle(title) {
      this.setState({
          newNoteTitle: title
      })
  }

  updateNewNoteContent(content) {
    this.setState({
        newNoteContent: content
    })

  }

  updateNewNoteFolder(folder) {
      this.setState({
          newNoteFolder: folder
      })
  }

  handleClickCancel = () => {
      this.props.history.goBack();
  }

  render() {
    const folderOptions = this.context.noteStore.folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option>

    )

    return (
      <>
        <h2>Add a new note:</h2>
        <form className="AddNote__form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>{" "}
          <input
            type="text"
            name="title"
            id="title"
            ref={this.titleInput}
            placeholder="ex: My New Note"
            onChange={e => this.updateNewNoteTitle(e.target.value)}
            required
          />
          {' '}
          <label htmlFor="folder">Folder:</label>
          {" "}
          <select id="folder" name="folder"
          onChange={e => this.updateNewNoteFolder(e.target.value)}>
              <option value="">Select a folder</option>
              {folderOptions}
          </select>
          <div className="AddNote__form-content">
              <label htmlFor="content">Content:</label>
              {' '}
              <textarea
              name='content'
              id='content'
              onChange={e => this.updateNewNoteContent(e.target.value)}
            />
          </div>
          {' '}
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
          {' '}
          <button type="submit"
          disabled={
              this.validateNewNoteTitle() ||
              this.validateNewNoteFolder()||
              this.validateNewNoteContent() }>Save</button>
        </form>
        <ValidationError message={this.validateNewNoteTitle()} />
        <ValidationError message={this.validateNewNoteFolder()} />
        <ValidationError message={this.validateNewNoteContent()} />
        
      </>
    );
  }
}
