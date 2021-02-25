const chosenEventAdminReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return action.payload;
        default:
            return state;
    }
};

export default chosenEventAdminReducer;
