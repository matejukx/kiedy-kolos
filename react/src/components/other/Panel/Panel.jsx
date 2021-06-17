import Header from '../Header/Header';
import MonthPagination from '../../user/MonthPagination/MonthPagination';
import Toolbar from '../Toolbar/Toolbar';
import Calendar from '../../user/Calendar/Calendar';
import DailyEvents from '../../user/DailyEvents/DailyEvents';
import Title from '../Title/Title';
import AdminPanel from '../../admin/AdminPanel/AdminPanel';
import AddEventModal from '../../user/Modals/AddEventModal';
import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import './Panel.scss';
import ApiCalls from '../../API/ApiCalls';

const Panel = () => {
  const addEventsPopup = useSelector((state) => state.addEventPopup.value);

  return (
    <div className='panel'>
      <Switch>
        <Route exact path='/:id'>
          <ApiCalls />
          <Header>
            <MonthPagination />
            <Toolbar />
          </Header>
          <Calendar />
          <DailyEvents />
          {addEventsPopup && <AddEventModal />}
        </Route>
        <Route path='/:id/admin'>
          <Header>
            <Title>Panel Administratora</Title>
            <Toolbar />
          </Header>
          <AdminPanel />
        </Route>
      </Switch>
    </div>
  );
};

export default Panel;
