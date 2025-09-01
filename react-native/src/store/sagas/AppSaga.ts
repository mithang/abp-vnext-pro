import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Logout } from '../../api/AccountAPI';
import { getApplicationConfiguration } from '../../api/ApplicationConfigurationAPI';
import AppActions from '../actions/AppActions';
import LoadingActions from '../actions/LoadingActions';
import PersistentStorageActions from '../actions/PersistentStorageActions';
import { FetchAppConfigPayload, LogoutPayload, ApplicationConfiguration } from '../../types';

function* fetchAppConfig({ payload: { showLoading, callback } }: PayloadAction<FetchAppConfigPayload>) {
  if (showLoading) {
    yield put(LoadingActions.start({ key: 'appConfig', opacity: 1 }));
  }

  const data: ApplicationConfiguration = yield call(getApplicationConfiguration);
  yield put(AppActions.setAppConfig(data));
  yield put(
    PersistentStorageActions.setLanguage(
      data.localization.currentCulture.cultureName,
    ),
  );
  if (showLoading) yield put(LoadingActions.stop({ key: 'appConfig' }));
  if (callback) callback();
}

function* setLanguage(action: PayloadAction<string>) {
  yield put(PersistentStorageActions.setLanguage(action.payload));
  yield put(AppActions.fetchAppConfigAsync());
}

function* logout({ payload: { client_id, token, refresh_token } }: PayloadAction<LogoutPayload>) {
  const data: any = { client_id, token };

  yield call(Logout, data);

  if (!!refresh_token) {
    const refreshData: any = {
      client_id,
      token: refresh_token,
      token_type_hint: 'refresh_token'
    };
    yield call(Logout, refreshData);
  }

  yield put(PersistentStorageActions.clearAll());
  yield put(AppActions.fetchAppConfigAsync());
}

export default function* () {
  yield all([
    takeLatest(AppActions.setLanguageAsync.type, setLanguage),
    takeLatest(AppActions.fetchAppConfigAsync.type, fetchAppConfig),
    takeLatest(AppActions.logoutAsync.type, logout),
  ]);
}
