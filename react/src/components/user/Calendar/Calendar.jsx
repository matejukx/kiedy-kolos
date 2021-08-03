import DayNames from '../DayNames/DayNames';
import Days from '../Days/Days';
import './Calendar.scss';

const Calendar = () => (
  <div className='calendar'>
    <DayNames />
    <Days />
  </div>
);

export default Calendar;
