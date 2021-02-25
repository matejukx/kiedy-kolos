import React from 'react';
import Calendar from './Calendar/Calendar';
import InfoPanel from './RightPanel/InfoPanel';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setAddEventPopup } from '../actions';

const UserPanel = () => {
    const addEventPopupEnabled = useSelector((state) => state.addEventPopup);
    const disptach = useDispatch();

    const closePopup = () => {
        disptach(setAddEventPopup(false));
    };

    return (
        <div className='container'>
            <div className='app'>
                <Calendar />
                <InfoPanel />
            </div>
            {addEventPopupEnabled && (
                <div className='modal'>
                    <motion.div
                        className='event-adder'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ease: [0.08, 0.75, 0.21, 0.98] }}
                    >
                        <h2 className='event-adder__title'>Dodawanie nowego wydarzenia</h2>
                        <form className='event-adder__form'>
                            <label class='event-adder__label' for='subject'>
                                Przedmiot
                            </label>
                            <select className='event-adder__input' id='subject'>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>

                            <label class='event-adder__label' for='subject'>
                                Przedmiot
                            </label>
                            <select className='event-adder__input' id='subject'>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>

                            <div className='event-adder__buttons'>
                                <button className='event-adder__button--reject' onClick={closePopup}>
                                    Anuluj
                                </button>
                                <button className='event-adder__button--accept'>Utwórz wydarzenie</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UserPanel;
