import { combineReducers } from 'redux'
// import counterReducer from './counter'
import postReducer from './post'

export default combineReducers({
    
    post: postReducer,
    // counter: counterReducer,
    
})