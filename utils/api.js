// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of 
import AsyncStorage from '@react-native-community/async-storage'
import {DECKS_KEY,formatDecksResults} from './_deck'

export function getDecks(){
    return AsyncStorage.getItem(DECKS_KEY)
    .then(formatDecksResults)
}

export function getDeck(deckname){
    return AsyncStorage.getItem(DECKS_KEY,JSON.stringify({
        deckname
    }))
}

export function saveDeckTitle(deckname){
    return AsyncStorage.mergeItem(DECKS_KEY,JSON.stringify({
        [deckname.split(" ").join("")]:{title:deckname,questions:[]}
    }))
}

export function saveCardToDeck(title,card){
   return AsyncStorage.getItem(DECKS_KEY).then((result) => {
        let decks = JSON.parse(result)
        decks[title].questions.push(card)
    AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(decks))
    })
}