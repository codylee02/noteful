import React from "react";
import "./Notes.css";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

export default class Notes extends React.Component {
  static contextType = NotefulContext;

  render() {

    const notes = this.context.noteStore.notes.map(card => {
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
          {notes}
          <button>Add Note</button>
        </ul>
      </section>
    );
  }
}
