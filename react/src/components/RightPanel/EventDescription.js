import {motion} from "framer-motion";

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
              style={{whiteSpace: "pre-line"}}
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

  export default EventDescription;