import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAllEvents, setDayEvents } from '../../actions';
import dayjs from 'dayjs';

const ApiCalls = () => {
    const baseURL = 'http://kiedy-kolos-backend.azurewebsites.net/';

    const dispatch = useDispatch();
    const chosenDate = useSelector((state) => state.chosenDate);

    const [dataDownloaded, setDataDownloaded] = useState(false);
    const [events, setEvents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [types, setTypes] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        downloadData();
    }, []);

    useEffect(() => {
        buildEvents();
        buildDayEvents(chosenDate);
    }, [dataDownloaded]);

    useEffect(() => {
        buildDayEvents(chosenDate);
    }, [chosenDate]);

    const getResource = async (extensionURL) => {
        const URL = baseURL + extensionURL;

        const response = await fetch(URL);
        const data = await response.json();
        return data.result;
    };

    const getEvents = async () => {
        const events = await getResource(`yearCourses/${id}/events`);
        return events;
    };

    const getSubjects = async () => {
        const subjects = await getResource(`yearCourses/${id}/subjects`);
        return subjects;
    };

    const getTypes = async () => {
        const types = await getResource(`eventTypes`);
        return types;
    };

    const downloadData = async () => {
        setEvents(await getEvents());
        setSubjects(await getSubjects());
        setTypes(await getTypes());
        setDataDownloaded(true);
    };

    const buildEvents = async () => {
        let eventsConnected = [];
        for (let event of events) {
            let eventData = {
                date: dayjs(event.date).format('YYYY-MM-DD'),
                subjectLongName: getPropertyFromObjectByID(subjects, event.subjectId, 'name'),
                subjectShortName: getPropertyFromObjectByID(subjects, event.subjectId, 'shortName'),
                type: getPropertyFromObjectByID(types, event.eventTypeId, 'name'),
            };
            eventsConnected.push(eventData);
        }
        dispatch(setAllEvents(eventsConnected));
    };

    const buildDayEvents = async (date) => {
        console.log('Building events for ' + date);
        let dayEvents = [];
        for (let event of events) {
            if (dayjs(event.date).format('YYYY-MM-DD') != date) {
                continue;
            }
            let eventData = {
                date: dayjs(event.date).format('YYYY-MM-DD'),
                description: event.description,
                type: getPropertyFromObjectByID(types, event.eventTypeId, 'name'),
            };
            dayEvents.push(eventData);
        }
        console.log(dayEvents);
        dispatch(setDayEvents(dayEvents));
    };

    const getPropertyFromObjectByID = (array, searchedID, searchedProperty) => {
        for (let object of array) {
            if (object.id == searchedID) {
                return object[searchedProperty];
            }
        }
    };

    return null;
};

export default ApiCalls;
