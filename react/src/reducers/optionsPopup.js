const optionsPopupReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_OPTIONS_POPUP':
            return action.payload;
        default:
            return state;
    }
};

export default optionsPopupReducer;
