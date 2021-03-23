import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setEvents } from '../../actions';
import dayjs from 'dayjs';

const ApiCalls = () => {
    const baseURL = 'http://kiedy-kolos-backend.azurewebsites.net/';
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        buildEvents();
    }, []);

    const getResource = async (extensionURL) => {
        const URL = baseURL + extensionURL;

        const response = await fetch(URL);
        const data = await response.json();
        return data.result;
    };

    const getEvents = async () => {
        const events = await getResource('events');
        return events;
    };

    const getSubjects = async () => {
        const subjects = await getResource(`yearCourses/${id}/subjects`);
        return subjects;
    };

    const getTypes = async () => {
        const types = await getResource(`EventTypes`);
        return types;
    };

    const buildEvents = async () => {
        let events = await getEvents();
        let subjects = await getSubjects();
        let types = await getTypes();

        let eventsConnected = [];
        for (let event of events) {
            let eventData = {
                date: dayjs(event.date).format('YYYY-MM-DD'),
                subjectLongName: getPropertyFromObjectByID(subjects, event.id, 'name'),
                subjectShortName: getPropertyFromObjectByID(subjects, event.id, 'shortName'),
                type: getPropertyFromObjectByID(types, event.id, 'name'),
            };
            eventsConnected.push(eventData);
        }

        console.log(eventsConnected + 'd');
        dispatch(setEvents(eventsConnected));
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
