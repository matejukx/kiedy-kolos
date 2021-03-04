import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { forceEventsRefresh, setChosenEvent, setDeleteEventPopup, setEditEventPopup } from '../../actions';

const EventButton = ({ event, setChosenEventLocal, chosenEvent }) => {
    const dispatch = useDispatch();

    const editEventDate = async (newDate) => {
        console.log('Got date: ' + newDate);
        const response = await fetch(
            `https://aleksanderblaszkiewicz.pl/kiedykolos/get_event_details.php?id=${event.id}`
        );
        const data = await response.json();
        const downloadedEvent = data[0];
        console.log(downloadedEvent);
        console.log(downloadedEvent.groupID);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventID: downloadedEvent.id,
                courseID: downloadedEvent.course_id,
                groupID: downloadedEvent.group_id,
                time: downloadedEvent.time,
                date: dayjs(newDate).format('YYYY-DD-MM'),
                description: downloadedEvent.description,
                typeID: downloadedEvent.type_id,
                password: 'TomaszDziubich321!',
            }),
            mode: 'no-cors', // no-cors, cors, *same-origin
        };
        await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/edit_event.php`, requestOptions);
        dispatch(forceEventsRefresh());
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 600,
                damping: 50,
            },
        },
    };
    const style = () => {
        let styleText = '';
        const styles = {
            Kolokwium: '--red',
            Projekt: '--green',
            Egzamin: '--red',
            Laboratorium: '--blue',
            Inne: '--yellow',
        };
        styleText += styles[event.type];

        return styleText;
    };

    const deleteEventClicked = () => {
        dispatch(setDeleteEventPopup(true));
        dispatch(setChosenEvent(event.id));
    };

    const editEventClicked = () => {
        dispatch(setEditEventPopup(true));
        dispatch(setChosenEvent(event));
    };

    return (
        <motion.li
            key={event.id}
            className='event'
            variants={item}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setChosenEventLocal(event)}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
            onDragEnd={(mouseEvent, info) => editEventDate(mouseEvent.target.closest('.day').dataset.date)}
        >
            <div className={'event__topbar event__topbar' + style()}>
                <h3 className='event__title'>{event.name}</h3>
                <button className='event__editor' onClick={editEventClicked}></button>
                <button className='event__deleter' onClick={deleteEventClicked}></button>
            </div>
            <div className='event__panel'>
                <div className='event__tags'>
                    <div className='event__tag event__tag--type'>{event.type}</div>
                    <div className='event__tag event__tag--time'>{event.time.slice(0, 5)}</div>
                    <div className='event__tag event__tag--info'>Informacja</div>
                </div>
                <div className='event__description'>{event.description}</div>
            </div>
        </motion.li>
    );
};

export default EventButton;
