import { createAction } from '@reduxjs/toolkit';
import { FetchAppConfigPayload, LogoutPayload, ApplicationConfiguration } from '../../types';

const fetchAppConfigAsync = createAction(
  'app/fetchAppConfigAsync',
  ({ callback = () => {}, showLoading = true }: Partial<FetchAppConfigPayload> = {}) => ({
    payload: { callback, showLoading },
  }),
);

const setAppConfig = createAction<ApplicationConfiguration>('app/setAppConfig');

const setLanguageAsync = createAction<string>('app/setLanguageAsync');

const logoutAsync = createAction(
  'app/logoutAsync',
  ({ client_id = '', token = '', refresh_token = '' }: Partial<LogoutPayload> = {}) => ({
    payload: { client_id, token, refresh_token },
  }),
);

export default {
  fetchAppConfigAsync,
  setAppConfig,
  setLanguageAsync,
  logoutAsync,
};

export type AppActions = 
  | ReturnType<typeof fetchAppConfigAsync>
  | ReturnType<typeof setAppConfig>
  | ReturnType<typeof setLanguageAsync>
  | ReturnType<typeof logoutAsync>;
