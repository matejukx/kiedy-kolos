import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../../user/Modal/Modal';

const AddEventModal = ({ isVisible }) => {
  const dispatch = useDispatch();

  const currentlyChosenGroup = useSelector((state) => state.chosenGroupID.value);
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);
  const types = useSelector((state) => state.types.value);
  const date = useSelector((state) => state.chosenDate.value);

  const { id } = useParams();
  const [subjectID, setSubjectID] = useState(0);
  const [groupID, setGroupID] = useState(0);
  const [groupIDs, setGroupIDs] = useState([]);
  const [typeID, setTypeID] = useState(0);
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setTypeID(types[0].id);
    setSubjectID(subjects[0].id);
    setGroupID(currentlyChosenGroup);
    setGroupIDs([currentlyChosenGroup]);
  }, [isVisible]);

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
      dispatch(setAddEventPopup(false));
      dispatch(forceEventsRefresh());
    }
  };

  const formAllGroupArray = () => {
    let groupsTemp = [];
    for (let group of groups) {
      groupsTemp.push(group.id);
    }

    return groupsTemp;
  };

  const updateSubjectID = (e) => {
    setSubjectID(e.target.value);
  };

  const updateGroupID = (e) => {
    setGroupID(e.target.value);

    if (e.target.value == -1) {
      setGroupIDs(formAllGroupArray());
    } else {
      setGroupIDs([e.target.value]);
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
    <Modal isVisible={isVisible}>
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
      <select className='event-adder__input' id='group' value={groupID} onChange={updateGroupID}>
        <option key={0} value={-1}>
          Wszystkie
        </option>
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
      .......................
      <button className='event-adder__button--accept' onClick={handleAcceptClick}>
        Utwórz wydarzenie
      </button>
    </Modal>
  );
};

export default AddEventModal;