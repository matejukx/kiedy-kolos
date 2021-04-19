import { Route, Switch } from 'react-router';

import Panel from './components/other/Panel/Panel';

const App = () => {
    return (
        <Switch>
            <Panel />
        </Switch>
    );
};

export default App;
