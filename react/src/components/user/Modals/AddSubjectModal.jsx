import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../../user/Modal/Modal';

const AddSubjectModal = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [shortName, setShortName] = useState('');
  const [longName, setLongName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const addSubject = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      body: JSON.stringify({
        yearCourseId: id,
        name: longName,
        shortName: shortName,
      }),
      mode: 'cors',
    };
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Subjects`, requestOptions);

    if (response.ok) {
      dispatch(setAddSubjectPopup(false));
      dispatch(forceAdminRefresh());
    } else {
      setErrorMessage('Nieprawidłowe hasło!');
    }
  };

  const updateShortName = (e) => {
    setShortName(e.target.value);
  };

  const updateLongName = (e) => {
    setLongName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAcceptClick = (e) => {
    e.preventDefault();
    addSubject();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setAddSubjectPopup(false));
  };

  return (
    <Modal errorMessage={errorMessage}>
      <h2>Dodawanie przedmiotu</h2>
      <label htmlFor='shortName'>Pełna nazwa</label>
      <br />
      <input type='text' id='shortName' value={longName} onChange={updateLongName} />
      <br />
      <br />
      <label htmlFor='shortName'>Krótka nazwa</label>
      <br />
      <input type='text' id='shortName' value={shortName} onChange={updateShortName} />
      <br />
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
        Utwórz przedmiot
      </button>
    </Modal>
  );
};

export default AddSubjectModal;
