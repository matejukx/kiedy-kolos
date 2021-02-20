import {motion} from "framer-motion";

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

export default EventButton;