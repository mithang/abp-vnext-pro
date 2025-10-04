import { createSelector } from 'reselect';
import { RootState, ReduxAppState, ApplicationConfiguration, Culture, Language } from '../../types';

const getApp = (state: RootState): ReduxAppState => state.app;

export function createAppConfigSelector() {
  return createSelector([getApp], (state: ReduxAppState): ApplicationConfiguration => state.appConfig);
}

export function createLanguageSelector() {
  return createSelector([getApp], (state: ReduxAppState): Culture | undefined => state?.appConfig?.localization?.currentCulture);
}

export function createLanguagesSelector() {
  return createSelector([getApp], (state: ReduxAppState): Language[] | undefined => state?.appConfig?.localization?.languages);
}

export function createGrantedPolicySelector(key: string) {
  return createSelector([getApp], (state: ReduxAppState): boolean => state?.appConfig?.auth?.grantedPolicies[key] ?? false);
}
