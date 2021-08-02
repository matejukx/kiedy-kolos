import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';

import monthOffsetReducer from './slices/monthOffsetSlice';
import chosenDateReducer from './slices/chosenDateSlice';
import dailyEventsReducer from './slices/dailyEvents';
import chosenGroupIDReducer from './slices/chosenGroupIDSlice';
import allEventsReducer from './slices/allEvents';
import addEventPopupReducer from './slices/addEventPopup';
import editEventPopupReducer from './slices/editEventPopup';
import settingsPopupReducer from './slices/settingsPopup';
import removeEventPopupReducer from './slices/removeEventPopup';
import subjectsReducer from './slices/subjects';
import groupsReducer from './slices/groups';
import typesReducer from './slices/types';
import forceEventsRefreshReducer from './slices/forceEventsRefresh';
import chosenEventReducer from './slices/chosenEvent';
import addSubjectPopupReducer from './slices/addSubjectPopup';
import chosenSubjectReducer from './slices/chosenSubject';
import removeSubjectPopupReducer from './slices/removeSubjectPopup';
import forceAdminRefreshReducer from './slices/forceAdminRefresh';
import editSubjectPopupReducer from './slices/editSubjectPopup';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ['chosenGroupID'],
};

const reducers = combineReducers({
  monthOffset: monthOffsetReducer,
  chosenDate: chosenDateReducer,
  chosenGroupID: chosenGroupIDReducer,
  dailyEvents: dailyEventsReducer,
  allEvents: allEventsReducer,
  chosenSubject: chosenSubjectReducer,

  addEventPopup: addEventPopupReducer,
  removeEventPopup: removeEventPopupReducer,
  editEventPopup: editEventPopupReducer,

  settingsPopup: settingsPopupReducer,
  addSubjectPopup: addSubjectPopupReducer,
  removeSubjectPopup: removeSubjectPopupReducer,
  editSubjectPopup: editSubjectPopupReducer,
  forceAdminRefresh: forceAdminRefreshReducer,

  subjects: subjectsReducer,
  groups: groupsReducer,
  types: typesReducer,
  forceEventsRefresh: forceEventsRefreshReducer,
  chosenEvent: chosenEventReducer,
});
const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
