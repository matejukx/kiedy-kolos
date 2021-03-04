import './App.css';
import UserPanel from './components/UserPanel';

import { Route, Switch } from 'react-router';

const App = () => {
    return (
        <Switch>
            <Route path='/' exact component={UserPanel} />
        </Switch>
    );
};

export default App;
