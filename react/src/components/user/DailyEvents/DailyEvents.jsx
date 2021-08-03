import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import ItemList from '../../other/ItemList/ItemList';
import EventCard from '../EventCard/EventCard';
import './DailyEvents.scss';

const objs = [
  { name: 'Wytwarzanie Aplikacji Internetowych' },
  { name: 'Grafika Komputerowa' },
  { name: 'Architektura Komputerów' },
  { name: 'Fizyka Współczesna' },
  { name: 'Metody Numeryczne' },
  { name: 'Metody Probabilistyczne' },
  { name: 'Matematyka Elementarna' },
  { name: 'Systemy Wbudowane i Mikroprocesory' },
  { name: 'Heja' },
  { name: 'Okej' },
  { name: 'Siema' },
];

const itemVariants = {
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

const DailyEvents = () => {
  const dispatch = useDispatch();
  const [localEvents, setLocalEvents] = useState();

  const renderEvent = (event) => (
    <motion.div variants={itemVariants}>
      <EventCard key={event.id} event={event} />
    </motion.div>
  );
  const dailyEvents = useSelector((state) => state.dailyEvents.value);

  useEffect(() => {
    setLocalEvents([]);
    setTimeout(() => {
      setLocalEvents(dailyEvents);
    }, 1);
  }, [dailyEvents]);

  return (
    <div className='dailyEvents'>
      <ItemList
        name='Wydarzenie'
        items={localEvents}
        renderComponent={renderEvent}
        addFunction={() => dispatch(setAddEventPopup(true))}
      />
    </div>
  );
};

export default DailyEvents;
