import React, { useEffect, useState } from "react";
import CallendarCard from "./CallendarCard";
import AddEventPanel from "./AddEventPanel";
import "./../App.css"

const Callendar = () => {
    const API_URL = `http://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;
    const [events, setEvents] = useState([]);
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState(11);

    useEffect(() => {
        initializeDays();
        getEvents();
    }, []);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        console.log(data);
    }

    const initializeDays = () => {
        let days = new Array(31);
        for(let i=0; i<31; i++) {
            days[i] = i+1;
        }
        setDays(days);
    }

    const getEventsForDay = (day) => {
        let specificEvents = [];
        events.forEach(event => {
            if(event.date.slice(event.date.length-2,event.date.length) == day) {
                specificEvents.push(event);
            }
        });
        return specificEvents;
    }

    return (
        <div className="callendar">
            <AddEventPanel refreshEvents={getEvents}/>
            <br />
            {days.map(day => (
                <CallendarCard key={day} day={day} month={month} events={getEventsForDay(day)}/>
            ))}
        </div>
    )

}

export default Callendar;