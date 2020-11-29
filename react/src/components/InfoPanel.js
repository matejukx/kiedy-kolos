import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './../App.css';



const InfoPanel = () => {
    const [events, setEvents] = useState([]);
    const [chosenEvent, setChosenEvent] = useState();
    const date = useSelector(state => state.chosenDate);
    const API_URL = `https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=${date}`;

    useEffect(() => {
        getEvents();
    }, [date]);

    const getEvents = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setEvents(data);
        setChosenEvent(data[0]);
    }

    return(
        <div className="app__extension">
            <div className="app__events">
                <h2 class="events__header">Wydarzenia {date}</h2>
                <ul class="events-list">
                    {events.map((event) => (
                        <InfoEvent key={event.id} event={event} setChosenEvent={setChosenEvent}/>
                    ))}
                </ul>
            </div>
            <EventDescription />
        </div>
    )
}

const InfoEvent = ({event, setChosenEvent}) => {
    return (
        <div className="events-list__item" onClick={() => setChosenEvent(event)}>
            <h3>{event.name}</h3>
            <div class="events-list__info">
                  <div class="events-list__time">11:30 - 12:45</div>
                  <div class="events-list__category">Projekt</div>
            </div>
        </div>
    )
}

const EventDescription = () => {
    return (
        <div class="app__info">
            <h3>Języki Programowania</h3>
            <ul class="app__links">
              <a><li class="app__link">eNauczanie</li></a>
              <a><li class="app__link">Prezentacja</li></a>
              <a><li class="app__link">Dysk Google</li></a>
            </ul>
            <div class="app__info-text">
              Wszystkie najważniejsze informacje zostały wrzucone na Dysk
              Google. Na eNauczaniu znajdują się warunki zaliczenia. Wymagane
              jest 51 punktów z całego przedmiotu, z czego te kolokwium jest
              warte 20, następne 20 oraz 4 projekty oceniane na 15 punktów
              każdy. Kolega z roku wyżej podesłał nam też prezentacje swojego
              autorstwa, warto się z nią zapoznać. Prawdopodobnie odbędzie się
              zdalnie, ale warto być gotowym na wszystko. Wszystkie
              najważniejsze informacje zostały wrzucone na Dysk Google. Na
              eNauczaniu znajdują się warunki zaliczenia. Wymagane jest 51
              punktów z całego przedmiotu, z czego te kolokwium jest warte 20,
              następne 20 oraz 4 projekty oceniane na 15 punktów każdy. Kolega z
              roku wyżej podesłał nam też prezentacje swojego autorstwa, warto
              się z nią zapoznać. Prawdopodobnie odbędzie się zdalnie, ale warto
              być gotowym na wszystko. Wszystkie najważniejsze informacje
              zostały wrzucone na Dysk Google. Na eNauczaniu znajdują się
              warunki zaliczenia. Wymagane jest 51 punktów z całego przedmiotu,
              z czego te kolokwium jest warte 20, następne 20 oraz 4 projekty
              oceniane na 15 punktów każdy. Kolega z roku wyżej podesłał nam też
              prezentacje swojego autorstwa, warto się z nią zapoznać.
              Prawdopodobnie odbędzie się zdalnie, ale warto być gotowym na
              wszystko. Wszystkie najważniejsze informacje zostały wrzucone na
              Dysk Google. Na eNauczaniu znajdują się warunki zaliczenia.
              Wymagane jest 51 punktów z całego przedmiotu, z czego te kolokwium
              jest warte 20, następne 20 oraz 4 projekty oceniane na 15 punktów
              każdy. Kolega z roku wyżej podesłał nam też prezentacje swojego
              autorstwa, warto się z nią zapoznać. Prawdopodobnie odbędzie się
              zdalnie, ale warto być gotowym na wszystko.
            </div>
          </div>
    )
}

export default InfoPanel;