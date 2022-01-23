import ItemList from '../../other/ItemList/ItemList';
import CourseInfo from '../CourseInfo/CourseInfo';
import ItemBar from '../../other/ItemBar/ItemBar';
import './AdminPanel.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setRemoveSubjectPopup } from '../../../redux/slices/removeSubjectPopup';
import { setChosenSubject } from '../../../redux/slices/chosenSubject';
import { setEditSubjectPopup } from '../../../redux/slices/editSubjectPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import { setEditGroupPopup } from '../../../redux/slices/editGroupPopup';
import { setRemoveGroupPopup } from '../../../redux/slices/removeGroupPopup';
import { setAddGroupPopup } from '../../../redux/slices/addGroupPopup';
import { setChosenGroupAdmin } from '../../../redux/slices/chosenGroupAdmin';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.value);
  const groups = useSelector((state) => state.groups.value);
  const yearCourseInformation = useSelector((state) => state.yearCourseInformation.value);

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
      handleEdit={() => {
        dispatch(setChosenGroupAdmin(id));
        dispatch(setEditGroupPopup(true));
      }}
      handleDelete={() => {
        dispatch(setChosenGroupAdmin(id));
        dispatch(setRemoveGroupPopup(true));
      }}
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
          name='przedmiot'
          addFunction={() => dispatch(setAddSubjectPopup(true))}
        />
      </div>
      <div className='scrollable'>
        <ItemList
          renderComponent={renderBarGroups}
          items={groups}
          name='grupę'
          addFunction={() => dispatch(setAddGroupPopup(true))}
        />
      </div>
      <CourseInfo
        course={yearCourseInformation.course}
        university={yearCourseInformation.university}
        faculty={yearCourseInformation.faculty}
        semester={yearCourseInformation.currentSemester}
        year={yearCourseInformation.courseStartYear}
      />
    </div>
  );
};

export default AdminPanel;
