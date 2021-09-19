import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddGroupPopup } from '../../../redux/slices/addGroupPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../Modal/Modal';

const AddGroupModal = ({ isVisible }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const addGroup = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      body: JSON.stringify({
        yearCourseId: id,
        groupName: name,
        groupNumber: number,
      }),
      mode: 'cors',
    };
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Groups`, requestOptions);

    if (response.ok) {
      dispatch(setAddGroupPopup(false));
      dispatch(forceAdminRefresh());
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateNumber = (e) => {
    setNumber(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAcceptClick = (e) => {
    e.preventDefault();
    addGroup();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setAddGroupPopup(false));
  };

  return (
    <Modal isVisible={isVisible}>
      <h2>Dodawanie grupy</h2>
      <label htmlFor='shortName'>Nazwa</label>
      <br />
      <input type='text' id='groupName' value={name} onChange={updateName} />
      <br />
      <br />
      <label htmlFor='shortName'>Numer grupy</label>
      <br />
      <input type='text' id='groupNumber' value={number} onChange={updateNumber} />
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
      .......................
      <button className='event-adder__button--accept' onClick={handleAcceptClick}>
        Utwórz grupę
      </button>
    </Modal>
  );
};

export default AddGroupModal;
