import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';

import DayFlags from '../DayFlags/DayFlags';
import DayFooter from '../DayFooter/DayFooter';
import './Day.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setChoosenDate } from '../../../redux/slices/chosenDateSlice';

const Day = ({ date, active }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const [otherCount, setOtherCount] = useState(0);
  const [selected, setSelected] = useState(false);

  const choosenDate = useSelector((state) => state.chosenDate.value);
  const allEvents = useSelector((state) => state.allEvents.value);
  const [eventsForThisDay, seteventsForThisDay] = useState([]);

  useEffect(() => {
    if (choosenDate == date) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [choosenDate]);

  useEffect(() => {
    seteventsForThisDay(allEvents.filter((event) => event.date == date));
  }, [allEvents]);

  const classModifier = () => {
    if (dayjs().format('YYYY-MM-DD') == dayjs(date).format('YYYY-MM-DD')) {
      return 'day--current';
    }

    if (!active) {
      return 'day--inactive';
    }
    if (dayjs(date).format('d') == 0 || dayjs(date).format('d') == 6) {
      return 'day--weekend';
    }
  };

  const handleClick = () => {
    dispatch(setChoosenDate(date));
  };

  return (
    <div onClick={handleClick} ref={ref} className={`day ${classModifier()} ${selected ? 'day--selected' : ''}`}>
      <DayFlags events={eventsForThisDay} handleResize={setOtherCount} />
      <DayFooter otherCount={otherCount} day={dayjs(date).format('DD')} />
    </div>
  );
};

export default Day;
