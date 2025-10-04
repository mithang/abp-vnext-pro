import { createReducer } from '@reduxjs/toolkit';
import LoadingActions from '../actions/LoadingActions';
import { LoadingState } from '../../types';

const initialState: LoadingState = {
  loading: false,
  activeLoadings: {},
};

export default createReducer(initialState, builder =>
  builder
    .addCase(LoadingActions.start, (state, action) => {
      const { key, opacity } = action.payload;
      return {
        ...state,
        activeLoadings: { ...state.activeLoadings, [key]: action },
        loading: true,
        opacity,
      };
    })
    .addCase(LoadingActions.stop, (state, action) => {
      delete state.activeLoadings[action.payload.key];
      state.loading = !!Object.keys(state.activeLoadings).length;
    })
    .addCase(LoadingActions.clear, () => ({ activeLoadings: {}, loading: false })),
);
