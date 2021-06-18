import { FETCH_ALL_WORDS, GET_WORD_DETAILS, SEARCH_WORD, ADD_WORD, DELETE_WORD, ERROR } from './ActionTypes'

const initalState = {
    "base_url": "https://vocab-backnd.herokuapp.com"
    // "http://localhost:5000"
}

const Reducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_ALL_WORDS:
            state = {...state, words: action.payload.words, error:''}
            return state
        case GET_WORD_DETAILS:
            state = {...state, word: action.payload.word, error:''} 
            return state
        case SEARCH_WORD:
            state = {...state, searchWords: action.payload.searchWords, error:''} 
            return state
        // case ADD_WORD:
        //     state = {...state, addWord: action.payload.addWord, error:''}
        //     return state
        // case DELETE_WORD:
        //     state = {...state, deleteWord: action.payload.deleteWord, error:''}
        //     return state
        case ERROR:
            state = {...state, error: action.payload.error} 
            return state
        default:
            return state
    }
}

export default Reducer
