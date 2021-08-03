import Button from '../../other/Button/Button';
import { useDispatch } from 'react-redux';
import './EventCard.scss';
import { setRemoveEventPopup } from '../../../redux/slices/removeEventPopup';
import { setChosenEvent } from '../../../redux/slices/chosenEvent';
import { setEditEventPopup } from '../../../redux/slices/editEventPopup';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  const editClicked = () => {
    dispatch(setChosenEvent(event.id));
    dispatch(setEditEventPopup(true));
  };

  const removeClicked = () => {
    dispatch(setChosenEvent(event.id));
    dispatch(setRemoveEventPopup(true));
  };

  return (
    <div className='eventCard'>
      <div className='eventCard__topbar eventCard__topbar--blue'>
        <h3 className='eventCard__title'>{event.subjectLongName}</h3>
        <div className='eventCard__buttons'>
          <Button modifier='button--transparent button--edit button--small' handleClick={() => editClicked()}>
            <span className='material-icons'>edit</span>
          </Button>
          <Button modifier='button--transparent button--delete button--small' handleClick={() => removeClicked()}>
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      </div>
      <div className='eventCard__panel'>
        <div className='eventCard__tags'>
          <div className='eventCard__tag'>
            <span className='material-icons'>label</span> {event.type}
          </div>
          <div className='eventCard__tag'>
            <span className='material-icons'>schedule</span>
            {event.time}
          </div>
          <div className='eventCard__tag'>
            <span className='material-icons'>info</span>Informacja
          </div>
        </div>
        <div className='eventCard__description'>{event.description}</div>
      </div>
    </div>
  );
};

export default EventCard;
