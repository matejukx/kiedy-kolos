import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';

import DayFlags from '../DayFlags/DayFlags';
import DayFooter from '../DayFooter/DayFooter';
import './Day.scss';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../../../redux/slices/chosenDateSlice';

const Day = ({ date, active }) => {
    const dispatch = useDispatch();
    const ref = useRef();

    const [otherCount, setOtherCount] = useState(0);
    const [selected, setSelected] = useState(false);

    const choosenDate = useSelector((state) => state.chosenDate.value);
    const allEvents = useSelector((state) => state.allEvents.value);

    useEffect(() => {
        if (choosenDate == date) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [choosenDate]);

    const classModifier = () => {
        if (!active) {
            return 'day--inactive';
        }
    };

    const handleClick = () => {
        dispatch(set(date));
    };

    const eventsForThisDay = () => {
        return allEvents.filter((event) => event.date == date);
    };

    return (
        <div onClick={handleClick} ref={ref} className={`day ${classModifier()} ${selected ? 'day--selected' : ''}`}>
            <DayFlags events={eventsForThisDay()} handleResize={setOtherCount} />
            <DayFooter otherCount={otherCount} day={dayjs(date).format('DD')} />
        </div>
    );
};

export default Day;
