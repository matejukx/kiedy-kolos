import ItemList from '../../other/ItemList/ItemList';
import EventCard from '../EventCard/EventCard';
import './DailyEvents.scss';

const objs = [
  { name: 'Wytwarzanie Aplikacji Internetowych' },
  { name: 'Grafika Komputerowa' },
  { name: 'Architektura Komputerów' },
  { name: 'Fizyka Współczesna' },
  { name: 'Metody Numeryczne' },
  { name: 'Metody Probabilistyczne' },
  { name: 'Matematyka Elementarna' },
  { name: 'Systemy Wbudowane i Mikroprocesory' },
  { name: 'Heja' },
  { name: 'Okej' },
  { name: 'Siema' },
];

const DailyEvents = () => {
  const renderEvent = (name) => <EventCard key={name}>{name}</EventCard>;

  return (
    <div className='dailyEvents'>
      <ItemList name='Wydarzenie' items={objs} renderComponent={renderEvent} />
    </div>
  );
};

export default DailyEvents;
