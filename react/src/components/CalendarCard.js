import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "./../actions";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import './../App.css';

const CalendarCard = ({day, active, events}) => {
    const chosenDate = useSelector(state => state.chosenDate);
    const dispatch = useDispatch();

    const callendarCardClicked = () => {
        dispatch(setDate(day));
    }

    const item = {
        hidden: { opacity: 0, x: -25 },
        show: { opacity: 1, x: 0 }
        
      }

    return(
        <motion.div className={"calendar__day " + (active ? "" : "calendar__day--inactive")} tabindex="0" onClick={callendarCardClicked} variants={item} whileHover={{y: -2, scale: 1.05}} whileTap={{y: 0, scale: 0.95}}>
                <div className="events">
                    <ul class="events__list">
                        {events.map(event => (
                            <li className="events__item events__item--exam" key={event.id}>
                                {event.short_name.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="day__number">{dayjs(day).format('DD')}</div>
        </motion.div>
    )
}

export default CalendarCard;