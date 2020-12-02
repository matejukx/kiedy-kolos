import React, { useEffect, useState } from "react";
import './App.css';
import Calendar from "./components/Calendar";
import InfoPanel from "./components/InfoPanel"

const App = () => {
    return  (
        <div className="container">
            <div className="app">
                <Calendar />
                <InfoPanel />
            </div>
        </div>
    )
}

export default App;
