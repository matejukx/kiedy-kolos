import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "./../actions";
import './../App.css';

const CallendarCard = ({day, month, year, events}) => {
    const chosenDate = useSelector(state => state.chosenDate);
    const dispatch = useDispatch();

    const callendarCardClicked = () => {
        console.log("Clicked on day: " + day);
        dispatch(setDate(`${year}-${month}-${day}`));
    }

    return(
        <div class="calendar__day" tabindex="0" onClick={callendarCardClicked}>
            <div class="day__events">
                {events.map(event => (
                    <p key={event.id}>
                        {event.short_name.toUpperCase()}
                    </p>
                ))}
            </div>
            <div class="day__number">{day}</div>
        </div>
    )
}

export default CallendarCard;