import React from "react";
import "./SpecificNote.css";

import NotefulContext from "../NotefulContext";

export default class SpecificNote extends React.Component {
  static contextType = NotefulContext;

  handleClickDelete = (cardId, callback) => {
    fetch(`http://localhost:9090/notes/${cardId}`, {
      method: "DELETE",
      header: {
        "content-type": "application/json"
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
    const selectedCardId = this.props.match.params.cardId;

    const selectedCard = this.context.noteStore.notes.find(
      note => note.id === selectedCardId
    );

    const selectedCardFolderId = this.context.noteStore.folders.find(
      folder => folder.id === selectedCard.folderId
    );

    console.log("selectedCardId", selectedCardId)
    console.log("selectedCard", selectedCard)
    console.log("selectedCardFolderId", selectedCardFolderId)

    const note = (
      <>
        <li key={selectedCard.id} className="selectedNote">
          <h2>{selectedCard.name}</h2>

          <button
            className="delete-button"
            onClick={() => {
              this.handleClickDelete(selectedCard.id);
            }}
          >
            Delete Note
          </button>
          <p>Date Modified: {selectedCard.modified}</p>
        </li>

        <p className="selectedNote-content">{selectedCard.content}</p>
      </>
    );

    

    return (
      <>
        <section className="note">
          <ul>{note}</ul>
        </section>

        <div className="selectedNote-sidebar">
          <button onClick={() => this.props.history.goBack()}>Go Back</button>
          <h1>{selectedCardFolderId.name}</h1>
        </div>
      </>
    );
  }
}
