const addEventPopupReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_ADD_EVENT_POPUP':
            return action.payload;
        default:
            return state;
    }
};

export default addEventPopupReducer;
