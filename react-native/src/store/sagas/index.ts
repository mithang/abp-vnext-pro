import { all, fork } from 'redux-saga/effects';
import AppSaga from './AppSaga';
import { notificationSaga } from './notificationSaga';

export function* rootSaga() {
  yield all([fork(AppSaga), fork(notificationSaga)]);
}
