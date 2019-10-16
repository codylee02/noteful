import React from "react";
import "./SpecificNote.css";
import config from "../config";

import NotefulContext from "../NotefulContext";

export default class SpecificNote extends React.Component {
  static contextType = NotefulContext;

  handleClickDelete = (cardId, callback) => {
    fetch(`${config.API_ENDPOINT}/notes/${cardId}`, {
      method: "DELETE",
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.props.history.push("/");
      })
      .then(() => {
        this.context.deleteNote(cardId);
      })

      .catch(error => {
        console.error();
      });
  };

  render() {
    const selectedCardId = this.props.match
      ? this.props.match.params.note_id
      : "";
    const selectedCard = this.context.noteStore.notes
      ? this.context.noteStore.notes.find(
          note => note.id === Number(selectedCardId)
        )
      : "";

    const selectedCardFolderId = this.context.noteStore.folders
      ? this.context.noteStore.folders.find(
          folder => folder.id === selectedCard.folder_id
        )
      : "";

    const note = (
      <>
        <li key={(selectedCard || {}).id} className="selectedNote">
          <h2>{(selectedCard || {}).name}</h2>

          <button
            className="delete-button"
            onClick={() => {
              this.handleClickDelete(selectedCard.id);
            }}
          >
            Delete Note
          </button>
          <p>Date Modified: {(selectedCard || {}).modified}</p>
        </li>

        <p className="selectedNote-content">{(selectedCard || {}).content}</p>
      </>
    );

    return (
      <>
        <section className="note">
          <ul>{note}</ul>
        </section>

        <div className="selectedNote-sidebar">
          <button onClick={() => this.props.history.goBack()}>Go Back</button>
          <h1>{(selectedCardFolderId || {}).name}</h1>
        </div>
      </>
    );
  }
}
