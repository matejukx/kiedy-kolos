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
  const [groupIDs, setGroupIDs] = useState([]);
  const [typeID, setTypeID] = useState(0);
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(0);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setInitialEventData();
  }, []);

  const setInitialEventData = async () => {
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Events/${chosenEventID}`);
    const json = await response.json();
    const eventData = await json.result;

    setTypeID(eventData.eventTypeId);
    setSubjectID(eventData.subjectId);
    setInitialGroupIDs(eventData);

    setDescription(eventData.description);
    setTime(dayjs(eventData.date).format('HH:mm'));
    setDate(dayjs(eventData.date).format('YYYY-MM-DD'));

    console.log(eventData.groupIds);
  };

  const setInitialGroupIDs = (eventData) => {
    const ids = [];
    eventData.groupIds.forEach((id) => {
      ids.push(id.toString());
    });
    setGroupIDs(ids);
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
      `https://kiedykolos.bieda.it/yearCourses/${id}/Events/${chosenEventID}`,
      requestOptions
    );

    if (response.ok) {
      dispatch(setEditEventPopup(false));
      dispatch(forceEventsRefresh());
    } else {
      setErrorMessage('Nieprawidłowe hasło!');
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
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Events`, requestOptions);

    if (response.ok) {
      dispatch(setEditEventPopup(false));
      dispatch(forceEventsRefresh());
    }
  };

  const updateSubjectID = (e) => {
    setSubjectID(e.target.value);
  };

  const updateGroupID = (e) => {
    if (e.target.checked) {
      if (!groupIDs.includes(e.target.value)) {
        console.log('Adding!');
        setGroupIDs([...groupIDs, e.target.value]);
      }
    } else {
      console.log('Removing');
      setGroupIDs(groupIDs.filter((group) => group != e.target.value));
    }
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
    <Modal errorMessage={errorMessage}>
      <h2>Edytowanie wydarzenia {chosenEventID}</h2>
      <label htmlFor='subject'>Przedmiot</label>
      <br />
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
      <br />
      {groups.map((group) => (
        <label key={group.id}>
          <input
            type='checkbox'
            key={group.id}
            value={group.id}
            onChange={(e) => updateGroupID(e)}
            checked={groupIDs.includes(group.id.toString())}
          />
          {group.groupName}
          <br />
        </label>
      ))}
      <label className='event-adder__label' htmlFor='type'>
        Typ
      </label>
      <br />
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
      <br />
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
        Data
      </label>
      <br />
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
      <br />
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
      <label className='edition__label' htmlFor='password'>
        Hasło
      </label>
      <br />
      <input type='password' id='password' name='password' placeholder='Hasło' onChange={updatePassword}></input>
      <br />
      <br />
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
