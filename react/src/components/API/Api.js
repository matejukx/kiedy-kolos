export const getAllEvents = async (id) => {
  const URL = `http://kiedy-kolos-backend.azurewebsites.net/Events`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const getDayEvents = async (id, date) => {
  const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const getGroups = async (id) => {
  const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const getCourses = async (id) => {
  const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const getTypes = async (id) => {
  const URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_types.php`;

  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const addEvent = async (subjectID, yearCourseID, groupIDs, date, time, description, eventTypeID, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': password,
    },
    body: JSON.stringify({
      subjectID: subjectID,
      yearCourseId: yearCourseID,
      name: 'temporary name',
      groupIds: groupIDs,
      date: date + 'T' + time,
      description: description,
      eventTypeId: eventTypeID,
      password: password,
    }),
    mode: 'cors',
  };
  const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${yearCourseID}/Events`, requestOptions);
  return response;
};

export const deleteEvent = async (yearCourseID, eventID, password) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': password,
    },
    mode: 'cors',
  };
  const response = await fetch(
    `https://kiedykolos.bieda.it/yearCourses/${yearCourseID}/Events/${eventID}`,
    requestOptions
  );
  return response;
};

export const editEvent = async (
  eventID,
  subjectID,
  yearCourseID,
  groupIDs,
  date,
  time,
  description,
  eventTypeID,
  password
) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Api-Key': password },
    body: JSON.stringify({
      subjectID: subjectID,
      yearCourseId: yearCourseID,
      id: eventID,
      name: 'temporary name',
      groupIds: groupIDs,
      date: date + 'T' + time,
      description: description,
      eventTypeId: eventTypeID,
      password: password,
    }),
    mode: 'cors',
  };
  const response = await fetch(
    `https://kiedykolos.bieda.it/yearCourses/${yearCourseID}/Events/${eventID}`,
    requestOptions
  );
  return response;
};

export const getEventInfo = async (yearCourseID, eventID) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  };
  const response = await fetch(
    `https://kiedykolos.bieda.it/yearCourses/${yearCourseID}/Events/${eventID}`,
    requestOptions
  );
  const data = await response.json();
  return data.result;
};
