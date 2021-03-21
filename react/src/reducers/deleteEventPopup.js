const deleteEventPopupReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_DELETE_EVENT_POPUP':
            return action.payload;
        default:
            return state;
    }
};

export default deleteEventPopupReducer;
