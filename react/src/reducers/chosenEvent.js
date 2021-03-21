const chosenEventReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_CHOSEN_EVENT':
            return action.payload;
        default:
            return state;
    }
};

export default chosenEventReducer;
