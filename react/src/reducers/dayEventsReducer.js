const dayEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DAY_EVENTS':
            return action.payload;
        default:
            return state;
    }
};

export default dayEventsReducer;
