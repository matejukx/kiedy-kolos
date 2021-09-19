import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import { setRemoveEventPopup } from '../../../redux/slices/removeEventPopup';
import { setRemoveSubjectPopup } from '../../../redux/slices/removeSubjectPopup';
import Modal from '../Modal/Modal';

const RemoveSubjectModal = () => {
  const dispatch = useDispatch();
  const chosenSubjectID = useSelector((state) => state.chosenSubject.value);

  const { id } = useParams();

  const [password, setPassword] = useState('');

  const deletePressed = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      mode: 'cors',
    };
    const response = await fetch(
      `https://kiedykolos.bieda.it/yearCourses/${id}/Subjects/${chosenSubjectID}`,
      requestOptions
    );

    if (response.ok) {
      dispatch(setRemoveSubjectPopup(false));
      dispatch(forceAdminRefresh());
    }
  };
  const cancelPressed = () => {
    dispatch(setRemoveSubjectPopup(false));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Modal>
      <h2>Usuwanie przedmiotu {chosenSubjectID}</h2>
      <br />
      <label className='edition__label' htmlFor='password'>
        Hasło
      </label>
      <br />
      <input type='password' id='password' name='password' placeholder='Hasło' onChange={updatePassword}></input>
      <br />
      <button className='event-adder__button--reject' onClick={cancelPressed}>
        Anuluj
      </button>
      .......................
      <button className='event-adder__button--accept' onClick={deletePressed}>
        Usuń
      </button>
    </Modal>
  );
};

export default RemoveSubjectModal;
