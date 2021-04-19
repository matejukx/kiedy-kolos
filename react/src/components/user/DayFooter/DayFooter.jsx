import './DayFooter.scss';

const DayFooter = ({ day, otherCount }) => (
  <div className='day__footer'>
    <div className={`day__moreFlag ${otherCount > 0 ? '' : 'hidden'}`}>
      {otherCount}+
    </div>
    <div className='day__number'>{day}</div>
  </div>
);

export default DayFooter;
