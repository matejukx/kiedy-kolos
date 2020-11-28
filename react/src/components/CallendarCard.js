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
        <div className="calendar__day" onClick={callendarCardClicked}>
            <p className="title">{day}.{month}.{year} </p>
            {events.map(event => (
                <p key={event.id}>
                    {event.short_name}
                </p>
            ))}
        </div>
    )
}

export default CallendarCard;