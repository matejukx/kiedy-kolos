import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import './NoIDPanel.scss';

const NoIDPanel = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const data = await fetch('https://kiedykolos.bieda.it/YearCourses');
    const unjsoned = await data.json();
    let result = unjsoned.result;
    result = result.filter((item) => item.course != 'Test');
    setItems(result);
    console.log(result);
  }, []);

  return (
    <>
      <div className='noIdContainer'>
        <h1>To jest strona główna</h1>
        <p>Aby dostać się na stronę kierunku, podaj w linku ID (kiedy-kolos/#/{'{id}'})</p>

        <h1>Jeżeli jesteś starostą:</h1>
        <p>
          Skontaktuj się z nami z prośbą o otwarcie kierunku. Wyślemy ci unikalny link, którym podzielisz się ze
          studentami swojego kierunku. Od teraz Wasz kalendarz na stałe będzie dostępny pod tym linkiem. Dostaniesz
          również hasło, dzięki któremu będziesz mógł tworzyć/edytować/usuwać wydarzenia/przedmioty/grupy za pomocą
          bardzo intuicyjnego panelu wbudowanego w stronę.
        </p>

        <h1>Jeżeli jesteś studentem:</h1>
        <p>
          Po otrzymaniu linku od starosty twojego kierunku uzyskasz dostęp do kalendarza. Po kliknięciu ikonki ustawień
          możesz wybrać grupę. Wydarzenia zostaną przefiltrowane, dzięki czemu zobaczysz tylko te, które ciebie dotyczą.
          Twoje ustawienia zostaną zapamiętane, umożliwiając ci szybki i wygodny dostęp do wybranego kalendarza za
          każdym razem, gdy odwiedzisz kiedy kolos.
        </p>

        <h1>Kontakt</h1>
        <a href='#'>Facebook</a>
      </div>
      <div className='yearCoursesList'>
        <h2>Dostępne kierunki:</h2>
        <ul>
          {items.length > 0 &&
            items.map((item) => (
              <Link to={`./${item.id}`}>
                <li>
                  {item.university}, {item.faculty}, {item.course}, Semestr {item.currentSemester}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
};

export default NoIDPanel;
