import './DayFlags.scss';
import { useRef, useEffect } from 'react';

const DayFlags = ({ handleResize, events }) => {
  const flags = useRef(null);

  useEffect(() => {
    handleResize(calculateOtherCount());
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      handleResize(calculateOtherCount);
    });
  }, [handleResize]);

  const calculateOtherCount = () => {
    const els = Array.from(flags.current.children);
    let counter = 1;

    for (let i = 1; i < els.length; i++) {
      if (els[i].offsetTop <= els[0].offsetTop) {
        break;
      }

      counter++;
    }

    return els.length - counter;
  };

  return (
    <div ref={flags} className='day__flags'>
      {events.length > 0 &&
        events.map((event) => <div className={`day__flag day__flag--${event.type}`}>{event.subjectShortName}</div>)}
    </div>
  );
};

export default DayFlags;
