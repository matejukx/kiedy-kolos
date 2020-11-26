import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./../actions";
import './../App.css';

const CallendarCard = ({day, month, events}) => {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const callendarCardClicked = () => {
        console.log("Clicked on day: " + day);
        dispatch(increment(day));
        console.log("Counter: " + counter);
    }

    return(
        <div className="callendar-card" onClick={callendarCardClicked}>
            <p className="title">2020-{month}-{day} </p>
            {events.map(event => (
                <div key={event.name}>
                    {event.name}<br />
                </div>
            ))}
        </div>
    )
}

export default CallendarCard;