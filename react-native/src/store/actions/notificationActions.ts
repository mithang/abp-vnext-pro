import { createAction } from '@reduxjs/toolkit';
import { NotificationMessage } from '../../services/SignalRService';
import { PagingNotificationInput, CreateNotificationInput, SetReadInput } from '../../api/NotificationAPI';

// SignalR Connection Actions
export const connectSignalR = createAction('notification/connectSignalR');
export const disconnectSignalR = createAction('notification/disconnectSignalR');
export const signalRConnected = createAction<boolean>('notification/signalRConnected');

// Notification CRUD Actions
export const fetchNotifications = createAction<PagingNotificationInput>('notification/fetchNotifications');
export const fetchNotificationsSuccess = createAction<{
  items: NotificationMessage[];
  totalCount: number;
}>('notification/fetchNotificationsSuccess');
export const fetchNotificationsFailure = createAction<string>('notification/fetchNotificationsFailure');

export const markNotificationAsRead = createAction<SetReadInput>('notification/markAsRead');
export const markNotificationAsReadSuccess = createAction<string>('notification/markAsReadSuccess');
export const markNotificationAsReadFailure = createAction<string>('notification/markAsReadFailure');

export const sendNotification = createAction<CreateNotificationInput>('notification/sendNotification');
export const sendNotificationSuccess = createAction('notification/sendNotificationSuccess');
export const sendNotificationFailure = createAction<string>('notification/sendNotificationFailure');

// Real-time notification
export const receiveNotification = createAction<NotificationMessage>('notification/receiveNotification');

// UI Actions
export const setNotificationFilter = createAction<PagingNotificationInput>('notification/setFilter');
export const clearNotifications = createAction('notification/clearNotifications');
export const setUnreadCount = createAction<number>('notification/setUnreadCount');
