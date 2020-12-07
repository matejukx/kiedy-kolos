import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './../AdminPanel.css';

const AddEventPanel = () => {
    const chosenEvent = useSelector(state => state.chosenEventAdmin);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        getEventInfo();
    }, [chosenEvent])

    const getEventInfo = async () => {
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/get_event_details.php?id=${chosenEvent}`);
        const data = await response.json();
        setEvent(data[0]);
        console.log(data[0]);
    }

    return(
        <div class="event-info">
          <h2 class="events__header">Edycja Wydarzenia {event.id}</h2>

          <div class="option">
            <label class="events-form__label" for="title">Przedmiot</label>
            <select name="title" id="title">
              <option value="paa">Podstawy Analizy Algorytmów</option>
              <option value="graf">Grafika Komputerowa</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>

          <div class="option">
            <label class="events-form__label" for="group">Grupa</label>
            <select name="group" id="group">
              <option value="gAll">Wszystkie</option>
              <option value="g1">1</option>
              <option value="g2">2</option>
              <option value="g3">3</option>
              <option value="g4">4</option>
              <option value="g5">5</option>
              <option value="g6">6</option>
            </select>
          </div>

          <div class="option">
            <label class="events-form__label" for="type">Typ</label>
            <select name="type" id="type">
              <option value="g1">Kolokwium</option>
              <option value="g2">Laboratorium</option>
              <option value="g3">Projekt</option>
              <option value="g4">Inne</option>
            </select>
          </div>

          <div class="option">
            <label class="events-form__label" for="date">Data</label>
            <input id="date" type="date" />
          </div>

          <div class="option">
            <label class="events-form__label" for="time">Godzina</label>
            <input id="time" type="time" />
          </div>

          <div class="option">
            <label class="events-form__label" for="description">Opis</label>
            <textarea cols="30" rows="5" id="description" value={event.description}></textarea>
          </div>

          <div class="option submit">
            <input type="password" placeholder="Hasło" />
            <button class="submit__button submit__button--delete">Usuń</button>
            <button class="submit__button">Zapisz</button>
          </div>
        </div>
    )
}

export default AddEventPanel;