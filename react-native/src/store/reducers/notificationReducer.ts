import { createReducer } from '@reduxjs/toolkit';
import { NotificationMessage } from '../../services/SignalRService';
import { PagingNotificationInput } from '../../api/NotificationAPI';
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
  receiveNotification,
  setNotificationFilter,
  clearNotifications,
  setUnreadCount
} from '../actions/notificationActions';

export interface NotificationState {
  // SignalR Connection
  isConnected: boolean;
  isConnecting: boolean;
  
  // Notifications
  notifications: NotificationMessage[];
  totalCount: number;
  unreadCount: number;
  
  // Loading states
  isLoading: boolean;
  isSending: boolean;
  isMarkingAsRead: boolean;
  
  // Filters
  filter: PagingNotificationInput;
  
  // Error handling
  error: string | null;
  sendError: string | null;
}

const initialState: NotificationState = {
  isConnected: false,
  isConnecting: false,
  notifications: [],
  totalCount: 0,
  unreadCount: 0,
  isLoading: false,
  isSending: false,
  isMarkingAsRead: false,
  filter: {
    skipCount: 0,
    maxResultCount: 20,
    messageType: 20
  },
  error: null,
  sendError: null
};

export const notificationReducer = createReducer(initialState, (builder) => {
  builder
    // SignalR Connection
    .addCase(connectSignalR, (state) => {
      state.isConnecting = true;
      state.error = null;
    })
    .addCase(disconnectSignalR, (state) => {
      state.isConnected = false;
      state.isConnecting = false;
    })
    .addCase(signalRConnected, (state, action) => {
      state.isConnected = action.payload;
      state.isConnecting = false;
      if (action.payload) {
        state.error = null;
      }
    })
    
    // Fetch Notifications
    .addCase(fetchNotifications, (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.filter = { ...state.filter, ...action.payload };
    })
    .addCase(fetchNotificationsSuccess, (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.unreadCount = action.payload.items.filter(n => !n.read).length;
      state.error = null;
    })
    .addCase(fetchNotificationsFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // Mark as Read
    .addCase(markNotificationAsRead, (state) => {
      state.isMarkingAsRead = true;
    })
    .addCase(markNotificationAsReadSuccess, (state, action) => {
      state.isMarkingAsRead = false;
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        notification.readTime = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    })
    .addCase(markNotificationAsReadFailure, (state, action) => {
      state.isMarkingAsRead = false;
      state.error = action.payload;
    })
    
    // Send Notification
    .addCase(sendNotification, (state) => {
      state.isSending = true;
      state.sendError = null;
    })
    .addCase(sendNotificationSuccess, (state) => {
      state.isSending = false;
      state.sendError = null;
    })
    .addCase(sendNotificationFailure, (state, action) => {
      state.isSending = false;
      state.sendError = action.payload;
    })
    
    // Real-time notification
    .addCase(receiveNotification, (state, action) => {
      const newNotification = action.payload;
      // Add to beginning of list if not already exists
      const exists = state.notifications.some(n => n.id === newNotification.id);
      if (!exists) {
        state.notifications.unshift(newNotification);
        state.totalCount += 1;
        if (!newNotification.read) {
          state.unreadCount += 1;
        }
      }
    })
    
    // UI Actions
    .addCase(setNotificationFilter, (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    })
    .addCase(clearNotifications, (state) => {
      state.notifications = [];
      state.totalCount = 0;
      state.unreadCount = 0;
    })
    .addCase(setUnreadCount, (state, action) => {
      state.unreadCount = action.payload;
    });
});
