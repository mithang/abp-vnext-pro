import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectNotificationState = (state: RootState) => state.notification;

export const selectNotifications = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.notifications
);

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => !notification.read)
);

export const selectUnreadCount = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.unreadCount
);

export const selectIsSignalRConnected = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.isConnected
);

export const selectIsLoading = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.isLoading
);

export const selectIsSending = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.isSending
);

export const selectNotificationError = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.error
);

export const selectNotificationFilter = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.filter
);

export const selectTotalCount = createSelector(
  [selectNotificationState],
  (notificationState) => notificationState.totalCount
);
