import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { forceEventsRefresh, setEditEventPopup } from '../../actions';
import { getGroups, getCourses, getTypes, editEvent, getEventInfo } from '../API/Api';

const EditEventPopup = () => {
    const dispatch = useDispatch();
    const chosenEvent = useSelector((state) => state.chosenEvent);
    const types = useSelector((state) => state.eventTypes);
    const subjects = useSelector((state) => state.subjects);
    const groups = useSelector((state) => state.groups);

    const { id } = useParams();

    const [subjectID, setSubjectID] = useState(0);
    const [groupID, setGroupID] = useState(0);
    const [typeID, setTypeID] = useState(0);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(async () => {
        let event = await getEventInfo(id, chosenEvent.id);
        setTypeID(event.eventTypeId);
        setSubjectID(event.subjectId);
        setDescription(event.description);
        setDate(dayjs(event.date).format('YYYY-MM-DD'));
        setTime(dayjs(event.date).format('hh:mm'));

        let allGroup = {
            id: 0,
            groupNumber: 'Wszystkie',
            groupName: '',
        };
        if (!groups.some((x) => x.id == 0)) {
            groups.push(allGroup);
        }

        setGroupID(groups[groups.length - 1].id);
    }, []);

    const editEventPressed = async () => {
        const selectedGroups = [];
        if (groupID == 0) {
            groups.forEach((group) => {
                if (group.id != 0) {
                    selectedGroups.push(group.id);
                }
            });
        } else {
            selectedGroups.push(groupID);
        }

        const response = await editEvent(
            chosenEvent.id,
            subjectID,
            id,
            selectedGroups,
            date,
            time,
            description,
            typeID,
            password
        );
        if (response.ok) {
            dispatch(setEditEventPopup(false));
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
        dispatch(setEditEventPopup(false));
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

    const updateDate = (e) => {
        setDate(e.target.value);
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
        editEventPressed();
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
                <h2 className='event-adder__title'>Edytowanie wydarzenia {dayjs(date).format('DD/MM/YYYY')}</h2>
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
                                {group.groupNumber}
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

                    <div className='edition__setting'>
                        <label className='edition__label' htmlFor='date'>
                            Data
                        </label>
                        <input type='date' id='date' name='date' value={date} onChange={updateDate}></input>
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
                            Edytuj wydarzenie
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditEventPopup;
