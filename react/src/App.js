import './App.css';
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";

import { Route, Switch } from "react-router";

const App = () => {
    return  (
        <Switch>
            <Route path="/" exact component={UserPanel}/>
            <Route path="/admin" exact component={AdminPanel}/>
        </Switch> 
    )
}

export default App;
