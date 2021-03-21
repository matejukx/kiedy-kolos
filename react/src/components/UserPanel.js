import React from 'react';
import Calendar from './Calendar/Calendar';
import InfoPanel from './RightPanel/InfoPanel';
import { useSelector } from 'react-redux';
import AddEventPopup from './Popups/AddEventPopup';
import { AnimatePresence } from 'framer-motion';
import DeleteEventPopup from './Popups/DeleteEventPopup';
import EditEventPopup from './Popups/EditEventPopup';
import ApiCalls from './API/ApiCalls';

const UserPanel = () => {
    const addEventPopupEnabled = useSelector((state) => state.addEventPopup);
    const deleteEventPopupEnabled = useSelector((state) => state.deleteEventPopup);
    const editEventPopupEnabled = useSelector((state) => state.editEventPopup);

    return (
        <div className='container'>
            <ApiCalls />
            <div className='app'>
                <Calendar />
                <InfoPanel />
            </div>
            <AnimatePresence>{addEventPopupEnabled && <AddEventPopup />}</AnimatePresence>
            <AnimatePresence>{deleteEventPopupEnabled && <DeleteEventPopup />}</AnimatePresence>
            <AnimatePresence>{editEventPopupEnabled && <EditEventPopup />}</AnimatePresence>
        </div>
    );
};

export default UserPanel;
