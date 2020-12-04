import React from "react";
import Calendar from "./Calendar";
import InfoPanel from "./InfoPanel";
import './../App.css';

const UserPanel = () => {
    return(
        <div className="container">
            <div className="app">
                <Calendar />
                <InfoPanel />
            </div>
        </div>
    )
}

export default UserPanel;