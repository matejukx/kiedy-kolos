import React, { useEffect, useState } from "react";
import './App.css';
import Calendar from "./components/Calendar";
import InfoPanel from "./components/InfoPanel";
import AdminPanel from "./components/AdminPanel";
import { Route, Switch } from "react-router";
import UserPanel from "./components/UserPanel";


const App = () => {
    return  (
        <Switch>
            <Route path="/" exact component={UserPanel}/>
            <Route path="/admin" exact component={AdminPanel}/>
        </Switch> 
    )
}

export default App;
