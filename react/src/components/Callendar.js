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
        let days = new Array(42);
        for(let i=0; i<42; i++) {
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

    var groupSize = 7;
    var rows = days.map(function(day) {
        // map content to html elements
        return <CallendarCard key={day} day={day} month={month} year="2020" events={getEventsForDay(day)}/>;
    }).reduce(function(r, element, index) {
        // create element groups with size 3, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
    }, []).map(function(rowContent) {
        // surround every group with 'row'
        return <div className="calendar__row">{rowContent}</div>;
    });

    return (
        <div className="app__calendar">
            {/* <AddEventPanel refreshEvents={getEvents}/> */}
            <div className="calendar__month">
                <button className="month__button">&lt;</button>
                <h2 className="month__title">Listopad</h2>
                <button className="month__button">&gt;</button>
            </div>
            <div className="calendar__names">
                <ul>
                <li>poniedziałek</li>
                <li>wtorek</li>
                <li>środa</li>
                <li>czwartek</li>
                <li>piątek</li>
                <li>sobota</li>
                <li>niedziela</li>
                </ul>
            </div>
            <div className="calendar__days">
                    {rows}
                    {/* {days.map(day => (
                        <CallendarCard key={day} day={day} month={month} year="2020" events={getEventsForDay(day)}/>
                    ))} */}
            </div>
        </div>
    )

}

export default Callendar;