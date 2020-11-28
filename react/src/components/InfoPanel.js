import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './../App.css';



const InfoPanel = () => {
    const [events, setEvents] = useState([]);
    const [chosenEvent, setChosenEvent] = useState();
    const date = useSelector(state => state.chosenDate);
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

    useEffect(() => {
        getEvents();
    }, [date]);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        setChosenEvent(data[0]);
    }

    return(
        <div className="info-panel">
            <div className="events">
                <p>Wybrana data: {date}</p>
                {events.map((event) => (
                    <InfoEvent key={event.id} event={event} setChosenEvent={setChosenEvent}/>
                ))}
            </div>
            <div className="event-description">
                {chosenEvent && chosenEvent.description}
            </div>
        </div>
    )
}

const InfoEvent = ({event, setChosenEvent}) => {
    return (
        <div className="info-event" onClick={() => setChosenEvent(event)}>
            <p>WYDARZENIE: {event.name}</p>
        </div>
    )
}

export default InfoPanel;