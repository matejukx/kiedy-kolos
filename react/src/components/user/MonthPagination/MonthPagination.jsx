import dayjs from 'dayjs';
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

  return (
    <div className='monthPagination'>
      <Button handleClick={() => dispatch(decrementMonthOffset())}>
        <span className='material-icons'>chevron_left</span>
      </Button>
      <Title>{monthNames[parseInt(dayjs().format('MM')) + monthOffset - 1]}</Title>
      <Button handleClick={() => dispatch(incrementMonthOffset())}>
        <span className='material-icons'>chevron_right</span>
      </Button>
    </div>
  );
};

export default MonthPagination;
