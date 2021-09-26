import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setSubjects } from '../../redux/slices/subjects';
import { setGroups } from '../../redux/slices/groups';
import { setYearCourseInformation } from '../../redux/slices/yearCourseInformation';

const AdminBackgroundAPI = () => {
  const dispatch = useDispatch();
  const baseURL = 'https://kiedykolos.bieda.it/';

  const forceAdminRefresh = useSelector((state) => state.forceAdminRefresh.value);

  const { id } = useParams();

  useEffect(() => {
    downloadData();
  }, [forceAdminRefresh]);

  const getResource = async (extensionURL) => {
    const URL = baseURL + extensionURL;
    const response = await fetch(URL);
    const data = await response.json();
    return data.result;
  };

  const getSubjects = async () => {
    return await getResource(`yearCourses/${id}/subjects`);
  };

  const getGroups = async () => {
    return await getResource(`yearCourses/${id}/groups`);
  };

  const getYearCourseInformation = async () => {
    return await getResource(`yearCourses/${id}`);
  };

  const downloadData = async () => {
    dispatch(setSubjects(await getSubjects()));
    dispatch(setGroups(await getGroups()));
    dispatch(setYearCourseInformation(await getYearCourseInformation()));
  };

  return null;
};

export default AdminBackgroundAPI;
