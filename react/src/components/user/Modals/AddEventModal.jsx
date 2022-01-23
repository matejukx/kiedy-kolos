import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../../user/Modal/Modal';
import './Modals.scss';

const AddEventModal = () => {
  const dispatch = useDispatch();

  const currentlyChosenGroup = useSelector((state) => state.chosenGroupID.value);
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);
  const types = useSelector((state) => state.types.value);
  const date = useSelector((state) => state.chosenDate.value);

  const { id } = useParams();
  const [subjectID, setSubjectID] = useState(0);
  const [groupIDs, setGroupIDs] = useState([currentlyChosenGroup.toString()]);
  const [typeID, setTypeID] = useState(0);
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTypeID(types[0].id);
    setSubjectID(subjects[0].id);
    console.log(currentlyChosenGroup);
  }, []);

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
      dispatch(setAddEventPopup(false));
      dispatch(forceEventsRefresh());
    } else {
      setErrorMessage('Nieprawidłowe hasło!');
    }
  };

  const updateSubjectID = (e) => {
    setSubjectID(e.target.value);
  };

  const updateGroupID = (e) => {
    if (e.target.checked) {
      if (!groupIDs.includes(e.target.value)) {
        setGroupIDs([...groupIDs, e.target.value]);
      }
    } else {
      setGroupIDs(groupIDs.filter((group) => group != e.target.value));
    }
  };

  const updateTypeID = (e) => {
    setTypeID(e.target.value);
  };

  const updateTime = (e) => {
    setTime(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAcceptClick = (e) => {
    e.preventDefault();
    addEvent();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setAddEventPopup(false));
  };

  return (
    <Modal errorMessage={errorMessage}>
      <h2>Dodawanie wydarzenia</h2>
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
            defaultChecked={groupIDs.includes(group.id.toString())}
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
      <button className='event-adder__button--reject' onClick={handleCloseClick}>
        Anuluj
      </button>
      <button className='event-adder__button--accept' onClick={handleAcceptClick}>
        Utwórz
      </button>
    </Modal>
  );
};

export default AddEventModal;
