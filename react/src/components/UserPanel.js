import React from 'react';
import Calendar from './Calendar/Calendar';
import InfoPanel from './RightPanel/InfoPanel';
import { useSelector } from 'react-redux';
import AddEventPopup from './Popups/AddEventPopup';

const UserPanel = () => {
    const addEventPopupEnabled = useSelector((state) => state.addEventPopup);

    return (
        <div className='container'>
            <div className='app'>
                <Calendar />
                <InfoPanel />
            </div>
            {addEventPopupEnabled && <AddEventPopup />}
        </div>
    );
};

export default UserPanel;
