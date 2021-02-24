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
