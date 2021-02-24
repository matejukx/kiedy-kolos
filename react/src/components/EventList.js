import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editDisable, editEnable, setChosenEventAdmin } from '../actions';
import './../AdminPanel.css';

const EventList = () => {
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        console.log(data);
    };

    const addEventClicked = () => {
        dispatch(editDisable());
    };

    return (
        <div class='extension'>
            <div class='extension__events'>
                <h2 class='events__header'>Wydarzenia</h2>
                <ul class='events-list'>
                    <li class='events-list__item events-list__adder' onClick={() => addEventClicked()}>
                        <i class='far fa-plus-square'></i>
                        <h3>Dodaj Wydarzenie</h3>
                    </li>
                    {events.map((event) => (
                        <Event event={event} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Event = ({ event }) => {
    const dispatch = useDispatch();

    const style = () => {
        let styleText = '';
        if (event.type == 'Kolokwium') {
            styleText += ' extension__event--exam ';
        } else if (event.type == 'Projekt') {
            styleText += ' extension__event--project ';
        } else if (event.type == 'Egzamin') {
            styleText += ' extension__event--exam ';
        } else if (event.type == 'Laboratorium') {
            styleText += ' extension__event--lab ';
        } else if (event.type == 'Inne') {
            styleText += ' extension__event--other ';
        }

        // if(event == chosenEvent) {
        //     styleText+= " events-list__item--selected ";
        // }
        return styleText;
    };

    const setChosenEventAdminGlobal = () => {
        dispatch(setChosenEventAdmin(event.id));
        dispatch(editEnable());
    };

    return (
        <li class={'extension__event ' + style()} onClick={() => setChosenEventAdminGlobal()}>
            <h3 className='extension__event-title'>{event.name}</h3>
            <div class='extension__event-panel'>
                <div class='extension__event-info'>17:00</div>
                <div class='extension__event-info'>{event.type}</div>
                <div class='extension__event-info'>{event.date}</div>
                <div class='extension__event-info'>{event.group_name}</div>
            </div>
        </li>
    );
};

export default EventList;
