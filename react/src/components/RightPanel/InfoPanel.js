import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import EventButton from './EventButton';
import './../API/Api';
import { getDayEvents } from './../API/Api';
import AddButton from './AddButton';

const InfoPanel = () => {
    const events = useSelector((state) => state.dayEvents);
    const [chosenEvent, setChosenEvent] = useState();
    const date = useSelector((state) => state.chosenDate);
    const [eventsToShow, setEventsToShow] = useState([]);
    const monthNames = [
        'Stycznia',
        'Lutego',
        'Marca',
        'Kwietnia',
        'Maja',
        'Czerwca',
        'Lipca',
        'Sierpnia',
        'Wrzesienia',
        'Października',
        'Listopada',
        'Grudnia',
    ];

    useEffect(async () => {
        setEventsToShow([]);
        setTimeout(() => setEventsToShow(events), 0);
    }, [events]);

    const dayWithoutZero = () => {
        let dayString = dayjs(date).format('DD');
        if (dayString[0] == '0') {
            dayString = dayString.slice(1, 2);
        }
        return dayString;
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
        <div className='extension'>
            <motion.div className='extension__events'>
                <h2 className='extension__header'>
                    Wydarzenia {dayWithoutZero()} {monthNames[parseInt(dayjs(date).format('MM')) - 1]}
                </h2>
                <AddButton />
                <motion.ul
                    className='events-list'
                    variants={containerVariants}
                    initial='hidden'
                    animate={eventsToShow.length > 0 && 'show'}
                >
                    {eventsToShow.map((event) => (
                        <EventButton
                            key={event.id}
                            event={event}
                            setChosenEventLocal={setChosenEvent}
                            chosenEvent={chosenEvent}
                        />
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

export default InfoPanel;
