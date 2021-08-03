import './CourseInfo.scss';

const CourseInfo = ({ course, university }) => (
  <div className='courseInfo'>
    <h3 className='courseInfo__subtitle'>{university}</h3>
    <h2 className='courseInfo__title'>{course}</h2>
  </div>
);

export default CourseInfo;
