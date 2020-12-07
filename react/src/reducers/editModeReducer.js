const editModeReducer = (state = false, action) => {
    switch(action.type) {
        case 'EDIT_ENABLE':
            return true
        case 'EDIT_DISABLE':
            return false
        default:
            return state
    }
}

export default editModeReducer;