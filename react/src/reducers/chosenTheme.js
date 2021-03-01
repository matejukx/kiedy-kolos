const chosenThemeReducer = (state = 'dark', action) => {
    switch (action.type) {
        case 'SET_CHOSEN_THEME':
            return action.payload;
        default:
            return state;
    }
};

export default chosenThemeReducer;
