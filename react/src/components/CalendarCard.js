import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setDate } from "./../actions";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import './../App.css';

const CalendarCard = ({day, active, events, swipeDirection}) => {
    const dispatch = useDispatch();
    const chosenDate = useSelector(state => state.chosenDate);

    const callendarCardClicked = () => {
        dispatch(setDate(day));
    }

    const item = {
        hidden: { opacity: 0, x: swipeDirection * 100 },
        show: { opacity: 1, x: 0 , transition: {
            type: 'spring', stiffness: 600, damping: 50
        } }
        
      }

    const style = () => {
        if(day == chosenDate) {
            return "day--selected";
        }
        else if(!active) {
            return " day--inactive ";
        }
        else if(dayjs(day).day() == 0 || dayjs(day).day() == 6) {
            return " day--weekend ";
        }
    }



    return(
        <motion.div className={"day " + style()} tabindex="0" onClick={callendarCardClicked} variants={item} whileHover={{y: -2, scale: 1.05}} whileTap={{y: 0, scale: 0.95}}>
                <div className="day__events">
                    <ul className="day__events-list">
                        {events.map(event => (
                            <Event event={event}/>
                        ))}
                    </ul>
                </div>
                <div className="day__number">{dayjs(day).format('DD')}</div>
        </motion.div>
    )
}

export default CalendarCard;


const Event = ({event}) => {
    
    const style = () => {
        if(event.type == "Kolokwium") {
            return " day__event--exam ";
        }
        else if (event.type == "Projekt"){
            return " day__event--project ";
        }
        else if (event.type == "Egzamin"){
            return " day__event--exam ";
        }
        else if (event.type == "Laboratorium"){
            return " day__event--lab ";
        }
        else if (event.type == "Inne"){
            return " day__event--other ";
        }
    }

    return (
        <li className={"day__event " + style()} key={event.id}>
            {event.short_name.toUpperCase()}
        </li>
    )
}