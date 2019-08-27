import React from "react";
import "../Notes/Notes.css";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

export default class NavNotes extends React.Component {
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
        this.context.deleteNote(cardId);
      })
      .catch(error => {
        console.error();
      });
  };

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
          <button
            className="delete-button"
            onClick={() => {
              this.handleClickDelete(card.id);
            }}
          >
            Delete Note
          </button>
          <p>Date Modified: {card.modified}</p>
        </li>
      );
    });

    return (
      <section className="note-list">
        <ul>
          {folderId}
          <button><Link to={'/new-note'}>Add Note</Link></button>
        </ul>
      </section>
    );
  }
}
