import React from "react";
import ValidationError from '../ValidationError/ValidationError'
import NotefulContext from '../NotefulContext';
//Add error handling
//don't accept empty strings.


export default class AddFolder extends React.Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.folderInput = React.createRef();
        this.state = {
            newFolder: ''
            
        }

    }
updateFolder(folder) {
    this.setState({newFolder: folder})
}

validateFolderName() {
    const newFolderName = this.state.newFolder.trim();
    const existingFoldersArr = this.context.noteStore.folders
    
    
    if (newFolderName.length === 0) {
        return `Folder's title cannot be blank.`;
    }

    for (let i = 0; i < existingFoldersArr.length; i++) {
        if (existingFoldersArr[i].name === newFolderName) {
            return `Folder's name already exists. Please choose another one`
        }

    }
    
}



  handleSubmit = event => {
    event.preventDefault();
    const newFolder = {
        id: this.state.newFolder,
        name: this.state.newFolder
    }
    fetch(`http://localhost:9090/folders/`, {
        method: 'POST',
        body: JSON.stringify(newFolder),
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
        console.log(data)
        this.context.addFolder(data)
        this.props.history.goBack();
    })






    //check that the submission is not an empty string
    //post the newFolder to the server
    //update noteStore state on App
    //GoHome

  };

  handleClickCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <>
        <h2>Add a new Folder</h2>
        <form className="AddFolder__form" onSubmit={this.handleSubmit}>
          {/* <div className="AddFolder__error" role='alert'>
                    {error && <p>{error.message}</p>} 
                </div>*/}
          <label htmlFor="folder">Folder Name: </label>
          <input
            type="text"
            name="folder"
            id="folder"
            ref={this.folderInput}
            placeholder="ex: New Folder 123"
            onChange={e => this.updateFolder(e.target.value)}
            required
          />
          {' '}
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
          {' '}
          <button type="submit"
          disabled={this.validateFolderName()}>Save</button>
        </form>
        <ValidationError message={this.validateFolderName()} />
      </>
    );
  }
}

