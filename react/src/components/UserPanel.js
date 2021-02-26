import React from 'react';
import Calendar from './Calendar/Calendar';
import InfoPanel from './RightPanel/InfoPanel';
import { useSelector } from 'react-redux';
import AddEventPopup from './Popups/AddEventPopup';
import { AnimatePresence } from 'framer-motion';

const UserPanel = () => {
    const addEventPopupEnabled = useSelector((state) => state.addEventPopup);

    return (
        <div className='container'>
            <div className='app'>
                <Calendar />
                <InfoPanel />
            </div>
            <AnimatePresence>{addEventPopupEnabled && <AddEventPopup />}</AnimatePresence>
        </div>
    );
};

export default UserPanel;
