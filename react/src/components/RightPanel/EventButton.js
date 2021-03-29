import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChosenEvent, setDeleteEventPopup, setEditEventPopup, setOptionsPopup } from '../../actions';

const EventButton = ({ event }) => {
    const dispatch = useDispatch();

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 600,
                damping: 50,
            },
        },
    };
    const style = () => {
        let styleText = '';
        const styles = {
            Kolokwium: '--red',
            Projekt: '--green',
            Egzamin: '--red',
            Laboratorium: '--blue',
            Inne: '--yellow',
        };
        styleText += styles[event.type];

        return styleText;
    };

    const deleteEventClicked = () => {
        dispatch(setOptionsPopup(false));
        dispatch(setDeleteEventPopup(true));
        dispatch(setChosenEvent(event.id));
    };

    const editEventClicked = () => {
        dispatch(setOptionsPopup(false));
        dispatch(setEditEventPopup(true));
        dispatch(setChosenEvent(event));
    };

    return (
        <motion.li
            key={event.id}
            className='event'
            variants={item}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className={'event__topbar event__topbar' + style()}>
                <h3 className='event__title'>{event.name}</h3>
                <button className='event__editor' onClick={editEventClicked}></button>
                <button className='event__deleter' onClick={deleteEventClicked}></button>
            </div>
            <div className='event__panel'>
                <div className='event__tags'>
                    <div className='event__tag event__tag--type'>{event.type}</div>
                    {/* <div className='event__tag event__tag--time'>{event.time.slice(0, 5)}</div> */}
                    <div className='event__tag event__tag--info'>Informacja</div>
                </div>
                <div className='event__description'>{event.description}</div>
            </div>
        </motion.li>
    );
};

export default EventButton;
