import ItemList from '../../other/ItemList/ItemList';
import CourseInfo from '../CourseInfo/CourseInfo';
import ItemBar from '../../other/ItemBar/ItemBar';
import './AdminPanel.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setRemoveSubjectPopup } from '../../../redux/slices/removeSubjectPopup';
import { setChosenSubject } from '../../../redux/slices/chosenSubject';
import { setEditSubjectPopup } from '../../../redux/slices/editSubjectPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);

  const renderBarCourses = ({ id, name, shortName }) => (
    <ItemBar
      key={name}
      handleEdit={() => {
        dispatch(setChosenSubject(id));
        dispatch(setEditSubjectPopup(true));
      }}
      handleDelete={() => {
        dispatch(setChosenSubject(id));
        dispatch(setRemoveSubjectPopup(true));
      }}
    >
      {name} ({shortName})
    </ItemBar>
  );

  const renderBarGroups = ({ id, groupName }) => (
    <ItemBar
      key={groupName}
      handleEdit={() => console.log('edit group' + id)}
      handleDelete={() => console.log('delete group' + id)}
    >
      {groupName}
    </ItemBar>
  );

  return (
    <div className='adminPanel'>
      <div className='scrollable'>
        <ItemList
          renderComponent={renderBarCourses}
          items={subjects}
          name='Przedmiot'
          addFunction={() => dispatch(setAddSubjectPopup(true))}
        />
      </div>
      <div className='scrollable'>
        <ItemList renderComponent={renderBarGroups} items={groups} name='Grupę' />
      </div>
      <CourseInfo course='Informatyka' university='Politechnika Gdańska' />
    </div>
  );
};

export default AdminPanel;
