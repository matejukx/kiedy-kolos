import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './../App.css';
import { setGroup } from "../actions";

const CalendarTools = () => {
    const [settingsVisible, SetSettingsVisible] = useState(false);

    const toggleVisible = () => {
        SetSettingsVisible(!settingsVisible);
    }

    return(
        <div class="calendar__tools">
            <motion.button class="calendar__settings" onClick={toggleVisible}  whileTap={{scale: 0.9}} whileHover={{ scale: 1.1}}>
              <i class="fas fa-cog"></i>
            </motion.button>
            <button class="calendar__notifications">
              <i class="fas fa-bell"></i>
              <div class="notification__count">
                <i class="fas fa-infinity"></i>
              </div>
            </button>
            <AnimatePresence>
                {settingsVisible && (<Settings />)}
            </AnimatePresence>
          </div>
    )
}

export default CalendarTools;

const Settings = () => {
    const dispatch = useDispatch();
    const chosenGroup = useSelector(state => state.chosenGroup);

    const setGroupGlobal = (name) => {
        dispatch(setGroup(name));
    }

    const style = (name) => {
        if(name == chosenGroup) {
            return " group__number--selected ";
        }
    }

    return (
        <motion.div class="settings" initial={{opacity: 0, y: -100, scale: 0}} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -100, scale: 0 }} transition={{ type: "spring", stiffness: 600, damping: 50}}>
            <div class="group">
            <h3 class="group__header">Grupa</h3>
            <ul class="group__list">
                <motion.li class={"group__number " + style("Grupa 1")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 1")}>1</motion.li>
                <motion.li class={"group__number " + style("Grupa 2")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 2")}>2</motion.li>
                <motion.li class={"group__number " + style("Grupa 3")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 3")}>3</motion.li>
                <motion.li class={"group__number " + style("Grupa 4")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 4")}>4</motion.li>
                <motion.li class={"group__number " + style("Grupa 5")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 5")}>5</motion.li>
                <motion.li class={"group__number " + style("Grupa 6")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 6")}>6</motion.li>
            </ul>
            </div>
            <div class="theme">
            <h3 class="theme__header">Motyw</h3>
            <ul class="theme__list">
                <div class="theme__item theme__item--light"></div>
                <div
                class="theme__item theme__item--dark theme__item--selected"
                ></div>
            </ul>
            </div>
        </motion.div>
    )
}

