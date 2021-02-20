import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import EventButton from "./EventButton";
import EventDescription from "./EventDescription";
import "./../API/Api";
import { getDayEvents } from "./../API/Api";

const InfoPanel = () => {
  const [events, setEvents] = useState([]);
  const [chosenEvent, setChosenEvent] = useState();
  const date = useSelector((state) => state.chosenDate);
  const chosenGroup = useSelector((state) => state.chosenGroup);
  const monthNames = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzesienia", "Października", "Listopada", "Grudnia"];

  useEffect(async () => {
    setEvents([]);
    getEvents();
  }, [date, chosenGroup]);

  const getEvents = async () => {
    const data = await getDayEvents(0, date);
    const filteredData = data.filter(shouldBeDisplayed);
    setEvents(filteredData);
    setChosenEvent(filteredData[0]);
  };

  const shouldBeDisplayed = (event) => {
    return event.group_name == "Wszystkie" || event.group_name == chosenGroup;
  };

  const containerVariants = {
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
          variants={containerVariants}
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