import { createReducer } from '@reduxjs/toolkit';
import PersistentStorageActions from '../actions/PersistentStorageActions';
import { PersistentStorageState } from '../../types';

const initialState: PersistentStorageState = {
  token: {},
  language: null,
  tenant: {},
};

export default createReducer(initialState, builder =>
  builder
    .addCase(PersistentStorageActions.setToken, (state, action) => {
      state.token = action.payload;
    })
    .addCase(PersistentStorageActions.setLanguage, (state, action) => {
      state.language = action.payload;
    })
    .addCase(PersistentStorageActions.setTenant, (state, action) => {
      state.tenant = action.payload;
    })
    .addCase(PersistentStorageActions.clearAll, (state) => {
      state.token = {};
      state.language = null;
      state.tenant = {};
    }),
);
