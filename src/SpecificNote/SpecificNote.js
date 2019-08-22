import React from 'react';
import dummyStore from '../dummy-store'

export default class SpecificNote extends React.Component {
    render() {
        console.log('matchedcard', this.props.match.params.cardId)
        const selectedCardId = this.props.match.params.cardId

        const selectedCard = dummyStore.notes.find(c => c.id === selectedCardId)
        console.log(selectedCard)
    



        return (
            <div>
                <h2>{selectedCard.name}</h2>
                <p>{selectedCard.modified}</p>
                <button>Delete Note</button>
                <p>{selectedCard.content}</p>

            </div>
        )
    }
}