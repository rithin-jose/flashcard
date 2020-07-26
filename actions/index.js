import {getDecks, saveCardToDeck, saveDeckTitle} from '../utils/api'

export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function addCard(deckId,question,answer){
    return{
        type:ADD_CARD,
        deckId,
        question,
        answer,
    }
}

export function removeCard(deckId,question){
    return {
        type:REMOVE_CARD,
        deckId,
        question,
    }
}

export function receiveDeck(deck){
    return{
        type: RECEIVE_DECK,
        deck,
    }
}

export function addDeck(deck){
    return{
        type: ADD_DECK,
        deck,
    }
}

export function handleInitialData(){
    return (dispatch) => {
        return(
            getDecks()
            .then((deck) => {
                dispatch(receiveDeck(deck))
            })
        )
    }
}

export function addDeckTitle(title){
    return (dispatch) => {
        return(
            saveDeckTitle(title)
            .then(() => {
                dispatch(handleInitialData())
            })
        )
    }
}

export function addCardToDeck(title,question){
    return (dispatch) => {
        return(
            saveCardToDeck(title,question)
            .then(() => {
                dispatch(handleInitialData())
            })
        )
    }
}