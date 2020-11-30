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

    const item = {
        hidden: { opacity: 0, x: 100 },
        show: { opacity: 1, x: 0, transition: {
            type: 'spring', stiffness: 600, damping: 50
        } }
      }
      

    return(
        <div className="app__extension">
            <motion.div className="app__events">
                <h2 class="events__header">Wydarzenia {date}</h2>
                <motion.ul class="events-list" variants={container} initial="hidden" animate={events.length > 0 && "show"}>
                    {events.map((event) => (
                        <motion.li key={event.id} className="events-list__item" variants={item} whileTap={{scale: 0.95}} onClick={() => setChosenEvent(event)}>
                            <h3>{event.name}</h3>
                            <div class="events-list__info">
                                <div class="events-list__time">11:30 - 12:45</div>
                                <div class="events-list__category">Projekt</div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
            <EventDescription event={chosenEvent}/>
        </div>
    )
}

const EventDescription = ({event}) => {
    return (
        <div class="app__info">
            {event &&
            <>
             <h3>{event.name}</h3>
            <ul class="app__links">
              <a><li class="app__link">eNauczanie</li></a>
              <a><li class="app__link">Prezentacja</li></a>
              <a><li class="app__link">Dysk Google</li></a>
            </ul>
            <div class="app__info-text">{event.description}</div>
            </>}
          </div>
    )
}

export default InfoPanel;