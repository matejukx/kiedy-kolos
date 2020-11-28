import React, { useEffect, useState } from "react";
import './App.css';
import Callendar from "./components/Callendar";
import InfoPanel from "./components/InfoPanel"

const App = () => {
    return  (
        <div class="container">
            <div class="app">
                <Callendar />
                <InfoPanel />
            </div>
        </div>
    )
}

export default App;
