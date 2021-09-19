import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import { setEditSubjectPopup } from '../../../redux/slices/editSubjectPopup';
import { forceAdminRefresh } from '../../../redux/slices/forceAdminRefresh';
import { forceEventsRefresh } from '../../../redux/slices/forceEventsRefresh';
import Modal from '../Modal/Modal';

const EditSubjectModal = ({ isVisible }) => {
  const dispatch = useDispatch();
  const chosenSubjectID = useSelector((state) => state.chosenSubject.value);

  const { id } = useParams();

  const [shortName, setShortName] = useState('');
  const [longName, setLongName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setInitialSubjectData();
  }, [isVisible]);

  const setInitialSubjectData = async () => {
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Subjects/${chosenSubjectID}`);

    const json = await response.json();
    const subjectData = await json.result;

    setShortName(subjectData.shortName);
    setLongName(subjectData.name);
  };

  const editSubject = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': password,
      },
      body: JSON.stringify({
        subjectId: chosenSubjectID,
        yearCourseId: id,
        name: longName,
        shortName: shortName,
      }),
      mode: 'cors',
    };
    const response = await fetch(`https://kiedykolos.bieda.it/yearCourses/${id}/Subjects`, requestOptions);

    if (response.ok) {
      dispatch(setEditSubjectPopup(false));
      dispatch(forceAdminRefresh());
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
    editSubject();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setEditSubjectPopup(false));
  };

  return (
    <Modal isVisible={isVisible}>
      <h2>Edytowanie przedmiotu {chosenSubjectID} </h2>
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
      .......................
      <button className='event-adder__button--accept' onClick={handleAcceptClick}>
        Edytuj
      </button>
    </Modal>
  );
};

export default EditSubjectModal;
