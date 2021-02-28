import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { forceEventsRefresh, setAddEventPopup, setDeleteEventPopup, setGroup } from '../../actions';
import { getGroups, getCourses, getTypes } from '../API/Api';

const DeleteEventPopup = () => {
    const chosenEventID = useSelector((state) => state.chosenEvent);
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');

    const deleteEvent = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventID: chosenEventID, password: password }),
            mode: 'no-cors', // no-cors, cors, *same-origin
        };
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/delete_event.php`, requestOptions);
        if (response) {
            dispatch(setDeleteEventPopup(false));
            dispatch(forceEventsRefresh());
        }
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const closePopup = () => {
        dispatch(setDeleteEventPopup(false));
    };

    const handleCloseClick = (e) => {
        e.preventDefault();
        closePopup();
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        deleteEvent();
    };

    return (
        <motion.div
            className='modal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.08, 0.75, 0.21, 0.98] }}
        >
            <motion.div
                className='event-adder'
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ ease: [0.08, 0.75, 0.21, 0.98] }}
            >
                <h2 className='event-adder__title'>Usuwanie wydarzenia {chosenEventID}</h2>
                <form className='event-adder__form'>
                    <div className='edition__setting submit'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Hasło'
                            onChange={updatePassword}
                        ></input>
                    </div>

                    <div className='event-adder__buttons'>
                        <button className='event-adder__button--reject' onClick={handleCloseClick}>
                            Anuluj
                        </button>
                        <button className='event-adder__button--accept' onClick={handleDeleteClick}>
                            Usuń wydarzenie
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default DeleteEventPopup;
