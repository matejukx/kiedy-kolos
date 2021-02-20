import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import EventButton from "./EventButton";
import EventDescription from "./EventDescription";

const InfoPanel = () => {
  const [events, setEvents] = useState([]);
  const [chosenEvent, setChosenEvent] = useState();
  const date = useSelector((state) => state.chosenDate);
  const chosenGroup = useSelector((state) => state.chosenGroup);
  const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

  useEffect(() => {
    setEvents([]);
    getEvents();
  }, [date, chosenGroup]);

  const getEvents = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const filteredData = data.filter(shouldBeDisplayed);
    setEvents(filteredData);
    setChosenEvent(filteredData[0]);
  };

  const shouldBeDisplayed = (event) => {
    return event.group_name == "Wszystkie" || event.group_name == chosenGroup;
  };

  const monthNames = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzesienia", "Października", "Listopada", "Grudnia"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };
  return (
    <div className="extension">
      <motion.div className="extension__events">
        <h2 className="extension__header">
          Wydarzenia {dayjs(date).format("DD")} {monthNames[parseInt(dayjs(date).format("MM"))-1]}
        </h2>
        <motion.ul
          className="extension__events-list"
          variants={container}
          initial="hidden"
          animate={events.length > 0 && "show"}
        >
          {events.map((event) => (
            <EventButton
              key={event.id}
              event={event}
              setChosenEvent={setChosenEvent}
              chosenEvent={chosenEvent}
            />
          ))}
        </motion.ul>
      </motion.div>
      <EventDescription event={chosenEvent} />
    </div>
  );
};



export default InfoPanel;
