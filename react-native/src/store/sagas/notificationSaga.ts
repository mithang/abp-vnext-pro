import { call, put, takeEvery, takeLatest, fork, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import NotificationAPI, { PagingNotificationInput, CreateNotificationInput, SetReadInput } from '../../api/NotificationAPI';
import SignalRService from '../../services/SignalRService';
import {
  connectSignalR,
  disconnectSignalR,
  signalRConnected,
  fetchNotifications,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  markNotificationAsRead,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
  sendNotification,
  sendNotificationSuccess,
  sendNotificationFailure,
  receiveNotification
} from '../actions/notificationActions';

// SignalR Connection Sagas
function* connectSignalRSaga() {
  try {
    // Set up SignalR callbacks
    SignalRService.setCallbacks({
      onNotificationReceived: (notification) => {
        // This will be handled by the SignalR service directly
        // We'll dispatch the action from the service
      },
      onConnectionStateChanged: (connected) => {
        // Dispatch connection state change
      },
      onError: (error) => {
        console.error('SignalR Error:', error);
      }
    });

    yield call([SignalRService, 'start']);
    yield put(signalRConnected(true));
  } catch (error) {
    console.error('Failed to connect SignalR:', error);
    yield put(signalRConnected(false));
  }
}

function* disconnectSignalRSaga() {
  try {
    yield call([SignalRService, 'stop']);
    yield put(signalRConnected(false));
  } catch (error) {
    console.error('Failed to disconnect SignalR:', error);
  }
}

// Notification CRUD Sagas
function* fetchNotificationsSaga(action: PayloadAction<PagingNotificationInput>) {
  try {
    const response = yield call([NotificationAPI, 'getNotifications'], action.payload);
    yield put(fetchNotificationsSuccess({
      items: response.items,
      totalCount: response.totalCount
    }));
  } catch (error: any) {
    yield put(fetchNotificationsFailure(error.message || 'Failed to fetch notifications'));
  }
}

function* markNotificationAsReadSaga(action: PayloadAction<SetReadInput>) {
  try {
    yield call([NotificationAPI, 'markAsRead'], action.payload);
    yield put(markNotificationAsReadSuccess(action.payload.id));
  } catch (error: any) {
    yield put(markNotificationAsReadFailure(error.message || 'Failed to mark notification as read'));
  }
}

function* sendNotificationSaga(action: PayloadAction<CreateNotificationInput>) {
  try {
    const { messageLevel, ...notificationData } = action.payload;
    
    // Send notification based on message level
    switch (messageLevel) {
      case 10: // Warning
        yield call([NotificationAPI, 'sendCommonWarningMessage'], action.payload);
        break;
      case 20: // Information
        yield call([NotificationAPI, 'sendCommonInformationMessage'], action.payload);
        break;
      case 30: // Error
        yield call([NotificationAPI, 'sendCommonErrorMessage'], action.payload);
        break;
      default:
        yield call([NotificationAPI, 'sendCommonInformationMessage'], action.payload);
    }
    
    yield put(sendNotificationSuccess());
  } catch (error: any) {
    yield put(sendNotificationFailure(error.message || 'Failed to send notification'));
  }
}

// Root Saga
export function* notificationSaga() {
  yield takeLatest(connectSignalR.type, connectSignalRSaga);
  yield takeLatest(disconnectSignalR.type, disconnectSignalRSaga);
  yield takeLatest(fetchNotifications.type, fetchNotificationsSaga);
  yield takeLatest(markNotificationAsRead.type, markNotificationAsReadSaga);
  yield takeLatest(sendNotification.type, sendNotificationSaga);
}
