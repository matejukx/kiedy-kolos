const editEventPopupReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_EDIT_EVENT_POPUP':
            return action.payload;
        default:
            return state;
    }
};

export default editEventPopupReducer;
