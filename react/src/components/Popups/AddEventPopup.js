import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { forceEventsRefresh, setAddEventPopup, setGroup } from '../../actions';
import { getGroups, getCourses, getTypes, addEvent } from '../API/Api';

const AddEventPopup = () => {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.chosenDate);
    const types = useSelector((state) => state.eventTypes);
    const subjects = useSelector((state) => state.subjects);

    const { id } = useParams();

    const [groups, setGroups] = useState([]);
    const [subjectID, setSubjectID] = useState(0);
    const [groupID, setGroupID] = useState(0);
    const [typeID, setTypeID] = useState(0);
    const [time, setTime] = useState('12:00');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(async () => {
        downloadFormData();
        setTypeID(types[0].id);
        setSubjectID(subjects[0].id);
    }, []);

    const downloadFormData = async () => {
        const groupsTemp = await getGroups(0);
        setGroups(groupsTemp);
        setGroupID(groupsTemp[0].id);
    };

    const addEventPressed = async () => {
        const response = await addEvent(subjectID, id, 'nazwa', date, time, description, typeID, password);
        if (response.ok) {
            dispatch(setAddEventPopup(false));
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

    const closePopup = () => {
        dispatch(setAddEventPopup(false));
    };

    const updateSubjectID = (e) => {
        setSubjectID(e.target.value);
    };

    const updateGroupID = (e) => {
        setGroupID(e.target.value);
    };

    const updateTime = (e) => {
        setTime(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateTypeID = (e) => {
        setTypeID(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleAcceptClick = (e) => {
        e.preventDefault();
        addEventPressed();
    };

    const handleCloseClick = (e) => {
        e.preventDefault();
        closePopup();
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
                <h2 className='event-adder__title'>Dodawanie wydarzenia {dayjs(date).format('DD/MM/YYYY')}</h2>
                <form className='event-adder__form'>
                    <label className='event-adder__label' htmlFor='subject'>
                        Przedmiot
                    </label>
                    <select className='event-adder__input' id='subject' value={subjectID} onChange={updateSubjectID}>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>

                    <label className='event-adder__label' htmlFor='group'>
                        Grupa
                    </label>
                    <select className='event-adder__input' id='group' value={groupID} onChange={updateGroupID}>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>

                    <label className='event-adder__label' htmlFor='type'>
                        Typ
                    </label>
                    <select className='event-adder__input' id='type' value={typeID} onChange={updateTypeID}>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>

                    <div className='edition__setting'>
                        <label className='edition__label' htmlFor='time'>
                            Godzina
                        </label>
                        <input
                            type='time'
                            id='time'
                            name='time'
                            min='07:00'
                            value='16:00:00'
                            max='21:00'
                            value={time}
                            onChange={updateTime}
                        ></input>
                    </div>

                    <div className='edition__setting'>
                        <label className='edition__label' htmlFor='description'>
                            Opis
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            rows='5'
                            cols='30'
                            placeholder='Tu wpisz opis...'
                            value={description}
                            onChange={updateDescription}
                        ></textarea>
                    </div>

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
                        <button className='event-adder__button--accept' onClick={handleAcceptClick}>
                            Utwórz wydarzenie
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddEventPopup;
