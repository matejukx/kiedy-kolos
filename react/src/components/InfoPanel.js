import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import dayjs from "dayjs";

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
          Wydarzenia {dayjs(date).format("DD.MM")}
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

const EventButton = ({ event, setChosenEvent, chosenEvent }) => {
  const item = {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 50,
      },
    },
  };
  const style = () => {
    let styleText = " ";
    const styles = {
      Kolokwium: "extension__event--exam",
      Projekt: "extension__event--project",
      Egzamin: "extension__event--exam",
      Laboratorium: "extension__event--lab",
      Inne: "extension__event--other",
    };
    styleText += styles[event.type];
    if (event === chosenEvent) styleText += " extension__event--selected ";

    return styleText;
  };

  return (
    <motion.li
      key={event.id}
      className={"extension__event" + style()}
      variants={item}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => setChosenEvent(event)}
    >
      <h3 className="extension__event-title">{event.name}</h3>
      <div className="extension__event-panel">
        <div className="extension__event-info">{event.time.slice(0, 5)}</div>
        <div className="extension__event-info">{event.type}</div>
      </div>
    </motion.li>
  );
};

const EventDescription = ({ event }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="app__info">
      {event && (
        <div key={event.id}>
          <motion.h3
            className="app__event-title"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 50 }}
          >
            {event.name}
          </motion.h3>
          <motion.ul
            className="app__links"
            variants={container}
            initial="hidden"
            animate="show"
          />
          <motion.div
            className="app__info-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 50,
              delay: 0.1,
            }}
          >
            {event.description}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
