import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementMonthOffset, incrementMonthOffset } from '../../../redux/slices/monthOffsetSlice';
import Button from '../../other/Button/Button';
import Title from '../../other/Title/Title';
import './MonthPagination.scss';

const MonthPagination = () => {
  const monthNames = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  const dispatch = useDispatch();

  const monthOffset = useSelector((state) => state.monthOffset.value);
  const [swipeDirection, setSwipeDirection] = useState(-1);
  const [lastRememberedMonthOffset, setLastRememberedMonthOffset] = useState();

  const titleVariants = {
    hidden: { opacity: 0, x: swipeDirection * 50 },
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
    if (monthOffset > lastRememberedMonthOffset) {
      setSwipeDirection(1);
    } else {
      setSwipeDirection(-1);
    }
    setLastRememberedMonthOffset(monthOffset);
  }, [monthOffset]);

  return (
    <div className='monthPagination'>
      <Button handleClick={() => dispatch(decrementMonthOffset())}>
        <span className='material-icons'>chevron_left</span>
      </Button>
      <Title>
        <motion.div key={lastRememberedMonthOffset} initial='hidden' animate='show' variants={titleVariants}>
          {monthNames[parseInt(dayjs().format('MM')) + monthOffset - 1]}
        </motion.div>
      </Title>
      <Button handleClick={() => dispatch(incrementMonthOffset())}>
        <span className='material-icons'>chevron_right</span>
      </Button>
    </div>
  );
};

export default MonthPagination;
