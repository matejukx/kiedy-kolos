import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './../App.css';



const InfoPanel = () => {
    const [events, setEvents] = useState([]);
    const date = useSelector(state => state.counter);
    const API_URL = `http://aleksanderblaszkiewicz.pl/kiedykolos/get_events_specific.php?date=2020-12-${date}`;

    useEffect(() => {
        getEvents();
    }, [date]);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
    }

    return(
        <div className="info-panel">
            <p>Wybrana data: 2020-11-{date}</p>
            {events.map((event) => (
                <InfoEvent key={event.name} title={event.name}/>
            ))}
            
        </div>
    )
}

const InfoEvent = ({title}) => {
    return (
        <div className="info-event">
            <p>{title}</p>
        </div>
    )
}

export default InfoPanel;