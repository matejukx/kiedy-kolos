import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setEditGroupPopup } from '../../../redux/slices/editGroupPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import Modal from '../Modal/Modal';

const EditGroupModal = () => {
  const dispatch = useDispatch();
  const chosenGroup = useSelector((state) => state.chosenGroupAdmin.value);

  const { id } = useParams();

  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setInitialGroupData();
  }, []);

  const setInitialGroupData = async () => {
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Groups/${chosenGroup}`);

    const json = await response.json();
    const groupData = await json.result;

    setNumber(groupData.groupNumber);
    setName(groupData.groupName);
  };

  const editGroup = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      body: JSON.stringify({
        groupId: chosenGroup,
        yearCourseId: id,
        groupNumber: number,
        groupName: name,
      }),
      mode: 'cors',
    };
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Groups`, requestOptions);

    if (response.ok) {
      dispatch(setEditGroupPopup(false));
      dispatch(forceAdminRefresh());
    } else {
      setErrorMessage('Nieprawidłowe hasło!');
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
    editGroup();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setEditGroupPopup(false));
  };

  return (
    <Modal errorMessage={errorMessage}>
      <h2>Edytowanie groupy {chosenGroup} </h2>
      <label htmlFor='shortName'>Nazwa</label>
      <br />
      <input type='text' id='shortName' value={name} onChange={updateName} />
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
        Edytuj
      </button>
    </Modal>
  );
};

export default EditGroupModal;
