import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { forceEventsRefresh, setAddEventPopup, setDeleteEventPopup, setEditEventPopup, setGroup } from '../../actions';
import { getGroups, getCourses, getTypes, deleteEvent } from '../API/Api';

const DeleteEventPopup = () => {
    const dispatch = useDispatch();
    const chosenEventID = useSelector((state) => state.chosenEvent);

    const { id } = useParams();

    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const deleteEventPressed = async () => {
        const response = await deleteEvent(id, chosenEventID, password);
        if (response.ok) {
            dispatch(setDeleteEventPopup(false));
            dispatch(forceEventsRefresh());
        } else {
            catchError(response.status);
        }
    };

    const catchError = (responseStatus) => {
        setErrorMessage('Niepoprawne hasło!');
        console.log('CAUGHT AN ERROR!');
        console.log(responseStatus);
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
        deleteEventPressed();
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
                    <h1>{errorMessage}</h1>
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
