export const setDate = (value) => {
    return {
        type: 'SET_DATE',
        payload: value,
    };
};

export const setGroup = (value) => {
    return {
        type: 'SET_GROUP',
        payload: value,
    };
};

export const setOptionsPopup = (value) => {
    return {
        type: 'SET_OPTIONS_POPUP',
        payload: value,
    };
};

export const setAddEventPopup = (value) => {
    return {
        type: 'SET_ADD_EVENT_POPUP',
        payload: value,
    };
};

export const setEditEventPopup = (value) => {
    return {
        type: 'SET_EDIT_EVENT_POPUP',
        payload: value,
    };
};

export const setDeleteEventPopup = (value) => {
    return {
        type: 'SET_DELETE_EVENT_POPUP',
        payload: value,
    };
};

export const forceEventsRefresh = () => {
    return {
        type: 'REFRESH',
    };
};

export const setChosenEvent = (value) => {
    return {
        type: 'SET_CHOSEN_EVENT',
        payload: value,
    };
};

export const setChosenTheme = (value) => {
    return {
        type: 'SET_CHOSEN_THEME',
        payload: value,
    };
};

export const setAllEvents = (value) => {
    return {
        type: 'SET_ALL_EVENTS',
        payload: value,
    };
};

export const setDayEvents = (value) => {
    return {
        type: 'SET_DAY_EVENTS',
        payload: value,
    };
};

export const setEventTypes = (value) => {
    return {
        type: 'SET_EVENT_TYPES',
        payload: value,
    };
};

export const setSubjects = (value) => {
    return {
        type: 'SET_SUBJECTS',
        payload: value,
    };
};

export const setGroups = (value) => {
    return {
        type: 'SET_GROUPS',
        payload: value,
    };
};