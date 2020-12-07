import React from "react";
import AddEventPanel from "./AddEventPanel";
import EventList from "./EventList";
import DataPanel from "./DataPanel";
import './../AdminPanel.css';

const AdminPanel = () => {
    return(
        <div className="container">
            <div className="admin-panel">
                <EventList />
                <DataPanel />
            </div>
        </div>
    )
}

export default AdminPanel;