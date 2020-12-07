import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editDisable, editEnable, setChosenEventAdmin } from "../actions";
import './../AdminPanel.css';

const EventList = () => {
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php`;
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        console.log(data);
    }

    const addEventClicked = () => {
        dispatch(editDisable());
    }

    return(
        <div class="app__events">
          <h2 class="events__header">Wydarzenia</h2>
          <ul class="events-list">
            <li class="events-list__item events-list__adder" onClick={() => addEventClicked()}>
              <i class="far fa-plus-square"></i>
              <h3>Dodaj Wydarzenie</h3>
            </li>
            {events.map((event) => (
                <Event event={event} />
            ))}
          </ul>
        </div>
    )
}

const Event = ({event}) => {
    const dispatch = useDispatch();

    const style = () => {
        let styleText = "";
        if(event.type == "Kolokwium") {
            styleText+= " events-list__item--exam ";
        }
        else if (event.type == "Projekt"){
            styleText+= " events-list__item--project ";
        }
        else if (event.type == "Egzamin"){
            styleText+= " events-list__item--exam ";
        }
        else if (event.type == "Laboratorium"){
            styleText+= " events-list__item--lab ";
        }
        else if (event.type == "Inne"){
            styleText+= " events-list__item--other ";
        }

        // if(event == chosenEvent) {
        //     styleText+= " events-list__item--selected ";
        // }
        return styleText;
    }

    const setChosenEventAdminGlobal = (event) => {
        dispatch(setChosenEventAdmin(event.id));
        dispatch(editEnable());
    }

    return (
        <li class={"events-list__item " + style()} onClick={() => setChosenEventAdminGlobal(event)}>
            <h3>{event.name}</h3>
            <div class="events-list__info">
                <div class="events-list__time">17:00</div>
                <div class="events-list__category">{event.type}</div>
                <div class="events-list__date">{event.date}</div>
            </div>
        </li>
    )
}

export default EventList;