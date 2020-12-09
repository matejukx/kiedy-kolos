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
        <div className="calendar__options">
            <button class="button button--notifications">
              <div class="button__counter">1</div>
            </button>
            <motion.button className="button button--settings" onClick={toggleVisible}  whileTap={{scale: 0.9}} whileHover={{ scale: 1.1}}/>
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
            return " calendar__setting-option--selected-solid ";
        }
    }

    return (
        <motion.div class="calendar__settings" initial={{opacity: 0, y: -100, scale: 0}} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -100, scale: 0 }} transition={{ type: "spring", stiffness: 600, damping: 50}}>
            <div class="calendar__setting">
                <h3 class="calendar__setting-name">Grupa</h3>
                <ul class="calendar__setting-list">
                  <motion.li class={"calendar__setting-option " + style("Grupa 1")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 1")}>1</motion.li>
                  <motion.li class={"calendar__setting-option " + style("Grupa 2")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 2")}>2</motion.li>
                  <motion.li class={"calendar__setting-option " + style("Grupa 3")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 3")}>3</motion.li>
                  <motion.li class={"calendar__setting-option " + style("Grupa 4")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 4")}>4</motion.li>
                  <motion.li class={"calendar__setting-option " + style("Grupa 5")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 5")}>5</motion.li>
                  <motion.li class={"calendar__setting-option " + style("Grupa 6")} whileTap={{scale: 0.9, y: 0}} whileHover={{ scale: 1.1, y:-5}} onClick={() => setGroupGlobal("Grupa 6")}>6</motion.li>
                </ul>
              </div>
              <div class="calendar__setting">
                <h3 class="calendar__setting-name">Motyw</h3>
                <ul class="calendar__setting-list">
                  <div
                    class="calendar__setting-option calendar__setting-option--dark"
                  ></div>
                  <div
                    class="calendar__setting-option calendar__setting-option--light calendar__setting-option--selected"
                  ></div>
                </ul>
              </div>
        </motion.div>
    )
}

