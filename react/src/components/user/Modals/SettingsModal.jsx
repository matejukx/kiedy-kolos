import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenGroupID } from '../../../redux/slices/chosenGroupIDSlice';
import { setSettingsPopup } from '../../../redux/slices/settingsPopup';
import Modal from '../Modal/Modal';

const SettingsModal = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.value);
  const choosenGroupID = useSelector((state) => state.chosenGroupID.value);

  const [groupID, setGroupID] = useState(0);

  useEffect(() => {
    setGroupID(choosenGroupID);
  }, [choosenGroupID]);

  const updateGroupID = (e) => {
    setGroupID(e.target.value);
  };

  const acceptClicked = () => {
    dispatch(setSettingsPopup(false));
    dispatch(setChosenGroupID(groupID));
  };

  return (
    <Modal>
      <h2>Ustawienia</h2>
      <label className='event-adder__label' htmlFor='group'>
        Grupa
      </label>
      <select className='event-adder__input' id='group' value={groupID} onChange={updateGroupID}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.groupNumber}
          </option>
        ))}
      </select>
      <button onClick={() => acceptClicked()}>Akceptuj</button>
    </Modal>
  );
};

export default SettingsModal;
