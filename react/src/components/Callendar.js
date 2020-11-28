import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CallendarCard from "./CallendarCard";
import AddEventPanel from "./AddEventPanel";
import "./../App.css"
import { setDate } from "../actions";

const Callendar = () => {
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;
    const [events, setEvents] = useState([]);
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState(12);
    const dispatch = useDispatch();

    useEffect(() => {
        initializeDays();
        getEvents();
        dispatch(setDate("2020-12-01"));
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
                <CallendarCard key={day} day={day} month={month} year="2020" events={getEventsForDay(day)}/>
            ))}
        </div>
    )

}

export default Callendar;