import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import Reducer from './Reducer'

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(Reducer, composeEnhancer)

export default store