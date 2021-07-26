import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import { setDailyEvents } from '../../redux/slices/dailyEvents';
import { setAllEvents } from '../../redux/slices/allEvents';
import { setSubjects } from '../../redux/slices/subjects';
import { setGroups } from '../../redux/slices/groups';
import { setTypes } from '../../redux/slices/types';
import { setChosenGroupID } from '../../redux/slices/chosenGroupIDSlice';

const UserBackgroundAPI = () => {
  const dispatch = useDispatch();
  const baseURL = 'https://kiedy-kolos-backend.azurewebsites.net/';

  const forceEventsRefresh = useSelector((state) => state.forceEventsRefresh.value);
  const chosenDate = useSelector((state) => state.chosenDate.value);
  const chosenGroup = useSelector((state) => state.chosenGroupID.value);

  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [eventsLocal, setEventsLocal] = useState([]);
  const [typesLocal, setTypesLocal] = useState([]);
  const [subjectsLocal, setSubjectsLocal] = useState([]);
  const [groupsLocal, setGroupsLocal] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log('Downloading data...');

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
    dispatch(setSubjects(data));
    return data;
  };

  const getTypes = async () => {
    const data = await getResource(`eventTypes`);
    dispatch(setTypes(data));
    return data;
  };

  const getGroups = async () => {
    const data = await getResource(`yearCourses/${id}/groups`);
    dispatch(setGroups(data));
    return data;
  };

  const downloadData = async () => {
    setEventsLocal(await getEvents());
    setSubjectsLocal(await getSubjects());
    setTypesLocal(await getTypes());

    checkGroupCorectness(await getGroups());
  };

  const checkGroupCorectness = (groups) => {
    for (let group of groups) {
      if (chosenGroup == group.id) {
        setDataDownloaded(!dataDownloaded);
        return;
      }
    }

    dispatch(setChosenGroupID(groups[0].id));
    console.log('Unknown group ID. Changing to default...');
  };

  const buildEvents = async () => {
    if (eventsLocal.length == 0) {
      return;
    }

    let eventsConnected = [];
    for (let event of eventsLocal) {
      let eventData = {
        date: dayjs(event.date).format('YYYY-MM-DD'),
        subjectLongName: getPropertyFromObjectByID(subjectsLocal, event.subjectId, 'name'),
        subjectShortName: getPropertyFromObjectByID(subjectsLocal, event.subjectId, 'shortName'),
        type: getPropertyFromObjectByID(typesLocal, event.eventTypeId, 'name'),
      };
      eventsConnected.push(eventData);
    }
    dispatch(setAllEvents(eventsConnected));
  };

  const buildDayEvents = async (date) => {
    let dayEvents = [];
    for (let event of eventsLocal) {
      if (dayjs(event.date).format('YYYY-MM-DD') != date) {
        continue;
      }
      let eventData = {
        id: event.id,
        date: dayjs(event.date).format('YYYY-MM-DD'),
        description: event.description,
        subjectLongName: getPropertyFromObjectByID(subjectsLocal, event.subjectId, 'name'),
        type: getPropertyFromObjectByID(typesLocal, event.eventTypeId, 'name'),
        time: dayjs(event.date).format('HH:mm'),
      };
      dayEvents.push(eventData);
    }
    dispatch(setDailyEvents(dayEvents));
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

export default UserBackgroundAPI;
