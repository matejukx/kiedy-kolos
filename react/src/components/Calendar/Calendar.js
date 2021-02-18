import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import dayjs from "dayjs";

import { setDate } from "../../actions";

import CalendarCard from "./CalendarCard";
import CalendarTools from "./CalendarTools";
import WeekDays from "./WeekDays";

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

        initializeMonthDays(0);
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

    const increaseMonth = () => {
        setSwipeDirection(1);
        const offset = monthOffset + 1;
        setMonthOffset(offset);
        setMonth(parseInt(today.add(offset, 'month').format('MM')));
        initializeMonthDays(offset);
    }

    const decreaseMonth = () => {
        setSwipeDirection(-1);
        const offset = monthOffset - 1;
        setMonthOffset(offset);
        setMonth(parseInt(today.add(offset, 'month').format('MM')));
        initializeMonthDays(offset);
    }

    const shouldBeDisplayed = (event) => {
        return (event.group_name === "Wszystkie" || event.group_name === chosenGroup);
    }

    const initializeMonthDays = (offset) => {
        const desiredDay = today.add(offset, 'month');
        const daysTemp = new Array(42);
        const startDayOfMonth = daysOfWeek[desiredDay.startOf('month').day()]; // 1 - monday, 7 sunday
        
        const startingDay = desiredDay.startOf('month').subtract(startDayOfMonth - 1, 'day');

        for(let i=0; i<42; i++)
            daysTemp[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');

        setDays(daysTemp);
    }

    const getEventsForDay = (day) => {
        return events.filter(eventDay => eventDay.date === day);
    }

    const isDayInCurrentMonth = (day) => {
        const thisMonth = today.add(monthOffset, 'month');
        return dayjs(day).format('MM') === thisMonth.format('MM');
    }

    const calendarRowVariants = {
        hidden: { opacity: 0, x: swipeDirection * 100 },
        show: { opacity: 1, x: 0 , 
            transition: {
                type: 'spring', stiffness: 600, damping: 50
            } 
        }
    }

    var rows = days.map(day => 
        <CalendarCard
            key={day}
            isInCurrentMonth={isDayInCurrentMonth(day)}
            cardDate={day}
            events={getEventsForDay(day)}
            swipeDirection={swipeDirection}/>)
        .reduce((r, element, index) => {
            index % 7 === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
        }, [])
        .map((rowContent, index) => 
            <div 
                key={month+index}
                className="calendar__row" >
                    {rowContent}
            </div>);

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button className="button button--previous" onClick={() => decreaseMonth()}></button>
                <motion.h2
                    key={month}
                    className="calendar__title"
                    initial={{x: swipeDirection * 50}}
                    animate={{x: 0}}
                    transition={{ type: 'spring', stiffness: 600, damping: 50 }}>
                        {monthsWords[month-1]}
                </motion.h2>
                <button className="button button--next" onClick={() => increaseMonth()}></button>
            </div>
            <CalendarTools />
            <WeekDays/>
            <motion.div
                className="calendar__days"
                key={month}
                initial="hidden" 
                animate="show"
                variants={calendarRowVariants}>
                {rows}
            </motion.div>
        </div>
    )
}

export default Calendar;