import { FETCH_ALL_WORDS, GET_WORD_DETAILS, SEARCH_WORD, ADD_WORD, DELETE_WORD, ERROR } from './ActionTypes'

export const actionFetchAll = words => {
    return({
        type: FETCH_ALL_WORDS,
        payload: {
            words: words
        }
    })
}

export const actionsGetWord = word => {
    return({
        type: GET_WORD_DETAILS,
        payload: {
            word: word
        }
    })
}

export const actionsSearchWord = words => {
    return({
        type: SEARCH_WORD,
        payload: {
            searchWords: words
        }
    })
}

// export const actionAddWord = word => {
//     return({
//         type: ADD_WORD,
//         payload: {
//             addWord: word
//         }
//     })
// }

// export const actionDeleteWord = word => {
//     return({
//         type: DELETE_WORD,
//         payload: {
//             deleteWord: word
//         }
//     })
// }

export const actionsHandleError = error => {
    return({
        type: ERROR,
        payload: {
            error: error
        }
    })
}