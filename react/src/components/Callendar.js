import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CallendarCard from "./CallendarCard";
import AddEventPanel from "./AddEventPanel";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "./../App.css"
import { setDate } from "../actions";

const Callendar = () => {
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;
    const [events, setEvents] = useState([]);
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState();
    const [monthOffset, setMonthOffset] = useState(0);
    const dispatch = useDispatch();

    const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];
    const monthsWords = ['Styczeń', 'Luty',  'Marzec',  'Kwiecień',  'Maj', 'Czerwiec', 'Lipiec',  'Sierpień',  'Wrzesień',  'Październik',  'Listopad',  'Grudzień'];
    let today = dayjs();
   
    useEffect(() => {
        setMonth(parseInt(today.format('MM')));
        dispatch(setDate(today.format("YYYY-MM-DD")));

        initializeDays();
        getEvents();
    }, []);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        console.log(data);
    }

    const increaseMonth = () => {
        setDays([]);

        let offset = monthOffset;
        offset++;
        setMonthOffset(offset);
        today = today.add(offset, 'month');
        setMonth(parseInt(today.format('MM')));
        initializeDays();
    }

    const decreaseMonth = () => {
        let offset = monthOffset;
        offset--;
        setMonthOffset(offset);
        today = today.add(offset, 'month');
        setMonth(parseInt(today.format('MM')));
        initializeDays();
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

        console.log("Checking if " + tmpDay.format('MM') + " belongs to " + thisMonth.format('MM') + ": ");
        return tmpDay.format('MM') == thisMonth.format('MM');
    }


    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }

    var groupSize = 7;
    var rows = days.map(function(day) {
        // map content to html elements
        return <CallendarCard key={day} active={isDayActive(day)} day={day} events={getEventsForDay(day)}/>;
    }).reduce(function(r, element, index) {
        // create element groups with size 3, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
    }, []).map(function(rowContent) {
        // surround every group with 'row'
        return <motion.div className="calendar__row" variants={container} initial="hidden" animate="show">{rowContent}</motion.div>;
    });

    return (
        <div className="app__calendar">
            {/* <AddEventPanel refreshEvents={getEvents}/> */}
            <div className="calendar__month">
                <button className="month__button" onClick={() => decreaseMonth()}>&lt;</button>
                <h2 className="month__title">{monthsWords[month-1]}</h2>
                <button className="month__button" onClick={() => increaseMonth()}>&gt;</button>
            </div>
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
            <motion.ul variants={container} initial="hidden" animate="show">
                <motion.li variants={item}>poniedziałek</motion.li>
                <motion.li variants={item}>wtorek</motion.li>
                <motion.li variants={item}>środa</motion.li>
                <motion.li variants={item}>czwartek</motion.li>
                <motion.li variants={item}>piątek</motion.li>
                <motion.li variants={item}>sobota</motion.li>
                <motion.li variants={item}>niedziela</motion.li>
            </motion.ul>
        </div>
    )

}

export default Callendar;