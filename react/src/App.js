import React, { useEffect, useState } from "react";
import './App.css';
import Callendar from "./components/Callendar";
import InfoPanel from "./components/InfoPanel"

const App = () => {
    return  (
        <div className="App">
            <Callendar />
            <InfoPanel />
        </div>
    )
}

export default App;
