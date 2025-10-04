import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from './AppReducer';
import LoadingReducer from './LoadingReducer';
import PersistentStorageReducer from './PersistentStorageReducer';
import { notificationReducer } from './notificationReducer';
import { RootState } from '../../types';

const rootReducer = combineReducers({
  loading: LoadingReducer,
  app: AppReducer,
  persistentStorage: PersistentStorageReducer,
  notification: notificationReducer,
});

export default rootReducer;
