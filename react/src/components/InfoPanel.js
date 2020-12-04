import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import './../App.css';



const InfoPanel = () => {
    const [events, setEvents] = useState([]);
    const [chosenEvent, setChosenEvent] = useState();
    const date = useSelector(state => state.chosenDate);
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

    useEffect(() => {
        setEvents([]);
        getEvents();
    }, [date]);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        setChosenEvent(data[0]);
    }



    const container = {
        hidden: { opacity: 0},
        show: {
            opacity: 1,
          transition: {
            staggerChildren: 0.07
          }
        }
      }

   
      

    return(
        <div className="app__extension">
            <motion.div className="app__events">
                <h2 class="events__header">Wydarzenia {date}</h2>
                <motion.ul class="events-list" variants={container} initial="hidden" animate={events.length > 0 && "show"}>
                    {events.map((event) => (
                        <EventButton event={event} setChosenEvent={setChosenEvent}/>
                    ))}
                </motion.ul>
            </motion.div>
            <EventDescription event={chosenEvent}/>
        </div>
    )
}

const EventButton = ({event, setChosenEvent}) => {
    const item = {
        hidden: { opacity: 0, x: 100 },
        show: { opacity: 1, x: 0, transition: {
            type: 'spring', stiffness: 600, damping: 50
        } }
      }

    return (
        <motion.li key={event.id} className="events-list__item" variants={item} whileTap={{scale: 0.95}} whileHover={{y: -5, scale: 1.02}} onClick={() => setChosenEvent(event)}>
            <h3>{event.name}</h3>
            <div class="events-list__info">
                <div class="events-list__time">11:30 - 12:45</div>
                <div class="events-list__category">Projekt</div>
            </div>
        </motion.li>
    )
}

const EventDescription = ({event}) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }

    return (
        <div class="app__info">
            {event &&
            <div key={event.id}>
             <motion.h3 initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ type: "spring", stiffness: 600, damping: 50}}>{event.name}</motion.h3>
            <motion.ul class="app__links" variants={container} initial="hidden" animate="show">
              <a><motion.li class="app__link"  variants={item}>eNauczanie</motion.li></a>
              <a><motion.li class="app__link"  variants={item}>Prezentacja</motion.li></a>
              <a><motion.li class="app__link"  variants={item}>Dysk Google</motion.li></a>
            </motion.ul>
            <motion.div class="app__info-text" initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ type: "spring", stiffness: 600, damping: 50, delay: 0.1}}>{event.description}</motion.div>
            </div>}
          </div>
    )
}

export default InfoPanel;