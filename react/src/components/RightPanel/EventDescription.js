import { motion } from 'framer-motion';

const EventDescription = ({ event }) => {
    const titleTransition = {
        type: 'spring',
        stiffness: 600,
        damping: 50,
        delay: 0,
    };

    const descriptionTransition = {
        type: 'spring',
        stiffness: 600,
        damping: 50,
        delay: 0.1,
    };
    return (
        <div className='app__info'>
            {event && (
                <div key={event.id}>
                    <motion.h3
                        className='app__event-title'
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={titleTransition}
                    >
                        {event.name}
                    </motion.h3>
                    <motion.ul className='app__links' />
                    <motion.div
                        className='app__info-text'
                        style={{ whiteSpace: 'pre-line' }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={descriptionTransition}
                    >
                        {event.description}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EventDescription;
