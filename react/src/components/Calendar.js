import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarCard from "./CalendarCard";
import AddEventPanel from "./AddEventPanel";
import CalendarTools from "./CalendarTools";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "./../App.css"
import { setDate } from "../actions";

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
        console.log(filteredData);
    }

    const increaseMonth = () => {
        setSwipeDirection(1);
        let offset = monthOffset;
        offset++;
        setMonthOffset(offset);
        today = today.add(offset, 'month');
        setMonth(parseInt(today.format('MM')));
        initializeDays();
    }

    const decreaseMonth = () => {
        setSwipeDirection(-1);
        let offset = monthOffset;
        offset--;
        setMonthOffset(offset);
        today = today.add(offset, 'month');
        setMonth(parseInt(today.format('MM')));
        initializeDays();
    }

    const shouldBeDisplayed = (event) => {
        if(event.group_name == "Wszystkie" || event.group_name == chosenGroup) {
            console.log("event " + event.id + " should be displayed");
            return true;
        }
        else {
            console.log("event " + event.id + " should NOT be displayed");
            return false;
        }
    }


    const initializeDays = () => {
        let days = new Array(42);
        let startDayOfMonth = daysOfWeek[today.startOf('month').day()]; // 1 - monday, 7 sunday
        
        let startingDay = today.startOf('month').subtract(startDayOfMonth-1, 'day');

        for(let i=0; i<42; i++) {
            days[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');
        }

        setDays(days);
    }

    const getEventsForDay = (day) => {
        let eventsForDay = [];
        events.forEach(event => {
            if(event.date == day) {
                eventsForDay.push(event);
            }
        });
        return eventsForDay;
    }

    const isDayActive = (day) => {
        let thisMonth = today.add(monthOffset, 'month');
        let tmpDay = dayjs(day);
        return tmpDay.format('MM') == thisMonth.format('MM');
    }


    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1
        }
      }

    const groupSize = 7;
    var rows = days.map(function(day) {
        return <CalendarCard key={day} active={isDayActive(day)} day={day} events={getEventsForDay(day)} swipeDirection={swipeDirection}/>;
    }).reduce(function(r, element, index) {
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
    }, []).map(function(rowContent) {
        return <motion.div className="calendar__row" variants={container} initial="hidden" animate="show">{rowContent}</motion.div>;
    });

    return (
        <div className="calendar">
            {/* <AddEventPanel refreshEvents={getEvents}/> */}
            <div className="calendar__header">
                <button className="button button--previous" onClick={() => decreaseMonth()}></button>
                <motion.h2 key={month} className="calendar__title" initial={{x: swipeDirection * 50}} animate={{x: 0}}  transition={{ type: 'spring', stiffness: 600, damping: 50 }}>{monthsWords[month-1]}</motion.h2>
                <button className="button button--next" onClick={() => increaseMonth()}></button>
            </div>
            <CalendarTools />
            <WeekDays />
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

    return (
        <div className="calendar__names">
            <motion.ul className="calendar__names-list" variants={container} initial="hidden" animate="show">
                <motion.li className="calendar__names-item" variants={item}>poniedziałek</motion.li>
                <motion.li className="calendar__names-item" variants={item}>wtorek</motion.li>
                <motion.li className="calendar__names-item" variants={item}>środa</motion.li>
                <motion.li className="calendar__names-item" variants={item}>czwartek</motion.li>
                <motion.li className="calendar__names-item" variants={item}>piątek</motion.li>
                <motion.li className="calendar__names-item" variants={item}>sobota</motion.li>
                <motion.li className="calendar__names-item" variants={item}>niedziela</motion.li>
            </motion.ul>
        </div>
    )

}

export default Calendar;