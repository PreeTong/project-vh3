import Action from '../actions'


var initialState = {
    data: {},
    text: "",
}


function postReducer(state = initialState, action) {
    // console.log(state.data)
    switch (action.type) {
        case Action.ADDDATA:
            return {
                ...state,
                data: action.post,
                text: action.text
            }
        case Action.DEDATA:
            return {
                ...state,
                data: action.post,
                text: action.text
            }
        case Action.SEARCH:
            return {
                ...state,
                data: action.data,
                text: action.text,
            }
        case Action.CLEAR:
            return {
                ...state,
                data: {},
                header: {},
                datatable: {},
                text: action.text
            }
        case Action.UPDATE:
            return {
                ...state,
                text: action.text
            }
        default:
            return state
    }
}

export default postReducer;