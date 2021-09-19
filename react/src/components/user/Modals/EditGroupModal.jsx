import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import { setEditGroupPopup } from '../../../redux/slices/editGroupPopup';
import { setEditSubjectPopup } from '../../../redux/slices/editSubjectPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../Modal/Modal';

const EditGroupModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  const chosenGroup = useSelector((state) => state.chosenGroupAdmin.value);

  const { id } = useParams();

  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setInitialGroupData();
  }, [isVisible]);

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
    <Modal isVisible={isVisible}>
      <h2>Edytowanie groupy {chosenGroup} </h2>
      <label htmlFor='shortName'>Nazwa</label>
      <br />
      <input type='text' id='shortName' value={name} onChange={updateName} />
      <br />
      <br />
      <label htmlFor='shortName'>Numer grupy</label>
      <br />
      <input type='text' id='shortName' value={number} onChange={updateNumber} />
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
        Edytuj
      </button>
    </Modal>
  );
};

export default EditGroupModal;
