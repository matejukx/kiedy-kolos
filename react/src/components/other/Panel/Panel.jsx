import Header from '../Header/Header';
import MonthPagination from '../../user/MonthPagination/MonthPagination';
import Toolbar from '../Toolbar/Toolbar';
import Calendar from '../../user/Calendar/Calendar';
import DailyEvents from '../../user/DailyEvents/DailyEvents';
import Title from '../Title/Title';
import AdminPanel from '../../admin/AdminPanel/AdminPanel';

import { Switch, Route } from 'react-router-dom';

import './Panel.scss';

const Panel = () => (
  <div className='panel'>
    <Switch>
      <Route exact path='/'>
        <Header>
          <MonthPagination />
          <Toolbar />
        </Header>
        <Calendar />
        <DailyEvents />
      </Route>
      <Route exact path='/admin'>
        <Header>
          <Title>Panel Administratora</Title>
          <Toolbar />
        </Header>
        <AdminPanel />
      </Route>
    </Switch>
  </div>
);

export default Panel;
