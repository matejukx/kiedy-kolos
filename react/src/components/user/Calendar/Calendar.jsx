import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DayNames from '../DayNames/DayNames';
import Days from '../Days/Days';
import './Calendar.scss';

const Calendar = () => {
  const currentMonth = useSelector((state) => state.monthOffset.value);
  const [lastRememberedMonth, setLastRememberedMonth] = useState();

  const [swipeDirection, setSwipeDirection] = useState(-1);

  const calendarVariants = {
    hidden: { opacity: 0, x: swipeDirection * 100 },
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

  useEffect(() => {
    if (currentMonth > lastRememberedMonth) {
      setSwipeDirection(1);
    } else {
      setSwipeDirection(-1);
    }
    setLastRememberedMonth(currentMonth);
  }, [currentMonth]);

  return (
    <motion.div
      key={lastRememberedMonth}
      className='calendar'
      initial='hidden'
      animate='show'
      variants={calendarVariants}
    >
      <DayNames />
      <Days />
    </motion.div>
  );
};

export default Calendar;
