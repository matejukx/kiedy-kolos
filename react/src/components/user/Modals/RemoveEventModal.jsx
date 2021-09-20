import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import { setRemoveEventPopup } from '../../../redux/slices/removeEventPopup';
import Modal from '../../user/Modal/Modal';

const RemoveEventModal = () => {
  const dispatch = useDispatch();
  const chosenEventID = useSelector((state) => state.chosenEvent.value);

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
      `https://kiedykolos.bieda.it/yearCourses/${id}/Events/${chosenEventID}`,
      requestOptions
    );

    if (response.ok) {
      dispatch(setRemoveEventPopup(false));
      dispatch(forceEventsRefresh());
    }
  };
  const cancelPressed = () => {
    dispatch(setRemoveEventPopup(false));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Modal>
      <h2>Usuwanie wydarzenia {chosenEventID}</h2>
      <br />
      <label className='edition__label' htmlFor='password'>
        Hasło
      </label>
      <br />
      <input type='password' id='password' name='password' placeholder='Hasło' onChange={updatePassword}></input>
      <br />
      <br />
      <button className='event-adder__button--reject' onClick={cancelPressed}>
        Anuluj
      </button>
      <button className='event-adder__button--accept' onClick={deletePressed}>
        Usuń
      </button>
    </Modal>
  );
};

export default RemoveEventModal;
