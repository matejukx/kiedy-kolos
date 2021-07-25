import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setEditEventPopup } from '../../../redux/slices/editEventPopup';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../../user/Modal/Modal';

const EditEventModal = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);
  const types = useSelector((state) => state.types.value);
  const chosenEventID = useSelector((state) => state.chosenEvent.value);

  const { id } = useParams();
  const [subjectID, setSubjectID] = useState(0);
  const [groupID, setGroupID] = useState(0);
  const [groupIDs, setGroupIDs] = useState([]);
  const [typeID, setTypeID] = useState(0);
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(0);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setInitialEventData();
  }, []);

  const setInitialEventData = async () => {
    const response = await fetch(
      `https://kiedy-kolos-backend.azurewebsites.net/yearCourses/${id}/Events/${chosenEventID}`
    );
    const json = await response.json();
    const eventData = await json.result;

    setTypeID(eventData.eventTypeId);
    setSubjectID(eventData.subjectId);
    setGroupID(eventData.groupIds[0]);
    setGroupIDs([eventData.groupIds[0]]);

    setDescription(eventData.description);
    console.log(dayjs(eventData.date).format());
    setTime(dayjs(eventData.date).format('HH:mm'));
    setDate(dayjs(eventData.date).format('YYYY-MM-DD'));
  };

  const removeEvent = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      mode: 'cors',
    };
    const response = await fetch(
      `https://kiedy-kolos-backend.azurewebsites.net/yearCourses/${id}/Events/${chosenEventID}`,
      requestOptions
    );

    if (response.ok) {
      dispatch(setEditEventPopup(false));
      dispatch(forceEventsRefresh());
    }
  };

  const addEvent = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      body: JSON.stringify({
        subjectID: subjectID,
        yearCourseId: id,
        name: 'temporary name',
        groupIds: groupIDs,
        date: date + 'T' + time,
        description: description,
        eventTypeId: typeID,
        password: password,
      }),
      mode: 'cors',
    };
    const response = await fetch(
      `https://kiedy-kolos-backend.azurewebsites.net/yearCourses/${id}/Events`,
      requestOptions
    );

    if (response.ok) {
      dispatch(setEditEventPopup(false));
      dispatch(forceEventsRefresh());
    }
  };

  const updateSubjectID = (e) => {
    setSubjectID(e.target.value);
  };

  const updateGroupID = (e) => {
    setGroupID(e.target.value);
    setGroupIDs([e.target.value]);
  };

  const updateTypeID = (e) => {
    setTypeID(e.target.value);
  };

  const updateTime = (e) => {
    setTime(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const acceptClicked = (e) => {
    e.preventDefault();
    removeEvent();
    addEvent();
  };

  const closeClicked = (e) => {
    e.preventDefault();
    dispatch(setEditEventPopup(false));
  };

  return (
    <Modal>
      <h2>Edytowanie wydarzenia {chosenEventID}</h2>

      <label htmlFor='subject'>Przedmiot</label>
      <select className='event-adder__input' id='subject' value={subjectID} onChange={updateSubjectID}>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
      <br />

      <label className='event-adder__label' htmlFor='group'>
        Grupa
      </label>
      <select className='event-adder__input' id='group' value={groupID} onChange={updateGroupID}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.groupNumber}
          </option>
        ))}
      </select>
      <br />

      <label className='event-adder__label' htmlFor='type'>
        Typ
      </label>
      <select className='event-adder__input' id='type' value={typeID} onChange={updateTypeID}>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <br />

      <label className='edition__label' htmlFor='time'>
        Godzina
      </label>
      <input
        type='time'
        id='time'
        name='time'
        min='07:00'
        value='16:00:00'
        max='21:00'
        value={time}
        onChange={updateTime}
      ></input>
      <br />

      <label className='edition__label' htmlFor='date'>
        Godzina
      </label>
      <input
        type='date'
        id='date'
        name='date'
        min='07:00'
        value='16:00:00'
        max='21:00'
        value={date}
        onChange={updateDate}
      ></input>
      <br />

      <label className='edition__label' htmlFor='description'>
        Opis
      </label>
      <textarea
        id='description'
        name='description'
        rows='5'
        cols='30'
        placeholder='Tu wpisz opis...'
        value={description}
        onChange={updateDescription}
      ></textarea>
      <br />

      <input type='password' id='password' name='password' placeholder='Hasło' onChange={updatePassword}></input>

      <button className='event-adder__button--reject' onClick={closeClicked}>
        Anuluj
      </button>
      <button className='event-adder__button--accept' onClick={acceptClicked}>
        Edytuj wydarzenie
      </button>
    </Modal>
  );
};

export default EditEventModal;
