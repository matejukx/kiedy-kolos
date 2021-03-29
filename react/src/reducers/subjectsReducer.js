const subjectsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SUBJECTS':
            return action.payload;
        default:
            return state;
    }
};

export default subjectsReducer;
