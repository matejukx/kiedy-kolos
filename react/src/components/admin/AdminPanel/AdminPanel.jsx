import ItemList from '../../other/ItemList/ItemList';
import CourseInfo from '../CourseInfo/CourseInfo';
import ItemBar from '../../other/ItemBar/ItemBar';
import './AdminPanel.scss';

const AdminPanel = () => {
  const subjects = [
    { name: 'Wytwarzanie Aplikacji Internetowych', abbreviation: 'WAI' },
    { name: 'Języki Programowania', abbreviation: 'JPR' },
  ];

  const groups = [
    { name: 'Grupa 1' },
    { name: 'Grupa 2' },
    { name: 'Grupa 3' },
    { name: 'Grupa 4' },
    { name: 'Grupa 5' },
    { name: 'Grupa 6' },
    { name: 'Grupa 7' },
    { name: 'Grupa 8' },
    { name: 'Grupa 9' },
    { name: 'Grupa 10' },
    { name: 'Grupa 11' },
  ];

  const renderBarCourses = ({ name }) => (
    <ItemBar key={name} handleEdit={() => console.log('edit course')} handleDelete={() => console.log('delete course')}>
      {name}
    </ItemBar>
  );

  const renderBarGroups = ({ name }) => (
    <ItemBar key={name} handleEdit={() => console.log('edit group')} handleDelete={() => console.log('delete group')}>
      {name}
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
