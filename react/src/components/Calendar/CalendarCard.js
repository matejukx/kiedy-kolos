import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../actions";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const CalendarCard = ({cardDate, isInCurrentMonth, events}) => {
    const dispatch = useDispatch();
    const chosenDate = useSelector(state => state.chosenDate);

    const onCallendarCardClicked = () => {
        dispatch(setDate(cardDate));
    }

    const style = () => {
        let styleText = "";

        if(!isInCurrentMonth)
            return "day--inactive ";

        if(cardDate === chosenDate)
            styleText += "day--selected ";

        if(dayjs(cardDate).day() === 0 || dayjs(cardDate).day() === 6)
            styleText += "day--weekend ";

        if(dayjs(cardDate).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")) {
            styleText += "day--current ";
        }
            
        return styleText;
    }

    return(
        <motion.div className={"day " + style()}
            tabindex="0" 
            onClick={onCallendarCardClicked}
            whileHover={{y: -2, scale: 1.05}}
            whileTap={{y: 0, scale: 0.95}}>
            <div className="day__events">
                <ul className="day__events-list">
                    {events.map((event,index) => (
                        <Event key={index} event={event}/>
                    ))}
                </ul>
            </div>
            <div className="day__number">{dayjs(cardDate).format('DD')}</div>
        </motion.div>
    )
}

export default CalendarCard;

const Event = ({event}) => {
    const styles = {
        "Kolokwium" : "day__event--exam",
        "Projekt" : "day__event--project",
        "Egzamin" : "day__event--exam",
        "Laboratorium" : "day__event--lab",
        "Inne" : "day__event--other"
    }

    return (
        <li className={"day__event " + styles[event.type]} key={event.id}>
            {event.short_name.toUpperCase()}
        </li>
    )
}