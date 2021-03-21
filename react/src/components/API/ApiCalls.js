import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setEvents } from '../../actions';

const ApiCalls = () => {
    const baseURL = 'http://kiedy-kolos-backend.azurewebsites.net/';
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        getEvents();
        getSubjects();
    }, []);

    const getResource = async (extensionURL) => {
        const URL = baseURL + extensionURL;

        const response = await fetch(URL);
        const data = await response.json();
        return data.result;
    };

    const getEvents = async () => {
        const events = await getResource('events');
        console.log('events');
        console.log(events);
    };

    const getSubjects = async () => {
        const subjects = await getResource(`yearCourses/${id}/subjects`);
        console.log('subjects');
        console.log(subjects);
    };

    const buildEvents = (events, subjects) => {};

    return null;
};

export default ApiCalls;
