import React from "react";
import "../Notes/Notes.css";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

export default class NavNotes extends React.Component {
  static contextType = NotefulContext;

  render() {
    const foundCards = this.context.noteStore.notes.filter(
      note => note.folderId === this.props.match.params.folderId
    );

    const folderId = foundCards.map(card => {
      return (
        <li key={card.id}>
          <Link to={`/note/${card.id}`}>
            <h2>{card.name}</h2>
          </Link>
          <button className="delete-button">Delete Note</button>
          <p>Date Modified: {card.modified}</p>
        </li>
      );
    });

    return (
      <section className="note-list">
        <ul>
          {folderId}
          <button>Add Note</button>
        </ul>
      </section>
    );
  }
}
