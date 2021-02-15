import React from "react";
import Calendar from "./Calendar/Calendar";
import InfoPanel from "./InfoPanel";

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