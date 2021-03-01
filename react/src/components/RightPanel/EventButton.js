import { motion } from 'framer-motion';

const EventButton = ({ event, setChosenEvent, chosenEvent }) => {
    const item = {
        hidden: { opacity: 0, x: 100 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 600,
                damping: 50,
            },
        },
    };
    const style = () => {
        let styleText = ' ';
        const styles = {
            Kolokwium: 'extension__event--exam',
            Projekt: 'extension__event--project',
            Egzamin: 'extension__event--exam',
            Laboratorium: 'extension__event--lab',
            Inne: 'extension__event--other',
        };
        styleText += styles[event.type];
        if (event === chosenEvent) styleText += ' extension__event--selected ';

        return styleText;
    };

    return (
        <motion.li
            key={event.id}
            className={'event' + style()}
            variants={item}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setChosenEvent(event)}
        >
            <div className='event__topbar event__topbar--red'>
                <h3 className='event__title'>{event.name}</h3>
                <button className='event__editor'></button>
                <button className='event__deleter'></button>
            </div>
            <div className='event__panel'>
                <div className='event__tags'>
                    <div className='event__tag event__tag--type'>{event.type}</div>
                    <div className='event__tag event__tag--time'>{event.time.slice(0, 5)}</div>
                    <div className='event__tag event__tag--info'>chuj</div>
                </div>
                <div className='event__description'>{event.description}</div>
            </div>
        </motion.li>
    );
};

export default EventButton;
