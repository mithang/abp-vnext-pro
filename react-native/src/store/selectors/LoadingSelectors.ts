import { createSelector } from 'reselect';
import { RootState, LoadingState } from '../../types';

const getLoading = (state: RootState): LoadingState => state.loading;

export function createLoadingSelector() {
  return createSelector([getLoading], (loading: LoadingState): boolean => loading.loading);
}

export function createOpacitySelector() {
  return createSelector([getLoading], (loading: LoadingState): number | undefined => loading.opacity);
}
