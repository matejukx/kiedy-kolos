import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "./../actions";
import { motion } from "framer-motion";
import './../App.css';

const CallendarCard = ({day, month, year, events}) => {
    const chosenDate = useSelector(state => state.chosenDate);
    const dispatch = useDispatch();

    const callendarCardClicked = () => {
        console.log("Clicked on day: " + day);
        dispatch(setDate(`${year}-${month}-${day}`));
    }

    return(
        <motion.div
            className="calendar__day" tabindex="0"
            onClick={callendarCardClicked}
            initial={{y: 50}}
            animate={{y: 0}}
            transition={{type: "spring", stiffness: 400}}>
                <div className="events">
                    <ul class="events__list">
                        {events.map(event => (
                            <li className="events__item events__item--exam" key={event.id}>
                                {event.short_name.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="day__number">{day}</div>
        </motion.div>
    )
}

export default CallendarCard;