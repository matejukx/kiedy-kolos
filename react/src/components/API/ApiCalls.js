import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAllEvents, setDayEvents, setEventTypes, setGroup, setGroups, setSubjects } from '../../actions';
import dayjs from 'dayjs';

const ApiCalls = () => {
    const dispatch = useDispatch();
    const baseURL = 'https://kiedy-kolos-backend.azurewebsites.net/';

    const forceEventsRefresh = useSelector((state) => state.forceEventsRefresh);
    const chosenDate = useSelector((state) => state.chosenDate);
    const subjects = useSelector((state) => state.subjects);
    const chosenGroup = useSelector((state) => state.chosenGroup);

    const [dataDownloaded, setDataDownloaded] = useState(false);
    const [events, setEvents] = useState([]);
    const [types, setTypes] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        downloadData();
        console.log('Downloading data');
    }, [forceEventsRefresh, chosenGroup]);

    useEffect(() => {
        buildEvents();
        buildDayEvents(chosenDate);
        buildEventTypes();
        console.log('Building data');
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
        console.log(data);
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

    const getGroups = async () => {
        const data = await getResource(`yearCourses/${id}/groups`);
        return data;
    };

    const downloadData = async () => {
        const groups = await getGroups();
        if (chosenGroup.length > 2) {
            dispatch(setGroup(groups[0].id));
        }
        dispatch(setGroups(groups));

        setEvents(await getEvents());

        const subjectsTemp = await getSubjects();
        dispatch(setSubjects(subjectsTemp));

        const typesTemp = await getTypes();
        setTypes(typesTemp);
        dispatch(setEventTypes(typesTemp));

        setDataDownloaded(!dataDownloaded);
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

    const buildEventTypes = () => {};

    return null;
};

export default ApiCalls;
