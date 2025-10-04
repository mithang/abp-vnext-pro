import { createReducer } from '@reduxjs/toolkit';
import AppActions from '../actions/AppActions';
import { ReduxAppState, ApplicationConfiguration } from '../../types';

const initialState: ReduxAppState = {
  appConfig: {} as ApplicationConfiguration,
};

export default createReducer(initialState, builder =>
  builder.addCase(AppActions.setAppConfig, (state, action) => {
    state.appConfig = action.payload;
  }),
);
