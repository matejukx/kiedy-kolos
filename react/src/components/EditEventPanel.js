import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddEventPanel = () => {
    const chosenEvent = useSelector((state) => state.chosenEventAdmin);
    const API_URL_GET_COURSES = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php';
    const API_URL_GET_GROUPS = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php';
    const API_URL_GET_TYPES = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_types.php';

    const [event, setEvent] = useState([]);

    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [types, setTypes] = useState([]);

    const [courseID, setCourseID] = useState(0);
    const [groupID, setGroupID] = useState(0);
    const [typeID, setTypeID] = useState(0);
    const [date, setDate] = useState('2020-12-12');
    const [time, setTime] = useState('12:00');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getCourses();
        getGroups();
        getTypes();
    }, []);

    useEffect(() => {
        getEventInfo();
    }, [chosenEvent]);

    useEffect(() => {
        initializeEventInfo();
    }, [event]);

    const initializeEventInfo = () => {
        console.log('Initializing fields');
        setDescription(event.description);
        setDate(event.date);
        setTime(event.time);
        setGroupID(event.group_id);
        setTypeID(event.type_id);
        setCourseID(event.course_id);
    };

    const editEvent = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventID: chosenEvent,
                courseID: courseID,
                groupID: groupID,
                time: time,
                date: date,
                description: description,
                typeID: typeID,
                password: password,
            }),
            mode: 'no-cors', // no-cors, cors, *same-origin
        };
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/edit_event.php`, requestOptions);
    };

    const deleteEvent = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventID: chosenEvent, password: password }),
            mode: 'no-cors', // no-cors, cors, *same-origin
        };
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/delete_event.php`, requestOptions);
    };

    const getCourses = async () => {
        const response = await fetch(API_URL_GET_COURSES);
        const data = await response.json();
        setCourses(data);
        setCourseID(data[0].id);
    };

    const getGroups = async () => {
        const response = await fetch(API_URL_GET_GROUPS);
        const data = await response.json();
        setGroups(data);
        setGroupID(data[0].id);
    };

    const getTypes = async () => {
        const response = await fetch(API_URL_GET_TYPES);
        const data = await response.json();
        setTypes(data);
        setTypeID(data[0].id);
    };

    const getEventInfo = async () => {
        const response = await fetch(
            `https://aleksanderblaszkiewicz.pl/kiedykolos/get_event_details.php?id=${chosenEvent}`
        );
        const data = await response.json();
        setEvent(data[0]);
        console.log(data[0]);
    };

    const updateCourseID = (e) => {
        setCourseID(e.target.value);
    };

    const updateDate = (e) => {
        setDate(e.target.value);
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

    return (
        <div class='edition'>
            <h2 class='edition__header'>Edycja Wydarzenia {event.id}</h2>

            <div class='edition__setting'>
                <label class='edition__label' for='course'>
                    Przedmiot
                </label>
                <select name='course' id='course' form='add-event' value={courseID} onChange={updateCourseID}>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            <div class='edition__setting'>
                <label class='edition__label' for='group'>
                    Grupa
                </label>
                <select name='groupID' id='groupID' form='add-event' value={groupID} onChange={updateGroupID}>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>

            <div class='edition__setting'>
                <label class='edition__label' for='type'>
                    Typ
                </label>
                <select name='typeID' id='typeID' form='add-event' value={typeID} onChange={updateTypeID}>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            <div class='edition__setting'>
                <label class='edition__label' for='date'>
                    Data
                </label>
                <input
                    type='date'
                    id='date'
                    name='date'
                    value='2020-11-25'
                    min='2020-11-25'
                    max='2021-12-31'
                    value={date}
                    onChange={updateDate}
                ></input>
            </div>

            <div class='edition__setting'>
                <label class='edition__label' for='time'>
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

            <div class='edition__setting'>
                <label class='edition__label' for='description'>
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

            <div class='edition__setting submit'>
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Hasło'
                    onChange={updatePassword}
                ></input>
                <button class='submit__button submit__button--delete' onClick={deleteEvent}>
                    Usuń
                </button>
                <button class='submit__button' onClick={editEvent}>
                    Zapisz
                </button>
            </div>
        </div>
    );
};

export default AddEventPanel;
