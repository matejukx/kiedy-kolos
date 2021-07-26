import ItemList from '../../other/ItemList/ItemList';
import CourseInfo from '../CourseInfo/CourseInfo';
import ItemBar from '../../other/ItemBar/ItemBar';
import './AdminPanel.scss';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);

  const renderBarCourses = ({ name, shortName }) => (
    <ItemBar key={name} handleEdit={() => console.log('edit course')} handleDelete={() => console.log('delete course')}>
      {name} ({shortName})
    </ItemBar>
  );

  const renderBarGroups = ({ groupName }) => (
    <ItemBar
      key={groupName}
      handleEdit={() => console.log('edit group')}
      handleDelete={() => console.log('delete group')}
    >
      {groupName}
    </ItemBar>
  );

  return (
    <div className='adminPanel'>
      <div className='scrollable'>
        <ItemList renderComponent={renderBarCourses} items={subjects} name='Przedmiot' />
      </div>
      <div className='scrollable'>
        <ItemList renderComponent={renderBarGroups} items={groups} name='Grupę' />
      </div>
      <CourseInfo course='Informatyka' university='Politechnika Gdańska' />
    </div>
  );
};

export default AdminPanel;
