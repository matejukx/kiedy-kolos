import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Day from '../Day/Day';
import './Days.scss';
import { useSelector } from 'react-redux';

const Days = () => {
    const daysOfWeek = [7, 1, 2, 3, 4, 5, 6];

    const monthOffset = useSelector((state) => state.monthOffset.value);

    const [days, setDays] = useState([]);

    useEffect(() => {
        initializeMonthDays();
    }, [monthOffset]);

    const initializeMonthDays = () => {
        const today = dayjs();
        const desiredDay = today.add(monthOffset, 'month');
        const daysTemp = new Array(42);
        const startDayOfMonth = daysOfWeek[desiredDay.startOf('month').day()]; // 1 - monday, 7 sunday

        const startingDay = desiredDay.startOf('month').subtract(startDayOfMonth - 1, 'day');

        for (let i = 0; i < 42; i++) {
            daysTemp[i] = startingDay.add(i, 'day').format('YYYY-MM-DD');
        }

        setDays(daysTemp);
    };

    const isDayInCurrentMonth = (day) => {
        const today = dayjs();
        const thisMonth = today.add(monthOffset, 'month');
        return dayjs(day).format('MM') === thisMonth.format('MM');
    };

    return (
        <div className='calendar__days'>
            {days.map((day) => (
                <Day key={day} date={day} active={isDayInCurrentMonth(day)} />
            ))}

            {/* <Day day='2' modifier='day--inactive' />
            <Day day='3' modifier='day--inactive' />
            <Day day='4' modifier='day--inactive' />
            <Day day='5' modifier='day--inactive' />
            <Day day='6' modifier='day--weekend' />
            <Day day='7' modifier='day--weekend' />
            <Day day='8' />
            <Day day='9' />
            <Day day='10' />
            <Day day='11' />
            <Day day='12' />
            <Day day='13' modifier='day--weekend' />
            <Day day='14' modifier='day--weekend' />
            <Day day='15' />
            <Day day='16' />
            <Day day='17' />
            <Day day='18' />
            <Day day='19' />
            <Day day='20' modifier='day--weekend' />
            <Day day='21' modifier='day--weekend' />
            <Day day='22' />
            <Day day='23' />
            <Day day='24' />
            <Day day='25' />
            <Day day='26' />
            <Day day='27' modifier='day--weekend' />
            <Day day='28' modifier='day--weekend' />
            <Day day='29' />
            <Day day='30' />
            <Day day='31' />
            <Day day='1' />
            <Day day='2' />
            <Day day='3' modifier='day--weekend' />
            <Day day='4' modifier='day--weekend' />
            <Day day='5' />
            <Day day='6' modifier='day--inactive' />
            <Day day='7' modifier='day--inactive' />
            <Day day='8' modifier='day--inactive' />
            <Day day='9' modifier='day--inactive' />
            <Day day='10' modifier='day--inactive' />
            <Day day='11' modifier='day--inactive' /> */}
        </div>
    );
};
export default Days;
