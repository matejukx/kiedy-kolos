import React from 'react';
import { useSelector } from 'react-redux';
import AddEventPanel from './AddEventPanel';
import EditEventPanel from './EditEventPanel';
import EventList from './EventList';

const AdminPanel = () => {
    const editEnabled = useSelector((state) => state.editEnabled);
    return (
        <div className='container'>
            <div className='app app--small'>
                <EventList />

                {editEnabled ? <EditEventPanel /> : <AddEventPanel />}
            </div>
        </div>
    );
};

export default AdminPanel;
