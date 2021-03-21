const forceEventsRefreshReducer = (state = false, action) => {
    switch (action.type) {
        case 'REFRESH':
            return !state;
        default:
            return state;
    }
};

export default forceEventsRefreshReducer;
