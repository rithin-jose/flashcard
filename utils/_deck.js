import AsyncStorage from '@react-native-community/async-storage'

export const DECKS_KEY = 'FlashCards'

let decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'React is a javascript library written by the developers at Facebook to build cleaner reusable components'
            },
            {
                question: 'What is state in React?',
                answer: 'State is an object that determines the behavior of a component'
            },
        ]
    },
    Datastructures: {
        title: 'Data Structures',
        questions: [
            {
                question: 'What is an array in C?',
                answer: 'An array is a sequence of elements of similar datatype'
            },
            {
                question: 'What is a string?',
                answer: 'An string is a sequence of characters'
            }
        ]
    },
}

function setInitialData() {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    return {...decks}
}

export function noDeck () {
    return (
    <Text>No Decks added maybe try Add Deck</Text>
    )
  }
  

export function formatDecksResults(results) {
    return results === null ? setInitialData() : JSON.parse(results)
}

