import Button from '../../other/Button/Button';
import './EventCard.scss';

const EventCard = ({ event }) => {
    console.log(event);
    return (
        <div className='eventCard'>
            <div className='eventCard__topbar eventCard__topbar--blue'>
                <h3 className='eventCard__title'>{event.subjectLongName}</h3>
                <div className='eventCard__buttons'>
                    <Button
                        modifier='button--transparent button--edit button--small'
                        handleClick={() => console.log('T')}
                    >
                        <span className='material-icons'>edit</span>
                    </Button>
                    <Button
                        modifier='button--transparent button--delete button--small'
                        handleClick={() => console.log('T')}
                    >
                        <span className='material-icons'>delete</span>
                    </Button>
                </div>
            </div>
            <div className='eventCard__panel'>
                <div className='eventCard__tags'>
                    <div className='eventCard__tag'>
                        <span className='material-icons'>label</span> Egzamin
                    </div>
                    <div className='eventCard__tag'>
                        <span className='material-icons'>schedule</span>14:00
                    </div>
                    <div className='eventCard__tag'>
                        <span className='material-icons'>info</span>Poprawa
                    </div>
                </div>
                <div className='eventCard__description'>{event.description}</div>
            </div>
        </div>
    );
};

export default EventCard;
