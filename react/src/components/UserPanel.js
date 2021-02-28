import React from 'react';
import Calendar from './Calendar/Calendar';
import InfoPanel from './RightPanel/InfoPanel';
import { useSelector } from 'react-redux';
import AddEventPopup from './Popups/AddEventPopup';
import { AnimatePresence } from 'framer-motion';
import DeleteEventPopup from './Popups/DeleteEventPopup';

const UserPanel = () => {
    const addEventPopupEnabled = useSelector((state) => state.addEventPopup);
    const deleteEventPopupEnabled = useSelector((state) => state.deleteEventPopup);

    return (
        <div className='container'>
            <div className='app'>
                <Calendar />
                <InfoPanel />
            </div>
            <AnimatePresence>{addEventPopupEnabled && <AddEventPopup />}</AnimatePresence>
            <AnimatePresence>{deleteEventPopupEnabled && <DeleteEventPopup />}</AnimatePresence>
        </div>
    );
};

export default UserPanel;
