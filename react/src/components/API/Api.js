import { useDispatch } from 'react-redux';
import { forceEventsRefresh } from '../../actions';

export const getAllEvents = async (id) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
};

export const getDayEvents = async (id, date) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
};

export const getGroups = async (id) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
};

export const getCourses = async (id) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
};

export const getTypes = async (id) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_types.php`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
};
