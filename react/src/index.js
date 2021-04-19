import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { loadState, saveState } from './storage/localStorage';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import allReducer from './reducers';
import store from './redux/store';

import './index.css';
import App from './App';

// const persistedStore = loadState();
// const store = createStore(
//     allReducer,
//     persistedStore,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// store.subscribe(() => {
//     saveState({
//         chosenGroup: store.getState().chosenGroup,
//         chosenTheme: store.getState().chosenTheme,
//     });
// });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter basename='/'>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

//reportWebVitals();
