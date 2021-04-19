import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';

import DayFlags from '../DayFlags/DayFlags';
import DayFooter from '../DayFooter/DayFooter';
import './Day.scss';

const Day = ({ date, active }) => {
    const [otherCount, setOtherCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const [events, setEvents] = useState([]);
    const ref = useRef();

    const classModifier = () => {
        if (!active) {
            return 'day--inactive';
        }
    };

    return (
        <div ref={ref} className={`day ${classModifier()} ${selected ? 'day--selected' : ''}`}>
            <DayFlags events={events} handleResize={setOtherCount} />
            <DayFooter otherCount={otherCount} day={dayjs(date).format('DD')} />
        </div>
    );
};

export default Day;
