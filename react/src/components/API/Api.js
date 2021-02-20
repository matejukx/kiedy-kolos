export const getAllEvents = async (id) => {
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;

    const response = await fetch(URL);
    const data = await response.json();

    return data;
}

export const getDayEvents = async (id, date) => {
    console.log("I've got called");
    
    const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;
    console.log("Making call: " + URL);
    
    const response = await fetch(URL);
    const data = await response.json();

    console.log("returning" + data);

    return data
}