import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setChosenTheme, setGroup, setOptionsPopup } from '../../actions';

const CalendarTools = () => {
    const dispatch = useDispatch();
    const optionsVisible = useSelector((state) => state.optionsPopup);
    const chosenTheme = useSelector((state) => state.chosenTheme);

    useEffect(() => {
        document.body.dataset.theme = chosenTheme;
    }, [chosenTheme]);

    const toggleVisible = () => {
        dispatch(setOptionsPopup(!optionsVisible));
    };

    return (
        <div className='calendar__options'>
            <button className='button button--notifications'>
                <div className='button__counter'>1</div>
            </button>
            <motion.button
                className='button button--settings'
                onClick={toggleVisible}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
            />
            <AnimatePresence>{optionsVisible && <Settings />}</AnimatePresence>
        </div>
    );
};

export default CalendarTools;

const Settings = () => {
    const dispatch = useDispatch();
    const chosenGroup = useSelector((state) => state.chosenGroup);
    const chosenTheme = useSelector((state) => state.chosenTheme);

    const setGroupGlobal = (name) => {
        dispatch(setGroup(name));
    };

    const style = (name) => {
        if (name === chosenGroup) return ' calendar__setting-option--selected-solid ';
    };

    const changeToWhiteTheme = () => {
        dispatch(setChosenTheme('light'));
    };

    const changeToDarkTheme = () => {
        dispatch(setChosenTheme('dark'));
    };

    const themeButtonStyle = (buttonValue) => {
        if (buttonValue == chosenTheme) {
            return ' calendar__setting-option--selected';
        } else return '';
    };

    const groups = [];
    for (let i = 1; i < 7; i++) {
        groups.push(
            <motion.li
                key={i}
                className={'calendar__setting-option ' + style(`Grupa ${i}`)}
                whileTap={{ scale: 0.9, y: 0 }}
                whileHover={{ scale: 1.1, y: -5 }}
                onClick={() => setGroupGlobal(`Grupa ${i}`)}
            >
                {i}
            </motion.li>
        );
    }

    return (
        <motion.div
            className='calendar__settings'
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 50 }}
        >
            <div className='calendar__setting'>
                <h3 className='calendar__setting-name'>Grupa</h3>
                <ul className='calendar__setting-list'>{groups}</ul>
            </div>
            <div className='calendar__setting'>
                <h3 className='calendar__setting-name'>Motyw</h3>
                <ul className='calendar__setting-list'>
                    <div
                        className={'calendar__setting-option calendar__setting-option--dark' + themeButtonStyle('dark')}
                        onClick={changeToDarkTheme}
                    ></div>
                    <div
                        className={
                            'calendar__setting-option calendar__setting-option--light' + themeButtonStyle('light')
                        }
                        onClick={changeToWhiteTheme}
                    ></div>
                </ul>
            </div>
        </motion.div>
    );
};
