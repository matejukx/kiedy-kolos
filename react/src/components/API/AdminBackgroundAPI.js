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

const AdminBackgroundAPI = () => {
  const dispatch = useDispatch();
  const baseURL = 'https://kiedykolos.bieda.it/';

  const forceAdminRefresh = useSelector((state) => state.forceAdminRefresh.value);

  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [subjectsLocal, setSubjectsLocal] = useState([]);
  const [groupsLocal, setGroupsLocal] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    downloadData();
  }, [forceAdminRefresh]);

  useEffect(() => {
    dispatch(setSubjects(subjectsLocal));
    dispatch(setGroups(groupsLocal));
  }, [dataDownloaded]);

  const getResource = async (extensionURL) => {
    const URL = baseURL + extensionURL;

    const response = await fetch(URL);
    const data = await response.json();
    return data.result;
  };

  const getSubjects = async () => {
    const data = await getResource(`yearCourses/${id}/subjects`);
    dispatch(setSubjects(data));
    return data;
  };

  const getGroups = async () => {
    const data = await getResource(`yearCourses/${id}/groups`);
    dispatch(setGroups(data));
    return data;
  };

  const downloadData = async () => {
    setSubjectsLocal(await getSubjects());
    setGroupsLocal(await getGroups());
    setDataDownloaded(true);
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

export default AdminBackgroundAPI;
