const groupReducer = (state = "Grupa 1", action) => {
    switch(action.type) {
        case 'SET_GROUP':
            return action.payload
        default:
            return state
    }
}

export default groupReducer;