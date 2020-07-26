import {ADD_DECK,RECEIVE_DECK,ADD_CARD,REMOVE_CARD} from '../actions'

export default function Decks(state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                [action.deckId]: {
                    title: state[action.deckId].title,
                    questions: state[action.deckId].questions.concat({
                        question: action.question,
                        answer: action.answer
                    })
                }
            }
        case REMOVE_CARD:
            return{
                ...state,
                [action.deckId]: {
                    title: state[action.deckId].title,
                    questions: state[action.deckId].questions.filter(
                        (card)=>{card.question === action.question})
                }
            }
        case RECEIVE_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_DECK:
            return{
                ...state,
                [action.deck.title.split(" ").join("")] : action.deck
            }
        default:
            return state
    }
}