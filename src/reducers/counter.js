import Action from '../actions'

var initialState = {
    couter: 0,
    text: "",
    data: {}
}

function counterReducer(state = initialState, action) {
    // console.log(state)
    switch (action.type) {
        case Action.INCREMENT:
            return {
                couter: state.couter + 1,
                text: action.text
            }
        case Action.DECREMENT:
            return {
                couter: state.couter - 1,
                text: action.text
            }
        case Action.POSTDATA:
            return {
                couter: state.couter,
                text: action.text,
                data: action.post
            }
        default:
            return state
    }
}

export default counterReducer;