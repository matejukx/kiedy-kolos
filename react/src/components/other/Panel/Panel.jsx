import Header from '../Header/Header';
import MonthPagination from '../../user/MonthPagination/MonthPagination';
import Toolbar from '../Toolbar/Toolbar';
import Calendar from '../../user/Calendar/Calendar';
import DailyEvents from '../../user/DailyEvents/DailyEvents';
import Title from '../Title/Title';
import AdminPanel from '../../admin/AdminPanel/AdminPanel';
import AddEventModal from '../../user/Modals/AddEventModal';
import RemoveEventModal from '../../user/Modals/RemoveEventModal';
import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import './Panel.scss';
import UserBackgroundAPI from '../../API/UserBackgroundAPI';
import EditEventModal from '../../user/Modals/EditEventModal';
import SettingsModal from '../../user/Modals/SettingsModal';
import AdminBackgroundAPI from '../../API/AdminBackgroundAPI';

const Panel = () => {
  const addEventsPopup = useSelector((state) => state.addEventPopup.value);
  const removeEventsPopup = useSelector((state) => state.removeEventPopup.value);
  const editEventPopup = useSelector((state) => state.editEventPopup.value);
  const settingsPopup = useSelector((state) => state.settingsPopup.value);

  return (
    <div className='panel'>
      <Switch>
        <Route exact path='/:id'>
          <UserBackgroundAPI />
          <Header>
            <MonthPagination />
            <Toolbar />
          </Header>
          <Calendar />
          <DailyEvents />
          {addEventsPopup && <AddEventModal />}
          {removeEventsPopup && <RemoveEventModal />}
          {editEventPopup && <EditEventModal />}
          {settingsPopup && <SettingsModal />}
        </Route>
        <Route path='/:id/admin'>
          <AdminBackgroundAPI />
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
