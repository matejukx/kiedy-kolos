import './CourseInfo.scss';

const CourseInfo = ({ course, university, faculty, semester, year }) => (
  <div className='courseInfo'>
    <h3 className='courseInfo__subtitle'>{university}</h3>
    <h2 className='courseInfo__title'>{course}</h2>
    <h3 className='courseInfo__subtitle'>Wydział: {faculty}</h3>
    <h3 className='courseInfo__subtitle'>Aktualny semestr: {semester}</h3>
    <h3 className='courseInfo__subtitle'>Rok rozpoczęcia: {year}</h3>
  </div>
);

export default CourseInfo;
