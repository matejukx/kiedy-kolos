import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import dayjs from "dayjs";

import { setDate } from "../actions";

import CalendarCard from "./CalendarCard";
import CalendarTools from "./CalendarTools";

const Calendar = () => {
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState();
    const [monthOffset, setMonthOffset] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(1);
    
    const dispatch = useDispatch();
    const chosenGroup = useSelector(state => state.chosenGroup);

    const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];
    const monthsWords = ['Styczeń', 'Luty',  'Marzec',  'Kwiecień',  'Maj', 'Czerwiec', 'Lipiec',  'Sierpień',  'Wrzesień',  'Październik',  'Listopad',  'Grudzień'];

    let today = dayjs();

    useEffect(() => {
        setMonth(parseInt(today.format('MM')));
        dispatch(setDate(today.format("YYYY-MM-DD")));

        initializeDays();
        getEvents();
    }, []);

    useEffect(() => {
        getEvents();
    }, [chosenGroup])

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filteredData = data.filter(shouldBeDisplayed);
        setEvents(filteredData);
    }

    const moveMonth = (direction) => {
        setSwipeDirection(direction);
        const offset = monthOffset + direction;
        setMonthOffset(offset);
        today = today.add(offset, 'month');
        setMonth(parseInt(today.format('MM')));
        initializeDays();
    }

    const shouldBeDisplayed = (event) => {
        return (event.group_name === "Wszystkie" || event.group_name === chosenGroup);
    }

    const initializeDays = () => {
        const days = new Array(42);
        const startDayOfMonth = daysOfWeek[today.startOf('month').day()]; // 1 - monday, 7 sunday
        
        const startingDay = today.startOf('month').subtract(startDayOfMonth - 1, 'day');

        for(let i=0; i<42; i++)
            days[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');

        setDays(days);
    }

    const getEventsForDay = (day) => {
        return events.filter(eventDay => eventDay.date === day);
    }

    const isDayActive = (day) => {
        const thisMonth = today.add(monthOffset, 'month');
        return dayjs(day).format('MM') === thisMonth.format('MM');
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1
        }
    }

    const groupSize = 7;
    var rows = days.map(day => 
        <CalendarCard
            key={day}
            active={isDayActive(day)}
            day={day}
            events={getEventsForDay(day)}
            swipeDirection={swipeDirection}/>)
        .reduce((r, element, index) => {
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
        }, [])
        .map((rowContent, index) => 
            <motion.div 
                key={index}
                className="calendar__row" 
                variants={container} 
                initial="hidden" 
                animate="show">
                    {rowContent}
            </motion.div>);

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button className="button button--previous" onClick={() => moveMonth(-1)}></button>
                <motion.h2 key={month}
                    className="calendar__title"
                    initial={{x: swipeDirection * 50}}
                    animate={{x: 0}}
                    transition={{ type: 'spring', stiffness: 600, damping: 50 }}>
                        {monthsWords[month-1]}
                </motion.h2>
                <button className="button button--next" onClick={() => moveMonth(1)}></button>
            </div>
            <CalendarTools />
            <WeekDays/>
            <motion.div className="calendar__days">
                {rows}
            </motion.div>
        </div>
    )
}

const WeekDays = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }
    const item = {
        hidden: { opacity: 0, x: -25 },
        show: { opacity: 1, x: 0 }
    }

    const calendarDays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela']
        .map(day => {
            return <motion.li key={day} className="calendar__names-item" variants={item}>{day}</motion.li>
        });

    return (
        <div className="calendar__names">
            <motion.ul className="calendar__names-list" variants={container} initial="hidden" animate="show">
                {calendarDays}
            </motion.ul>
        </div>
    )
}

export default Calendar;