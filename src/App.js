import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Folders from "./Folders/Folders";
import Notes from "./Notes/Notes";
import NavNotes from "./NavNotes/NavNotes";
import SpecificNote from "./SpecificNote/SpecificNote";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import NotefulContext from "./NotefulContext";
import NotefulError from "./NotefulError/NotefulError";
import config from "./config";

import { Route } from "react-router-dom";

export default class App extends React.Component {
  state = {
    noteStore: {
      folders: [],
      notes: []
    }
  };

  deleteNote = note_id => {
    const newNotes = this.state.noteStore.notes.filter(
      note => note.id !== note_id
    );
    const sameFolders = this.state.noteStore.folders;

    this.setState({
      noteStore: {
        notes: newNotes,
        folders: sameFolders
      }
    });
  };

  addFolder = folder => {
    this.setState({
      noteStore: {
        folders: [...this.state.noteStore.folders, folder],
        notes: [...this.state.noteStore.notes]
      }
    });
  };

  addNote = note => {
    this.setState({
      noteStore: {
        folders: [...this.state.noteStore.folders],
        notes: [...this.state.noteStore.notes, note]
      }
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`
        }
      })
    ])
      .then(([folderRes, notesRes]) => {
        if (!folderRes.ok) {
          throw new Error(folderRes.status);
        }
        if (!notesRes.ok) {
          throw new Error(notesRes.status);
        }
        return Promise.all([folderRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ noteStore: { folders, notes } });
      });
  }

  render() {
    const contextValue = {
      noteStore: this.state.noteStore,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    return (
      <>
        <NotefulContext.Provider value={contextValue}>
          <Route path="/" component={Header} />
          <main className="App">
            <Route exact path="/" component={Folders} />
            <Route exact path="/" component={Notes} />
            <Route path="/folders" component={Folders} />
            <NotefulError>
              <Route exact path="/folders/:folder_id" component={NavNotes} />
            </NotefulError>
            <NotefulError>
              <Route path="/notes/:note_id" component={SpecificNote} />
            </NotefulError>
            <Route exact path="/new-folder" component={AddFolder} />
            <Route exact path="/new-note" component={AddNote} />
          </main>
        </NotefulContext.Provider>
      </>
    );
  }
}
