import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAllEvents, setDayEvents, setEventTypes, setGroup, setGroups } from '../../actions';
import dayjs from 'dayjs';

const ApiCalls = () => {
    const dispatch = useDispatch();
    const baseURL = 'https://kiedy-kolos-backend.azurewebsites.net/';

    const forceEventsRefresh = useSelector((state) => state.forceEventsRefresh);
    const chosenDate = useSelector((state) => state.chosenDate.value);
    const chosenGroup = 5;

    const [dataDownloaded, setDataDownloaded] = useState(false);
    const [events, setEvents] = useState([]);
    const [types, setTypes] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        console.log('Downloading data');

        downloadData();
    }, [forceEventsRefresh, chosenGroup]);

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
        const data = await getResource(`yearCourses/${id}/groups/${chosenGroup}/events`);
        return data;
    };

    const getSubjects = async () => {
        const data = await getResource(`yearCourses/${id}/subjects`);
        return data;
    };

    const getTypes = async () => {
        const data = await getResource(`eventTypes`);
        return data;
    };

    const downloadData = async () => {
        setEvents(await getEvents());
        setSubjects(await getSubjects());
        setTypes(await getTypes());

        setDataDownloaded(!dataDownloaded);
    };

    const buildEvents = async () => {
        if (events.length == 0) {
            return;
        }

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
        console.log(date);
        let dayEvents = [];
        for (let event of events) {
            if (dayjs(event.date).format('YYYY-MM-DD') != date) {
                continue;
            }
            let eventData = {
                id: event.id,
                date: dayjs(event.date).format('YYYY-MM-DD'),
                description: event.description,
                subjectLongName: getPropertyFromObjectByID(subjects, event.subjectId, 'name'),
                type: getPropertyFromObjectByID(types, event.eventTypeId, 'name'),
                time: dayjs(event.date).format('HH:mm'),
            };
            dayEvents.push(eventData);
        }
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
