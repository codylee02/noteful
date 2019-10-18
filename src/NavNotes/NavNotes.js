import React from "react";
import "../Notes/Notes.css";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import config from "../config";

export default class NavNotes extends React.Component {
  static contextType = NotefulContext;

  handleClickDelete = (cardId, callback) => {
    fetch(`${config.API_ENDPOINT}/${cardId}`, {
      method: "DELETE",
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return;
      })
      .then(() => {
        this.context.deleteNote(cardId);
      })
      .catch(error => {
        console.error();
      });
  };

  render() {
    const foundCards = this.context.noteStore.notes
      ? this.context.noteStore.notes.filter(
          note => note.folder_id === Number(this.props.match.params.folder_id)
        )
      : "";

    const folderId = foundCards
      ? foundCards.map(card => {
          return (
            <li key={card.id}>
              <Link to={`/notes/${card.id}`}>
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
        })
      : "";

    return (
      <section className="note-list">
        <ul>
          {folderId}
          <button>
            <Link to={"/new-note"}>Add Note</Link>
          </button>
        </ul>
      </section>
    );
  }
}
