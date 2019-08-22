import React from "react";
import "./Notes.css";
import { Link } from "react-router-dom";
import dummyStore from "../dummy-store.js";

export default class Notes extends React.Component {
  render() {
    const foundCards = this.props.match
      ? dummyStore.notes.filter(
          note => note.folderId === this.props.match.params.folderId
        )
      : null;

    const folderId = this.props.match
      ? foundCards.map(card => {
          return (
            <li key={card.id}>
              <Link to={`/note/${card.id}`}>
                <h2>{card.name}</h2>
              </Link>
              <button className="delete-button">Delete Note</button>
              <p>Date Modified: {card.modified}</p>
            </li>
          );
        })
      : this.props.notes.map(card => {
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
