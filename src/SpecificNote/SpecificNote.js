import React from "react";

import "./SpecificNote.css";

import NotefulContext from '../NotefulContext';

export default class SpecificNote extends React.Component {
  static contextType = NotefulContext;

  render() {
    const selectedCardId = this.props.match.params.cardId;

    const selectedCard = this.context.noteStore.notes.find(c => c.id === selectedCardId);

    const selectedCardFolderId = this.context.noteStore.folders.find(
      c => c.id === selectedCard.folderId
    );

    const note = (
      <>
        <li key={selectedCard.id} className="selectedNote">
          <h2>{selectedCard.name}</h2>

          <button className="delete-button">Delete Note</button>
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
